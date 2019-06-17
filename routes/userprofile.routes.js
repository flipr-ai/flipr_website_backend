const express = require('express');
const router = express.Router();

// Require controler
const userprofilecontroller=require('../controllers/userprofile.controller');

// This route will create userprofile 
router.post('/create', userprofilecontroller.user_create)

// This route will get userdata 
router.get('/userdata', userprofilecontroller.profile_deatail)

module.exports=router;

