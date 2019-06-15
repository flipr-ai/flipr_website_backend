const express = require('express');
const router = express.Router();

// Require controler
const coursecontroller=require('../controllers/course.controller');

router.post('/coursedetail', coursecontroller.course_Detail)

router.post('/create', coursecontroller.course_create)

router.get('/getcoursedetail', coursecontroller.course_data)

router.post('/getcourselist', coursecontroller.course_list)

module.exports=router;

