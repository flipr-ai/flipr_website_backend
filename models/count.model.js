const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let countSchema = new Schema({
	count :{type: Number},

});

// Exports the model
module.exports = mongoose.model('count', countSchema);
