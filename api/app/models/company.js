var mongoose 	= require('../services/dbAccessService'),
	Branch 		= require('../models/branch'),
	Schema		= mongoose.Schema;


var CompanySchema = new Schema({
	name: String,
	owner: String,
	branches: [Branch.schema]
});

module.exports = {
	model: mongoose.model('Company', CompanySchema),
	schema: CompanySchema
};