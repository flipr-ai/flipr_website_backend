const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* This model is used for the otpschema*/
let otpSchema = new Schema({
	otp :{type: Number},

});

// Exports the model
module.exports = mongoose.model('otp', otpSchema);
