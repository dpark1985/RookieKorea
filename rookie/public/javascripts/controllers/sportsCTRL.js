
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
.controller('SearchCtrl', function ($scope, $window){
	console.log('testing');

})
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

	$scope.search = function() {		
		if($('#searchInput').val() != ''){
			$window.location = '/search#/' + $('#searchInput').val();
		}
	}

})
.controller('breadCtrl', function ($timeout, $rootScope, $location){
	var strArr = $location.absUrl().split('/');
	if(strArr[3].substring(strArr[3].length-1, strArr[3].length) == '#'){
		var currLocation = strArr[3].substring(0, strArr[3].length-1);
	} else{
		var currLocation = strArr[3].substring(0, strArr[3].length);
	}
	$rootScope.currLocation = currLocation;
});

