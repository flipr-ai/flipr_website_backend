const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({

    courseid:{type:Number},
    coursename:{type:String},
    price:{type:Number},
    duration:{type:String},
    customerid:{type:String},
    cart_date: { type: Date, default: Date.now},
    Status:{type:String,default:undefined},
    txnstatus:{type:String,default:undefined},

});

// Exports the model
module.exports = mongoose.model('order', orderSchema);
