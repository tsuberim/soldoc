

# SolDoc

A documentation generator for solidity projects, inspired by [TypeDoc](http://typedoc.org/).

## Usage

SolDoc can be used as a CLI app or as a library and called from your code.

### As a CLI tool

1. Install: `yarn global add --dev @soldoc/soldoc` / `npm i -g @soldoc/soldoc`.
2. Use the CLI:
    ```
    Usage: soldoc --in <input dir> -o <out dir>

    Options:
    --help          Show help                                            [boolean]
    --version       Show version number                                  [boolean]
    --options       Path to JSON config file
    --in            Specifies the location the input files should be read from.
                                                [string] [default: "./contracts"]
    --json, -j      Output the parsed information to a json file instead of
                    rendering.                                            [string]
    --out, -o       Specifies the location the documentation should be written to.
                                                        [string] [default: "./docs"]
    --quiet, -q     No stdout output                    [boolean] [default: false]
    --theme, -t     Specifies a npm module that exports a default
                    `render(filepath,contractName,contactInfo,options):
                    {content,extension}` function        [string] [default: false]
    --repo-url, -r  Specifies remote repository url.                      [string]

    Examples:
    soldoc --in ./contracts -o ./docs  Render `.sol` files in `./contracts` into
                                        `.docs`

    For more information, visit https://github.com/dev-matan-tsuberi/soldoc
    ```

### As a library

1. Install: `yarn add --dev @soldoc/soldoc` / `npm i --save-dev @soldoc/soldoc`.
2. Import in your project as:
    ```JavaScript
    import soldoc from '@soldoc/soldoc';

    // default options
    const options = {
        in: './contracts',
        out: './docs',
        json: null,
        repoUrl: null,
        quiet: false,
        theme: '@soldoc/markdown'
    };
    soldoc(options);
    ```

## Themes

SolDoc is easiliy themeable, installing a theme is as simple as `yarn add @soldoc/<theme>` / `npm i --save @soldoc/<theme>` and setting a configuration option:
1. In the cli: `soldoc --theme @soldoc/<theme>`.
2. In code: `soldoc({theme: '@soldoc/<theme>'})`.

Currently the official themes are:
1. **Default**: `@soldoc/markdown` - A simple markdown theme.
2. `@soldoc/json` - A theme that just outputs a JSON object.
2. [Create a theme!](docs/create_a_theme.md)

## Contribute

**Note**: This project is managed as a **monorepo** and uses [lerna.js](https://lernajs.io/).

Pull requests are very welcome and needed.
Check out issues with label `help wanted` to get started.
