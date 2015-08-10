
angular.module('search', ['ngRoute'], function ($routeProvider){})

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/templates/search/mainView.html',
		controller: 'MainCtrl'
	});

	$routeProvider.when('/:query', {
		templateUrl: '/templates/search/mainView.html',
		controller: 'MainCtrl'
	});


}])


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Main Controller, Output searched contents & all competitions list
/*	Description_ko	=	메인 컨트롤러, 검색 결과 출력, 모든 대회 목록 출력
*/
.controller('MainCtrl', function ($scope, $rootScope, $http, $location, $sce, $window, $filter){
	$scope.templates = {
		"competitions" : "/templates/search/competitions.html",
		"all" : "/templates/search/competitions.html"
	}


	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Switch Search Query & All List, Tab Click rerence
	/*	Description_ko	=	검색결과 & 모든대회 탭의 버튼 이벤트, 히스토리로 탭이동
	/*	Reference		= 	templates/search/mainView.html
	*/
	$scope.moveB = function() {
		$window.history.back();
	}

	//var searchQuery = $location.url();

	if ($location.url() == '/compList'){
		$scope.searchActive = '';
		$scope.compListActive = 'active';
		$scope.url = 'competitions/all';

	} else {
		$scope.searchActive = 'active';
		$scope.compListActive = '';
		$scope.url = 'competitions/all' + $location.url();
	} 

	$http.get('competitions/all')
	.success(function (data, status){
		$rootScope.totalNum = data.length;
	});

	$http.get($scope.url)
	.success(function (data, status){
		$rootScope.itemsNum = data.length;
		$rootScope.itemsList = data;
		$rootScope.itemsArr = [];
		$rootScope.newItemsArr = [];

		$scope.pagePer = 6;

		if( ($rootScope.itemsNum/$scope.pagePer) < 1){ $rootScope.pageNum = 1; }
		else if( ($rootScope.itemNum%$scope.pagePer) == 0){ $rootScope.pageNum = $rootScope.itemsNum/$scope.pagePer; }
		else{ $rootScope.pageNum = Math.ceil($rootScope.itemsNum/$scope.pagePer); }
		for(var i=0; i< $rootScope.itemsNum; i++){
			var content = $filter('limitTo')($rootScope.itemsList[i].eventInfo, 150);
			$rootScope.itemsList[i].eventSummary = 
				$sce.trustAsHtml(content);
			$rootScope.itemsList[i].eventInfo = 
				$sce.trustAsHtml($rootScope.itemsList[i].eventInfo);			
		}

		while($rootScope.itemsList.length) $rootScope.itemsArr.push($scope.itemsList.splice(0,$scope.pagePer));
		$rootScope.itemsLength = $rootScope.itemsArr.length;
		$rootScope.count = 0;
		$rootScope.Ldisable = "disabled";

		if($rootScope.itemsArr.length == 1){ $rootScope.Rdisable = "disabled"; } 
		else{ $rootScope.Rdisable = ""; }
		$rootScope.items = $rootScope.itemsArr[$rootScope.count];
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});


	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Move Forward Button
	/*	Description_ko	=	앞으로 가기 버튼
	/*	Reference		= 	templates/search/competitions.html
	*/
	$scope.moveForward = function(){
		$rootScope.count ++;
		if(($rootScope.count+1) == $rootScope.pageNum){ $rootScope.Rdisable = "disabled"; } 
		else{ $rootScope.Rdisable = ""; }
		if($rootScope.count < $rootScope.itemsLength){
			$rootScope.items = $rootScope.itemsArr[$rootScope.count];
			$rootScope.Ldisable = "";
		} else{ $rootScope.count --; }
		$('html,body').scrollTop(0);
	}


	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Move Backword Button
	/*	Description_ko	=	뒤로 가기 버튼
	*/
	$scope.moveBackward = function(){
		$rootScope.count --;
		if($rootScope.count == 0){ $rootScope.Ldisable = "disabled"; } 
		else{ $rootScope.Ldisable = ""; }
		if($rootScope.count >= 0){
			$rootScope.items = $rootScope.itemsArr[$rootScope.count];
			$rootScope.Rdisable = "";
		} else{ $rootScope.count ++; }
		$('html,body').scrollTop(0);
	}




})



/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Side Content Controller, output 10 competitions on side
/*	Description_ko	=	사이트 컨트롤러, 10개 최신 대회 목록 출력
/*	Reference		=	search.ejs
*/
.controller('SideCtrl', function ($scope, $rootScope, $http, $sce) {
	$scope.template = {
		"side" : "/templates/common/side.html"
	}
	var url = 'competitions/side';
	$http.get(url)
	.success(function(data, status){
		$rootScope.itemsListside = data;
		for(var i=0; i< data.length; i++){
			$rootScope.itemsListside[i].eventInfo = 
				$sce.trustAsHtml($rootScope.itemsListside[i].eventInfo);			
		}
	});
})



/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Navigation Controller, Check login status, keyword search
/*	Description_ko	=	네비게이션 컨트롤러, 로그인체크, 검색키워드
/*	Reference		=	search.ejs
*/
.controller('NavCtrl', function ($scope, $rootScope, $window){

	$rootScope.addURL = '';
	var isLogin = $("#isLogin").html();

	//console.log(isLogin.trim());

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

	$scope.template = {
		"navBar" : "/templates/common/navBar.html"
	}	



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Redirect to Search Page
	/*	Description_ko	=	검색 키워드가 있을 시, /search/키워드 로 이동
	/*	url				=	/search#/KEYWORD
	*/
	$scope.search = function() {		
		if($('#searchInput').val() != ''){
			$window.location = '/search#/' + $('#searchInput').val();
		}
	}

});



