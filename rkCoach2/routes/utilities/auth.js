exports.active = function(everyauth, db, crypto){
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
	auth.registerView('log/register');
	auth.getRegisterPath('/register');
	auth.postRegisterPath('/register');
	auth.extractExtraRegistrationParams(function (req) {
		return {
			userType: req.param('userType'),
			name: req.param.name,
			phone: req.param.phone,
			loginEmail: req.param.loginEmail,
			password2: req.param.password2,
			termsAgreed: req.param.termsAgreed
		}
	});
	auth.validateRegistration(function (userAttribute, errors){ 
		var promise = this.Promise();

		if(userAttribute.userType == null || userAttribute.userType == undefined){
			errors.push('회원 카테고리를 선택해 주세요.');
		}

		if(userAttribute.name == null || userAttribute.name == undefined){
			errors.push('이름을 입력해 주세요.');
		}

		if(userAttribute.phone == null || userAttribute.phone == undefined){
			errors.push('전화번호를 입력해주세요.');
		}

		if(userAttribute.phone.match('-')){
			var p1 = userAttribute.phone.split('-')[0];
			var p2 = userAttribute.phone.split('-')[1];
			var p3 = userAttribute.phone.split('-')[2];


			if(p1.length != 3){
				errors.push('전화번호가 잘못 입력되었습니다.');
			} else if(p3.length != 4){
				errors.push('전화번호가 잘못 입력되었습니다.');
			} else {
				var p4 = p1.concat(p2);
				var p5 = p4.concat(p3);
				userAttribute.phone = p5;
			}				
		} else {
			if(userAttribute.phone.length != 11){
				errors.push('전화번호가 잘못 입력되었습니다.');
			}
		}

		if(userAttribute.termsAgreed == null || userAttribute.termsAgreed == undefined){
			errors.push('이용약관 및 개인정보보호방침에 동의해 주세요.');
		}

		if(userAttribute.password.length < 8){
			errors.push('비밀번호가 8글자 이하입니다.');
		}

		if(userAttribute.password.length > 32){
			errors.push('비밀번호가 32글자 이상입니다.');
		}

		if(userAttribute.password != userAttribute.password2){
			errors.push('입력하신 비밀번호가 일치하지 않습니다.');
		}

		db.users.findOne({ login: userAttribute.login }, function (error, user){
			if(user){
				console.log('exist === '+user);
				errors.push('이미 등록된 아이디 입니다.');	
			} 
			if(errors.length){
				promise.fulfill(errors);
			} else {
				db.users.findOne({ loginEmail: userAttribute.loginEmail }, function (error, user){
					if(user){
						errors.push('이미 등록된 이메일 입니다.');
					} 
					if(errors.length){
						promise.fulfill(errors);
					} else {
						var cryptoPassword = 'ROOKIEKOREA';
						var cipher = crypto.createCipher('aes192', cryptoPassword);
						cipher.update(userAttribute.password, 'utf8', 'base64');
						var cipheredOut = cipher.final('base64');
						userAttribute.password = cipheredOut;

						promise.fulfill(userAttribute);
					}
				});
			}
		});

		return promise;
	});
	auth.registerUser(function (userAttribute){ 
		var promise = this.Promise();

		db.users.insert({
			userType: userAttribute.userType,
			userName: userAttribute.name,
			phone: userAttribute.phone,
			loginEmail: userAttribute.loginEmail,
			login: userAttribute.login,
			password: userAttribute.password,
			initialSetup: false
		}, function (error, result){
			if(error) return promise.fulfill([error]);
			promise.fulfill(result);
		});
		return promise;
	});
	auth.registerSuccessRedirect('/profile');

	// Login Configuration
	auth.loginView('log/login');
	auth.getLoginPath('/login');
	auth.postLoginPath('/login');
	auth.authenticate(function (login, password){ 
		var promise = this.Promise();
		var errors = [];


		var cryptoPassword = 'ROOKIEKOREA';

		var cipher = crypto.createCipher('aes192', cryptoPassword);
		cipher.update(password, 'utf8', 'base64');
		var cipheredOut = cipher.final('base64');

/*
		var decipher = crypto.createDecipher('aes192', cryptoPassword);
		decipher.update(cipheredOut, 'base64', 'utf8');
		var decipheredOutput = decipher.final('utf8');
*/


		db.users.findOne({ login: login, password: cipheredOut }, function (error, user){
				if(user == null){
					errors.push('아이디 또는 비밀번호가 맞지 않습니다.');
					return promise.fulfill(errors);
				}
				promise.fulfill(user);
		});
		
		return promise;
	});
	auth.loginSuccessRedirect('/profile');
};