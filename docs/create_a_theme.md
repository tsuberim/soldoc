# Create a theme

A SolDoc theme is simply an npm module that exports a single function with the signature:

Params:

1. `filepath` - the original file's path (eg. `path/to/file.sol`).
2. `contractName` - the name of the contract (eg. `MyAwesomeContract`).
3. `info` - an [info object](#the_info_object).
4. `options` - other custom options passed to the function, plus `repoUrl` if available.

Returns:

An object containing:
1. `content` of type `string`- The rendered result.
2. `extension` of type `string`- The file extension (eg. `'.md'`).

## Example

In this example we are going to create the simplest theme possible, we'll call it `@soldoc/json`.
The full code for this example is available [here](../packages/json)

1. Clone the repo: `git clone https://github.com/dev-matan-tsuberi/soldoc.git && cd soldoc`.
3. Create a file `packages/json/index.js`:
```JavaScript
module.exports = (filepath, contractName, info, options) => {
	return {
		content: JSON.stringify({filepath, contractName, info, options},undefined,2),
		extension: '.json'
	}
}
```
4. And a `packages/json/package.json`:
```JSON
{
  "name": "@soldoc/json",
  "publishConfig": {
    "access": "public"
  },
  "description": "Json theme for SolDoc",
  "main": "index.js",
  "repository": "https://github.com/dev-matan-tsuberi/soldoc/tree/master/packages/json",
  "author": "[your name] <[your email]>",
  "license": "MIT",
  "private": false
}
```
5. Test your theme by running `cd ./packages/soldoc && yarn soldoc --theme ../../packages/json`, you should see your output in `docs/`.
6. PR your change into this repo.

## The info object

The info object contains all the information needed to render a contract and has the following structure:

```JSON
{
  "[filepath]":{
    "[contract name]":{
      "executionCost":"[number | undefined]",
      "deploymentCost":"[number | undefined]",
      "title":"[@title documentation | undefined]",
      "author":"[@author documentation | undefined]",
      "notice":"[@notice documentation | undefined]",
      "details":"[@dev documentation | undefined]",
      "return":"[@return documentation | undefined]",
      "constructor":{
        "executionCost":"[number | undefined]",
        "author":"[@author documentation | undefined]",
        "notice":"[@notice documentation | undefined]",
        "details":"[@dev documentation | undefined]",
        "return":"[@return documentation | undefined]",
        "payable":"[true | false | undefined]",
        "constant":"[true | false | undefined]",
        "stateMutability":"['pure' | 'constant' | 'view' | 'payable']",
        "params":{
          "[param name]":{
            "type":"[type (eg. 'byte32[]')]",
            "details":"[@param documentation]"
          }
        }
      },
      "fallback":{
        "executionCost":"[number | undefined]",
        "author":"[@author documentation | undefined]",
        "notice":"[@notice documentation | undefined]",
        "details":"[@dev documentation | undefined]",
        "return":"[@return documentation | undefined]",
        "payable":"[true | false | undefined]",
        "constant":"[true | false | undefined]",
        "stateMutability":"['pure' | 'constant' | 'view' | 'payable']"
      },
      "methods":{
        "[method signature (eg. 'payMe(address,uint)']":{
          "executionCost":"[number | undefined]",
          "author":"[@author documentation | undefined]",
          "notice":"[@notice documentation | undefined]",
          "details":"[@dev documentation | undefined]",
          "return":"[@return documentation | undefined]",
          "payable":"[true | false | undefined]",
          "constant":"[true | false | undefined]",
          "stateMutability":"['pure' | 'constant' | 'view' | 'payable']",
          "params":{
            "[param name]":{
              "type":"[type (eg. 'byte32[]')]",
              "details":"[@param documentation]"
            }
          },
          "outputs":{
            "[output name]":{
              "type":"[type (eg. 'byte32[]')]"
            }
          }
        }
      },
      "events":{
        "[event signature (eg. 'Payed(address,uint)']":{
          "indexed":"[true | false | undefined]",
          "params":{
            "[param name]":{
              "type":"[type (eg. 'byte32[]')]"
            }
          }
        }
      }
    }
  }
}
```

---

**Pro Tip**: Use the `soldoc --json path/to/info.json` option to write this object to a json file to see it's output while developing.
