const express = require('express');
const router = express.Router();

// Require controler
const userprofilecontroller=require('../controllers/userprofile.controller');

router.post('/create', userprofilecontroller.user_create)

//router.get('/:id', userprofilecontroller.profile_deatail)

module.exports=router;

