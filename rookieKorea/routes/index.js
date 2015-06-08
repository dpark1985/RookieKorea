var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/userlist', function(req, res, next) {
  req.db.users.find(function(e, docs){
  	res.json(docs);
  });
});



router.post('/testing', function(req, res, next) {

	if(req.body.status === "login"){
		req.db.users.findOne({
			login: req.body.login,
			password: req.body.password
		}, function (err, data){
			res.json(data);
		}, function (err, data){
			res.json(err);
		});
	} else if(req.body.status === "register"){
		req.db.users.insert({
			name: req.body.name,
			login: req.body.login,
			password: req.body.password,
			phone: req.body.phone,
			email: req.body.email,
			emailDM: req.body.emailDM,
			since: Date(),
			competitions: [],
			courts: [],
			clubs: [],
			likes: []
		}, function (err, data){
			res.json(data);
		});
	}

});




module.exports = router;
