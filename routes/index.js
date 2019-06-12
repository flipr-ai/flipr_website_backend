var express = require('express');
var router = express.Router();
var counter = require('../models/count.model');


/* GET home page. */
router.get('/', function(req, res, next) {
     res.json({
    "status": "200",
    "msg": "welcome to Flipr BackEnd"
  });
});

router.get('/course',function(req,res){

  let count = new counter(
    {
        count: 1000
    });

count.save(function (err, userdata) {
    if (err) {
        console.log(err);
    }
    else {
      res.json({
        "status": "200",
        "msg": "count save"
    });
  }
  
});

});

module.exports = router;
