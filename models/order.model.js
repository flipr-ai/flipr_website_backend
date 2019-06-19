const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({


    courseid:{type:Number},
    coursename:{type:String},
    cart_date: { type: Date, default: Date.now},
    price:{type:Number},
    duration:{type:String},
    customerid:{type:String},
    count:{type:Number},
    Status:{type:String,default:"incart"},
    txnstatus:{type:String,default:null},

});

// Exports the model
module.exports = mongoose.model('order', orderSchema);
