
angular.module('main', ['ngRoute'], function ($routeProvider){})
.controller('MainCtrl', function ($scope, $location, $window){
	$scope.search = function() {
		if($scope.keyword != ''){
			//$location.path('/search#/' + $scope.keyword);
			$window.location = '/search#/' + $scope.keyword;
		}
	}
})


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Navigation Controller, Check login status, keyword search
/*	Description_ko	=	네비게이션 컨트롤러, 로그인체크, 검색키워드
/*	Reference		=	index.ejs
/*	Reference		=	templates/common/navBar.html
*/
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



/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Notification Controller: If not logined yet, Introduce login or register button
/*	Description_ko	=	노티피케이션 컨트롤러: 로그인이 안되어 있다면, 회원가입 & 로그인 버튼 출력
/*	Reference		=	index.ejs
*/
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


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Footer Controller: includes footerBar.html
/*	Description_ko	=	풋터 컨트롤러: 풋터 템플릿 출력
/*	Reference		=	index.ejs
/*	Reference		=	templates/common/footerBar.html
*/
.controller('FooterCtrl', function ($scope) {
	$scope.addURL = '';
	
	$scope.template = {
		"footerBar" : "/templates/common/footerBar.html"
	}
});