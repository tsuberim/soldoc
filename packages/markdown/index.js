// A little trick for better readability of template.
const N = '\n';

module.exports = (filepath, contractName, info, opts) => {
    const optional = (x,template) => x ? template(x) : '';

    const docs= (obj) =>
        `${optional(obj.title, title => `> ${title}${N}`)}${''
        }${optional(obj.notice, notice => `>${N}>${notice}${N}`)}${''
        }${optional(obj.details, details => `>${N}> ${details}${N}`)}${''
        }${optional(obj.author, author => `>${N}> Author: ${author}${N}`)}${''
        }${N}`
    ;

    const gas = (obj) =>
        `**Execution cost**: ${obj.executionCost ? `less than ${obj.executionCost} gas` : 'No bound available'}${N}`
    ;

    const attrs = (info) => {
        const arr = [];
        if(info.payable || info.stateMutabillity === 'payable')
            arr.push('payable');
        if(info.constant || info.stateMutabillity === 'constant')
            arr.push('constant');
        if(info.view || info.stateMutabillity === 'view')
            arr.push('view');
        if(info.anonymous || info.stateMutabillity === 'anonymous')
            arr.push('anonymous');
        return arr.length ? `**Attributes**: ${arr.join(' | ')}${N}${N}` : '';
    };

    const params = (obj) => {
        const param = (name, p, i) =>
            `${i+1}. **${name}** *of type \`${p.type}\`*${optional(p.details, details => `${N}${N}    > ${details}${N}`)}`
        ;

        const content =
            `Params:${N}${N
            }${Object.keys(obj.params).map((k,i) => param(k,obj.params[k],i)).join(N)}${N
            }`;

        return content;
    }

    const outputs = (obj) => {
        const output = (name, p, i) =>
        `${i+1}. **${name}** *of type \`${p.type}\`*${optional(p.details, details => ` - ${details}`)}`
        ;

        const content =
            `Returns:${N}${N
            }${optional(obj.return,x => `> ${x}${N}`)}${N
            }${Object.keys(obj.outputs).map((k,i) => output(k,obj.outputs[k],i)).join(N)}${N
            }`;

        return content;
    }

    const methods = (methods) => {

        const method = (signature, m, i) =>
            `### ${signature}${N
            }${docs(m)}${N
            }${gas(m)}${N
            }${attrs(m)}${N
            }${Object.keys(m.params).length ? params(m) : ''}${N
            }${Object.keys(m.outputs).length ? outputs(m) : ''}${''
            }`
        ;

        const content =
            `## Methods${N
            }${Object.keys(methods).map((k,i) => method(k,methods[k],i)).join(`${N}--- ${N}`)}`
        ;

        return content;
    };

    const events = (events) => {

        const event = (signature, m, i) =>
            `### ${signature}${N
            }${docs(m)}${N
            }${gas(m)}${N
            }${attrs(m)}${N
            }${Object.keys(m.params).length ? params(m) : ''}${''
            }`
        ;

        const content =
            `## Events${N
            }${Object.keys(events).map((k,i) => event(k,events[k],i)).join(`${N}--- ${N}`)}`
        ;

        return content;
    };

    const content =
        `# ${contractName}${N
        }${optional(opts.repoUrl, repoUrl => `[see the source](${repoUrl}/${filepath})${N}`)}${''
        }${docs(info)}${N
        }${gas(info)}${N
        }**Deployment cost**: ${info.deploymentCost ? `less than ${info.deploymentCost} gas` : 'No bound available'}${N}${N
        }**Combined cost**: ${info.deploymentCost && info.executionCost ? `less than ${info.deploymentCost + info.executionCost} gas` : 'No bound available'}${N}${N
        }${optional(info.constructor, constructor =>
            `## Constructor${N
            }${docs(constructor)}${N
            }${attrs(constructor)}${N
            }${Object.keys(constructor.params).length ? params(constructor) : ''}${''
            }`
        )}${N
        }${Object.keys(info.events).length ? events(info.events) : ''}${N
        }${optional(info.fallback, fallback =>
            `## Fallback${N
            }${docs(fallback)}${N
            }${gas(fallback)}${N
            }${attrs(fallback)}${N
            }`
        )}${N
        }${Object.keys(info.methods).length ? methods(info.methods) : ''}${N
        }[Back to the top ↑](#${contractName})${N
        }`
    ;

    return {
        content: content,
        extension: '.md'
    }
};
