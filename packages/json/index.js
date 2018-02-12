module.exports = (filepath, contractName, info, options) => {
	return {
		content: JSON.stringify({filepath, contractName, info, options},undefined,2),
		extension: '.json'
	}
}
