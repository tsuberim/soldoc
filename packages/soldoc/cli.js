#!/usr/bin/env node

const soldoc = require('./index.js');
const yargs = require('yargs');

const args = yargs
    .config('options')
    .epilogue('For more information, visit https://github.com/dev-matan-tsuberi/soldoc')
    .usage('Usage: $0 --in <input dir> -o <out dir>')
    .example('$0 --in ./contracts -o ./docs','Render `.sol` files in `./contracts` into `.docs`')
    .options({
        'in': {
            desc: 'Specifies the location the input files should be read from.',
            type: 'string',
            default: soldoc.defaults.in
        },
        'json': {
            alias: 'j',
            desc: 'Output the parsed information to a json file instead of rendering.',
            type: 'string',
            default: soldoc.defaults.json
        },
        'out': {
            alias: 'o',
            desc: 'Specifies the location the documentation should be written to.',
            type: 'string',
            default: soldoc.defaults.out
        },
        'quiet': {
            alias: 'q',
            desc: 'No stdout output',
            type: 'boolean',
            default: soldoc.defaults.quiet
        },
        'theme': {
            alias: 't',
            desc: 'Specifies a npm module that exports a default `render(filepath,contractName,contactInfo,options): {content,extension}` function',
            type: 'string',
            default: soldoc.defaults.theme
        },
        'repo-url': {
            alias: 'r',
            desc: 'Specifies remote repository url. Uses `repository` field in `package.json` if available and not specified.',
            type: 'string',
            default: soldoc.defaults.repoUrl
        },
        'log': {
            alias: 'l',
            desc: 'Specifies the location the log file should be written to.',
            type: 'string',
            default: soldoc.defaults.log
        }
    })
    .argv;

const opts = {
    in: args.in,
    out: args.out,
    json: args.json,
    quiet: args.quiet,
    theme: args.theme,
    repoUrl: args['repo-url'],
    log: args.log
};
soldoc(opts);
