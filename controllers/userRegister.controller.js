const userRegisterSchema = require('../models/userRegister.model');
const otpSchema = require('../models/otp.model');
var request = require("request");
const Bcrypt = require("bcryptjs");

// async function checkEmailExist(email) {
//     return new Promise((resolve) => {
//         userRegisterSchema.findOne({ email: email }).then(function (result) {
//             if (result !== null) {
//                 resolve(null);
//             } else {
//                 resolve(true);
//             }
//         });
//     });
// }

async function sendotp(req, res){

    let otp = Math.floor(1000 + Math.random() * 9000);
    let otps = new otpSchema(
        {
           otp: otp
        });
        otps.save(function (err, userdata) {
            if(err)
            {
                console.log(err);

            }
            else{
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
            Body:'' + otp + ' is your one time password to verify on Flipr. Do not share your OTP with anyone.'
        }
    };

    request(options, function (error, response, body) {
        if (error)
        {
            res.status(400).json({
                "status": "400",
                data: error
            });
        }else
        {
               res.status(200).json({
                "status": "200",
                "data": "otp send successfully"
            });
        }
    });

}


async function checkEmailExist(req, res){

    userRegisterSchema.findOne({ email: req.body.email }).then(function (result) {
        if(result!==null)
        {
            res.status(403).json({
                "status": "403",
                "data": "email is exist already"
            });
        }else
        {
            res.status(200).json({
                "status": "200",
                "data": "you can use email"
            });
        }
 
    });
}


async function user_create(req, res) {

    var password = Bcrypt.hashSync(req.body.password, 10);

    //    var otp = Math.floor(1000 + Math.random() * 9000);
  //  console.log(otp);
    let userRegister = new userRegisterSchema(
        {
            name: req.body.name,
            password: password,
            email: req.body.email,
            contactno: req.body.contactno,
            //   otp: otp
        });

    // emailExist = await checkEmailExist(req.body.email);
    // if (emailExist === null || emailExist !== true) {
    //     res.status(403).json({
    //         "status": "403",
    //         "data": "email is exist already"
    //     });
    // } else {


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
                "data": "Data Added Successfully"
            });
        }

    });
}

async function otp_verification(req, res) {

    otpSchema.findOne({ otp: req.body.otp }).then(function (result) {
        if (result === null) {
            res.status(400).json({
                "status": "400",
                "message": "invalid Data"
            });
        } else {

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
    sendotp,
    otp_verification
};
