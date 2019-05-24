const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userprofileSchema = new Schema({
	name : {type: String, max:50},
	password: {type: String},
	email : {type: String},
	contactno : {type: Number},
	course:{type:String},
	isverified: { type: Boolean, default: 0 }

});

// Exports the model
module.exports = mongoose.model('user', userprofileSchema);
