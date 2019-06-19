const express = require('express');
const router = express.Router();

// Require controler
const coursecontroller=require('../controllers/course.controller');

// This  route will used for course detail
router.post('/coursedetail', coursecontroller.course_Detail)

// This route will create the course 
router.post('/create', coursecontroller.course_create)

// This route will get course detail

router.get('/getcoursedetail', coursecontroller.course_data)

// This route will get course list 
router.post('/getcourselist', coursecontroller.course_list)


module.exports=router;

