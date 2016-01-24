var moongose 	= require('../services/dbAccessService'),
    cryptSvc  = require('../services/encryptationService'),
    Address   = require('../models/address.js'),
    Schema		= moongose.Schema;

var userTypes = ['admin', 'client', 'seller'];

var currentUser = null;

//User Model
var UserSchema = new Schema({
  email: { type: String, required: true, lowercase: true, index: { unique: true } },
  password: { type: String, required: true },
  first_name: String,
  last_name: String,
  user_type: {type: String, enum: userTypes, default: 'client' },
  addresses: [Address.schema]
});

UserSchema.pre('save', function(next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    cryptSvc.encrypt(user.password)
        .then(function (hash) {
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        },
        function (err) {
            next();
        });
});

UserSchema.methods.compareUserType = function(candidateType) {
  return this.user_type === candidateType;
}

UserSchema.methods.comparePassword = function (candidatePassword) {
    return cryptSvc.compare(candidatePassword, this.password);
};


module.exports = {
  model: moongose.model('User', UserSchema),
  schema: UserSchema,
  currentUser: currentUser
};
