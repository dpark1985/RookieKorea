var express = require('express');
var router = express.Router();




/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/11/2015
/*	Description_en	=	return data based on Category and its ID
/*	Description_ko	=	카테고리와 그 ID 를 활용하여 데이터를 반환
/*	Reference		=	templates/sports/details.html
/*	Reference		=	DetailCtrl
*/
router.get('/testingDetails/:category/:id', function (req, res, next){
	var collection = req.params.category;
	var itemId = req.params.id;

	if(collection == 'competitions'){
		req.db.competitions.find({_id: req.db.ObjectId(itemId)})
		.sort({ "_id" : -1 }, function (err, data){
			res.json(data);
		});
	} else if (collection == 'courts'){
		req.db.courts.find({_id: req.db.ObjectId(itemId)})
		.sort({ "_id" : -1 }, function (err, data){
			res.json(data);
		});
	} else if (collection == 'clubs'){
		req.db.clubs.find({_id: req.db.ObjectId(itemId)})
		.sort({ "_id" : -1 }, function (err, data){
			res.json(data);
		});
	}
});


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/11/2015
/*	Description_en	=	Post report data based on Category and its ID
/*	Description_ko	=	카테고리와 그 ID 를 활용하여 데이터를 반환
/*	Reference		=	templates/sports/details.html
/*	Reference		=	DetailCtrl
/*	Reference		=	$scope.report()
*/
router.post('/testingDetails/:category/:id', function (req, res, next){
	var collection = req.params.category;
	var itemId = req.params.id;

	if(collection == 'competitions'){
		req.db.competitions.update({_id: req.db.ObjectId(itemId)},
			{"$set" : { reports: req.body.reports }});
	} else if (collection == 'courts'){
		req.db.courts.update({_id: req.db.ObjectId(itemId)},
			{"$set" : { reports: req.body.reports }});
	} else if (collection == 'clubs'){
		req.db.clubs.update({_id: req.db.ObjectId(itemId)},
			{"$set" : { reports: req.body.reports }});
	}
});


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/11/2015
/*	Description_en	=	Upload user image from Mobile Device
/*	Description_ko	=	사용자 이미지 업로드, 스마트폰
/*	Reference		=	templates/userSetting/userinfo.html
/*	Reference		=	settingCtrl
/*	Reference		=	$scope.imgSetting()
*/
router.post('/testingUserSetting/:userID/:category', function (req, res, next) {
	
	if(req.params.category == 'img'){
		req.db.users.update({login: req.params.userID}, 
		{ "$set" : { img : req.files.file.name }}, 
			function (err, data){
				if(err){
					res.json(err);
				} else{
					res.json(data);
				}
		});
	} else if (req.params.category == 'pwchange'){
		req.db.users.update({login: req.body.login, password: req.body.curPW}, 
		{ "$set" : { password: req.body.newPW }}, 
			function (err, data){
				res.json(data);
		});
	}



});


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/11/2015
/*	Description_en	=	Validate user ID existance
/*	Description_ko	=	사용자 ID 존재 확인
/*	Reference		=	templates/menu/register.html
/*	Reference		= 	loginCtrl
/*	Reference		=	$scope.doRegister()
*/
router.post('/testingUserID', function (req, res, next) {
	req.db.users.findOne({ login: req.body.login }, 
		function (err, data){
			res.json(data);
	});
});


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/11/2015
/*	Description_en	=	for LOGIN, REGISTER, WITHDRAW
/*	Description_ko	=	로그인, 회원가입, 회원탈퇴 
/*	Reference		=	templates/menu/login.html
/*		Reference		=	loginCtrl
/*		Reference		=	$scope.doLogin()
/*	Reference		=	templates/menu/register.html
/*		Reference		=	loginCtrl
/*		Reference		=	$scope.doRegister()
/*	Reference		= 	templates/userSetting/userinfo.html
/*		Reference		=	settingCtrl
/*		Reference		=	$scope.showWithdrawConfirm()
*/
router.post('/testing', function (req, res, next) {
	if(req.body.status === "login"){
		req.db.users.update({login: req.body.login}, 
			{"$inc" : {"visits" : 1}});

		req.db.users.findOne({
			login: req.body.login,
			password: req.body.password
		}, function (err, data){
			res.json(data);
		});
	} else if(req.body.status === "register"){
		req.db.users.insert({
			name: req.body.name,
			login: req.body.login,
			password: req.body.password,
			since: Date(),
			visits: 0,
			competitions: [],
			courts: [],
			clubs: [],
			likes: [],
			img: null
		}, function (err, data){
			res.json(data);
		});
	} else if(req.body.status === "withdraw"){

		req.db.users.find({ login : req.body.login }, function (err, data){
			var path = './public/uploads/'+data.img;
			req.fs.unlinkSync(filePath);
		}, function (err, data){
			req.db.users.remove({ login : req.body.login }, function (err, data){
				res.json(data);
			});	
		});

	} else if(req.body.status === "pwreset"){
		var varificationCode = Math.floor(10000000 + Math.random() * 90000000 );

		var transporter = req.nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'daniel@aitch3.com',
		        pass: 'dp980605'
		    }
		});
		var mailOptions = {
		    from: '루키코리아 <daniel@aitch3.com>', // sender address
		    to: req.body.login, // list of receivers
		    subject: '루키코리아 회원 비밀번호 찾기', // Subject line
		    html: '<b>안녕하세요, 루키코리아 입니다.</b><hr/><p>새로운 비밀번호는 <b>'+varificationCode+'!!</b>입니다.</p>' // html body
		};

		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});

		req.db.users.update({login: req.body.login}, 
			{ "$set" : { password: varificationCode+'!!' }});

	}
});

router.get('/model/:sports/:category', function (req, res, next) {
	var sports = req.params.sports;
	var category = req.params.category;


	if(category === 'competitions'){
		req.db.competitions.find({eventSport: sports, eventApproved: true, eventExpired: false}).sort({"_id" : -1}, function (err, data){
			res.json(data);
		});
	} else if (category === 'courts'){
		req.db.courts.find({courtSport: sports, courtApproved: true, courtExpired: false}).sort({"_id" : -1}, function (err, data){
			res.json(data);
		});
	} else if (category === 'clubs'){
		req.db.clubs.find({clubSport: sports, clubApproved: true, clubExpired: false}).sort({"_id" : -1}, function (err, data){
			res.json(data);
		});
	}
});


router.get('/model/:sports/:category/:id', function (req, res, next) {
	var sports = req.params.sports;
	var category = req.params.category;
	var id = req.params.id;

	if(category === 'competitions'){
		req.db.competitions.update({_id: req.db.ObjectId(id)}, {"$inc" : {"eventVisits": 1}});

		req.db.competitions.find({_id: req.db.ObjectId(id)}, function (err, data){
			res.json(data);
		});
	} else if (category === 'courts'){
		req.db.courts.update({_id: req.db.ObjectId(id)}, {"$inc" : {"courtVisits": 1}});

		req.db.courts.find({_id: req.db.ObjectId(id)}, function (err, data){
			res.json(data);
		});
	} else if (category === 'clubs'){
		req.db.clubs.update({_id: req.db.ObjectId(id)}, {"$inc" : {"clubVisits": 1}});

		req.db.clubs.find({_id: req.db.ObjectId(id)}, function (err, data){
			res.json(data);
		});
	}
});


module.exports = router;
