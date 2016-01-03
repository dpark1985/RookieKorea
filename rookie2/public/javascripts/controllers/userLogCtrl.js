angular.module('userLogCtrl', ['ngRoute'])

.controller('resetPwCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http){
	$scope.resetData = {
		name: '',
		login: ''
	};
	$scope.resetCheck1 = false;
	$scope.resetCheck2 = false;


	$scope.doReset = function() {
		//console.log($scope.resetData);

		if($scope.resetData.name == ''){
			$('#name').addClass('has-error');
			$scope.resetCheck1 = false;
		} else {
			$('#name').removeClass('has-error');
			$scope.resetCheck1 = true;
		}

		if($scope.resetData.login == ''){
			$('#login').addClass('has-error');
			$scope.resetCheck2 = false;
		} else {
			$('#login').removeClass('has-error');
			$scope.resetCheck2 = true;
		}

		if($scope.resetCheck1 == true && $scope.resetCheck2 == true){
			$http.post('/model/resetpwd', {
				name: $scope.resetData.name,
				login: $scope.resetData.login
			})
			.then(function(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    
			    //console.log(response);
			}, function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});

			$window.location.href = '/';
		}
	}
}])

.controller('loginCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http){
	$scope.loginData = {
		login: '',
		password: ''
	};
	$scope.loginCheck1 = false;
	$scope.loginCheck2 = false;

	$scope.doLogin = function() {
		//console.log($scope.loginData);

		if($scope.loginData.login == ''){
			$('#login').addClass('has-error');
			$scope.loginCheck1 = false;
		} else {
			$('#login').removeClass('has-error');
			$scope.loginCheck1 = true;
		}

		if($scope.loginData.password == ''){
			$('#password').addClass('has-error');
			$scope.loginCheck2 = false;
		} else {
			$('#password').removeClass('has-error');
			$scope.loginCheck2 = true;
		}

		if($scope.loginCheck1 == true && $scope.loginCheck2 == true){
			$http.post('/login', {
				login: $scope.loginData.login,
				password: $scope.loginData.password
			})
			.then(function(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    console.log('success');
			    console.log(response);
			    //$window.location.href = '/';
			}, function(response) {
				console.log('error=='+response);
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
		}
	}
}])

.controller('registCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http){

	$scope.registData = {
		userName: '',
		userEmail: '',
		userPWD: '',
		userCPWD: '',
		termsCheck: false
	};
	$scope.registCheck1 = false;
	$scope.registCheck2 = false;
	$scope.registCheck3 = false;
	$scope.registCheck4 = false;
	$scope.registCheck5 = false;
	$scope.registCheck6 = false;

	$scope.doRegist = function() {

		if($scope.registData.userName == ''){
			$('#userName').addClass('has-error');
			$scope.registCheck1 = false;
		} else {
			$('#userName').removeClass('has-error');
			$scope.registCheck1 = true;
		}

		if($scope.registData.userEmail == ''){
			$('#userEmail').addClass('has-error');
			$scope.registCheck2 = false;
		} else {
			$('#userEmail').removeClass('has-error');
			$scope.registCheck2 = true;
		}

		if($scope.registData.userPWD == ''){
			$('#userPWD').addClass('has-error');
			$scope.registCheck3 = false;
		} else {
			$('#userPWD').removeClass('has-error');
			$scope.registCheck3 = true;
		}

		if($scope.registData.userCPWD == ''){
			$('#userCPWD').addClass('has-error');
			$scope.registCheck4 = false;
		} else {
			$('#userCPWD').removeClass('has-error');
			$scope.registCheck4 = true;
		}

		if($scope.registData.termsCheck == false){
			$('#terms').addClass('has-error');
			$scope.registCheck5 = false;
		} else {
			$('#terms').removeClass('has-error');
			$scope.registCheck5 = true;
		}

		if($scope.registData.userPWD != $scope.registData.userCPWD){
			$scope.registCheck6 = false;
			$('#userCPWD').addClass('has-error');
			$('#userPWD').addClass('has-error');
		} else {
			$scope.registCheck6 = true;
		}

		if($scope.registCheck1 == true && $scope.registCheck2 == true && $scope.registCheck3 == true && $scope.registCheck4 == true && $scope.registCheck5 == true && $scope.registCheck6 == true){
			$http.post('/register', {
				name: $scope.registData.userName,
				login: $scope.registData.userEmail,
				password: $scope.registData.userPWD,
				cpassword: $scope.registData.userCPWD
			})
			.then(function(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    $window.location.href = '/';
			}, function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
		}
	}

}]);