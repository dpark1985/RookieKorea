angular.module('profile', ['ngRoute'])


.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '/templates/profile/overview.html',
		controller: 'OverviewCtrl',
	});
	$routeProvider.when('/registinfo', {
		templateUrl: '/templates/profile/registinfo.html',
		controller: 'RegistCtrl'
	});
	$routeProvider.when('/history', {
		templateUrl: '/templates/profile/history.html',
		controller: 'HistoryCtrl'
	});
	$routeProvider.when('/setting', {
		templateUrl: '/templates/profile/setting.html',
		controller: 'SettingCtrl'
	});
	

	$routeProvider.otherwise('/', {
		templateUrl: '/templates/profile/overview.html',
		controller: 'OverviewCtrl',
	});

	$locationProvider.html5Mode(true);
}])

.controller('OverviewCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$route', function ($scope, $rootScope, $http, $timeout, $route){
	var userInfo = $rootScope.userInfo;

	$scope.totalVisit = userInfo.visits;
	$scope.totalPost = userInfo.competitions.length + userInfo.courts.length + userInfo.clubs.length;
	$scope.compNum = userInfo.competitions.length;
	$scope.courtNum = userInfo.courts.length;
	$scope.clubNum = userInfo.clubs.length;
	$scope.since = new Date(userInfo.since);
	$scope.lastLoginDate = new Date(userInfo.lastLoginDate);
	$scope.userName = userInfo.name;
	$scope.userId = userInfo.login;
	if(userInfo.img === null){
		$scope.userImgSrc = "../assets/img/team/img32-md.jpg";
	} else {
		$scope.userImgSrc = userInfo.img.replace("public", "");
	}




	$rootScope.userImgChange = function(){
		$scope.newInfo = {
			id: $scope.userId,
			img: $scope.userNewImg
		};
		$http.post('/model/profile/userImg', { newInfo : $scope.newInfo }).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};




}])
.controller('RegistCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	

}])
.controller('HistoryCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	

}])
.controller('SettingCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	

}])

.controller('profileCtrl', ['$scope', '$rootScope', '$window', '$http', '$route', function ($scope, $rootScope, $window, $http, $route){

	$rootScope.reloadPage = function(){
		$window.location.reload();
	};

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

	$('#loadingModal').modal('show');
	$http.post('/model/profile', {id: $scope.loginID})
	.then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $rootScope.userInfo = response.data[0];

		if($rootScope.userInfo.img === null){
			$scope.userImgSrc = "../assets/img/team/img32-md.jpg";
		} else {
			$scope.userImgSrc = $rootScope.userInfo.img.replace("public", "");
		}
		$('#loadingModal').modal('hide');

	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});


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
})
.directive("fileread", ['$rootScope', function ($rootScope) {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                    $rootScope.userImgChange();
                    $rootScope.reloadPage();
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
