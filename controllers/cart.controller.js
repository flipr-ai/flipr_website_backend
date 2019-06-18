/**
 * order schema which will store order data 
 * 
 * @param {JSON} coursename coursename require
 * @param {JSON} courseid courseid require
 * @param {JSON} duration duration require
 * @param {JSON} price price require
 * @param {JSON} customerid coustomerid  require
 *  @returns {JSON} 200,400
 */

const orderSchema = require('../models/order.model');

async function add_cart(req, res) {

	req.checkBody("courseid", "courseid is required").notEmpty();
	req.checkBody("coursename", "coursename is required").notEmpty();
	req.checkBody("duration", "duration is required").notEmpty();
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
				"message": orderdata
				})
			}
		})

	}

}

/**
 * This method is used to  view_cart  data  
 * 
 * @param {JSON} customerid coustomerid  require
 *  @returns {JSON} 200,400
 */


async function view_cart(req, res) {

	req.checkBody("customerid","customerid is required").notEmpty();
	const errors = req.validationErrors();
	if (errors) {
		res.status(400).json({
		"status": "400",
		"message": errors
	});
	} else {
		orderSchema.findOne({ customerid: req.body.customerid, Status:"incart"}, function (err, orderdata) {
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

/**
 *  this method is used to remove data from cart 
 * 
 * @param {JSON} courseid courseid require
 * @param {JSON} customerid coustomerid  require
 *  @returns {JSON} 200,400
 */
async function remove_cart(req,res){

	req.body("customerid","customerid is required");
	req.body("courseid","courseid is required");
	
}

async function ordered_cart(req, res) {

	req.checkBody("customerid","customerid is required").notEmpty();
	const errors = req.validationErrors();
	if (errors) {
		res.status(400).json({
		"status": "400",
		"message": errors
	});
	} else {
		orderSchema.find({ customerid: req.body.customerid,txnstatus:"TXN_SUCCESS"}, function (err, orderdata) {
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


module.exports = {
  
	add_cart,
	view_cart,
	remove_cart,
	ordered_cart
};