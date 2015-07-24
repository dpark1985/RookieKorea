
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
.controller('MainCtrl', function ($scope, $rootScope, $http, $location, $sce, $window, $filter){
	$scope.templates = {
		"competitions" : "/templates/search/competitions.html",
		"all" : "/templates/search/competitions.html"
	}

	$scope.moveB = function() {
		$window.history.back();
	}

	var searchQuery = $location.url();

	if ($location.url() == '/compList'){
		$scope.searchActive = '';
		$scope.compListActive = 'active';
		$scope.url = 'competitions/all';

	} else {
		$scope.searchActive = 'active';
		$scope.compListActive = '';
		$scope.url = 'competitions/all' + searchQuery;
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
.controller('NavCtrl', function ($scope, $rootScope, $window){

	$rootScope.addURL = '';
	var isLogin = $("#isLogin").html();

	console.log(isLogin.trim());

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

});



