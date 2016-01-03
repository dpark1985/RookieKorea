var express = require('express');
var router = express.Router();


router.get('/userData', function(req, res, next) {
  if(req.user){
    res.json({userID: req.user.login, login: true});
  }
  else {
    res.json({userID: false, login: false});
  }
});

router.post('/UserRegist', function (req, res, next) {
	req.db.users.findOne({ loginEmail: req.body.loginEmail }, function (err, result){
		if(result){
			console.log("result == " + result);
			res.json(result);
		} else {
			console.log("err == " + err);
			res.json(err);
		}
	})
});





module.exports = router;
