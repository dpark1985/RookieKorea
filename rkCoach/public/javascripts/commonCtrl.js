angular.module('common', ['ngRoute', 'ngMaterial'])




.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('yellow', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('yellow', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
})





.controller('navCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window){
	$http({ method: 'GET', url: '/customModel/userData' })
	.then(function successCallback(response) {
		$scope.login = response.data.login;
		$scope.userID = response.data.userID;
	}, function errorCallback(response) {


	$scope.$watch(function(){
       return $window.innerWidth;
    }, function(value) {
      console.log(value);
       if(value <= 768){
       	$scope.pc = false;
       } else{
       	$scope.pc = true;
       }	
   	});
	});

  
}])

.directive('navBar', function() {
	return {
		restrict: 'E',
		templateUrl: '../../templates/navBar.html',
		controller: 'navCtrl'
	};
})

.directive('footerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../templates/footer.html'
	};
});