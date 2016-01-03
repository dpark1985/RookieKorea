angular.module('common', ['ngRoute'])




.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.isLoggedIn = isLoggedIn;


	if($scope.isLoggedIn){
		$scope.userID = userID;
	}


	$scope.extra = '';

	if($location.absUrl().split('/')[4] != undefined){
		$scope.extra = '../';		
	}	

	if($location.absUrl().split('/')[5] != undefined){
		$scope.extra = '../../';
	}
	if($location.absUrl().split('/')[6] != undefined){
		$scope.extra = '../../../';
	}
	if($location.absUrl().split('/')[7] != undefined){
		$scope.extra = '../../../../';
	}


}])

	

.directive('navCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../../templates/common/navBar.html',
		controller: 'navCtrl'
	};
})
.directive('footerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../../templates/common/footer.html',
		controller: 'navCtrl'
	};
});
