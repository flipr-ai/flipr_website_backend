const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* This model is uesd to add the course schema */ 
let courseSchema = new Schema({
    
    courseid:{type:Number},
    coursename:{type:String},
    courselist:{type:Array},
    duration:{type:String},
    price:{type:Number}

});

// Exports the model
module.exports = mongoose.model('course', courseSchema);
