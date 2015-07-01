var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET compeitition page. */
router.get('/compeititions', function (req, res, next) {
  res.render('competitions', { title: 'Express' });
});

/* GET courts page. */
router.get('/courts', function (req, res, next) {
  res.render('courts', { title: 'Express' });
});

/* GET clubs page. */
router.get('/clubs', function (req, res, next) {
  res.render('clubs', { title: 'Express' });
});




module.exports = router;
