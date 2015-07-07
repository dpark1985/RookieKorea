/*
exports.active = function (app, db){
	app.get('/', function (req, res){
		isLogin(req, res, function (user) {
			res.render('index', {user: user});
		}, function () {
			res.render('index', {user: "!!!"});
		});
	});
};
*/



var express = require('express');
var router = express.Router();

var userData = null;


router.get('/', function (req, res, next) {
	if (userData == null){
		res.render('index', { user: '1111' });
	} else {
		res.render('index', { user: userData.name });
	}
});


router.get('/login', function (req, res, next) {
	res.render('login');
});


router.post('/login', function (req, res, next) {
	req.db.users.findOne({
		login: req.body.login,
		password: req.body.password
	}, function (err, data){
		userData = data;
		console.log(userData);
		res.redirect('/');
	});
});


router.get('/logout', function (req, res, next) {
	userData = null;
	res.redirect('/');
});


router.get('/register', function (req, res, next) {
	res.render('register');
});

router.get('/newdata', function (req, res, next) {
	res.render('newdata');
});

router.post('/newdata', function (req, res, next) {
	if(req.body.category === "competition"){
		console.log("req.body =====" + req.body);
		console.log("req.files ======" + req.files);
/*
		req.db.competitions.insert({
			sport: req.body.sport,
			title: req.body.title,
			eventDate: {
				from: req.body.compDateStart,
				to: req.body.compDateEnd
			},
			location: req.body.compLocation,
			host: req.body.compHost,
			supervision: req.body.compSupervision,
			sponser: req.body.compSponser,
			sponsorship: req.body.compSponsership,
			registDate: req.body.compRegistDate,
			compInfo: req.body.compInfo,
			url: req.body.compURL,
			img: req.body.compImg

		}, function (err, post){
			if(err){
				console.log(err);
			} else{
				console.log(post);
				res.redirect('/');
			}
		});
*/


	} 
});



module.exports = router;


