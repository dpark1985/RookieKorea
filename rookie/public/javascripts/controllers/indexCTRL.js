
angular.module('main', ['ngRoute'], function ($routeProvider){})
.controller('MainCtrl', function ($scope, $location, $window){
	$scope.search = function() {
		if($scope.keyword != ''){
			//$location.path('/search#/' + $scope.keyword);
			$window.location = '/search#/' + $scope.keyword;
		}
	}
})
.controller('NavCtrl', function ($scope, $rootScope, $location){

	var strArr = $location.absUrl().split('/');
	if(strArr.length == 5){ $rootScope.addURL = '../'; } 
	else if (strArr.length == 6){ $rootScope.addURL = '../../'; } 
	else{ $rootScope.addURL = ''; }

	var isLogin = $("#isLogin").html();

	$scope.userName = isLogin.trim();
	if(isLogin.trim() != ""){
		$scope.noLogin = false;
		$scope.yesLogin = true;
		$scope.noMain = false;

		$('#isLogin').hide();

	} else{
		$scope.noLogin = true;
		$scope.yesLogin = false;
		$scope.noMain = false;

		$('#isLogin').hide();
	}

	$scope.template = { "navBar" : "/templates/common/navBar.html" }	
})
.controller('notifyCtrl', function ($scope){
	var isLogin = $("#isLogin").html();
	if(isLogin.trim() != ""){
		$scope.login = false;
	}
	else {
		$scope.login = true;
		$('#logo').addClass('marginT35');
	}
})
.controller('FooterCtrl', function ($scope) {
	$scope.addURL = '';

	$scope.template = {
		"footerBar" : "/templates/common/footerBar.html"
	}
});