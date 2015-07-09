exports.active = function(app, db){
	app.get('/', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('index', { user: user.login });
		}, function(){
			res.render('index', { user: '' });
		});		
	});


	app.get('/competitions', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('competitions', { user: user.login });
		}, function(){
			res.render('competitions', { user: '' });
		});		
	});

	app.get('/courts', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('courts', { user: user.login });
		}, function(){
			res.render('courts', { user: '' });
		});		
	});

	app.get('/clubs', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('clubs', { user: user.login });
		}, function(){
			res.render('clubs', { user: '' });
		});		
	});

	app.get('/newinfo', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('newinfo', { user: user.login });
		}, function(){
			res.redirect('/login');
		});		
	});

	app.get('/newinfo/:sports', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('categorySelect', { 
				user: user.login,
				selectedSport: req.param('sports') 
			});
			console.log('=========Sports Selected=========');
			console.log('---------' + req.param('sports') + '---------');
		}, function(){
			res.redirect('/login');
		});		
	});

	app.get('/newinfo/:sports/competition', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('competitionInfo', { user: user.login });
		}, function(){
			res.redirect('/login');
		});		
	});


	app.post('/newinfo/:sports/competition', function(req, res, next) {

		console.log('=======DATA INSERT========');
		console.log('---------' + req.param('sports') + '---------');
		console.log('---------COMPETITION---------');

		if(done==true){
			console.log(req.files);
		}

		db.competitions.insert({
			eventSport: req.param('sports'),
			eventTitle: req.body.compName,
			eventDate: {
				start: req.body.compDate1,
				end: req.body.compDate2
			},
			eventLocation: req.body.compLocation,
			eventHost: req.body.compHost,
			eventSupervision: req.body.compSupervision,
			eventSponser: req.body.compSponser,
			eventSponsorship: req.body.compSponsorship,
			eventRegist: {
				start: req.body.registDate1,
				end: req.body.registDate2
			},
			eventInfo: req.body.editor1,
			eventURL: req.body.compURL,
			eventImg : req.files.compImg.name
		}, function (err, data){
			if(data){
				console.log("INPUT DATA ==== " + data);
				res.redirect('/');
			} else{
				console.log("INPUT ERROR === " + err);
			}
		});



	});

	app.get('/compList', function(req, res, next) {
		db.competitions.find(function (err, data){
			res.json(data);
		});	
	});



};