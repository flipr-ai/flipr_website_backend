const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({

    orderid:{type:Number},
    courseid:{type:Number},
    cousesename:{type:String},
    customerid:{type:Number},

});

// Exports the model
module.exports = mongoose.model('order', orderSchema);
