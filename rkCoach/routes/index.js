var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/findlessons', function(req, res, next) {
  res.render('findlessons');
});



router.get('/findpw', function(req, res, next) {
  res.render('findpw');
});








module.exports = router;
