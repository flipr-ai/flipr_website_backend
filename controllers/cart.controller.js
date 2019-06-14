const orderSchema = require('../models/order.model');

async function add_cart(req, res) {

	req.checkBody("courseid", "courseid is required").notEmpty();
	req.checkBody("coursename", "coursename is required").notEmpty();
	req.checkBody("duration", "courseid is required").notEmpty();
	req.checkBody("price","price is required").notEmpty();
	req.checkBody("customerid","customerid is required").notEmpty();


	const errors = req.validationErrors();
	if (errors) {
		res.status(400).json({
		"status": "400",
		"message": errors
	});
	} else {

		let cart = new orderSchema({

			courseid: req.body.courseid,
			coursename: req.body.coursename,
			duration: req.body.duration,
			price: req.body.price,
			customerid:req.body.customerid


		});
		cart.save(function (err,orderdata) {
			if(err)
			{
				res.status(400).json({
				"status":"400",
				"message": errors
				})
			}
			else
			{	
				res.status(200).json({
				"status":"200",
				"message": "add to cart successfully"
				})
			}
		})

	}

}


async function view_cart(req, res) {

	req.checkBody("customerid","customerid is required").notEmpty();
	const errors = req.validationErrors();
	if (errors) {
		res.status(400).json({
		"status": "400",
		"message": errors
	});
	} else {
		orderSchema.findOne({ customerid: req.body.customerid}, function (err, orderdata) {
        if (err) {
        		res.status(400).json({
				"status":"400",
				"message": errors
				});	
        }
        else
        {
        		res.status(200).json({
				"status":"200",
				"message": orderdata
				})
        }
	});
	}
}

async function remove_cart(req,res){

	req.body("customerid","customerid is required");
	req.body("courseid","courseid is required");
	
}

module.exports = {
  
	add_cart,
	view_cart,
	remove_cart,

};