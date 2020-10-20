const command = require("./dummyCommand");

function setKeySSI(server){
	const commandRegistry = require("../CommandRegistry").getRegistry(server);
	const utils = require("../utils");

	commandRegistry.register("/setKeySSI", "post", (req, callback)=>{
		const transactionManager = require("../TransactionManager");
		const keyssiSpace = require("opendsu").loadApi("keyssi");
		utils.bodyParser(req, (err)=>{
			if(err){
				return callback(err);
			}

			const transaction = transactionManager.getTransaction(req.params.transactionId);
			transaction.context.keySSI = keyssiSpace.parse(req.body);
			transaction.context.options.useSSIAsIdentifier = true;

			return callback(undefined, command);
		});
	});
}

module.exports = setKeySSI;