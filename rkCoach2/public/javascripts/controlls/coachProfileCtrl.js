angular.module('profile', ['common', 'ui.bootstrap'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '../../templates/coach/profileCoach.html',
		controller: 'setupCtrlInit'
	});


	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})




.controller('profileLeftCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

	$scope.userID = userID;

	var req = {
		method: 'POST',
		url: '/getData/coachData',
		data: { userID: $scope.userID }
	};

	$http(req).then(function(res){
		$rootScope.coachData = res.data;
		$rootScope.coachData.personalInfo.img = $rootScope.coachData.personalInfo.img.replace('public/', '');
	}, function(res){});

}])

.controller('setupCtrlInit', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	
	console.log($rootScope.coachData);
	$scope.setupIntro = function(){ $location.path('/setup1'); };

}])