exports.active = function(app, db){

	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/17/2015
	/*	Description_en	=	Administrator Management Page
	/*  Description_ko	= 	관리자 관리 페이지
	/*	url				=	/admin
	/* 	http			=	GET
	/* 	Reference		=	views/utilities/admin.ejs
	*/
	app.get('/admin', function (req, res, next) {
		isLogin(req, res, function(user){
			res.render('utilities/admin', { user: user.login });
		});		
	});

	app.post('/admin', function (req, res, next) {
		if(req.body.login == 'soljamhouse' && req.body.pw == '07075247713'){
			res.json({access: true})
		} else {
			res.json({access: false})
		}
	});



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/17/2015
	/*	Description_en	=	Administrator Management Page: get total num of all info
	/*  Description_ko	= 	관리자 관리 페이지: 모든 정보의 숫자
	/*	url				=	/admin
	/* 	http			=	GET
	/* 	Reference		=	views/utilities/admin.ejs
	/* 	Reference		=	public/templates/admin/mainView.html
	/* 	Reference		=	public/templates/admin/side.html
	*/
	app.get('/admin/totalnum/:menu', function (req, res, next) {
		if(req.params.menu == 'info'){
			var competitionsNum = null;
			var courtsNum = null;
			var clubsNum = null;
			var infoTotalNum = null;
			db.competitions.find({eventApproved: false, eventRejected: false}, function (err, data){
				competitionsNum = data.length;
				db.courts.find({courtApproved: false, courtRejected: false}, function (err, data){
					courtsNum = data.length;
					db.clubs.find({clubApproved: false, clubRejected: false}, function (err, data){
						clubsNum = data.length;
						infoTotalNum = competitionsNum + courtsNum + clubsNum;
						res.json({total: infoTotalNum, compNum: competitionsNum, courtsNum: courtsNum, clubsNum: clubsNum});
					});
				});
			});
		} else if(req.params.menu == 'ads'){
			var adsTotalNum = null;
			db.query.find({queryType: 'advertize', checked: false}, function (err, data){
				adsTotalNum = data.length;
				res.json({total: adsTotalNum});
			});
		} else if(req.params.menu == 'query'){
			var queryTotalNum = null;
			db.query.find({queryType: 'query', checked: false}, function (err, data){
				queryTotalNum = data.length;
				res.json({total: queryTotalNum});
			});
		} else if(req.params.menu == 'noti'){
			var notiTotalNum = null;
			db.noti.find({}, function (err, data){
				notiTotalNum = data.length;
				res.json({total: notiTotalNum});
			});
		} else if(req.params.menu == 'userlist'){
			var userListTotalNum = null;
			db.users.find({}, function (err, data){
				userListTotalNum = data.length;
				res.json({total: userListTotalNum});
			});
		}
	});

	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/17/2015
	/*	Description_en	=	Administrator Management Page: get total num of all info
	/*  Description_ko	= 	관리자 관리 페이지: 모든 정보의 숫자
	/*	url				=	/admin
	/* 	http			=	GET
	/* 	Reference		=	views/utilities/admin.ejs
	/* 	Reference		=	public/templates/admin/mainView.html
	/* 	Reference		=	public/templates/admin/side.html
	*/
	app.get('/admin/getInfo/:menu', function (req, res, next) {
		if(req.params.menu == 'ads'){
			db.query.find({queryType: 'advertize'}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		} else if(req.params.menu == 'query'){
			db.query.find({queryType: 'query'}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		} else if(req.params.menu == 'noti'){
			db.noti.find({}).sort({"_id" : -1}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		} else if(req.params.menu == 'userlist'){
			console.log('----------------');
			db.users.find({}).sort({"_id" : -1}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		}
	});




	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/18/2015
	/*	Description_en	=	Administrator Management Page: get total num of all info
	/*  Description_ko	= 	관리자 관리 페이지: 모든 정보의 숫자
	/*	url				=	/admin
	/* 	http			=	GET
	/* 	Reference		=	views/utilities/admin.ejs
	/* 	Reference		=	public/templates/admin/mainView.html
	/* 	Reference		=	public/templates/admin/side.html
	*/
	app.get('/admin/checkedInfo/:menu/:id', function (req, res, next) {
		if(req.params.menu == 'ads'){
			db.query.update({_id: db.ObjectId(req.params.id)}, 
				{ "$set" : { checked: true } });
		} else if(req.params.menu == 'query'){
			db.query.update({_id: db.ObjectId(req.params.id)}, 
				{ "$set" : { checked: true } });
		} else if(req.params.menu == 'noti'){

		} else if(req.params.menu == 'userlist'){

		}
	});




	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/17/2015
	/*	Description_en	=	Administrator Management Page: approve or disapprove competitions,courts,clubs
	/*  Description_ko	= 	관리자 관리 페이지: 대회, 코트장, 동호회 승인 또는 반려
	/*	url				=	/admin
	/* 	http			=	GET
	/* 	Reference		=	views/utilities/admin.ejs
	/* 	Reference		=	public/templates/admin/mainView.html
	/* 	Reference		=	public/templates/admin/newInfo/clubs.html
	/* 	Reference		=	public/templates/admin/newInfo/competitions.html
	/* 	Reference		=	public/templates/admin/newInfo/courts.html
	*/
	app.get('/admin/:category/:id/:approve', function (req, res, next) {
		var category = req.params.category;
		var id = req.params.id;
		var approve = req.params.approve;

		if(approve == '1'){
			if(category == 'competitions'){
				db.competitions.update({_id: db.ObjectId(id)},
				{ "$set": { eventApproved: true }});
			} else if (category == 'courts'){
				db.courts.update({_id: db.ObjectId(id)},
				{ "$set": { courtApproved: true }});
			} else {
				db.clubs.update({_id: db.ObjectId(id)},
				{ "$set": { clubApproved: true }});
			}
		} else {
			if(category == 'competitions'){
				db.competitions.update({_id: db.ObjectId(id)},
				{ "$set": { eventRejected: true }});
			} else if (category == 'courts'){
				db.courts.update({_id: req.db.ObjectId(id)},
				{ "$set": { courtRejected: true }});
			} else if (category == 'clubs') {
				db.clubs.update({_id: req.db.ObjectId(id)},
				{ "$set": { clubRejected: true }});
			}
		}
	});	


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
			queryDate: Date(),
			queryAuthor: req.body.login,
			querySubject: req.body.subject,
			queryContext: req.body.context,
			checked: false
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
	/*	Date 			= 	08/17/2015
	/*	Description_en	=	Post notification & events
	/*  Description_ko	= 	공지사항 및 이벤트 내용 작성
	/*	url				=	/noti
	/* 	http			=	POST
	*/
	app.post('/noti', function (req, res, next) {
		db.noti.insert({
			notiType: req.body.notiType,
			notiDate: Date(),
			notiSubject: req.body.notiSubject,
			notiContext: req.body.notiContext
		}, function (err, data){
			if(data){
				console.log("INPUT DATA ==== " + data);
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
			queryDate: Date(),
			queryAuthor: req.body.login,
			querySubject: req.body.subject,
			queryContext: req.body.context,
			queryPhone: req.body.phone,
			checked: false
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
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Output all the competitions list, and 10 on side
	/$	Description_ko	=	ALL=모든 대회 검색, SIDE=사이드 메뉴에 10개 대회 출력
	/*	url				=	/competitions/:all  /competitions/:side
	/* 	http			=	GET
	/*	Reference		=	search.ejs, searchCTRL
	*/	
	app.get('/search/:category/:state', function (req, res, next) {
		var category = req.params.category;

		if(req.params.state == 'all'){
			if(category == 'competitions') {
				db.competitions.find({eventApproved: true}).sort({"_id" : -1}, 
						function (err, data){
							res.json(data);
				});			
			} else if (category == 'courts') {
				db.courts.find({courtApproved: true}).sort({"_id" : -1}, 
						function (err, data){
							res.json(data);
				});		
			} else {
				db.clubs.find({clubApproved: true}).sort({"_id" : -1}, 
						function (err, data){
							res.json(data);
				});	
			}

		} else if(req.params.state == 'side') {
			db.competitions.find({eventApproved: true}).limit(10).sort({"_id" : -1}, 
					function (err, data){
						res.json(data);
			});
		} else if (req.params.state == 'false') {

			if(category == 'competitions') {
				db.competitions.find({eventApproved: false, eventRejected: false}).sort({"_id" : -1}, 
						function (err, data){
							res.json(data);
				});			
			} else if (category == 'courts') {
				db.courts.find({courtApproved: false, courtRejected: false}).sort({"_id" : -1}, 
						function (err, data){
							res.json(data);
				});		
			} else if (category == 'clubs') {
				db.clubs.find({clubApproved: false, clubRejected: false}).sort({"_id" : -1}, 
						function (err, data){
							res.json(data);
				});	
			}
		} else if (req.params.state == 'rejected') {
			db.competitions.find({ eventRejected: true }, function (err, data1){
				var rejectedCompetitions = data1;
				db.courts.find({ courtRejected: true }, function (err, data2){
					var rejectedCourts = data2;
					db.clubs.find({ clubRejected: true }, function (err, data3){
						var rejectedClubs = data3;

						var res2 = [];
						for (attr  in rejectedCompetitions){
							res2[attr] = rejectedCompetitions[attr];
						}

						var i = 0;
						var l1 = rejectedCompetitions.length;
						for (attr1  in rejectedCourts){						
							res2[l1+i] = rejectedCourts[attr1];
							i++;
						}

						var j=0;
						var l2 = rejectedCompetitions.length + rejectedCourts.length;
						for (attr2  in rejectedClubs){
							res2[l2+j] = rejectedClubs[attr2];
							j++;
						}

						res.json(res2);
					});
				});
			});
		}
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