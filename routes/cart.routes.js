const express = require('express');
const router = express.Router();

// Require controler
const cartcontroller=require('../controllers/cart.controller');

// This route is used to add to cart 
router.post('/addcart', cartcontroller.add_cart)

// This route will be used to viewcart

router.post('/viewcart', cartcontroller.view_cart)

// This route will be used to show payment 
router.post('/ordered_cart', cartcontroller.ordered_cart)

module.exports=router;