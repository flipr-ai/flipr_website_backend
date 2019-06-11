const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema = new Schema({
    
    courseid:{type:Number},
    coursename:{type:String},
    coursedesription:{type:String},
    duration:{type:String},
    Price:{type:Number}

});

// Exports the model
module.exports = mongoose.model('course', courseSchema);