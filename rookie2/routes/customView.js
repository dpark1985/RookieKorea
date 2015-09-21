exports.active = function(app, db, fs){

	// Render index page
	app.get('/', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('index', { user: user.login });
		}, function(){
			res.render('index', { user: '' });
		});		
	});

	app.get('/resetpwd', function (req, res, next) {
		res.render('resetpwd');
	});

	app.get('/profile', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('profile', { user: user.login });
		}, function(){
			res.redirect('/login');
		});
	});

	app.get('/profile/*', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('profile', { user: user.login });
		}, function(){
			res.redirect('/login');
		});
	});

	app.get('/newinfo', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('newinfo', { user: user.login });
		}, function(){
			res.redirect('/login');
		});
	});

	app.get('/admin', function (req, res, next) {
		res.render('admin');
	});

	app.get('/admin/*', function (req, res, next) {
		res.render('admin');
	});

/*
	app.get('/event', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('sports', { user: user.login });
		}, function(){
			res.render('sports', { user: '' });
		});	
	});
*/

	app.get('/:sports', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('sports', { user: user.login });
		}, function(){
			res.render('sports', { user: '' });
		});		
	});

	app.get('/:sports/:category/:events', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('details', { user: user.login });
		}, function(){
			res.render('details', { user: '' });
		});		
	});









};