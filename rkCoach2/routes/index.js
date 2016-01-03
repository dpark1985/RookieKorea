var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.loggedIn){
		//console.log(req.user);
		res.render('index', {userID: req.user.login});
	} else {
		res.render('index');
	}

});


/*
router.get('/search', function(req, res, next) {
	if(req.loggedIn){
		res.render('search', {userID: req.user.login, userType: req.user.userType});
	} else {
		res.render('search', {userID: false});
	}
});


router.post('/search', function(req, res, next) {


	console.log(req.body);
	var sports = req.urlencode(req.body.sports);
	var location1 = req.body.location1;
	var location2 = req.body.location2;

	res.redirect('/result?sports='+sports+'&location1='+location1+'&location2='+location2);


});
*/


/* GET search result */
router.get('/result', function(req, res, next) {

	function isEmpty(obj) {
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }
	    return true;
	}

	if(isEmpty(req.query)){
		res.render('error');
	} else if (req.query && req.loggedIn){
		res.render('result', {userID: req.user.login, sports: req.query.sports, location1: req.query.location1, location2: req.query.location2});
	} else if(req.query && !req.loggedIn){
		res.render('result', {userID: false, sports: req.query.sports, location1: req.query.location1, location2: req.query.location2});
	} 


});


/* GET search result */
router.get('/coach_details/:id', function(req, res, next) {
	if(req.loggedIn){
		res.render('coachDetails', {userID: req.user.login, userType: req.user.userType, initialSetup: req.user.initialSetup, coachID: req.params.id});
	} else {
		res.render('coachDetails', {userID: false, coachID: req.params.id});
	}

});

/* GET search result */
router.get('/reserve', function(req, res, next) {
	if(req.loggedIn){
		res.render('reserve', {userID: req.user.login, userType: req.user.userType});
	} else {
		res.render('reserve', {userID: false});
	}
});


/* EveryAuth redirect */
router.get('/profile', function(req, res, next) {
	if(!req.loggedIn){
		res.redirect('/login');
	} else {
		req.db.users.findOne({login: req.user.login}, function (err, result){
			res.redirect('/profile/'+result.userType);
		});		
	}
});


/* GET user profile */
router.get('/profile/:userType', function(req, res, next) {
	if(!req.loggedIn){
		res.redirect('/login');
	} else {
		req.db.users.findOne({login: req.user.login}, function (err, result){
			if(result.initialSetup == false){
				res.redirect('/profile/'+req.params.userType+'/setup');
			} else {
				res.render(req.params.userType+'/profile', {userID: req.user.login});
			}
		});
	}
});


/* GET user profile */
router.get('/profile/:userType/setup', function(req, res, next) {
	if(!req.loggedIn){
		res.redirect('/login');
	} else {
		res.render(req.params.userType+'/setup', {userID: req.user.login});
	}
});


router.get('/profile/:userType/setup/*', function(req, res, next) {
	if(!req.loggedIn){
		res.redirect('/login');
	} else {
		res.redirect('/profile/'+req.params.userType+'/setup');
	}
});






module.exports = router;
