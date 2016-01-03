var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/userData', function(req, res, next) {
	var userID = req.body.userID
	req.db.users.findOne({"login": userID}, function (err, data){
		res.json(data);
	});
});

router.post('/coachData', function(req, res, next) {
	var userID = req.body.userID
	req.db.coachs.findOne({"personalInfo.coachID": userID}, function (err, data){
		res.json(data);
	});
});



module.exports = router;
