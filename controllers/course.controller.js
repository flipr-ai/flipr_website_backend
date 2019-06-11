const courseSchema = require('../models/course.model');

async function courseDetail(req, res) {
    
    let course = new courseSchema({

        courseid: courseid,
        coursename: coursename,
        coursedesription: coursedesription,
        duration: duration,
        price: price

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

module.exports = {
    courseDetail
};