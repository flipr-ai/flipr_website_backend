const express = require('express');
const router = express.Router();

// Require controler
const userRegistercontroller=require('../controllers/userRegister.controller');

router.post('/register', userRegistercontroller.user_create);

router.post('/sendotp', userRegistercontroller.sendotp);

router.put('/otpverification', userRegistercontroller.otp_verification);

router.post('/emailverify', userRegistercontroller.checkEmailExist);


module.exports=router;

