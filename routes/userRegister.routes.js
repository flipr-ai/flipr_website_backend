const express = require('express');
const router = express.Router();

// Require controler
const userRegistercontroller=require('../controllers/userRegister.controller');

// This route is used for  register  
router.post('/register', userRegistercontroller.user_create);
// This route is used to sendopt 
router.post('/sendotp', userRegistercontroller.sendotp);
// This route is used to otpverification
router.put('/otpverification', userRegistercontroller.otp_verification);
// This route is used to email verify
router.post('/emailverify', userRegistercontroller.checkEmailExist);

// forgot password

router.post('/forgotPassword',userRegistercontroller.forgotPassword);

//router.get('/reset', userRegistercontroller.reset);

router.put('/updatePassword', userRegistercontroller.updatePassword);


module.exports=router;

