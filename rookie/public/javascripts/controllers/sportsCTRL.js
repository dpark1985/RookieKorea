
angular.module('sports', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/templates/sports/mainView.html',
		controller: 'MainCtrl',
	});
	$routeProvider.when('/:query', {
		templateUrl: '/templates/sports/mainView.html',
		controller: 'MainCtrl'
	});
}])

/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Main Controller: Output competitions, courts, clubs list
/*	Description_ko	=	메인 컨트롤러: 대회, 코트장, 동호회 정보 출력
/* 	Reference		= 	sports.ejs
/* 	Reference		= 	templates/sports/mainView.html
/* 	Reference		= 	templates/sports/competitions.html
/* 	Reference		= 	templates/sports/courts.html
/* 	Reference		= 	templates/sports/clubs.html
*/
.controller('MainCtrl', function ($scope, $rootScope, $http, $location, $sce, $filter){
	$scope.templates = {
		"competitions" : "/templates/sports/competitions.html",
		"courts" : "/templates/sports/courts.html",
		"clubs" : "/templates/sports/clubs.html"
	}

	if($location.url() == '/' || $location.url() == '/competitions'){
		$scope.competitionsActive = 'active';
		$scope.courtsActive = '';
		$scope.clubsActive = '';
		$scope.url = $rootScope.currLocation + '/competitions';
	}  else if ($location.url() == '/courts'){
		$scope.competitionsActive = '';
		$scope.courtsActive = 'active';
		$scope.clubsActive = '';
		$scope.url = $rootScope.currLocation + '/courts';
	} else {
		$scope.competitionsActive = '';
		$scope.courtsActive = '';
		$scope.clubsActive = 'active';
		$scope.url = $rootScope.currLocation + '/clubs';
	}


	$http.get($scope.url)
	.success(function (data, status){


		$rootScope.itemsNum = data.length;
		$rootScope.itemsList = data;
		$rootScope.itemsArr = [];


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

		for(var i=0; i< $rootScope.itemsNum; i++){
			$rootScope.itemsList[i].courtInfo = 
				$sce.trustAsHtml($rootScope.itemsList[i].courtInfo);			
		}

		for(var i=0; i< $rootScope.itemsNum; i++){
			$rootScope.itemsList[i].clubInfo = 
				$sce.trustAsHtml($rootScope.itemsList[i].clubInfo);			
		}

		while($rootScope.itemsList.length) $rootScope.itemsArr.push($scope.itemsList.splice(0,$scope.pagePer));
		$rootScope.itemsLength = $rootScope.itemsArr.length;
		$rootScope.count = 0;
		$rootScope.Ldisable = "disabled";

		if($rootScope.itemsArr.length == 1){ $rootScope.Rdisable = "disabled"; } 
		else{ $rootScope.Rdisable = ""; }
		$rootScope.items = $rootScope.itemsArr[$rootScope.count];

		console.log($rootScope.items);
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});



	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Move Forward Button
	/*	Description_ko	=	앞으로 가기 버튼
	/*	Reference		= 	templates/sports/competitions.html
	/*	Reference		= 	templates/sports/courts.html
	/*	Reference		= 	templates/sports/clubs.html
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
	/*	Reference		= 	templates/sports/competitions.html
	/*	Reference		= 	templates/sports/courts.html
	/*	Reference		= 	templates/sports/clubs.html
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
/*	Reference		=	sports.ejs
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
/*	Reference		=	sports.ejs
/*	Reference		=	templates/common/navBar.html
*/
.controller('NavCtrl', function ($scope, $rootScope, $window){

	$rootScope.addURL = '';

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

	$scope.template = {
		"navBar" : "/templates/common/navBar.html"
	}	


	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Redirect to Search Page
	/*	Description_ko	=	검색 키워드가 있을 시, /search/키워드 로 이동
	/*	url				=	/search#/KEYWORD
	/* 	Reference		=	search.ejs
	*/
	$scope.search = function() {		
		if($('#searchInput').val() != ''){
			$window.location = '/search#/' + $('#searchInput').val();
		}
	}

})


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Bread Controller: output current location
/*	Description_ko	=	브레드 컨트롤러: 현위치 출력
/*	Reference		=	sports.ejs
*/
.controller('breadCtrl', function ($timeout, $rootScope, $location){
	var strArr = $location.absUrl().split('/');
	if(strArr[3].substring(strArr[3].length-1, strArr[3].length) == '#'){
		var currLocation = strArr[3].substring(0, strArr[3].length-1);
	} else{
		var currLocation = strArr[3].substring(0, strArr[3].length);
	}
	$rootScope.currLocation = currLocation;
});

