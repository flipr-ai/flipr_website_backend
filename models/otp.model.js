const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let otpSchema = new Schema({
	otp :{type: Number},

});

// Exports the model
module.exports = mongoose.model('otp', otpSchema);
