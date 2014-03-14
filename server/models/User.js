var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	firstName: {type: String, required: '{PATH} is required!'},
	lastName: {type: String, required: '{PATH} is required!'},
	userName: {
		type: String,
		required: '{PATH} is required!',
		unique: true
	},
	salt: {type: String, required: '{PATH} is required!'},
	hashed_pwd: {type: String, required: '{PATH} is required!'},
	roles: [String]
}); 
userSchema.methods = {
	authenticate: function (passwordToMatch) {
		return encrypt.hashPwd(this.salt, passwordToMatch) ===  this.hashed_pwd;
	}
};

var User = mongoose.model('User', userSchema);

//TODO: don't send hash and salt to client
function createDefaultUsers () {
	User.find({}).exec(function (err, collection) {
		var salt, hash;
		if(collection.length === 0){
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'joe');
			User.create({firstName:'Joe', lastName:'Jones', userName: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'jim');
			User.create({firstName:'Jim', lastName:'Johnson', userName: 'jim', salt: salt, hashed_pwd: hash, roles: []});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'jane');
			User.create({firstName:'Jane', lastName:'Jarred', userName: 'jane', salt: salt, hashed_pwd: hash});
		} 
	}); 	
};

exports.createDefaultUsers = createDefaultUsers;

