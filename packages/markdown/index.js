const render = (filepath, contractName, contractInfo) => {
    return {
        content: `${contractName}`,
        extension: '.md'
    }
};

module.exports = render;
