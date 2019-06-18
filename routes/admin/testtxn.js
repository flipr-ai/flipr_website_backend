var checksum = require('../../models/checksum');
var config = require('../../config/config');
var express = require('express');
var router = express.Router();

router.get('/testtxn', function (req, res) {
   res.render('testtxn.ejs', { 'config': config });
});

router.post('/testtxn', function (req, res) {
 
   var TXN_AMOUNT = req.body.TXN_AMOUNT;
   var CUST_ID = req.body.CUST_ID;
   var ORDER_ID=req.body.ORDER_ID;
   var paramarray = {

      ORDER_ID: ORDER_ID,
      CUST_ID: CUST_ID,
      INDUSTRY_TYPE_ID: config.INDUSTRY_TYPE_ID,
      CHANNEL_ID: config.CHANNEL_ID,
      TXN_AMOUNT: TXN_AMOUNT,
      MID: config.MID,
      WEBSITE: config.WEBSITE,
      //CALLBACK_URL: "https://dev.flipr.co.in/api/pgresponse/response" https://shielded-caverns-21112.herokuapp.com
      CALLBACK_URL: "https://shielded-caverns-21112.herokuapp.com/api/pgresponse/response"

   }

   const newbody = new Array();
   newbody['ORDER_ID'] = paramarray['ORDER_ID'];
   newbody['CUST_ID'] = paramarray['CUST_ID'];
   newbody['INDUSTRY_TYPE_ID'] = paramarray['INDUSTRY_TYPE_ID'];
   newbody['CHANNEL_ID'] = paramarray['CHANNEL_ID'];
   newbody['TXN_AMOUNT'] = paramarray['TXN_AMOUNT'];
   newbody['MID'] = paramarray['MID'];
   newbody['WEBSITE'] = paramarray['WEBSITE'];
   newbody['CALLBACK_URL'] = paramarray['CALLBACK_URL'];

   var PAYTM_MERCHANT_KEY = config.PAYTM_MERCHANT_KEY;
   //  console.log(newbody);
   //   newbody['CHECKSUMHASH'] = paramarray['CHECKSUMHASH'];
   checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result) {
      //   console.log("your are checking the result");
      //     console.log(result);
      res.json(result);
      //        res.render('pgredirect.ejs',{ 'restdata' : result });
   });
});

module.exports = router;