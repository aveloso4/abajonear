var mongoose 	= require('../services/dbAccessService'),
	Schema		= mongoose.Schema;


var AddressSchema = new Schema({
	line1:  {type: String, required: true},
	line2: String,
	city: {type: String, default: 'Buenos Aires'},
	state: {type: String, default: 'Buenos Aires'},
	zip: String,
	country: {type: String, default: 'Argentina'}
});

module.exports = {
	model: mongoose.model('Address', AddressSchema),
	schema: AddressSchema
};