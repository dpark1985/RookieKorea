exports.active = function(app, db){
	app.get('/newinfo', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('newInfo/newinfo', { user: user.login });
		}, function(){
			res.redirect('/login');
		});		
	});

	app.get('/newinfo/:sports', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('newInfo/categorySelect', { 
				user: user.login,
				selectedSport: req.params.sports 
			});
		}, function(){
			res.redirect('/login');
		});		
	});

	app.get('/newinfo/:sports/competition', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('newInfo/competitionInfo', { user: user.login });
		}, function(){
			res.redirect('/login');
		});		
	});


	app.post('/newinfo/:sports/competition', function (req, res, next) {
		isLogin(req, res, function(user){
			if(done==true){
				db.competitions.createIndex (
					{ "$**" : "text" }
				);
				db.competitions.insert({
					eventSport: req.params.sports,
					eventProved: false,
					eventAuthor: user.login,
					eventTitle: req.body.compName,
					eventDate: {
						startC: req.body.compDate1,
						endC: req.body.compDate2,
						start: req.body.compDate11,
						end: req.body.compDate22
					},
					eventLocation: req.body.compLocation,
					eventRegist: {
						startC: req.body.registDate1,
						endC: req.body.registDate2,
						start: req.body.registDate11,
						end: req.body.registDate22
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
			}	
		}, function(){
			res.redirect('/login');
		});		
	});

	app.get('/newinfo/:sports/court', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('newInfo/courtInfo', { user: user.login });
		}, function(){
			res.redirect('/login');
		});		
	});


	app.post('/newinfo/:sports/court', function (req, res, next) {
		isLogin(req, res, function(user){
			if(done==true){
				db.courts.createIndex (
					{ "$**" : "text" }
				);
				db.courts.insert({
					courtSport: req.params.sports,
					courtProved: false,
					courtAuthor: user.login,
					courtTitle: req.body.courtName,
					courtPhone: req.body.courtPhone,
					courtEmail: req.body.courtEmail,
					courtLocation: req.body.courtLocation,
					courtURL: req.body.courtURL,
					courtInfo: req.body.editor1,
					courtImg : req.files.courtImg.name
				}, function (err, data){
					if(data){
						console.log("INPUT DATA ==== " + data);
						res.redirect('/');
					} else{
						console.log("INPUT ERROR === " + err);
					}
				});
			}	
		}, function(){
			res.redirect('/login');
		});		
	});


	app.get('/newinfo/:sports/club', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('newInfo/clubInfo', { user: user.login });
		}, function(){
			res.redirect('/login');
		});		
	});

	app.post('/newinfo/:sports/club', function (req, res, next) {
		isLogin(req, res, function(user){
			if(done==true){
				db.clubs.createIndex (
					{ "$**" : "text" }
				);
				db.clubs.insert({
					clubSport: req.params.sports,
					clubProved: false,
					clubAuthor: user.login,
					clubTitle: req.body.clubName,
					clubPhone: req.body.clubPhone,
					clubEmail: req.body.clubEmail,
					clubLocation: req.body.clubLocation,
					clubURL: req.body.clubURL,
					clubInfo: req.body.editor1,
					clubImg : req.files.clubImg.name
				}, function (err, data){
					if(data){
						console.log("INPUT DATA ==== " + data);
						res.redirect('/');
					} else{
						console.log("INPUT ERROR === " + err);
					}
				});
			}	
		}, function(){
			res.redirect('/login');
		});		
	});	

	app.get('/compList', function (req, res, next) {
		db.competitions.find(function (err, data){
			res.json(data);
		});	
	});



};