const express = require('express');
const router = express.Router();
const VerifyToken = require('../controllers/verifytoken');

// Require controler
const coursecontroller=require('../controllers/course.controller');

// This  route will used for course detail
router.post('/coursedetail',/*VerifyToken,*/ coursecontroller.course_Detail)

// This route will create the course 
router.post('/create',/*VerifyToken,*/ coursecontroller.course_create)

// This route will get course detail

router.get('/getcoursedetail',/*VerifyToken,*/ coursecontroller.course_data)

// This route will get course list 
router.post('/getcourselist',/*VerifyToken,*/ coursecontroller.course_list)


module.exports=router;
