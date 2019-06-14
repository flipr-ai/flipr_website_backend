const courseSchema = require('../models/course.model');

    async function course_create(req, res) {

        let course = new courseSchema({

        courseid: req.body.courseid,
        coursename: req.body.coursename,
        duration: req.body.duration,
        price: req.body.price

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

module.exports = {
    course_Detail,
    course_create,
    course_data
};