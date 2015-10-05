angular.module('search', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		controller: 'searchCtrl'
	});
	$routeProvider.when('/competitions', {
		templateUrl: '/templates/sports/competitions.html',
		controller: 'CompCtrl'
	});
	$routeProvider.when('/courts', {
		templateUrl: '/templates/sports/courts.html',
		controller: 'CourtCtrl'
	});
	$routeProvider.when('/clubs', {
		templateUrl: '/templates/sports/clubs.html',
		controller: 'ClubCtrl'
	});

	$routeProvider.otherwise('/', {
		controller: 'searchCtrl',
	});
}])

.controller('CompCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){

	$scope.curCategory = 'competitions';
	$scope.items = $rootScope.AllItems[0];
	for(var i in $scope.items){
    	$scope.items[i].eventImg = $scope.items[i].eventImg.replace("public", "");
    }

}])
.controller('CourtCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	
	$scope.curCategory = 'courts';
	$scope.items = $rootScope.AllItems[1];
	for(var i in $scope.items){
    	$scope.items[i].courtImg = $scope.items[i].courtImg.replace("public", "");
    }

}])
.controller('ClubCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	
	$scope.curCategory = 'clubs';
	$scope.items = $rootScope.AllItems[2];
	for(var i in $scope.items){
    	$scope.items[i].clubImg = $scope.items[i].clubImg.replace("public", "");
    }

}])

.controller('searchCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$route', function ($scope, $rootScope, $window, $location, $http, $route){
	
	$rootScope.curLocation = $location.absUrl().split('/')[3].replace('#', '');

	var searchKey = $location.absUrl().split('/')[3].replace("search?q=", '').replace("#", '').split("%20");
	searchKey = decodeURIComponent(searchKey);	
	console.log(searchKey);
	$scope.curLocationText = {ko: '검색결과', en: 'search', key: searchKey};
	
	$('#loadingModal').modal('show');
	$http.post('/model/search', {searchKey: searchKey}).
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    if(response.statusText == 'OK'){
	    	$rootScope.AllItems = response.data;
	    	$scope.compNum = $rootScope.AllItems[0].length;
	    	$scope.courtNum = $rootScope.AllItems[1].length;
	    	$scope.clubNum = $rootScope.AllItems[2].length;


	    	$('#loadingModal').modal('hide');
	    	$location.path('/competitions');
	    }
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});



	// Subcategory (SubTab) Active class
	// Initiate subcategory active = active;
	/*
		$scope.subTab1Active = '';		//대회
		$scope.subTab2Active = '';		//코트장
		$scope.subTab3Active = '';		//동호회
	*/
	$scope.subTab1Active = 'active';
	$scope.subTab1 = function(){
		$scope.subTab1Active = 'active';
		$scope.subTab2Active = '';
		$scope.subTab3Active = '';

		$scope.state = 'all';
		$rootScope.stateSelected = false;
	}
	$scope.subTab2 = function(){
		$scope.subTab1Active = '';
		$scope.subTab2Active = 'active';
		$scope.subTab3Active = '';

		$scope.state = 'all';
		$rootScope.stateSelected = false;
	}
	$scope.subTab3 = function(){
		$scope.subTab1Active = '';
		$scope.subTab2Active = '';
		$scope.subTab3Active = 'active';

		$scope.state = 'all';
		$rootScope.stateSelected = false;
	}

	// COMMON FUNCTIONS
	var login = $('#isLogin').html().trim();
	$('#isLogin').hide();
	$scope.isLogin = false;

	if(login != ''){
		$scope.loginID = login;
		$scope.isLogin = true;
	} else {
		$scope.isLogin = false;
	}

	$scope.logout = function(){
		$scope.isLogin = false;
		$window.location.reload();
	}

	$scope.search = function(){
		$window.location.href = '/search?q='+$scope.searchInput;
	}	

	$scope.newInfo = function(){
		if($scope.isLogin === true) {$window.location.href = '/newinfo';} 
		else {$window.location.href = '/login';}
	}

	$scope.queryData = {};
	$scope.querySubmit = function(){
		$http.post('/model/query', {
			queryAuthor: $scope.queryData.userEmail,
			queryContext: $scope.queryData.context
		})
		.then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
		$('.csQuery').modal('hide');
	}

	$http.get('/model/noti').
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.notiData = response.data;
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});
	// COMMON FUNCTIONS

}])

.directive('headerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../templates/header.html'
	};
})

.directive('footerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../templates/footer.html'
	};
});
