const userprofileSchema = require('../models/user.model');

/**
 * This method is used to  create user Profile 
 * 
 * @param {JSON} name name is required
 * @param {JSON} email email is required
 * @param {JSON} contactno contactno is required
 * @param {JSON} course course is require
 *  @returns {JSON} 200,400
 */
async function user_create(req, res) {

	let userprofile = new userprofileSchema(
		{
			name: req.body.name,
			email: req.body.email,
			contactno: req.body.contactno,
			course: req.body.course
		});
	userprofile.save(function (err, userdata) {
		if (err) {
			res.status(400).json({
				"status": "400",
				"message": error
			});
		}
		else {
			res.status(200).json({
				"status": "200",
				"data": userdata
			});
		}

	});
}

/**
 * This method is used to get Profile Details 
 * 
 *  @returns {JSON} 200,400
 */
async function profile_deatail(req, res) {
	userprofileSchema.find({}, function (err, userdata) {
		if (err) {
			res.status(400).json({
				"status": "400",
				"message": error
			});
		}
		else {
			res.status(200).json({
				"status": "200",
				"data": userdata
			});
		}
	})
};

module.exports = {
	user_create,
	profile_deatail
};