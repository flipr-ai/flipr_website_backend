/**
 * This method is used to create course 
 * 
 * @param {JSON} coursename coursename require
 * @param {JSON} courseid courseid require
 * @param {JSON} duration duration require
 * @param {JSON} price price require
 * @param {JSON} courselist courselist require
 *  @returns {JSON} 200 sucess,400 erorr
 *   */
const courseSchema = require('../models/course.model');

    async function course_create(req, res) {

        let course = new courseSchema({

        courseid: req.body.courseid,
        coursename: req.body.coursename,
        duration: req.body.duration,
        price: req.body.price,
        courselist:req.body.courselist
    });
    course.save(function (err, course) {
        if (err) {
        res.status(400).json({
        "status": "400",
        data: error
        });
    }
    else {
        res.status(200).json({
        "status": "200",
        data: course
        });
    }

    });

    }

    /**
 * This method is used to find all courses  
 * 
 *  @returns {JSON} 200,400
 */

async function course_data(req,res){

    courseSchema.find({}, function(err,coursedata){
    if(err)
    {
        res.status(400).json({
        "status": "400",
        data: error
    });
    }
    else
    {
        res.status(200).json({
        "status": "200",
        data: coursedata
    });
    }

    });

}

/**
 * This method is used to get course detail  
 * 
 * @param {JSON} courseid courseid require
 *  @returns {JSON} 200,400
 */

async function course_Detail(req,res){
    console.log(req.body.courseid);
    courseSchema.find({courseid:req.body.courseid}, function(err,coursedata){
    if(err)
    {
        res.status(400).json({
        "status": "400",
        data: error
        });
    }
    else
    {
        res.status(200).json({
        "status": "200",
        data: coursedata
        });
    }

    });
}

/**
 * This method is used to get  course list 
 * 
 * @param {JSON} courseid courseid require
 *  @returns {JSON} 200,400
 */

async function course_list(req,res){

    courseSchema.find({courseid:req.body.courseid}, function(err,coursedata){
    if(err)
    {
        res.status(400).json({
        "status": "400",
        data: error
        });
    }
    else
    {
       console.log(coursedata.courselist);
        res.status(200).json({
        "status": "200",
        data: coursedata

        });
    }

    });
}



module.exports = {
    course_Detail,
    course_create,
    course_list,
    course_data
};