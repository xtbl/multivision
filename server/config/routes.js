var auth = require('./auth'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	users = require('../controllers/users')

module.exports = function (app) {
	// app.get('/partials/:partialPath', function (req, res) {
	// 	console.log('server params: ' + req.params.partialPath);
	// 	res.render('partials/' + req.params.partialPath);
	// });

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

	app.post('/api/users', users.createUser);

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