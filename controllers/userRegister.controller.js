const userRegisterSchema = require('../models/userRegister.model');
var request = require("request");

async function checkEmailExist(email) {
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

async function user_create(req, res) {

    var otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp); 
    let userRegister = new userRegisterSchema(
        {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            contactno: req.body.contactno,
            otp: otp
        });

    emailExist = await checkEmailExist(req.body.email);
    if (emailExist === null || emailExist !== true) {
        res.status(403).json({
            "status": "403",
            "data": "email is exist already"
        });
    } else {

        var options = {
            method: 'POST',
            url: 'https://60c547a1a04a8667329064a82f8f7cb6a33402d2369f473a:4bad7f591c1be1c81859f709acd8bc2c8695af0486a39a6d@api.exotel.com/v1/Accounts/20one/Sms/send.json',

            form:
            {
                From: '08047104918',
                To: req.body.contactno,
                Body: 'This is a test message being sent using Exotel with a (Flipr) and (' + otp + '). If this is being abused, report to 08088919888'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log("opt send to the number");
            // console.log(body);
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
                    "data": "Data Added Successfully"
                });
            }

        })
    }
}

async function otp_verification(req, res) {

    userRegisterSchema.findOne({ otp: req.body.otp }).then(function (result) {
        if (result === null) {
            res.status(400).json({
                "status": "400",
                "message": "invalid Data"
            });
        } else {                                                  
               userRegisterSchema.findOneAndUpdate({otp:req.body.otp},{$set:{isverified:true}}, function(err, doc){
                if (err) return res.send(500, { error: err });
                else{
                    res.status(200).json({
                        "status": "200",
                        "message": "verified successfully"
                    });
                }
 
        }
        )};

    });

}


module.exports = {
    user_create,
    checkEmailExist,
    otp_verification
};
