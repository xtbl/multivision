var Course = require('mongoose').model('Course');

exports.getCourses = function (req, res) {
    Course.find({}).exec(function (error, collection) {
        res.send(collection);
    });
};
