
angular.module('common', [], function (){})

/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	General Navigation Controller, Check login status, keyword search
/*	Description_ko	=	네비게이션 컨트롤러, 로그인체크, 검색키워드
/*	Reference		=	search.ejs
*/
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


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Footer Controller: includes footerBar.html
/*	Description_ko	=	풋터 컨트롤러: 풋터 템플릿 출력
/*	Reference		=	advertize.ejs, login.ejs, query.ejs, register.ejs, useraccount.ejs
/*	Reference		=	templates/common/footerBar.html
*/
.controller('FooterCtrl', function ($scope, $rootScope, $location) {
	var strArr = $location.absUrl().split('/');
	if(strArr.length == 5){ $rootScope.addURL = '../'; } 
	else if (strArr.length == 6){ $rootScope.addURL = '../../'; } 
	else{ $rootScope.addURL = ''; }
	
	$scope.template = {
		"footerBar" : "/templates/common/footerBar.html"
	}
});