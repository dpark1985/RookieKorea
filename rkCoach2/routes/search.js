var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
		console.log(req.user);
		res.render('search');
	} else {
		res.render('search');
	}
});

router.post('/', function(req, res, next) {


	console.log(req.body);



});

router.get('/', function(req, res, next) {



	


});



module.exports = router;
