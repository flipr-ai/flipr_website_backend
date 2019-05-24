const userprofileSchema = require('../models/user.model');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
	res.send('Greetings from the Test controller!');
};

exports.user_create = function (req, res) {

	let userprofile = new userprofileSchema(
		{
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			contactno: req.body.contactno,
			course:req.body.course
		});

	userprofile.save(function (err,userdata) {
		if (err){
			res.status(400).json({
				"status": "400",
				"message": error
			  });
		}
		else{
			res.status(200).json({
				"status": "USER CREATED SUCCESSFULLY",
				"data": userdata
			  });
		}
		
	})
}

exports.profile_deatail = function (req, res) {
	userprofileSchema.findById(req.params.id, function (err, userdata) {
		if (err) throw err;
		console.log(userdata)
		res.send(userdata);
	})
};