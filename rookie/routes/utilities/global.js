exports.active = function(nconf){



	global.getCode = function(code){
		return {
			code: code,
			message: nconf.get(code)
		};
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