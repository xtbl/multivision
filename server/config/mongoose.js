var mongoose = require('mongoose');

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
		userName: String
	}); 
	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function (err, collection) {
		if(collection.length === 0){
			User.create({firstName:'Joe', lastName:'Jones', userName: 'joe'});
			User.create({firstName:'Jim', lastName:'Johnson', userName: 'jim'});
			User.create({firstName:'Jane', lastName:'Jarred', userName: 'jane'});
		} 
	}); 
};