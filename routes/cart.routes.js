const express = require('express');
const router = express.Router();

// Require controler
const cartcontroller=require('../controllers/cart.controller');

router.post('/addcart', cartcontroller.add_cart)

router.post('/viewcart', cartcontroller.view_cart)

module.exports=router;