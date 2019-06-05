var express = require('express');
var router = express.Router();
var checksum = require('../../models/checksum');
var config = require('../../config/config');
//module.exports = function (router) {
router.post('/response', function (req, res) {
  // console.log("in response post");
  var paramlist = req.body;

  //var paramarray = new Array();
  console.log("parapmeter list");
  console.log(paramlist);
  if (checksum.verifychecksum(paramlist, config.PAYTM_MERCHANT_KEY)) {

    console.log("true");
    console.log(paramlist);
    res.render('response.ejs', { 'restdata': "true", 'paramlist': paramlist });
  } else {
    console.log("false");
    console.log(paramlist);
    res.render('response.ejs', { 'restdata': "false", 'paramlist': paramlist });
  };
  //vidisha
});
//};
module.exports = router;
