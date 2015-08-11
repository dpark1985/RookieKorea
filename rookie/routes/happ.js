var express = require('express');
var router = express.Router();


router.get('/userlist', function (req, res, next) {
  req.db.users.find(function (e, docs){
  	res.json(docs);
  });
});



router.post('/testingUserEditPW', function (req, res, next) {
	
	req.db.users.update({
		login: req.body.login,
		password: req.body.password
	}, 
	{
		"$set" : 
		{
			password : req.body.newPW
		}
	}, function (err, data){
		res.json(data);
	});
});

router.get('/testingDetails/:category/:id', function (req, res, next){
	var collection = req.params.category;
	var itemId = req.params.id;

	if(collection == 'competitions'){
		req.db.competitions.find({_id: req.db.ObjectId(itemId)})
		.sort({ "_id" : -1 }, function (err, data){
			res.json(data);
		});
	} else if (collection == 'courts'){
		req.db.courts.find({_id: req.db.ObjectId(itemId)})
		.sort({ "_id" : -1 }, function (err, data){
			res.json(data);
		});
	} else if (collection == 'clubs'){
		req.db.clubs.find({_id: req.db.ObjectId(itemId)})
		.sort({ "_id" : -1 }, function (err, data){
			res.json(data);
		});
	}

});

router.post('/testingUserEdit', function (req, res, next) {
	
	req.db.users.update({login: req.body.login, password: req.body.curPW}, 
	{
		"$set" : 
		{
			password: req.body.newPW
		}
	}, function (err, data){
		res.json(data);
	});
});

router.post('/testingUserSetting/:userID/img', function (req, res, next) {
	//console.log('=====================');
	//console.log('userID: ' + req.params.userID);
	//console.log('=====================');
	//console.log(req.files);


	req.db.users.update({login: req.params.userID}, 
	{
		"$set" : 
		{
			img : req.files.file.name
		}
	}, function (err, data){
		if(err){
			res.json(err);
		} else{
			res.json(data);
		}

		

	});


});



router.post('/testingUserID', function (req, res, next) {

	req.db.users.findOne({
		login: req.body.login
	}, function (err, data){
		res.json(data);
	});
});


router.post('/testing', function (req, res, next) {
	if(req.body.status === "login"){
		req.db.users.update({login: req.body.login}, 
			{"$inc" : {"visits" : 1}});

		req.db.users.findOne({
			login: req.body.login,
			password: req.body.password
		}, function (err, data){
			res.json(data);
		});

		


	} else if(req.body.status === "register"){
		req.db.users.insert({
			name: req.body.name,
			login: req.body.login,
			password: req.body.password,
			since: Date(),
			visits: 0,
			competitions: [],
			courts: [],
			clubs: [],
			likes: [],
			img: null
		}, function (err, data){
			res.json(data);
		});
	} else if(req.body.status === "withdraw"){
		req.db.users.remove({
			login : req.body.login
		}, function (err, data){
			res.json(data);
		})
	}
});


module.exports = router;
