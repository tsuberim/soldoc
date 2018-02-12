const shelljs = require('shelljs');
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const assign = require('deep-assign');
const validUrl = require('valid-url');

const gather = (files,callback) => {
    const output = {};

    const cb = (f,err, data) => {
        if(err)
            callback(new Error(`Could not read file ${f}`));
        else{
            output[f] = data;
            if(files.reduce((prev,cur) => prev && output[cur],true))
                callback(null,output);
        }
    }

    files.forEach(f => fs.readFile(f,'utf8',(err,data) => cb(f,err,data)));
}

const extract = (data,files) => {
    const result = solc.compile({sources: data},1,file => {
        const node_path = path.resolve('node_modules',file);
        return {contents: fs.readFileSync(fs.existsSync(node_path) ? node_path : file, 'utf-8')};
    });
    if(result.errors)
        throw new Error(result.errors);

    const clean = data => {
        const removeUndefined = x => JSON.parse(JSON.stringify(x));
        const signature = (obj,names) => `${obj.name}(${Object.keys(obj.params).map(k => names ? `${obj.params[k].type} ${obj.params[k].name}` : obj.params[k].type).join(',')})`;
        const normalize = (obj) => ({
            ...obj,
            params: (obj.params || obj.inputs) ? (obj.params || obj.inputs).reduce((acc,p,i)=>({...acc,[p.name || `param_${i}`]:{...p, name:undefined}}),{}) : undefined,
            outputs: obj.outputs ? obj.outputs.reduce((acc,p,i)=>({...acc,[p.name || `output_${i}`]:{...p, name:undefined}}),{}): undefined,
            inputs: undefined,
            type: undefined
        });
        const mapObj = (obj,f) => Object.keys(obj || {}).reduce((acc,k) => ({...acc, [k]: f(obj[k])}),{});

        // interface
        const abi = JSON.parse(data.interface);

        const constructors = abi.filter(x => x.type === 'constructor');
        const constructor = constructors.length ? normalize(constructors[0]) : null;
        const events = abi.filter(x => x.type === 'event').sort((a,b) => a.name > b.name).map(normalize).reduce((acc,e)=>({...acc,[signature(e)]:e}),{});
        const fallbacks = abi.filter(x => x.type === 'fallback');
        const fallback = fallbacks.length ? normalize(fallbacks[0]) : null;
        const methods = abi.filter(x => x.type === 'function').sort((a,b) => a.name > b.name).map(normalize).reduce((acc,f)=>({...acc,[signature(f)]:f}),{});

        const interface = {
            constructor,
            events,
            fallback,
            methods
        };

        // docs
        const metadata = data.metadata !== '' ? JSON.parse(data.metadata).output : {};
        const devdoc = metadata.devdoc || {};
        const userdoc = metadata.userdoc || {};
        const merged = assign(devdoc,userdoc,{methods:{}});
        const docs = {
            ...merged,
            fallback: merged.methods[''] ? {details: merged.methods['']} : null,
            methods: {...mapObj(merged.methods, doc => ({...doc, params: mapObj(doc.params, p => ({details: p}))})),['']: undefined}
        }

        // gas
        const gas = {
            executionCost: data.gasEstimates.creation[0],
            deploymentCost: data.gasEstimates.creation[1],
            fallback: data.gasEstimates.external[''] ? {executionCost: data.gasEstimates.external['']} : null,
            methods: {...mapObj(data.gasEstimates.external, x => ({executionCost: x})), ['']: undefined},
        };

        const out = assign(interface,docs,gas);
        return out;
    }

    console.log(files)
    const output = Object.keys(result.contracts).reduce((acc,contract) => {
        const split = contract.split(':');
        const file = split[0];
        const name = split[1];
        if(files.indexOf(file) !== -1)
            return {
                ...acc,
                [file]: {
                    ...(acc[file] || {}),
                    [name]: clean(result.contracts[contract])
                }
            }
        else
            return acc;
    },{});

    return output;
};

const markdown = (f,name,contract) => {
    return {
        content: `${name}`,
        extension: '.md',
    };
}

const soldoc = (options) => {
    const opts = assign({},soldoc.defaults,JSON.parse(JSON.stringify(options)));
    if(typeof opts.theme === 'string'){
        opts.theme = require(opts.theme);
    }

    const info = (...msgs) => opts.quiet ? null : shelljs.echo(...msgs.map(x => typeof x === 'string' ? x : JSON.stringify(x,undefined,2)));

    try{
        if(!opts.repoUrl){
            const package = require('./package.json');
            if(package.repository)
                if(typeof package.repository === 'object')
                    opts.repoUrl = package.repository.url;
                else if(typeof package.repository === 'string' && (validUrl.isHttpUri(package.repository) || validUrl.isHttpsUri(package.repository)))
                    opts.repoUrl = package.repository;
            info(`Detected repoUrl '${opts.repoUrl}'`);
        }
    } catch(e) {console.log(e)}

    const files = shelljs.find(opts.in).filter(f => path.extname(f) === '.sol');
    info(`Found ${files.length} files:`,files);
    gather(files, (err, data) => {
        if(err) throw err;
        info(`Extracting files...`);
        const extracted = extract(data,files);
        if(opts.json){
            info(`Writing extracted info to '${opts.json}'...`);
            fs.writeFile(opts.json,JSON.stringify(extracted,undefined,2),'utf8',(err) => {
                if(err) throw new Error(`Could not write to '${opts.json}'`);
            });
        }
        else{
            Object.keys(extracted).forEach(f => {
                Object.keys(extracted[f]).forEach(contract => {
                    info(`Rendering '${f}':${contract}...`);
                    const result = opts.theme(f,contract,extracted[f][contract],{...opts[opts.theme], repoUrl: opts.repoUrl});
                    const where = path.resolve(opts.out,path.relative(opts.in,path.dirname(f)),`${contract}${result.extension}`);
                    info(`Writing result to '${where}'`);
                    shelljs.mkdir('-p',path.dirname(where));
                    fs.writeFile(where,result.content,'utf8',err =>{
                        if(err) throw new Error(`Could not write file: '${where}'`);
                    });
                });
            });
        }
    })
};
soldoc.defaults = {
    in: './contracts',
    out: './docs',
    // json: undefined,
    // repoUrl: undefined,
    quiet: false,
    theme: '@soldoc/markdown'
};

module.exports = soldoc;
