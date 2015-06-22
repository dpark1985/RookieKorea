var express = require('express');
var router = express.Router();

var SE1100000000 = [{city: '종로구', id: '1111000000' },{city: '중구', id: '1114000000' },{city: '용산구', id: '1117000000' },{city: '성동구', id: '1120000000' },{city: '광진구', id: '1121500000' },{city: '동대문구', id: '1123000000' },{city: '중랑구', id: '1126000000' },{city: '성북구', id: '1129000000' },{city: '강북구', id: '1130500000' },{city: '도봉구', id: '1132000000' },{city: '노원구', id: '1135000000' },{city: '은평구', id: '1138000000' },{city: '서대문구', id: '1141000000' },{city: '마포구', id: '1144000000' },{city: '양천구', id: '1147000000' },{city: '강서구', id: '1150000000' },{city: '구로구', id: '1153000000' },{city: '금천구', id: '1154500000' },{city: '영등포구', id: '1156000000' },{city: '동작구', id: '1159000000' },{city: '관악구', id: '1162000000' },{city: '서초구', id: '1165000000' },{city: '강남구', id: '1168000000' },{city: '송파구', id: '1171000000' },{city: '강동구', id: '1174000000' }];
var BS2600000000 = [{city; '중구', id: '2611000000' },{city; '서구', id: '2614000000' },{city; '영도구', id: '2620000000' },{city; '부산진구', id: '2623000000' },{city; '동래구', id: '2626000000' },{city; '남구', id: '2629000000' },{city; '북구', id: '2632000000' },{city; '해운대구', id: '2635000000' },{city; '사하구', id: '2638000000' },{city; '금정구', id: '2641000000' },{city; '강서구', id: '2644000000' },{city; '연제구', id: '2647000000' },{city; '수영구', id: '2650000000' },{city; '사상구', id: '2653000000' },{city; '기장군', id: '2671000000' }];
var DG2700000000 = [{city: '중구', id: '2711000000' },{city: '동구', id: '2714000000' },{city: '서구', id: '2717000000' },{city: '남구', id: '2720000000' },{city: '북구', id: '2723000000' },{city: '수성구', id: '2726000000' },{city: '달서구', id: '2729000000' },{city: '달성군', id: '2771000000' }];     
var IC2800000000 = [{city: '중구', id: '2811000000' },{city: '동구', id: '2814000000' },{city: '남구', id: '2817000000' },{city: '연수구', id: '2818500000' },{city: '남동구', id: '2820000000' },{city: '부평구', id: '2823700000' },{city: '계약구', id: '2824500000' },{city: '서구', id: '2871000000' },{city: '강화군', id: '2871000000' },{city: '옹진군', id: '2872000000' }];
var GJ2900000000 = [{city: '동구', id: '2911000000' },{city: '서구', id: '2914000000' },{city: '남구', id: '2915500000' },{city: '북구', id: '2917000000' },{city: '광산구', id: '2920000000' }];
var DJ3000000000 = [{city: '동구', id: '3011000000' },{city: '중구', id: '3014000000' },{city: '서구', id: '3017000000' },{city: '유성구', id: '3020000000' },{city: '대덕구', id: '3023000000' }];
var US3100000000 = [{city: '중구', id: '3111000000' },{city: '남구', id: '3114000000' },{city: '동구', id: '3117000000' },{city: '북구', id: '3120000000' },{city: '울주군', id: '3171000000' }];



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/userlist', function (req, res, next) {
  req.db.users.find(function(e, docs){
  	res.json(docs);
  });
});


router.post('/testingNewInfo', function (req, res, next) {

	if(req.body.address1 == 'SE1100000000'){
		res.json(SE1100000000);
	} else if (req.body.address1 == 'BS2600000000'){
		res.json(BS2600000000);
	} else if (req.body.address1 == 'DG2700000000'){
		res.json(DG2700000000);
	} else if (req.body.address1 == 'IC2800000000'){
		res.json(IC2800000000);
	} else if (req.body.address1 == 'GJ2900000000'){
		res.json(GJ2900000000);
	} else if (req.body.address1 == 'DJ3000000000'){
		res.json(DJ3000000000);
	} else if (req.body.address1 == 'US3100000000'){
		res.json(US3100000000);
	} else{
		res.json();
	}


});


router.post('/testingUserEditPW', function (req, res, next) {
	
	req.db.users.update({
		login: req.body.login,
		password: req.body.password
	}, 
	{
		"$set" : 
		{
			password : req.body.newPW
		}
	}, function (err, data){
		res.json(data);
	});
});

router.post('/testingUserEdit', function (req, res, next) {
	
	req.db.users.update({login: req.body.login}, 
	{
		"$set" : 
		{
			emailDM : req.body.emailDM,
			email: req.body.newEmail,
			nickName: req.body.nickName
		}
	}, function (err, data){
		res.json(data);
	});
});

router.post('/testingUserRegistration', function (req, res, next) {

	var varificationCode = Math.floor(1000 + Math.random() * 9000);
	req.twilio.messages.create({
		to: req.body.userPhone,
		from: "+1 415-599-2671", 
		body: varificationCode
	}, function (err, message){
		res.json(message);
	});
});

router.post('/testingUserID', function (req, res, next) {

	req.db.users.findOne({
		login: req.body.login
	}, function (err, data){
		res.json(data);
	});
});

router.post('/testingUserPhone', function (req, res, next) {

	req.db.users.findOne({
		phone: req.body.phone
	}, function (err, data){
		res.json(data);
	});
});

router.post('/testingUserEmail', function (req, res, next) {

	req.db.users.findOne({
		email: req.body.email
	}, function (err, data){
		res.json(data);
	});
});



router.post('/testing', function (req, res, next) {
	if(req.body.status === "login"){
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
			phone: req.body.phone,
			email: req.body.email,
			emailDM: req.body.emailDM,
			since: Date(),
			competitions: [],
			courts: [],
			clubs: [],
			likes: []
		}, function (err, data){
			res.json(data);
		});
	}
});




module.exports = router;
