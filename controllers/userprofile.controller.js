const userprofileSchema = require('../models/user.model');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
	res.send('Greetings from the Test controller!');
};

async function checkEmailExist(email){
	return new Promise((resolve) => {
		userprofileSchema.findOne({ email: email }).then(function (result) {
		if(result !==null){
			 resolve(null);
			} else {
				resolve(true);
			}			
		});
	});
}

async function user_create(req, res) {

	let userprofile = new userprofileSchema(
		{
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			contactno: req.body.contactno,
			course: req.body.course
		});
	
	emailExist = await checkEmailExist(req.body.email);
	if (emailExist === null || emailExist !== true) {
		res.status(403).json({
			"status": "403",
			"data": "email is exist already"
		});
	} else {
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
	
		})
	}	
}

exports.profile_deatail = function (req, res) {
	userprofileSchema.findById(req.params.id, function (err, userdata) {
		if (err) throw err;
		console.log(userdata)
		res.send(userdata);
	})
};

module.exports = {
	user_create,
	checkEmailExist
};