exports.active = function(app, db){

	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	07/24/2015
	/*	Description_en	=	questions(queris) to be sent from users
	/*  Description_ko	= 	사용자의 의견 보내기 페이지
	/*	url				=	/query
	/* 	http			=	GET & POST
	*/
	app.get('/query', function (req, res, next) {
		res.render('utilities/query');
	});
	app.post('/query', function (req, res, next) {
		db.query.insert({
			queryType: 'query',
			queryAuthor: req.body.login,
			querySubject: req.body.subject,
			queryContext: req.body.context
		}, function (err, data){
			if(data){
				console.log("INPUT DATA ==== " + data);
				res.redirect('/');
			} else{
				console.log("INPUT ERROR === " + err);
			}
		});
	});



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	07/24/2015
	/*	Description_en	=	privacy & terms policies 
	/$	Description_ko	=	약관 & 개인정보 취급방침
	/*	url				=	/terms
	/* 	http			=	GET
	*/
	app.get('/terms', function (req, res, next) {
		res.render('utilities/terms');
	});



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	07/24/2015
	/*	Description_en	=	query regarding advertizement
	/$	Description_ko	=	광고 기재 관련 문의
	/*	url				=	/advertize
	/* 	http			=	GET & POST
	*/
	app.get('/advertize', function (req, res, next) {
		res.render('utilities/advertize');
	});
	app.post('/advertize', function (req, res, next) {
		db.query.insert({
			queryType: 'advertize',
			queryAuthor: req.body.login,
			querySubject: req.body.subject,
			queryContext: req.body.context,
			queryPhone: req.body.phone
		}, function (err, data){
			if(data){
				console.log("INPUT DATA ==== " + data);
				res.redirect('/');
			} else{
				console.log("INPUT ERROR === " + err);
			}
		});
	})



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	07/24/2015
	/*	Description_en	=	search page, redners search.ejs
	/$	Description_ko	=	검색 페이지, search.ejs 출력
	/*	url				=	/search
	/* 	http			=	GET
	*/
	app.get('/search', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('utilities/search', { user: user.login });
		}, function(){
			res.render('utilities/search', { user: '' });
		});	
	});



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	07/24/2015
	/*	Description_en	=	list all Member
	/$	Description_ko	=	모든 사용자 출력
	/*	url				=	/userlist
	/* 	http			=	GET
	*/
	app.get('/userlist', function (req, res, next) {
		db.users.find(function (err, data){
			res.json(data);
		});
	});



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	07/24/2015
	/*	Description_en	=	User Account Management Page, changes pw, show history
	/$	Description_ko	=	사용자 계정 관리 페이지, 비밀번호 변경, 기록 출력
	/*	url				=	/useraacount
	/* 	http			=	GET & POST
	*/
	app.get('/useraccount', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('utilities/useraccount', { user: user.login });
		}, function(){
			res.redirect('/');
		});	
	});
	app.post('/useraccount', function (req, res, next) {
		isLogin(req, res, function(user){
			if(req.body.newPW != req.body.newPWC){
				res.json({user: user.login, error: '새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.'});
			} else {
				db.users.update({"login" : user.login, "password": req.body.currPW}, 
					{"$set": {"password" : req.body.newPW}}, 
					function (err, data){
					if(data){
						console.log("INPUT DATA ==== " + data);
						res.json({user: user.login, error: '완료되었습니다. '});
					} else {
						console.log("INPUT ERROR === " + err);
						res.json({user: user.login, error: '비밀번호가 맞지 않습니다.'});
					}
				});
			}
		}, function(){
			res.redirect('/');
		});	

	});



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Output all the competitions list, and 10 on side
	/$	Description_ko	=	ALL=모든 대회 검색, SIDE=사이드 메뉴에 10개 대회 출력
	/*	url				=	/competitions/:all  /competitions/:side
	/* 	http			=	GET
	/*	Reference		=	search.ejs, searchCTRL
	*/	
	app.get('/competitions/:state', function (req, res, next) {
		if(req.params.state == 'all'){
			db.competitions.find().sort({"_id" : -1}, 
					function (err, data){
						res.json(data);
			});
		} else {
			db.competitions.find().limit(10).sort({"_id" : -1}, 
					function (err, data){
						res.json(data);
			});
		} 
	});

	// Searching keyword [competition]
	// 키워드 검색, 데이터 출력
	// search.ejs searchCTRL
	// search/competitions.html
	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Search content, Output all searched competitions list
	/$	Description_ko	=	검색 내용 출력 State=ALL, 코트장, 동호회 Query=검색키워드
	/*	url				=	/competitions/:all/:query
	/* 	http			=	GET
	/*	Reference		=	search.ejs, searchCTRL
	*/	
	app.get('/competitions/:state/:query', function (req, res, next) {
		db.competitions.aggregate(
			[
				{ $match: { $text: { $search: req.params.query } } }
			], function (err, data){
				res.json(data);
			}
		);
	});


};