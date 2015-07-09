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

	res.render('index');
});



router.get('/newdataList', function (req, res, next) {
  req.db.competitions.find(function(e, docs){
  	res.json(docs);
  });
});



router.post('/newdata', function (req, res, next) {
	if(req.body.category === "competition"){
		console.log(req.files);
		console.log(req.body);

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
			sponsorship: req.body.compSponsorship,
			registDate: req.body.compRegistDate,
			compInfo: req.body.compInfo,
			url: req.body.compURL,
			img: req.body.compImg

		}, function (err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else{
				console.log(data);
				res.json(data);
			}
		});



	} 
});



module.exports = router;


