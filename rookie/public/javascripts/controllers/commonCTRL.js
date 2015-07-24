
angular.module('common', [], function (){})


.controller('NavCtrl', function ($scope, $rootScope, $location, $window){



	var strArr = $location.absUrl().split('/');
	if(strArr.length == 5){ $rootScope.addURL = '../'; } 
	else if (strArr.length == 6){ $rootScope.addURL = '../../'; } 
	else{ $rootScope.addURL = ''; }

	var isLogin = $("#isLogin").html();

	$scope.userName = isLogin.trim();
	if(isLogin.trim() != ""){
		$scope.noLogin = false;
		$scope.yesLogin = true;
		$scope.noMain = true;
		$('#isLogin').hide();

	} else{
		$scope.noLogin = true;
		$scope.yesLogin = false;
		$scope.noMain = true;
		$('#isLogin').hide();
	}

	$scope.template = { "navBar" : "/templates/common/navBar.html" }	

	$scope.search = function() {		
		if($('#searchInput').val() != ''){
			$window.location = '/search#/' + $('#searchInput').val();
		}
	}
})
.controller('FooterCtrl', function ($scope, $rootScope, $location) {
	var strArr = $location.absUrl().split('/');
	if(strArr.length == 5){ $rootScope.addURL = '../'; } 
	else if (strArr.length == 6){ $rootScope.addURL = '../../'; } 
	else{ $rootScope.addURL = ''; }
	
	$scope.template = {
		"footerBar" : "/templates/common/footerBar.html"
	}
});