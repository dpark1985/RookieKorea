exports.active = function(everyauth, db){
	// everyauth module initial setting
	var auth = everyauth.password.loginWith('login');
	everyauth.everymodule.userPkey('_id');
	everyauth.everymodule.findUserById(function(id, callback){
		db.users.findOne({
			_id: db.ObjectId(id)
		}, function(error, user){
			callback(error, user);
		});
	});

	// Log out
	everyauth.everymodule.logoutPath('/logout');
	everyauth.everymodule.logoutRedirectPath('/');

	// Rregistration Configuration
	auth.registerView('register');
	auth.getRegisterPath('/register');
	auth.postRegisterPath('/register');
	auth.extractExtraRegistrationParams(function (req) {
		return {
			userType: req.param('userType'),
			loginEmail: req.param('loginEmail')
		}
	});
	auth.validateRegistration(function (userAttribute, errors){ 
		var promise = this.Promise();

		promise.fulfill(userAttribute);

		return promise;
	});
	auth.registerUser(function (userAttribute){ 
		var promise = this.Promise();

		db.users.insert({
			userType: userAttribute.userType,
			loginEmail: userAttribute.loginEmail,
			login: userAttribute.login,
			password: userAttribute.password
		}, function (error, result){
			if(error) return promise.fulfill([error]);
			promise.fulfill(result);
		});
		return promise;
	});
	auth.registerSuccessRedirect('/');

	// Login Configuration
	auth.loginView('login');
	auth.getLoginPath('/login');
	auth.postLoginPath('/login');
	auth.authenticate(function (login, password){ 
		var promise = this.Promise();
		var errors = [];

		db.users.findOne({ login: login, password: password }, function (error, user){
				if(user == null){
					errors.push('아이디 또는 비밀번호가 맞지 않습니다.');
					return promise.fulfill(errors);
				}
				promise.fulfill(user);
		});
		
		return promise;
	});
	auth.loginSuccessRedirect('/customModel/userData');
};