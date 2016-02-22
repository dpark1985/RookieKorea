var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	console.log('================');

	req.db.getCollectionNames(function (err, data){
		console.log(data);
	});

	console.log('================');

	var collection = req.db.collection('users');
	//console.log(collection);

	collection.find({}, function (err, data){
		//console.log(data);
		res.render('index', { title: 'Express', users: JSON.stringify(data) });
	});


/*
	req.db.users.find({}, function (err, data){
		//console.log(data);
		//res.render('index', { title: 'Express', users: JSON.stringify(data) });
	});
*/
	
});

router.post('/changePW', function(req, res, next) {

	console.log(req.body);

	req.db.users.update({"login": req.body.userID}, 
		{ "$set": {"password" : req.body.newPW}}, function (err, data){
			res.json(data);
		})



	
});


module.exports = router;
