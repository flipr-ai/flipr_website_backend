const express = require('express');
const router = express.Router();
const userprofileSchema = require('../models/user.model');

// Require controler
const logincontroller=require('../controllers/login.controller');

router.get('/login',logincontroller.login);



module.exports=router;