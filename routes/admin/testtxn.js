var checksum = require('../../models/checksum');
var config = require('../../config/config');
var express = require('express');
var router = express.Router();

   router.get('/testtxn', function (req, res) {
      //  console.log("in restaurant");
      //console.log("--------testtxnjs----");
      res.render('testtxn.ejs', { 'config': config });
   });


   router.post('/testtxn', function (req, res) {
      //   console.log("POST Order start");
      //     var paramlist = req.body;
      var paramarray = {
         orderId: "kishan871",
         customerid: "kishan",
         //"PAYTM_PROD_URL":"https://secure.paytm.in",
         MID: "FGPTNq64340845674739",
         CHANNEL_ID: "WEB",
         PAYTM_MERCHANT_KEY:"CB5PFWVY5#TirERS",

      };
      var PAYTM_MERCHANT_KEY = "CB5PFWVY5#TirERS";
      // var paramarray = new Array();
      // //   console.log(paramlist);
      // for (name in paramlist) {
      //    if (name == 'PAYTM_MERCHANT_KEY') {
      //       var PAYTM_MERCHANT_KEY = paramlist[name];
      //    } else {
      //       paramarray[name] = paramlist[name];
      //    }
      // }
      //    console.log(paramarray);
      paramarray['CALLBACK_URL'] = 'http://localhost:3000/response';  // in case if you want to send callback
      //       console.log(PAYTM_MERCHANT_KEY);
      checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result) {
         //        console.log(result);
         res.json({
            "status": "200",
            "data": result,
         });

         //      res.render('pgredirect.ejs',{ 'restdata' : result });
      });

      //     console.log("POST Order end");

   });

module.exports = router;
