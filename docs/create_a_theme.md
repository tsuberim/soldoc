# Create a theme

A SolDoc theme is simply an npm module that exports a single function with the signature:

Params:

1. `filepath` - the original file's path (eg. `path/to/file.sol`).
2. `contractName` - the name of the contract (eg. `MyAwesomeContract`).
3. `info` - an [info object](#the_info_object).
4. `options` - other custom options passed to the function, plus `repoUrl` if available.

## The info object

The info object contains all the information needed to render a contract and has the following structure:

```JSON
{
  "[filepath]": {
    "[contract name]": {
			"executionCost": "[number | undefined]",
			"executionCost": "[number | undefined]",

			"title": "[@title documentation | undefined]",
			"author": "[@author documentation | undefined]",
			"notice": "[@notice documentation | undefined]",
			"details": "[@dev documentation | undefined]",
			"return": "[@return documentation | undefined]",

			"constructor": {
				"executionCost": "[number | undefined]",

				"author": "[@author documentation | undefined]",
				"notice": "[@notice documentation | undefined]",
				"details": "[@dev documentation | undefined]",
				"return": "[@return documentation | undefined]",

				"payable": "[true | false | undefined]",
				"constant": "[true | false | undefined]",
				"stateMutability": ["pure" | "constant" | "view" | "payable"],

				"params": {
					"[param name]": {
						"type": "[type (eg. 'byte32[]')]",
						"details": "[@param documentation]"
					}
				}
			},
			"fallback": {
				"executionCost": "[number | undefined]",

				"author": "[@author documentation | undefined]",
				"notice": "[@notice documentation | undefined]",
				"details": "[@dev documentation | undefined]",
				"return": "[@return documentation | undefined]",

				"payable": "[true | false | undefined]",
				"constant": "[true | false | undefined]",
				"stateMutability": ["pure" | "constant" | "view" | "payable"],
			},
			"methods": {
				"[method signature (eg. 'payMe(address,uint)']": {
					"executionCost": "[number | undefined]",

					"author": "[@author documentation | undefined]",
					"notice": "[@notice documentation | undefined]",
					"details": "[@dev documentation | undefined]",
					"return": "[@return documentation | undefined]",

					"payable": "[true | false | undefined]",
					"constant": "[true | false | undefined]",
					"stateMutability": ["pure" | "constant" | "view" | "payable"],

					"params": {
						"[param name]": {
							"type": "[type (eg. 'byte32[]')]",
							"details": "[@param documentation]"
						}
					},
					"outputs": {
						"[output name]": {
							"type": "[type (eg. 'byte32[]')]",
						}
					}
				}
			},
			"events": {
				"[event signature (eg. 'Payed(address,uint)']": {
					"indexed": "[true | false | undefined]"
					"params": {
						"[param name]": {
							"type": "[type (eg. 'byte32[]')]"
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
