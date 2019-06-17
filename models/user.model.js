const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*This schema will store the usermodel */ 
let userprofileSchema = new Schema({
	name : {type: String, max:50},
	email : {type: String},
	contactno : {type: Number},
	course:{type:String}

});

// Exports the model
module.exports = mongoose.model('user', userprofileSchema);
