angular.module('log', ['common'])



.controller('logCtrl', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http){
	

	$scope.loginErrMessages = []
	$scope.errExist = false;


	$scope.loginSubmit = function(){
		$http.post('/login', {login: $scope.userId, password: $scope.userPw})
		.then(function successCallback(res){
			//console.log(res);

			if(res.data.login == true){
				$window.location.href = '/';
			} else {
				$scope.errExist = true;

				var si = res.data.indexOf("<error>") + 6;
				var ei = res.data.indexOf("</error>");


				var errMessages = res.data.substring(si, ei).split("</li>");

				for(var i in errMessages){
					var endIndex = errMessages[i].length-21;
					errMessages[i] = errMessages[i].substr(16, endIndex);
					$scope.loginErrMessages.push(errMessages[i]);
				}
				$scope.loginErrMessages.pop();
			}
		}, function errorCallback(res){

		});
	}



	$scope.registData = [];
	$scope.errors = [false,false,false,false,false,false,false,false,false,false];
	$scope.errMessages = [
		"사용자 구분을 선택해 주세요.",
		"이메일을 입력해 주세요.",
		"아이디를 입력해 주세요.",
		"비밀번호를 입력해 주세요.",
		"비밀번호 8자 이상 32자 이하로 입력해주세요.",
		"Re:비밀번호를 입력해 주세요.",
		"비밀번호가 일치하지 않습니다.",
		"이용약관 및 개인정보보호방침에 동의해 주세요.",
		"잘못 입력하셨습니다. 다시 입력해 주세요.",
		"이미 등록되어 있는 이메일 입니다."
	];

	$scope.isErr = function(index){
		if ($scope.errors[index])
			return true;
		 else
			return false;
	}

	$scope.errOn = function(index, value){

		if(index == 0){
			if($scope.registData.userType.length > 0){
				$scope.errors[0] = false;
				$('#errorAlert0').alert('close');
			} else {
				$scope.errors[0] = true;
			}
		}

		if(index == 1){
			if(value){
				$scope.errors[1] = false;
				$('#errorAlert1').alert('close');
			} else {
				$scope.errors[1] = true;
			}

			if(value.split(' ').length >= 2 || value.split('@').length <= 1 || value.split('.').length <= 1){
				$scope.errors[8] = true;
			} else {


				var req = {
					method: 'POST',
					url: '/customModel/UserRegist',
					data: { loginEmail: $scope.registData.loginEmail }
				}

				$http(req).then(
					function (res){
					console.log(res);

						if (res.data != null){
							$scope.errors[9] = true;
						} else {
							$scope.userTypeing = false;
							$scope.errors[9] = false;
							$('#errorAlert9').alert('close');
						}
					}, 
					function (res){
	
					});



				$scope.errors[8] = false;
				$('#errorAlert8').alert('close');
			}
		}


		if(index == 2){
			if(value.length == 0){
				$scope.errors[2] = true;
			} else {
				$scope.errors[2] = false;
				$('#errorAlert2').alert('close');
			}
		}


		if(index == 3){
			console.log(value);

			if(value){
				$scope.errors[3] = false;
				$('#errorAlert4').alert('close');
			}

			if(value.length < 8 ){
				$scope.errors[4] = true;
			} else {
				$scope.errors[4] = false;
				$('#errorAlert4').alert('close');
			}

			if($scope.registData.userPw2 && ($scope.registData.userPw != $scope.registData.userPw2)){
				$scope.errors[6] = true;
			} else {
				$scope.errors[6] = false;
				$('#errorAlert6').alert('close');
			}
		}

		if(index == 5){
			if(value){
				$scope.errors[5] = false;
				$('#errorAlert5').alert('close');
			}

			if(value != $scope.registData.userPw){
				$scope.errors[6] = true;
			} else {
				$scope.errors[6] = false;
				$('#errorAlert6').alert('close');
			}
		}

		if(index == 7){
			if(value == undefined || value == ""){
				$scope.errors[index] = true;
			} else {
				$('#errorAlert'+index).alert('close');
				$scope.errors[index] = false;
			}			
		}

		
		
	}

	$scope.registerSubmit = function() {

		if($scope.registData.userType == undefined){
			$scope.errors[0] = true;
		} else {
			$scope.errors[0] = false;
			$('#errorAlert0').alert('close');
		}

		if($scope.registData.loginEmail == "" || $scope.registData.loginEmail == null){
			$scope.errors[1] = true;
		} else {
			$scope.errors[1] = false;
			$('#errorAlert1').alert('close');
		}

		if($scope.registData.userId == "" || $scope.registData.userId == null){
			$scope.errors[2] = true;
		} else {
			$scope.errors[2] = false;
			$('#errorAlert2').alert('close');
		}

		if($scope.registData.userPw == "" || $scope.registData.userPw == null){
			$scope.errors[3] = true;
		} else {
			$scope.errors[3] = false;
			$('#errorAlert3').alert('close');
		}

		if ($scope.errors[3] == false && $scope.registData.userPw.length <= 7){
			$scope.errors[4] = true;
		} else {
			$('#errorAlert4').alert('close');
			$scope.errors[4] = false;
		}

		if($scope.registData.userPw2 == "" || $scope.registData.userPw2 == null){
			$scope.errors[5] = true;
		} else {
			$scope.errors[5] = false;
			$('#errorAlert5').alert('close');
		}

		if ($scope.registData.userPw != $scope.registData.userPw2){
			$scope.errors[6] = true;
		} else {
			$scope.errors[6] = false;
			$('#errorAlert6').alert('close');
		}

		if($scope.registData.termsAgreed == false || $scope.registData.termsAgreed == null){
			$scope.errors[7] = true;

		} else {
			$scope.errors[7] = false;
			$('#errorAlert7').alert('close');
		}

		console.log($scope.registData);



		var req = {
			method: 'POST',
			url: '/register',
			data: { 
				userType: $scope.registData.userType,
				loginEmail: $scope.registData.loginEmail,
				login: $scope.registData.userId,
				password: $scope.registData.userPw
			}
		}

		$http(req).then(
			function (res){
			console.log(res);
				if (res.statusText == "OK"){
					$window.location.href = '/';
				}
			}, 
			function (res){

			});


if($scope.errExist == true) {

				var si = res.data.indexOf("<error>") + 6;
				var ei = res.data.indexOf("</error>");


				var errMessages = res.data.substring(si, ei).split("</li>");

				for(var i in errMessages){
					var endIndex = errMessages[i].length-21;
					errMessages[i] = errMessages[i].substr(16, endIndex);
					$scope.errMessages.push(errMessages[i]);
				}
				$scope.errMessages.pop();
			}

	}







}]);
