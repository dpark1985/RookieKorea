exports.active = function(nconf){
	Object.defineProperties(String.prototype, {
		isEmptyString:{
			value: function(){
				if(this.trim() == ''){
					return true;
				} else{
					return false;
				}
			}
		}
	});
	Object.defineProperties(Array.prototype, {
		contain: {
			value: function (data){
				if(this.indexOf(data) != -1){
					return true;
				} else{
					return false;
				}
			}
		},
		remove: {
			value: function(data){
				var index = this.indexOf(data);
				if(index != -1){this.removeAt(index);}
			}
		},
		removeAt: {
			value: function(index){
				this.splice(index, 1);
				return this;
			}
		}
	});

	//기본 함수 추출
	var parse = require('express/node_modules/cookie').parse;
	var parseSC = require('cookie-parser/lib/parse').signedCookies;

	global.parseCookie = function(cookie){
		return parseSC(parse(cookie), 'your secret here');
	};

	global.getCode = function(code){
		return {
			code: code,
			message: nconf.get(code)
		};
	};

	global.responseWithSuccess = function(response, code){
		response.json(getCode(code), 200);
	};

	global.responseWithError = function(response, code){
		response.json(getCode(code), 400);
	};

	global.isLogin = function(request, response, successCallback, failCallback){
		if(request.user){
			successCallback(request.user);
		} else{
			if(failCallback){
				failCallback();
			}else{
				responseWithError('error:1');
			}
		}
	};
};