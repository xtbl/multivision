var auth = require('./auth'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function (app) {
	// app.get('/partials/:partialPath', function (req, res) {
	// 	console.log('server params: ' + req.params.partialPath);
	// 	res.render('partials/' + req.params.partialPath);
	// });

	app.get('/api/users', function (req, res) {
		User.find({}).exec(function (err, collection) {
			console.log('collection', collection);
			res.send(collection);
		});
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function (req, res) {
		req.logout();
		res.end();
	});

	app.get('*', function (req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});

};