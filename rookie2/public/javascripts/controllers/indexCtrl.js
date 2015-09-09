angular.module('main', ['ngRoute'])



.controller('mainCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http){



	$scope.search = function(){
		console.log($scope.searchInput);
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
	// COMMON FUNCTIONS

}])




.directive('footerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../templates/footer.html'
	};
});