exports.active = function(app, db, fs){




	app.post('/model/resetpwd', function (req, res, next) {
		var varificationCode = Math.floor(10000000 + Math.random() * 90000000 );
		var transporter = req.nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'daniel@aitch3.com',
		        pass: 'dp980605'
		    }
		});
		var mailOptions = {
		    from: '루키코리아 <noreply@aitch3.com>', // sender address
		    to: req.body.login, // list of receivers
		    subject: '루키코리아 회원 비밀번호 찾기', // Subject line
		    html: '<b>안녕하세요, 루키코리아 입니다.</b><hr/><p>새로운 비밀번호는 <b>'+varificationCode+'!!</b>입니다.</p>' // html body
		};
		db.users.update({ login: req.body.login, name: req.body.name }, 
			{ "$set" : { password: varificationCode+'!!' }}, function (err, result){
				if(result){
					transporter.sendMail(mailOptions, function(error, info){
					    if(error){
					        console.log(error);
					    }else{
					        res.json(info);
					    }
					});	
				} else {
					console.log("INPUT ERROR === " + err);
				}
		});
	});


	app.post('/model/query', function (req, res, next) {
		db.query.insert({
			queryType: 'query',
			queryDate: Date(),
			queryAuthor: req.body.queryAuthor,
			queryContext: req.body.queryContext,
			checked: false
		}, function (err, data){
			if(data){
				res.json(data);
			} else{
				console.log("INPUT ERROR === " + err);
			}
		});
	});


	app.get('/model/address/:id', function (req, res, next) {
		var states = [
			{providence: '서울특별시', id: 'SE1100000000' },
			{providence: '부산광역시', id: 'BS2600000000' },
		    {providence: '대구광역시', id: 'DG2700000000' },
		    {providence: '인천광역시', id: 'IC2800000000' },
		    {providence: '광주광역시', id: 'GJ2900000000' },
		    {providence: '대전광역시', id: 'DJ3000000000' },
		    {providence: '울산광역시', id: 'US3100000000' },
		    {providence: '경기도', id: 'KG4100000000' },
		    {providence: '강원도', id: 'GW4200000000' },
		    {providence: '충청북도', id: 'CB4300000000' },
		    {providence: '충청남도', id: 'CN4400000000' },
		    {providence: '전라북도', id: 'JB4500000000' },
		    {providence: '전라남도', id: 'JN4600000000' },
		    {providence: '경상북도', id: 'GB4700000000' },
		    {providence: '경상남도', id: 'GN4800000000' },
		    {providence: '제주특별자치도', id: 'JJ5000000000' }
		];

		var SE1100000000 = [{city: '종로구', id: '1111000000' },{city: '중구', id: '1114000000' },{city: '용산구', id: '1117000000' },{city: '성동구', id: '1120000000' },{city: '광진구', id: '1121500000' },{city: '동대문구', id: '1123000000' },{city: '중랑구', id: '1126000000' },{city: '성북구', id: '1129000000' },{city: '강북구', id: '1130500000' },{city: '도봉구', id: '1132000000' },{city: '노원구', id: '1135000000' },{city: '은평구', id: '1138000000' },{city: '서대문구', id: '1141000000' },{city: '마포구', id: '1144000000' },{city: '양천구', id: '1147000000' },{city: '강서구', id: '1150000000' },{city: '구로구', id: '1153000000' },{city: '금천구', id: '1154500000' },{city: '영등포구', id: '1156000000' },{city: '동작구', id: '1159000000' },{city: '관악구', id: '1162000000' },{city: '서초구', id: '1165000000' },{city: '강남구', id: '1168000000' },{city: '송파구', id: '1171000000' },{city: '강동구', id: '1174000000' }];
		var BS2600000000 = [{city: '중구', id: '2611000000' },{city: '서구', id: '2614000000' },{city: '영도구', id: '2620000000' },{city: '부산진구', id: '2623000000' },{city: '동래구', id: '2626000000' },{city: '남구', id: '2629000000' },{city: '북구', id: '2632000000' },{city: '해운대구', id: '2635000000' },{city: '사하구', id: '2638000000' },{city: '금정구', id: '2641000000' },{city: '강서구', id: '2644000000' },{city: '연제구', id: '2647000000' },{city: '수영구', id: '2650000000' },{city: '사상구', id: '2653000000' },{city: '기장군', id: '2671000000' }];
		var DG2700000000 = [{city: '중구', id: '2711000000' },{city: '동구', id: '2714000000' },{city: '서구', id: '2717000000' },{city: '남구', id: '2720000000' },{city: '북구', id: '2723000000' },{city: '수성구', id: '2726000000' },{city: '달서구', id: '2729000000' },{city: '달성군', id: '2771000000' }];     
		var IC2800000000 = [{city: '중구', id: '2811000000' },{city: '동구', id: '2814000000' },{city: '남구', id: '2817000000' },{city: '연수구', id: '2818500000' },{city: '남동구', id: '2820000000' },{city: '부평구', id: '2823700000' },{city: '계약구', id: '2824500000' },{city: '서구', id: '2871000000' },{city: '강화군', id: '2871000000' },{city: '옹진군', id: '2872000000' }];
		var GJ2900000000 = [{city: '동구', id: '2911000000' },{city: '서구', id: '2914000000' },{city: '남구', id: '2915500000' },{city: '북구', id: '2917000000' },{city: '광산구', id: '2920000000' }];
		var DJ3000000000 = [{city: '동구', id: '3011000000' },{city: '중구', id: '3014000000' },{city: '서구', id: '3017000000' },{city: '유성구', id: '3020000000' },{city: '대덕구', id: '3023000000' }];
		var US3100000000 = [{city: '중구', id: '3111000000' },{city: '남구', id: '3114000000' },{city: '동구', id: '3117000000' },{city: '북구', id: '3120000000' },{city: '울주군', id: '3171000000' }];
		var KG4100000000 = [{city: '수원시 장안구', id: '4111100000' },{city: '수원시 권선구', id: '4111300000' },{city: '수원시 팔당구', id: '4111500000' },{city: '수원시 영통구', id: '4111700000' },{city: '성남시 수정구', id: '4113100000' },{city: '성남시 중원구', id: '4113300000' },{city: '성남시 분당구', id: '4113500000' },{city: '의정부시', id: '4115000000' },{city: '안양시 만안구', id: '4117100000' },{city: '안양시 동안구', id: '4117300000' },{city: '부천시 원미구', id: '4119500000' },{city: '부천시 소사구', id: '4119700000' },{city: '부천시 오정구', id: '4119900000' },{city: '광명시', id: '4121000000' },{city: '평택시', id: '4122000000' },{city: '동두천시', id: '4125000000' },{city: '안산시 상록구', id: '4127100000' },{city: '안산시 단원구', id: '4127300000' },{city: '고양시 덕양구', id: '4128100000' },{city: '고양시 일산동구', id: '4128500000' },{city: '고양시 일산서구', id: '4128700000' },{city: '과천시', id: '4129000000' },{city: '구리시', id: '4131000000' },{city: '남양주시', id: '4136000000' },{city: '오산시', id: '4137000000' },{city: '시흥시', id: '4139000000' },{city: '군포시', id: '4141000000' },{city: '의왕시', id: '4143000000' },{city: '하남시', id: '4145000000' },{city: '용인시 처인구', id: '4146100000' },{city: '용인시 기흥구', id: '4146300000' },{city: '용인시 수지구', id: '4146500000' },{city: '파주시', id: '4148000000' },{city: '이천시', id: '4150000000' },{city: '안성시', id: '4155000000' },{city: '김포시', id: '4157000000' },{city: '화성시', id: '4159000000' },{city: '광주시', id: '4161000000' },{city: '양주시', id: '4163000000' },{city: '포천시', id: '4165000000' },{city: '여주시', id: '4167000000' },{city: '연천군', id: '4180000000' },{city: '가평군', id: '4182000000' },{city: '양평군', id: '4183000000' }];
		var GW4200000000 = [{city: '춘천시', id: '4211000000' },{city: '원주시', id: '4213000000' },{city: '강릉시', id: '4215000000' },{city: '동해시', id: '4217000000' },{city: '태백시', id: '4219000000' },{city: '속초시', id: '4221000000' },{city: '삼척시', id: '4223000000' },{city: '홍천군', id: '4272000000' },{city: '횡성군', id: '4273000000' },{city: '영월군', id: '4275000000' },{city: '평창군', id: '4276000000' },{city: '정선군', id: '4277000000' },{city: '철원군', id: '4278000000' },{city: '화천군', id: '4279000000' },{city: '양구군', id: '4280000000' },{city: '인제군', id: '4281000000' },{city: '고성군', id: '4282000000' },{city: '양양군', id: '4283000000' }];
		var CB4300000000 = [{city: '청주시 상당구', id: '4311100000' },{city: '청주시 서원구', id: '4311200000' },{city: '청주시 홍덕구', id: '4311300000' },{city: '청주시 청원구', id: '4311400000' },{city: '충주시', id: '4313000000' },{city: '제천시', id: '4315000000' },{city: '보은구', id: '4372000000' },{city: '옥천군', id: '4373000000' },{city: '영동군', id: '4374000000' },{city: '증평균', id: '4374500000' },{city: '진천군', id: '4375000000' },{city: '괴산군', id: '4376000000' },{city: '음성군', id: '4377000000' },{city: '단양군', id: '4380000000' }];
		var CN4400000000 = [{city: '천안시 동남구', id: '4413100000' },{city: '천안시 서북구', id: '4413300000' },{city: '공주시', id: '4415000000' },{city: '보령시', id: '4418000000' },{city: '아산시', id: '4420000000' },{city: '서산시', id: '4421000000' },{city: '논산시', id: '4423000000' },{city: '계룡시', id: '4425000000' },{city: '당진시', id: '4427000000' },{city: '금산군', id: '4471000000' },{city: '부여군', id: '4476000000' },{city: '서천군', id: '4477000000' },{city: '청양군', id: '4479000000' },{city: '홍성군', id: '4480000000' },{city: '예산군', id: '4481000000' },{city: '태안군', id: '4482500000' }];
		var JB4500000000 = [{city: '전주시 완산구', id: '4511100000' },{city: '전주시 덕진구', id: '4511300000' },{city: '군산시', id: '4513000000' },{city: '익산시', id: '4514000000' },{city: '정읍시', id: '4518000000' },{city: '남원시', id: '4519000000' },{city: '김제시', id: '4521000000' },{city: '완주군', id: '4571000000' },{city: '진안군', id: '4572000000' },{city: '무주군', id: '4573000000' },{city: '장수군', id: '4574000000' },{city: '임실군', id: '4575000000' },{city: '순창군', id: '4577000000' },{city: '고창군', id: '4579000000' },{city: '부안군', id: '4580000000' }];
		var JN4600000000 = [{city: '목포시', id: '4611000000' },{city: '여수시', id: '4613000000' },{city: '순천시', id: '4615000000' },{city: '나주시', id: '4617000000' },{city: '광양시', id: '4623000000' },{city: '담양군', id: '4671000000' },{city: '곡성군', id: '4672000000' },{city: '구례군', id: '4673000000' },{city: '고흥군', id: '4677000000' },{city: '보성군', id: '4678000000' },{city: '화순군', id: '4679000000' },{city: '장흥군', id: '4680000000' },{city: '강진군', id: '4681000000' },{city: '해남군', id: '4682000000' },{city: '영암군', id: '4683000000' },{city: '무안군', id: '4684000000' },{city: '함평군', id: '4686000000' },{city: '영광군', id: '4687000000' },{city: '장성군', id: '4688000000' },{city: '완도군', id: '4689000000' },{city: '진도군', id: '4690000000' },{city: '신안군', id: '4691000000' }];
		var GB4700000000 = [{city: '포항시 남구', id: '4711100000' },{city: '포항시 북구', id: '4711300000' },{city: '경주시', id: '4713000000' },{city: '김천시', id: '4715000000' },{city: '안동시', id: '4717000000' },{city: '구미시', id: '4719000000' },{city: '영주시', id: '4721000000' },{city: '영천시', id: '4723000000' },{city: '상주시', id: '4725000000' },{city: '문경시', id: '4728000000' },{city: '경산시', id: '4729000000' },{city: '군위군', id: '4772000000' },{city: '의성군', id: '4773000000' },{city: '청송군', id: '4775000000' },{city: '영양군', id: '4776000000' },{city: '영덕군', id: '4777000000' },{city: '청도군', id: '4782000000' },{city: '고령군', id: '4783000000' },{city: '성주군', id: '4784000000' },{city: '칠곡군', id: '4785000000' },{city: '예천군', id: '4790000000' },{city: '봉화군', id: '4792000000' },{city: '울진군', id: '4793000000' },{city: '울릉군', id: '4794000000' }];
		var GN4800000000 = [{city: '창원시 의창구', id: '4812100000' },{city: '창원시 성산구', id: '4812300000' },{city: '창원시 마산합포구', id: '4812500000' },{city: '창원시 마산회원구', id: '4812700000' },{city: '창원시 진해구', id: '4812900000' },{city: '진주시', id: '4817000000' },{city: '통영시', id: '4822000000' },{city: '사천시', id: '4824000000' },{city: '김해시', id: '4825000000' },{city: '밀양시', id: '4827000000' },{city: '거제시', id: '4831000000' },{city: '양산시', id: '4833000000' },{city: '의령군', id: '4872000000' },{city: '함안군', id: '4873000000' },{city: '창녕군', id: '4874000000' },{city: '고성군', id: '4882000000' },{city: '남해군', id: '4884000000' },{city: '하동군', id: '4885000000' },{city: '산청군', id: '4886000000' },{city: '함양군', id: '4887000000' },{city: '거창군', id: '4888000000' },{city: '합천군', id: '4889000000' }];
		var JJ5000000000 = [{city: '제주시', id: '5011000000' },{city: '서귀포시', id: '5013000000' }];

		if(req.params.id == 'states'){
			res.json(states);
		} else if (req.params.id == 'SE1100000000') {
			res.json(SE1100000000);
		} else if (req.params.id == 'BS2600000000') {
			res.json(BS2600000000);
		} else if (req.params.id == 'DG2700000000') {
			res.json(DG2700000000);
		} else if (req.params.id == 'IC2800000000') {
			res.json(IC2800000000);
		} else if (req.params.id == 'GJ2900000000') {
			res.json(GJ2900000000);
		} else if (req.params.id == 'DJ3000000000') {
			res.json(DJ3000000000);
		} else if (req.params.id == 'US3100000000') {
			res.json(US3100000000);
		} else if (req.params.id == 'KG4100000000') {
			res.json(KG4100000000);
		} else if (req.params.id == 'GW4200000000') {
			res.json(GW4200000000);
		} else if (req.params.id == 'CB4300000000') {
			res.json(CB4300000000);
		} else if (req.params.id == 'CN4400000000') {
			res.json(CN4400000000);
		} else if (req.params.id == 'JB4500000000') {
			res.json(JB4500000000);
		} else if (req.params.id == 'JN4600000000') {
			res.json(JN4600000000);
		} else if (req.params.id == 'GB4700000000') {
			res.json(GB4700000000);
		} else if (req.params.id == 'GN4800000000') {
			res.json(GN4800000000);
		} else if (req.params.id == 'JJ5000000000') {
			res.json(JJ5000000000);
		}
		
	});


	app.post('/model/newinfo', function (req, res, next) {
		var newinfo = req.body.newinfo;

		
		if(newinfo.category.subcategory === '대회'){
			if(newinfo.infoImg === undefined){
				db.courts.count({}, function(err, data){
					var count = data+1;
					db.competitions.insert({
						eventCount: count,
						eventSport: newinfo.category.sports,
						eventApproved: false,
						eventRejected: false,
						eventExpired: false,
						registDate: Date(),
						eventAuthor: newinfo.author,
						eventTitle: newinfo.title,
						eventCourtName: newinfo.courtName,
						eventLocation: {
							state: newinfo.location.state,
							city: newinfo.location.city
						},
						eventGPS: {
							lat: newinfo.GPS.lat,
							lng: newinfo.GPS.lng
						},
						eventDate: {
							start1: newinfo.eventDate.start1,
							start2: newinfo.eventDate.start2,
							end1: newinfo.eventDate.end1,
							end2: newinfo.eventDate.end2
						},
						eventRegistDate: {
							start1: newinfo.eventRegist.start1,
							start2: newinfo.eventRegist.start2,
							end1: newinfo.eventRegist.end1,
							end2: newinfo.eventRegist.end2
						},
						eventContact: {
							phone: newinfo.contact.phone,
							phone2: newinfo.contact.phone2,
							phone3: newinfo.contact.phone3,
							email: newinfo.contact.email,
							url: newinfo.contact.url
						},
						eventInfo: newinfo.detailInfo,
						eventImg: 'public/uploads/defaultImg.png',
						eventLikes: 0,
						eventVisits: 0
					}, function (err, data){
						if(data){
							db.users.update({login: newinfo.author}, {'$push' : {competitions: data._id}});
							db.users.update({login: newinfo.author}, {'$inc' : {posted: 1}});
							res.json(data);
						} else{
							console.log("INPUT ERROR === " + err);
						}
					});

				});

			} else {
				var imgFileName = 'comp_' + Date.now();
				db.courts.count({}, function(err, data){
					var count = data+1;
					req.base64Img.img(newinfo.infoImg, './public/uploads/competitions', imgFileName, function(err, filepath) {
						db.competitions.insert({
							eventCount: count,
							eventSport: newinfo.category.sports,
							eventApproved: false,
							eventRejected: false,
							eventExpired: false,
							registDate: Date(),
							eventAuthor: newinfo.author,
							eventTitle: newinfo.title,
							eventCourtName: newinfo.courtName,
							eventLocation: {
								state: newinfo.location.state,
								city: newinfo.location.city
							},
							eventGPS: {
								lat: newinfo.GPS.lat,
								lng: newinfo.GPS.lng
							},
							eventDate: {
								start1: newinfo.eventDate.start1,
								start2: newinfo.eventDate.start2,
								end1: newinfo.eventDate.end1,
								end2: newinfo.eventDate.end2
							},
							eventRegistDate: {
								start1: newinfo.eventRegist.start1,
								start2: newinfo.eventRegist.start2,
								end1: newinfo.eventRegist.end1,
								end2: newinfo.eventRegist.end2
							},
							eventContact: {
								phone: newinfo.contact.phone,
								phone2: newinfo.contact.phone2,
								phone3: newinfo.contact.phone3,
								email: newinfo.contact.email,
								url: newinfo.contact.url
							},
							eventInfo: newinfo.detailInfo,
							eventImg: filepath,
							eventLikes: 0,
							eventVisits: 0
						}, function (err, data){
							if(data){
								db.users.update({login: newinfo.author}, {'$push' : {competitions: data._id}});
								db.users.update({login: newinfo.author}, {'$inc' : {posted: 1}});
								res.json(data);
							} else{
								console.log("INPUT ERROR === " + err);
							}
						});
					});
				});
			}





		} else if (newinfo.category.subcategory === '코트'){
			if(newinfo.infoImg === undefined){
				db.courts.count({}, function(err, data){
					var count = data+1;
					db.courts.insert({
						courtCount: count,
						courtSport: newinfo.category.sports,
						courtApproved: false,
						courtRejected: false,
						courtExpired: false,
						registDate: Date(),
						courtAuthor: newinfo.author,
						courtLocation: {
							state: newinfo.location.state,
							city: newinfo.location.city
						},
						courtGPS: {
							lat: newinfo.GPS.lat,
							lng: newinfo.GPS.lng
						},
						courtContact: {
							phone: newinfo.contact.phone,
							phone2: newinfo.contact.phone2,
							phone3: newinfo.contact.phone3,
							email: newinfo.contact.email,
							url: newinfo.contact.url
						},
						courtInfo: newinfo.detailInfo,
						courtImg: 'public/uploads/defaultImg.png',
						courtRate: {
							voters: 0,
							rate: 0,
							comments: []
						},
						courtVisits: 0,
						courtLikes: 0
					}, function (err, data){
						if(data){
							db.users.update({login: newinfo.author}, {'$push' : {courts: data._id}});
							db.users.update({login: newinfo.author}, {'$inc' : {posted: 1}});
							res.json(data);
						} else{
							console.log("INPUT ERROR === " + err);
						}
					});
				
				});
			
			} else {
				var imgFileName = 'court_' + Date.now();
				db.courts.count({}, function(err, data){
					var count = data+1;
					req.base64Img.img(newinfo.infoImg, './public/uploads/courts', imgFileName, function(err, filepath) {
						db.courts.insert({
							courtCount: count,
							courtSport: newinfo.category.sports,
							courtApproved: false,
							courtRejected: false,
							courtExpired: false,
							registDate: Date(),
							courtAuthor: newinfo.author,
							courtTitle: newinfo.title,
							courtCourtName: newinfo.courtName,
							courtLocation: {
								state: newinfo.location.state,
								city: newinfo.location.city
							},
							courtGPS: {
								lat: newinfo.GPS.lat,
								lng: newinfo.GPS.lng
							},
							courtContact: {
								phone: newinfo.contact.phone,
								phone2: newinfo.contact.phone2,
								phone3: newinfo.contact.phone3,
								email: newinfo.contact.email,
								url: newinfo.contact.url
							},
							courtInfo: newinfo.detailInfo,
							courtImg: filepath,
							courtRate: {
								voters: 0,
								rate: 0,
								comments: []
							},
							courtVisits: 0,
							courtLikes: 0
						}, function (err, data){
							if(data){
								db.users.update({login: newinfo.author}, {'$push' : {courts: data._id}});
								db.users.update({login: newinfo.author}, {'$inc' : {posted: 1}});
								res.json(data);
							} else{
								console.log("INPUT ERROR === " + err);
							}
						});
					});
				});
			}







		} else if (newinfo.category.subcategory === '동호회') {
			if(newinfo.infoImg === undefined){
				db.courts.count({}, function(err, data){
					var count = data+1;

					db.clubs.insert({
						clubCount: count,
						clubSport: newinfo.category.sports,
						clubApproved: false,
						clubRejected: false,
						clubExpired: false,
						registDate: Date(),
						clubAuthor: newinfo.author,
						clubTitle: newinfo.title,
						clubLocation: {
							state: newinfo.location.state,
							city: newinfo.location.city
						},
						clubCourtName : newinfo.courtName,
						clubGPS: {
							lat: newinfo.GPS.lat,
							lng: newinfo.GPS.lng
						},
						clubContact: {
							phone: newinfo.contact.phone,
							phone2: newinfo.contact.phone2,
							phone3: newinfo.contact.phone3,
							email: newinfo.contact.email,
							url: newinfo.contact.url
						},
						clubInfo: newinfo.detailInfo,
						clubImg: 'public/uploads/defaultImg.png',
						clubMembers: [{"id": newinfo.author}],
						clubVisits: 0,
						clubLikes: 0,
					}, function (err, data){
						if(data){
							db.users.update({login: newinfo.author}, {'$push' : {clubs: data._id}});
							db.users.update({login: newinfo.author}, {'$inc' : {posted: 1}});
							res.json(data);
						} else{
							console.log("INPUT ERROR === " + err);
						}
					});
			
				});



			} else {
				var imgFileName = 'club_' + Date.now();
				db.courts.count({}, function(err, data){
					var count = data+1;
					req.base64Img.img(newinfo.infoImg, './public/uploads/clubs', imgFileName, function(err, filepath) {
						db.clubs.insert({
							clubCount: count,
							clubSport: newinfo.category.sports,
							clubApproved: false,
							clubRejected: false,
							clubExpired: false,
							registDate: Date(),
							clubAuthor: newinfo.author,
							clubTitle: newinfo.title,
							clubLocation: {
								state: newinfo.location.state,
								city: newinfo.location.city
							},
							clubCourtName : newinfo.courtName,
							clubGPS: {
								lat: newinfo.GPS.lat,
								lng: newinfo.GPS.lng
							},
							clubContact: {
								phone: newinfo.contact.phone,
								phone2: newinfo.contact.phone2,
								phone3: newinfo.contact.phone3,
								email: newinfo.contact.email,
								url: newinfo.contact.url
							},
							clubInfo: newinfo.detailInfo,
							clubImg: filepath,
							clubMembers: [{"id": newinfo.author}],
							clubVisits: 0,
							clubLikes: 0,
						}, function (err, data){
							if(data){
								db.users.update({login: newinfo.author}, {'$push' : {clubs: data._id}});
								db.users.update({login: newinfo.author}, {'$inc' : {posted: 1}});
								res.json(data);
							} else{
								console.log("INPUT ERROR === " + err);
							}
						});
					});
				});

			}

		}
	});


	app.get('/model/numbers/:sports', function (req, res, next){
		var num = [];
		var sports = req.params.sports;

		db.competitions.find({eventSport: sports, eventApproved: true, eventExpired: false}, function (err, data1){
			var compNum = data1.length;
			num.push(compNum);

			db.courts.find({courtSport: sports, courtApproved: true, courtExpired: false}, function (err, data2){
				var courtsNum = data2.length;
				num.push(courtsNum);

				db.clubs.find({clubSport: sports, clubApproved: true, clubExpired: false}, function (err, data3){
					var clubsNum = data3.length;
					num.push(clubsNum);

					res.json(num);
					
				})
			})
		})
	});



	app.get('/model/dataIterate', function (req, res, next){
		var today = new Date();
		db.competitions.find({eventExpired: false}, function (err, data){
			for(var i in data){
				var endDate = new Date(data[i].eventDate.start2);


				if(today > endDate){
					console.log('======dataIterate======');
					console.log('today = ' + today);
					console.log('endDate = ' + endDate);


					var id = data[i]._id;
					var imgPath = data[i].eventImg;
					if (imgPath == 'public/uploads/defaultImg.png'){
						db.competitions.update({_id: db.ObjectId(id)}, 
							{ "$set": {
								eventExpired : true,
								eventImg : 'public/uploads/expired1.png'
							}
						});
					} else {
						fs.unlink(imgPath, function(){
							db.competitions.update({_id: db.ObjectId(id)}, 
								{ "$set": {
									eventExpired : true,
									eventImg : 'public/uploads/expired1.png'
								}
							});
						});
					}					




				} else {
					console.log('today = ' + today);
				}
			}
		});
	});

	app.get('/model/search/:query', function (req, res, next){
		var query = req.params.query;

		db.competitions.find()

	});

	app.post('/model/admin/:query', function (req, res, next){
		
		var query = req.params.query;

		if(query === 'login'){
			var id = req.body.id;
			var pwd = req.body.pwd;
			if(id == '1' && pwd == '2'){
				res.json({"status": "1"});
			} else {
				res.json({"status": "2"});
			}			
		} else if (query === 'users'){
			db.users.find({}, function (err, data){
				res.json(data);
			});
		} else if (query === 'query'){
			db.query.find({queryType : 'query'}, function (err, data){
				res.json(data);
			});
		} else if (query === 'queryUpdate'){
			var id = req.body.id;

			db.query.update({_id: db.ObjectId(id)},
				{ "$set" : {checked: true}}, function (err, data){
					res.json(data);
			});
		} else if (query === 'ads'){
			db.query.find({queryType : 'ads'}, function (err, data){
				res.json(data);
			});
		} else if (query === 'noti'){
			var type = req.body.type;

			db.noti.find({type : type}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		} else if (query === 'notiActive'){
			var id = req.body.id;

			db.noti.update({_id: db.ObjectId(id)},
				{ "$set" : {active: true}}, function (err, data){
					res.json(data);
			});
		} else if (query === 'notiDeActive'){
			var id = req.body.id;

			db.noti.update({_id: db.ObjectId(id)},
				{ "$set" : {active: false}}, function (err, data){
					res.json(data);
			});
		} else if (query === 'notiNew'){
			var newNoti = req.body.newNoti;

			var imgFileName = newNoti.type + '_' + Date.now();
			req.base64Img.img(newNoti.img, './public/uploads/noti', imgFileName, function(err, filepath) {

				db.noti.insert({
					type : newNoti.type,
					date : Date(),
					title : newNoti.title,
					link : newNoti.link,
					img : filepath,
					active : false
				}, function (err, data){
					res.json(data);
				});
			});
		} else if (query === 'notiNew2'){
			var newNoti = req.body.newNoti;

			db.noti.insert({
				type : newNoti.type,
				date : Date(),
				title : newNoti.title,
				link : newNoti.link,
				active : false
			}, function (err, data){
				res.json(data);
			});

		} else if (query === 'notiDelete'){
			var id = req.body.id;

			db.noti.find({_id: db.ObjectId(id)}, function (err, data){
				//console.log(data[0]);
				if(data[0].img){
					var imgPath = data[0].img;
					fs.unlink(imgPath, function(){
						db.noti.remove({_id: db.ObjectId(id)}, function (err, data){
							res.json(data);
						});
					});
				} else {
					db.noti.remove({_id: db.ObjectId(id)}, function (err, data){
						res.json(data);
					});
				}
			});
		} else if (query === 'competitions'){
			db.competitions.find({}).sort({"_id": -1}, function (err, data){
				res.json(data);
			});
		} else if (query === 'courts'){
			db.courts.find({}).sort({"_id": -1}, function (err, data){
				res.json(data);
			});
		} else if (query === 'clubs'){
			db.clubs.find({}).sort({"_id": -1}, function (err, data){
				res.json(data);
			});
		} else if (query === 'infoApprove'){
			var id = req.body.id;
			var category = req.body.category;

			if(category === 'competitions'){
				db.competitions.update({_id: db.ObjectId(id)},
				{ "$set" : {eventApproved: true}}, function (err, data){
						res.json(data);
				});
			} else if (category === 'courts'){
				db.courts.update({_id: db.ObjectId(id)},
				{ "$set" : {courtApproved: true}}, function (err, data){
						res.json(data);
				});
			} else if (category === 'clubs'){
				db.clubs.update({_id: db.ObjectId(id)},
				{ "$set" : {clubApproved: true}}, function (err, data){
						res.json(data);
				});
			}
		} else if (query === 'infoReject'){
			var id = req.body.id;
			var category = req.body.category;

			if(category === 'competitions'){
				db.competitions.find({_id: db.ObjectId(id)}, function (err, data){
					var imgPath = data[0].eventImg;
					fs.unlink(imgPath, function(){
						db.competitions.update({_id: db.ObjectId(id)},
						{ "$set" : { eventRejected: true, eventImg : 'public/uploads/expired.png' }}, 
						function (err, data){
								res.json(data);
						});
					});
				});

			} else if (category === 'courts'){
				db.courts.find({_id: db.ObjectId(id)}, function (err, data){
					var imgPath = data[0].courtImg;
					fs.unlink(imgPath, function(){
						db.courts.update({_id: db.ObjectId(id)},
						{ "$set" : { courtRejected: true, courtImg : 'public/uploads/expired.png' }}, 
						function (err, data){
								res.json(data);
						});
					});
				});

			} else if (category === 'clubs'){
				db.clubs.find({_id: db.ObjectId(id)}, function (err, data){
					var imgPath = data[0].clubImg;
					fs.unlink(imgPath, function(){
						db.clubs.update({_id: db.ObjectId(id)},
						{ "$set" : { clubRejected: true, clubImg : 'public/uploads/expired.png' }}, 
						function (err, data){
								res.json(data);
						});
					});
				});
			}

		} else if (query === 'infoDelete'){
			var id = req.body.id;
			var category = req.body.category;

			if(category === 'competitions'){
				db.competitions.find({_id: db.ObjectId(id)}, function (err, data){
					var imgPath = data[0].eventImg;
					if(imgPath === 'public/uploads/expired1.png' || imgPath === 'public/uploads/defaultImg.png'){
						db.competitions.remove({_id: db.ObjectId(id)}, function (err, data){
							res.json(data);
						});
					} else {
						fs.unlink(imgPath, function(){
							db.competitions.remove({_id: db.ObjectId(id)}, function (err, data){
								res.json(data);
							});
						});	
					}
				});
			} else if (category === 'courts'){
				db.courts.find({_id: db.ObjectId(id)}, function (err, data){
					var imgPath = data[0].courtImg;
					if(imgPath === 'public/uploads/expired1.png' || imgPath === 'public/uploads/defaultImg.png'){
						db.courts.remove({_id: db.ObjectId(id)}, function (err, data){
							res.json(data);
						});
					} else {
						fs.unlink(imgPath, function(){
							db.courts.remove({_id: db.ObjectId(id)}, function (err, data){
								res.json(data);
							});
						});						
					}
				});
			} else if (category === 'clubs'){
				db.clubs.find({_id: db.ObjectId(id)}, function (err, data){
					var imgPath = data[0].clubImg;
					if(imgPath === 'public/uploads/expired1.png' || imgPath === 'public/uploads/defaultImg.png'){
						db.clubs.remove({_id: db.ObjectId(id)}, function (err, data){
							res.json(data);
						});
					} else {
						fs.unlink(imgPath, function(){
							db.clubs.remove({_id: db.ObjectId(id)}, function (err, data){
								res.json(data);
							});
						});						
					}

				});
			}
		} else if (query === 'getInfo'){
			var id = req.body.id;
			var category = req.body.category;

			if(category === 'competitions'){
				db.competitions.find({_id: db.ObjectId(id)}, function (err, data){
					res.json(data);
				});
			} else if (category === 'courts'){
				db.courts.find({_id: db.ObjectId(id)}, function (err, data){
					res.json(data);
				});
			} else if (category === 'clubs'){
				db.clubs.find({_id: db.ObjectId(id)}, function (err, data){
					res.json(data);
				});
			}
		} else if (query === 'modifyData'){
			var id = req.body.id;
			var category = req.body.category;
			var data = req.body.data;

			if(category === 'competitions'){
				db.competitions.update({_id: db.ObjectId(id)},
				{
					"$set": {
						eventTitle: data.title,
						eventCourtName: data.courtName,
						eventLocation: {
							state: data.location.state,
							city: data.location.city
						},
						eventGPS: {
							lat: data.GPS.lat,
							lng: data.GPS.lng
						},
						eventDate: {
							start1: data.eventDate.start1,
							start2: data.eventDate.start2,
							end1: data.eventDate.end1,
							end2: data.eventDate.end2
						},
						eventRegistDate: {
							start1: data.eventRegist.start1,
							start2: data.eventRegist.start2,
							end1: data.eventRegist.end1,
							end2: data.eventRegist.end2
						},
						eventContact: {
							phone: data.contact.phone,
							phone2: data.contact.phone2,
							phone3: data.contact.phone3,
							email: data.contact.email,
							url: data.contact.url
						},
						eventInfo: data.detailInfo
					}
				}, function (err, data){
					res.json(data);
				});
			} else if (category === 'courts'){

				db.courts.update({_id: db.ObjectId(id)},
				{
					"$set": {
						courtTitle: data.title,
						courtCourtName: data.courtName,
						courtLocation: {
							state: data.location.state,
							city: data.location.city
						},
						courtGPS: {
							lat: data.GPS.lat,
							lng: data.GPS.lng
						},
						courtContact: {
							phone: data.contact.phone,
							phone2: data.contact.phone2,
							phone3: data.contact.phone3,
							email: data.contact.email,
							url: data.contact.url
						},
						courtInfo: data.detailInfo
					}
				}, function (err, data){
					res.json(data);
				});
			} else if (category === 'clubs'){
				db.clubs.update({_id: db.ObjectId(id)},
				{
					"$set": {
						clubTitle: data.title,
						clubCourtName: data.courtName,
						clubLocation: {
							state: data.location.state,
							city: data.location.city
						},
						clubGPS: {
							lat: data.GPS.lat,
							lng: data.GPS.lng
						},
						clubContact: {
							phone: data.contact.phone,
							phone2: data.contact.phone2,
							phone3: data.contact.phone3,
							email: data.contact.email,
							url: data.contact.url
						},
						clubInfo: data.detailInfo
					}
				}, function (err, data){
					res.json(data);
				});
			}
		}






	});

	app.post('/model/profile', function (req, res, next) {
		var id = req.body.id;

		db.users.find({login: id}, function (err, data){
			var pwLength = data[0].password.length;
			data[0].password = '';
			data[0]._id = '';
			for (var i=0; i<pwLength; i++){
				data[0].password += '*';
			}
			res.json(data);
		});

	});

	app.post('/model/profile/userImg', function (req, res, next) {
		var newInfo = req.body.newInfo;
		var imgFileName = newInfo.id + '_' + Date.now();

		db.users.find({login: newInfo.id}, function (err, data){
			if(data[0].img === null){
				req.base64Img.img(newInfo.img, './public/uploads/users', imgFileName, function (err, filepath) {
					db.users.update({login: newInfo.id}, {"$set": {img: filepath}}, 
						function (err, data){
							res.json(data);
					});
				});
			} else {
				var imgPath = data[0].img;
				fs.unlink(imgPath, function(){
					req.base64Img.img(newInfo.img, './public/uploads/users', imgFileName, function (err, filepath) {
						db.users.update({login: newInfo.id}, {"$set": {img: filepath}}, 
							function (err, data){
								res.json(data);
						});

					});
				});				
			}
		});
	});


	app.get('/model/noti', function (req, res, next){
		db.noti.find({type: "noti", active: true}).limit(5).sort({"_id" : -1}, function (err, data){
			res.json(data);
		});
	});



	app.get('/model/:sports/:category', function (req, res, next) {
		var sports = req.params.sports;
		var category = req.params.category;


		if(category === 'competitions'){
			db.competitions.find({eventSport: sports, eventApproved: true, eventExpired: false}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		} else if (category === 'courts'){
			db.courts.find({courtSport: sports, courtApproved: true, courtExpired: false}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		} else if (category === 'clubs'){
			db.clubs.find({clubSport: sports, clubApproved: true, clubExpired: false}).sort({"_id" : -1}, function (err, data){
				res.json(data);
			});
		}
	});

	app.get('/model/:sports/:category/:id', function (req, res, next) {
		var sports = req.params.sports;
		var category = req.params.category;
		var id = req.params.id;

		if(category === 'competitions'){
			db.competitions.update({_id: req.db.ObjectId(id)}, {"$inc" : {"eventVisits": 1}});

			db.competitions.find({_id: req.db.ObjectId(id)}, function (err, data){
				res.json(data);
			});
		} else if (category === 'courts'){
			db.courts.update({_id: req.db.ObjectId(id)}, {"$inc" : {"courtVisits": 1}});

			db.courts.find({_id: req.db.ObjectId(id)}, function (err, data){
				res.json(data);
			});
		} else if (category === 'clubs'){
			db.clubs.update({_id: req.db.ObjectId(id)}, {"$inc" : {"clubVisits": 1}});

			db.clubs.find({_id: req.db.ObjectId(id)}, function (err, data){
				res.json(data);
			});
		}
	});

	app.get('/model/:sports/:category/:id/heart', function (req, res, next) {
		var sports = req.params.sports;
		var category = req.params.category;
		var id = req.params.id;

		if(category === 'competitions'){
			db.competitions.update({_id: req.db.ObjectId(id)}, {"$inc" : {"eventLikes": 1}}, function (err, data){
				res.json(data);
			});
		} else if (category === 'courts'){
			db.courts.update({_id: req.db.ObjectId(id)}, {"$inc" : {"courtLikes": 1}}, function (err, data){
				res.json(data);
			});
		} else if (category === 'clubs'){
			db.clubs.update({_id: req.db.ObjectId(id)}, {"$inc" : {"clubLikes": 1}}, function (err, data){
				res.json(data);
			});
		}

	});







	





};