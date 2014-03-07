var express = require('express'),
	stylus = require('stylus'),
	mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile (str, path) {
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

var logErrors = function (err, req, res, next) {
  console.error(err.stack);
  next(err);
};

app.use(logErrors);
//app.use(express.bodyParser());

app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
));

app.use(express.static(__dirname + '/public'));

if (env === 'development') {
	mongoose.connect('mongodb://localhost/multivision');
} else {
	mongoose.connect('mongodb://xtbl:MULTIV@ds033709.mongolab.com:33709/multiv');	
}

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

var testMessage = "test data from server object";

// app.get('/partials/:partialPath', function (req, res) {
// 	console.log('server params: ' + req.params.partialPath);
// 	res.render('partials/' + req.params.partialPath);
// });

app.get('*', function (req, res) {
	res.render('index', {
		mongoMessage: mongoMessage,
		testMessage: testMessage
	});
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port + '...');