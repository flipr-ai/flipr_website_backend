const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* This schema will store the payment data */
let PaymentSchema = new Schema({

    ORDER_ID:{type:String},
    CUST_ID:{type:String},
    TXN_AMOUNT:{type:Number},
    TXN_DATE:{type:String},
    TXN_ID:{type:String},
    BANKNAME:{type:String},
    BANKTXNID:{type:Number},
    PAYMENTMODE:{type:String},
    STATUS:{type:String},
    RESPMSG:{type:String},
    RESPCODE:{type:Number},
    GATEWAYNAME:{type:String}
    
});

// Exports the model
module.exports = mongoose.model('Payment', PaymentSchema);
