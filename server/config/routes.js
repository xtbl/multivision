var auth = require('./auth');

module.exports = function (app) {
	// app.get('/partials/:partialPath', function (req, res) {
	// 	console.log('server params: ' + req.params.partialPath);
	// 	res.render('partials/' + req.params.partialPath);
	// });

	app.get('*', function (req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function (req, res) {
		req.logout();
		res.end();
	});
};