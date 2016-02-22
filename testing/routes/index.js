var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	req.db.users.find({}, function (err, data){
		//console.log(data);
		res.render('index', { title: 'Express', users: JSON.stringify(data) });
	});

	
});

router.post('/changePW', function(req, res, next) {

	console.log(req.body);

	req.db.users.update({"login": req.body.userID}, 
		{ "$set": {"password" : req.body.newPW}}, function (err, data){
			res.json(data);
		})



	
});


module.exports = router;
