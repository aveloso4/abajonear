var mongoose 	= require('../services/dbAccessService'),
	Address 	= require('../models/address'),
	Schema		= mongoose.Schema;


var BranchSchema = new Schema({
	address: Address.schema
});

module.exports = {
	model: mongoose.model('Branch', BranchSchema),
	schema: BranchSchema
};