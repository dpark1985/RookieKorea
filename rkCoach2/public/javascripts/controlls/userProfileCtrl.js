angular.module('userProfile', ['common'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {



    $routeProvider.when('/setup', {
        templateUrl: '../../templates/client/userSetup.html',
        controller: 'setupCtrl'
    });



    $routeProvider.otherwise('/', {
		controller: 'profileCtrl',
	});

    $locationProvider.html5Mode(true);
}])


.controller('profileCtrl', ['$scope', '$location', function ($scope, $location) {
	var userType = $location.absUrl().split('/').pop();
	
	$scope.initialSetup = initialSetup;
	if($scope.initialSetup == 'false'){
		$location.path('/setup');
	}



}])


.controller('setupCtrl', ['$scope', '$location', function ($scope, $location) {



}]);
