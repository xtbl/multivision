var express = require('express'),
	stylus = require('stylus');

module.exports = function (app, config) {

	function compile (str, path) {
		return stylus(str).set('filename', path);
	}

	app.set('views', config.rootPath  + '/server/views');
	app.set('view engine', 'jade');

	var logErrors = function (err, req, res, next) {
	  console.error(err.stack);
	  next(err);
	};

	app.use(logErrors);
	//app.use(express.bodyParser());

	app.use(stylus.middleware(
		{
			src: config.rootPath + '/public',
			compile: compile
		}
	));

	app.use(express.static(config.rootPath + '/public'));

};