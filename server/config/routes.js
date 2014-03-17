var auth = require('./auth'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Course = mongoose.model('Course'),
	users = require('../controllers/users'),
    courses = require('../controllers/courses');

module.exports = function (app) {
	// app.get('/partials/:partialPath', function (req, res) {
	// 	console.log('server params: ' + req.params.partialPath);
	// 	res.render('partials/' + req.params.partialPath);
	// });

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

	app.post('/api/users', users.createUser);

	app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);

	app.post('/login', auth.authenticate);

	app.post('/logout', function (req, res) {
		req.logout();
		res.end();
	});

    app.all('/api/*', function (req, res) {
        res.send(404);
    });

	app.get('*', function (req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});

};