var myApp = angular.module('mongodbTest',[]);

myApp.controller('mongodbTest', ['$scope', '$http', '$window', function($scope, $http, $window) {


	$scope.userList1 = angular.fromJson(userList);
	//console.log($scope.userList1);

	$scope.changePW = function(){

		console.log($scope.userInput);

		var req = {
			method: 'POST',
			url: '/changePW',
			data: { userID: $scope.userInput.username,
					newPW: $scope.userInput.newPW
			 }
		};

		$http(req).then(function(res){
			console.log(res);

			if(res.statusText === "OK"){
				$window.location.reload();
			}


		}, function(res){});



		
	}

}]);
