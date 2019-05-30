const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userRegisterSchema = new Schema({
	name : {type: String, max:50},
	password: {type: String},
	email : {type: String},
	contactno : {type: Number},
	isverified: { type: Boolean, default: 1 }

});

// Exports the model
module.exports = mongoose.model('userRegister', userRegisterSchema);
