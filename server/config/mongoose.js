var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function (config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...') );
	db.once('open', function callback () {
		console.log('multivision db opened');
	});

	var messageSchema = mongoose.Schema({message: String});
	var Message = mongoose.model('Message', messageSchema);
	var mongoMessage;
	Message.findOne().exec(function (err, messageDoc) {
		console.log('messageDoc is ' + messageDoc);
		mongoMessage = messageDoc.message;
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		userName: String,
		salt: String,
		hashed_pwd: String,
		roles: [String]
	}); 
	userSchema.methods = {
		authenticate: function (passwordToMatch) {
			return hashPwd(this.salt, passwordToMatch) ===  this.hashed_pwd;
		}
	};

	var User = mongoose.model('User', userSchema);

//TODO: don't send hash and salt to client

	User.find({}).exec(function (err, collection) {
		var salt, hash;
		if(collection.length === 0){
			salt = createSalt();
			hash = hashPwd(salt, 'joe');
			User.create({firstName:'Joe', lastName:'Jones', userName: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = createSalt();
			hash = hashPwd(salt, 'jim');
			User.create({firstName:'Jim', lastName:'Johnson', userName: 'jim', salt: salt, hashed_pwd: hash, roles: []});
			salt = createSalt();
			hash = hashPwd(salt, 'jane');
			User.create({firstName:'Jane', lastName:'Jarred', userName: 'jane', salt: salt, hashed_pwd: hash});
		} 
	}); 
};

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
};

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}