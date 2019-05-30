var bodyParser = require('body-parser');
const userRegisterSchema = require('../models/userRegister.model');
const Bcrypt = require("bcryptjs");

exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    userRegisterSchema.findOne({ email: email, isverified: true }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (!user) {
            return res.status(404).json({
                "status": "404",
                "message": "crediantials are worng or you are not verified"
            });
        }
        if (!Bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                "status": "400",
                "message": "The password is invalid"
            });
        }
        return res.status(200).json({
            "status": "200",
            "message": "login successfully"
        });
    });
};