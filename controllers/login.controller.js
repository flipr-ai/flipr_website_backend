var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var MongoClient = require('mongodb').MongoClient;
const userprofileSchema = require('../models/user.model');

exports.login = function (req, res) {
    let name,password;
    userprofileSchema.findMany({ name: req.body.name,password: req.body.password }, function (err, user) {
         if(user.name === req.body.name && user.password === req.body.password) {
            res.send('login successfully');
        } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
        }
    });
};