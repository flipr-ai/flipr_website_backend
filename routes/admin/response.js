var express = require('express');
var router = express.Router();
var checksum = require('../../models/checksum');
var config = require('../../config/config');
var PaymentSchema = require('../../models/payment.model');
const orderSchema = require('../../models/order.model');
router.post('/response', function (req, res) {

  var paramlist = req.body;
console.log("inside the response printing the paramlist");
  console.log(paramlist);
  var status = req.body.STATUS;
  let payment = new PaymentSchema(
    {
      ORDER_ID: req.body.ORDERID,
      TXN_AMOUNT: req.body.TXNAMOUNT,
      TXN_DATE: req.body.TXN_DATE,
      TXN_ID: req.body.TXNID,
      BANKNAME: req.body.BANKNAME,
      BANKTXNID: req.body.BANKTXNID,
      PAYMENTMODE: req.body.PAYMENTMODE,
      STATUS: req.body.STATUS,
      RESPMSG: req.body.RESPMSG,
      RESPCODE: req.body.RESPCODE,
      GATEWAYNAME: req.body.GATEWAYNAME

    });
  payment.save(function (err, userdata) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(userdata);
    }

  });

  if (checksum.verifychecksum(paramlist, config.PAYTM_MERCHANT_KEY)) {

    orderSchema.findOneAndUpdate({_id:req.body.ORDERID},{$set:{txnstatus:req.body.STATUS,Status:req.body.RESPMSG}},{new:true},function(err,doc){

        if(err)
        {
          console.log(err)
        }
        else{
          console.log(" updated sucessfully");

        }


      });
    console.log("true");
    //    console.log(paramlist);

    if (status === "TXN_FAILURE") {
      orderSchema.findOneAndUpdate({_id:req.body.ORDERID},{$set:{txnstatus:req.body.STATUS,Status:req.body.RESPMSG}},{new:true},function(err,doc){

        if(err)
        {
          console.log(err)
        }
        else{
          console.log(" updated sucessfully");

        }
      });
      res.redirect('https://fliprtest.netlify.com/paytmfailure');
    }
    else {

      orderSchema.findOneAndUpdate({_id:req.body.ORDERID},{$set:{txnstatus:req.body.STATUS,Status:req.body.RESPMSG}},{new:true},function(err,doc){

        if(err)
        {
          console.log(err)
        }
        else{
          console.log(" updated sucessfully");

        }
      });
      res.redirect('https://fliprtest.netlify.com/paytmsuccess');
    }
    //  res.render('response.ejs', { 'restdata': "true", 'paramlist': paramlist });
  } else {
    console.log("false");
    res.redirect('https://fliprtest.netlify.com/paytmfailure');
    // res.render('response.ejs', { 'restdata': "false", 'paramlist': paramlist });
  };
});

module.exports = router;

