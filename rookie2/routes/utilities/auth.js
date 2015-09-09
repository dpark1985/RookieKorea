exports.active = function(everyauth, db){
	//everyauth 모듈 기본 설정
	var auth = everyauth.password.loginWith('login');
	everyauth.everymodule.userPkey('_id');
	everyauth.everymodule.findUserById(function(id, callback){
		db.users.findOne({
			_id: db.ObjectId(id)
		}, function(error, user){
			callback(error, user);
		});
	});


	//로그아웃 설정
	everyauth.everymodule.logoutPath('/logout');
	everyauth.everymodule.logoutRedirectPath('/');


	//가입 설정
	auth.registerView('register');
	auth.getRegisterPath('/register');
	auth.postRegisterPath('/register');
	auth.extractExtraRegistrationParams(function (req) {
		return {
			name: req.param('name'),
			confirmPassword: req.param('cpassword')
		}
	});
	auth.validateRegistration(function (userAttribute, errors){ 
		var promise = this.Promise();

		if (userAttribute.password.length < 8) {
			errors.push(getCode('auth:3'));
		}

		if (userAttribute.confirmPassword != userAttribute.password){
			errors.push(getCode('auth:4'));
		}

		db.users.findOne({login: userAttribute.login}, function (error, result){
			if(result){errors.push(getCode('auth:5'));}
			if(errors.length){
				promise.fulfill(errors);
			} else{
				promise.fulfill(userAttribute);
			}
		});

		return promise;
	});
	auth.registerUser(function (userAttribute){ 
		var promise = this.Promise();

		db.users.insert({
			name: userAttribute.name,
			login: userAttribute.login,
			password: userAttribute.password,
			since: Date(),
			visits: 0,
			competitions: [],
			courts: [],
			clubs: [],
			likes: [],
			posted: [],
			img: null
		}, function(error, result){
			if(result){
				promise.fulfill(result);
			} else{
				promise.fulfill([getCode('auth:1')]);
			}
		});
		return promise;
	});
	auth.registerSuccessRedirect('/');



	//로그인 설정
	auth.loginView('login');
	auth.getLoginPath('/login');
	auth.postLoginPath('/login');
	auth.authenticate(function(login, password){ 
		var promise = this.Promise();

		db.users.findOne({
			login: login,
			password: password
		}, function(error, user){
			if(error){
				promise.fulfill([getCode('auth:1')]);
			} else if(user){
				db.users.update({login: login}, {"$inc" : {"visits" : 1}});
				promise.fulfill(user);
			} else{
				promise.fulfill([getCode('auth:2')]);
			}
		});
		
		return promise;
	});
	auth.loginSuccessRedirect('/');

};