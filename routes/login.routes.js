const express = require('express');
const router = express.Router();
//const userprofileSchema = require('../models/user.model');

// Require controler
const logincontroller=require('../controllers/login.controller');

router.post('/login',logincontroller.login);

router.get('/logout',logincontroller.logout);

module.exports=router;
