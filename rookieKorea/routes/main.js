exports.active = function(app, db){
	app.get('/', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('index', { user: user.name });
		}, function(){
			res.render('index', { user: 'Please login' });
		});		
	});


	app.get('/competitions', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('competitions', { user: user.name });
		}, function(){
			res.render('competitions', { user: 'Please login' });
		});		
	});

	app.get('/courts', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('courts', { user: user.name });
		}, function(){
			res.render('courts', { user: 'Please login' });
		});		
	});

	app.get('/clubs', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('clubs', { user: user.name });
		}, function(){
			res.render('clubs', { user: 'Please login' });
		});		
	});



};