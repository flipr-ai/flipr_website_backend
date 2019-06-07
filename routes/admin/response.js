var express = require('express');
var router = express.Router();
var checksum = require('../../models/checksum');
var config = require('../../config/config');
//module.exports = function (router) {
router.post('/response', function (req, res) {
  // console.log("in response post");
  var paramlist = req.body;
  const newbody = new Array();
  newbody['ORDER_ID'] = req.body['ORDER_ID'];
  newbody['CUST_ID'] = req.body['CUST_ID'];
  newbody['MID'] = req.body['MID'];
  newbody['INDUSTRY_TYPE_ID'] = req.body['Retail'];
  newbody['CHANNEL_ID'] = req.body['CHANNEL_ID'];``
  newbody['TXN_AMOUNT'] = req.body['TXN_AMOUNT'];
  newbody['CHECKSUMHASH'] = req.body['CHECKSUMHASH'];
  newbody['CALLBACK_URL'] = req.body['CALLBACK_URL'];
  //var paramarray = new Array();
  console.log("parapmeter list");
  console.log(paramlist);
  console.log(newbody);
  if (checksum.verifychecksum(newbody, config.PAYTM_MERCHANT_KEY)) {

    console.log("true");
//    console.log(paramlist);
    res.render('response.ejs', { 'restdata': "true", 'paramlist': newbody });
  } else {
    console.log("false");
  //  console.log(paramlist);
    res.render('response.ejs', { 'restdata': "false", 'paramlist': newbody });
  };
});
//};
module.exports = router;
