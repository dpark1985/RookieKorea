exports.active = function(app, db){

	// Render index page
	// 메인 페이지 출력
	app.get('/', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('index', { user: user.login });
		}, function(){
			res.render('index', { user: '' });
		});		
	});



	// Render sports pages고
	// 스포츠 페이지 출력
	app.get('/:sports', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('sports/sports', { user: user.login });
		}, function(){
			res.render('sports/sports', { user: '' });
		});		
	});

	// Return data regarding collections
	// 해당 스포츠 카테고리에 대한 데이터 출력
	// sports.ejs
	// sports.CTRL MainCtrl
	app.get('/:sports/:state', function (req, res, next) {
		var collection = req.params.state;
		var sport = req.params.sports;

		if(collection == 'competitions'){
			db.competitions.find({eventSport: sport})
			.sort({ "_id" : -1 }, function (err, data){
				res.json(data);
			});
		} else if (collection == 'courts'){
			db.courts.find({courtSport: sport})
			.sort({ "_id" : -1 }, function (err, data){
				res.json(data);
			});
		} else if (collection == 'clubs'){
			db.clubs.find({clubSport: sport})
			.sort({ "_id" : -1 }, function (err, data){
				res.json(data);
			});
		}
	});




};