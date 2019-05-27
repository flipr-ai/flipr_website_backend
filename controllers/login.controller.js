var bodyParser = require('body-parser');
const userRegisterSchema = require('../models/userRegister.model');

exports.login = function (req, res) {
    var email= req.body.email;
    var password= req.body.password;
    
    userRegisterSchema.findOne({email: email, password:password, isverified:true },function(err, user) {
        if(err)
        {
            console.log(err)
        }
        if(!user){
            return res.status(404).json({
                "status": "404",
                "message": "crediantials are worng or you are not verified"
            });
        }
        return res.status(200).json({
            "status": "200",
            "message": "login successfully"
        });
     
    });
};