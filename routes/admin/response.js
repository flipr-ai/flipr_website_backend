var express = require('express');
var router = express.Router();
var checksum = require('../../models/checksum');
var config = require('../../config/config');
var PaymentSchema = require('../../models/payment.model');
//var countSchema = require('../../models/count.model');
router.post('/response', function (req, res) {

  var paramlist = req.body;

  // const newbody = new Array();
  // newbody['ORDER_ID'] = req.body['ORDER_ID'];
  // newbody['CUST_ID'] = req.body['CUST_ID'];
  // newbody['INDUSTRY_TYPE_ID'] = req.body['INDUSTRY_TYPE_ID'];
  // newbody['CHANNEL_ID'] = req.body['CHANNEL_ID']; ``
  // newbody['TXN_AMOUNT'] = req.body['TXN_AMOUNT'];
  // newbody['MID'] = req.body['MID'];
  // newbody['WEBSITE'] = req.body['WEBSITE'];
  // newbody['CALLBACK_URL'] = req.body['CALLBACK_URL'];
  // newbody['CHECKSUMHASH'] = req.body['CHreq.body['ORDER_ID']ECKSUMHASH'];

  //var paramarray = new Array();
  var status = req.body.STATUS;
  // console.log(req.body.STATUS);

  let payment = new PaymentSchema(
    {
      ORDER_ID: req.body.ORDERID,
      CUST_ID: req.body.CUSTID,
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

    // let paymentdata = new PaymentSchema({
    //   // ORDER_ID: req.body['ORDER_ID'],
    //   // CUST_ID: req.body['CUST_ID'],
    //   // TXN_AMOUNT: req.body['TXN_AMOUNT'],
    //   // TXN_DATE: req.body['TXN_DATE'],
    //   // TXN_ID: req.body['TXN_ID'],
    //   // BANKNAME: req.body['BANKNAME'],
    //   // BANKTXNID: req.body['BANKTXNID'],
    //   // PAYMENTMODE: req.body['PAYMENTMODE'],
    //   STATUS: status,
    //   // RESPMSG: req.body['RESPMSG'],
    //   // RESPCODE: req.body['RESPCODE'],
    //   // GATEWAYNAME: req.body['GATEWAYNAME']
    // });
    // paymentdata.save(function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   else {
    //     console.log(data);
    //   }
    // });

    console.log("true");
    //    console.log(paramlist);

    if (status === "TXN_FAILURE") {

      res.redirect('https://fliprpayment.netlify.com/paytmfailure');
    }
    else {

      res.redirect('https://fliprpayment.netlify.com/paytmsuccess');
    }

    //  res.render('response.ejs', { 'restdata': "true", 'paramlist': paramlist });
  } else {
    console.log("false");
    res.redirect('https://fliprpayment.netlify.com/paytmfailure');
    // res.render('response.ejs', { 'restdata': "false", 'paramlist': paramlist });
  };
});

module.exports = router;

