const userRegisterSchema = require('../models/userRegister.model');
const otpSchema = require('../models/otp.model');
var request = require("request");
const Bcrypt = require("bcryptjs");

async function sendotp(req, res) {

    let otp = Math.floor(1000 + Math.random() * 9000);
    let otps = new otpSchema(
        {
            otp: otp
        });
    otps.save(function (err, userdata) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("success fully added");
        }
    });
    var options = {
        method: 'POST',
        url: 'https://60c547a1a04a8667329064a82f8f7cb6a33402d2369f473a:4bad7f591c1be1c81859f709acd8bc2c8695af0486a39a6d@api.exotel.com/v1/Accounts/20one/Sms/send.json',

        form:
        {
            From: '08047104918',
            To: req.body.contactno,
            Body: 'One Time Password to set your account password is ' + otp + '. - flipr Rewards Team'
        }
    };

    request(options, function (error, response, body) {
        if (error) {
            res.status(400).json({
                "status": "400",
                data: error
            });
        } else {
            res.status(200).json({
                "status": "200",
                "data": "otp send successfully"
            });
        }
    });
}

async function checkEmailExist(req, res) {

    req.checkBody("email", "Email is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.status(400).json({
            "status": "400",
            "message": errors
        });
    } else {
        emailExist = await checkemailexist(req.body.email);
        if (emailExist === null) {
            res.status(403).json({
                "status": "403",
                "data": "email is exist already"
            });
        }
        else {
            res.status(200).json({
                "status": "200",
                "data": "you can use this email"
            });
        }
    }
}

async function checkemailexist(email) {
    return new Promise((resolve) => {

        userRegisterSchema.findOne({ email: email }).then(function (result) {
            if (result !== null) {
                resolve(null);
            } else {
                resolve(true);
            }

        });
    });
    //}
}
async function user_create(req, res) {

    req.checkBody("name", "name is required").notEmpty();
    req.checkBody("password", "password is required").notEmpty();
    req.checkBody("email", "email is required").notEmpty();
    req.checkBody("contactno", "contactno is required").notEmpty();

    var password = Bcrypt.hashSync(req.body.password, 10);

    emailExist = await checkemailexist(req.body.email);
    if (emailExist === null) {
        res.status(403).json({
            "status": "403",
            "data": "email is exist already"
        });
    }
    else {
        const errors = req.validationErrors();
        if (errors) {
            res.status(400).json({
                "status": "400",
                "message": errors
            });
        } else {

            let userRegister = new userRegisterSchema(
                {
                    name: req.body.name,
                    password: password,
                    email: req.body.email,
                    contactno: req.body.contactno,
                    creation_date: Date.now(),
                });
            userRegister.save(function (err, userdata) {
                if (err) {
                    res.status(400).json({
                        "status": "400",
                        "message": error
                    });
                }
                else {
                    res.status(200).json({
                        "status": "200",
                        "data": userdata._id
                    });
                }
            });
        }
    }
}

async function otp_verification(req, res) {

    otpSchema.findOne({ otp: req.body.otp }).then(function (result) {
        if (result === null) {
            res.status(400).json({
                "status": "400",
                "message": "invalid Data"
            });
        } else {
            otpSchema.deleteOne({ otp: req.body.otp }, function (err) {
                if (err) {
                    console.log("deleted");
                }
            });
            res.status(200).json({
                "status": "200",
                "message": "verified successfully"
            });
        }
    });
}

module.exports = {
    user_create,
    checkEmailExist,
    checkemailexist,
    sendotp,
    otp_verification
};
