var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/coachData', function(req, res, next) {


	var coachData = req.body.coachData;
	var imgFileName = 'coach_' + coachData.personalInfo.coachID;

	req.base64Img.img(coachData.personalInfo.img, './public/uploads/coach', imgFileName, function (err, filepath){

		req.db.coachs.insert({
			personalInfo: {
				coachID: coachData.personalInfo.coachID,
				coachName: coachData.personalInfo.coachName,
				coachPhone: coachData.personalInfo.coachPhone,
				coachEmail: coachData.personalInfo.coachEmail,
				sex: coachData.personalInfo.sex,
				dob: coachData.personalInfo.dob,
				address: coachData.personalInfo.address,
				img: filepath
			},
			lessonInfo: coachData.lessonInfo,
			opTime: coachData.opTime,
			members: coachData.members
		}, function (err, result){
			if(result){
				req.db.users.update({login: coachData.personalInfo.coachID},
					{"$set": {"initialSetup": true}});
				res.json(result);
			} else {
				console.log("INPUT ERROR === " + err);
			}
		});

	});

});





module.exports = router;
