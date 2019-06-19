const userRegisterSchema = require('../models/userRegister.model');
const otpSchema = require('../models/otp.model');
var request = require("request");
const Bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var config = require('../config/config');
var crypto = require('crypto');

/**
 * This method is used to send otp  
 * 
 * @param {JSON} contactno contactno is require
 *  @returns {JSON} 200,400
 */
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

/**
* This method is used to checkEmail is exits or not. 
* 
* @param {JSON} email email  require
*  @returns {JSON} 200,400
*/
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

/**
* This funcation will check for the email exits or not in database  
* 
* @param {JSON} email email  require
*  @returns {Boolean} null,true
*/
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
}

/**
* This method is used  to create user 
* 
* @param {JSON} name name  require
* @param {JSON} password password require
* @param {JSON} email email require
* @param {JSON} contactno contactno require
*  @returns {JSON} 200,400
*/
async function user_create(req, res) {

    req.checkBody("name", "name is required").notEmpty();
    req.checkBody("password", "password is required").notEmpty();
    req.checkBody("email", "email is required").notEmpty();
    req.checkBody("contactno", "contactno is required").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.status(400).json({
            "status": "400",
            "message": errors
        });
    }
    else {

        emailExist = await checkemailexist(req.body.email);
        if (emailExist === null) {
            res.status(403).json({
                "status": "403",
                "data": "email is exist already"
            });
        }
        else {
            var password = Bcrypt.hashSync(req.body.password, 10);

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
                        "data": userdata
                    });
                }
            });
        }
    }
}

/**
* This method is used to verify otp 
* 
* @param {JSON} otp otp  require
*  @returns {JSON} 200,400
*/

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

async function forgotPassword(req, res) {
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
    console.error(req.body.email);
    userRegisterSchema.findOne({ email: req.body.email }).then(function (user) {
        if (user === null) {
            console.error('email not in database');
            res.status(403).send('email not in db');
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            userRegisterSchema.findOneAndUpdate({ email: req.body.email }, { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 360000, } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                else
                {
                    res.status(200).json({
                        "status": "200",
                        "message": doc
                    });
                }
                console.log("updated");
                //        console.log(doc);
            });
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "kishan@flipr.ai", // generated ethereal user
                    pass: "Kishan@123" // generated ethereal password
                },
            });

            const mailOptions = {
                from: 'kishan@flipr.ai',
                to: req.body.email,
                subject: 'Link To Reset Password From Flipr',
                text:
                    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                    + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                    + `https://fliprpayment.netlify.com/setPassword/${token}\n\n`
                    + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };

            console.log('sending mail');

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('there was an error: ', err);
                } else {
                    console.log('here is the res: ', response);
                    res.status(200).json('email sent');
                }
            });
        }
    });
};

// app.get('/reset', (req, res) => {
async function reset(req, res) {    

    User.findOne({resetPasswordToken: req.body.resetPasswordToken},(err, user) => {
      if (user == null) {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else {
        res.status(200).send({
          username: user,
          message: 'password reset link a-ok',
        });
      }
    });
    }
 // });

async function updatePassword(req, res) {
    
    userRegisterSchema.findOne({ email: req.body.email, resetPasswordToken:req.body.resetPasswordToken }, function (err, user) {
    // userRegisterSchema.find({
    //     email: req.body.email,
    //     resetPasswordToken: req.body.resetPasswordToken,
    //     // resetPasswordExpires: {
    //     //     [Op.gt]: Date.now(),
    //     // },
    //     //   },
    // }).then(user => {
    //     console.log(user);
        if (user == null) {
            console.error('password reset link is invalid or has expired');
            res.status(403).send('password reset link is invalid or has expired');
        } else if (user != null) {
            console.log('user exists in db');
            // bcrypt
            //   .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            //   .then(hashedPassword => {
            var password = Bcrypt.hashSync(req.body.password, 10);
            userRegisterSchema.findOneAndUpdate({ email: req.body.email }, { $set: { password: password, resetPasswordToken: null, resetPasswordExpires: null } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log(err);
                }
                res.status(200).send({ message: 'password updated' });
            });
        } else {
            console.error('no user exists in db to update');
            res.status(401).json('no user exists in db to update');
        }
    });
};


module.exports = {
    user_create,
    checkEmailExist,
    checkemailexist,
    sendotp,
    otp_verification,
    forgotPassword,
    updatePassword,
    reset

};
