angular.module('admin', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/templates/admin/login.html',
		controller: 'LoginCtrl',
	});
	$routeProvider.when('/overview', {
		templateUrl: '/templates/admin/overview.html',
		controller: 'OverviewCtrl'
	});
	$routeProvider.when('/competitions', {
		templateUrl: '/templates/admin/competitions.html',
		controller: 'CompCtrl'
	});
	$routeProvider.when('/courts', {
		templateUrl: '/templates/admin/courts.html',
		controller: 'CourtCtrl'
	});
	$routeProvider.when('/clubs', {
		templateUrl: '/templates/admin/clubs.html',
		controller: 'ClubCtrl'
	});
	$routeProvider.when('/events', {
		templateUrl: '/templates/admin/events.html',
		controller: 'EventCtrl'
	});
	$routeProvider.when('/promotions', {
		templateUrl: '/templates/admin/promotions.html',
		controller: 'PromoCtrl'
	});
	$routeProvider.when('/blogs', {
		templateUrl: '/templates/admin/blogs.html',
		controller: 'BlogCtrl'
	});
	$routeProvider.when('/notis', {
		templateUrl: '/templates/admin/noti.html',
		controller: 'NotiCtrl'
	});
	$routeProvider.when('/queries', {
		templateUrl: '/templates/admin/queries.html',
		controller: 'QueryCtrl'
	});
	$routeProvider.when('/ads', {
		templateUrl: '/templates/admin/ads.html',
		controller: 'AdsCtrl'
	});
	$routeProvider.when('/users', {
		templateUrl: '/templates/admin/users.html',
		controller: 'UserListCtrl'
	});

	$routeProvider.otherwise('/', {
		templateUrl: '/templates/admin/login.html',
		controller: 'LoginCtrl',
	});
}])

.controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){

	$scope.loginData = [];
	$rootScope.isLogin = false;

	$scope.login = function(){
		$http.post('/model/admin/login', {id: $scope.loginData.id, pwd: $scope.loginData.pwd}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    if(response.data.status == '1'){
		    	$location.path( "/overview" );
		    	$rootScope.isLogin = true;
		    } else {
		    	var msg = "잘못 입력하셨습니다.";
		    	$('.form-signin').append(msg);
		    	$rootScope.isLogin = false;
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


	}




}])
.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){


}])


.controller('OverviewCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){

	} else {
		$location.path( "/" );
	}


}])
.controller('CompCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){

	} else {
		$location.path( "/" );
	}


}])
.controller('CourtCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){

	} else {
		$location.path( "/" );
	}


}])
.controller('ClubCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){

	} else {
		$location.path( "/" );
	}


}])
.controller('EventCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){
		$scope.activateNum = 0;
		$scope.deActivateNum = 0;
		$http.post('/model/admin/noti', {type: "event"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;


		    for(var i in $scope.items){
		    	if($scope.items[i].active){
		    		$scope.activateNum += 1;
		    	} else {
		    		$scope.deActivateNum += 1;
		    	}
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	} else {
		$location.path( "/" );
	}

	$scope.eventData = [];

	$scope.newEvent = function(){
		$scope.newInfo = {
			type : "event",
			title: $scope.eventData.title,
			link: $scope.eventData.link,
			img: $scope.eventData.img,
			active: false
		}

		$http.post('/model/admin/notiNew', { newNoti : $scope.newInfo }).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


	}

	$scope.activate = function(id){
		$http.post('/model/admin/notiActive', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$scope.deActivate = function(id){
		$http.post('/model/admin/notiDeActive', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};



}])
.controller('PromoCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){
		$scope.activateNum = 0;
		$scope.deActivateNum = 0;
		$http.post('/model/admin/noti', {type: "promotion"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;

		    for(var i in $scope.items){
		    	if($scope.items[i].active){
		    		$scope.activateNum += 1;
		    	} else {
		    		$scope.deActivateNum += 1;
		    	}
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	} else {
		$location.path( "/" );
	}

	$scope.promoData = [];

	$scope.newEvent = function(){
		$scope.newInfo = {
			type : "promotion",
			title: $scope.promoData.title,
			link: $scope.promoData.link,
			img: $scope.promoData.img,
			active: false
		}
	
		$http.post('/model/admin/notiNew', { newNoti : $scope.newInfo }).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


	}

	$scope.activate = function(id){
		$http.post('/model/admin/notiActive', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$scope.deActivate = function(id){
		$http.post('/model/admin/notiDeActive', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};


}])
.controller('BlogCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){

	} else {
		$location.path( "/" );
	}


}])
.controller('NotiCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){
		$scope.activateNum = 0;
		$scope.deActivateNum = 0;
		$http.post('/model/admin/noti', {type: "noti"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;

		    for(var i in $scope.items){
		    	if($scope.items[i].active){
		    		$scope.activateNum += 1;
		    	} else {
		    		$scope.deActivateNum += 1;
		    	}
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	} else {
		$location.path( "/" );
	}

	$scope.notiData = [];

	$scope.newEvent = function(){
		$scope.newInfo = {
			type : "noti",
			title: $scope.notiData.title,
			link: $scope.notiData.link,
			active: false
		}

		$http.post('/model/admin/notiNew2', { newNoti : $scope.newInfo }).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


	}

	$scope.activate = function(id){
		$http.post('/model/admin/notiActive', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$scope.deActivate = function(id){
		$http.post('/model/admin/notiDeActive', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

}])
.controller('QueryCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){
		$scope.successNum = 0;
		$scope.failNum = 0;
		$http.post('/model/admin/query', {}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;

		    for(var i in $scope.items){
		    	if($scope.items[i].checked){
		    		$scope.successNum += 1;
		    	} else {
		    		$scope.failNum += 1;
		    	}
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	} else {
		$location.path( "/" );
	}

	$scope.success = function(id){
		console.log(id);
		$http.post('/model/admin/queryUpdate', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};



}])
.controller('AdsCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){
		$scope.successNum = 0;
		$scope.failNum = 0;
		$http.post('/model/admin/ads', {}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.items = response.data;

		    for(var i in $scope.items){
		    	if($scope.items[i].checked){
		    		$scope.successNum += 1;
		    	} else {
		    		$scope.failNum += 1;
		    	}
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	} else {
		$location.path( "/" );
	}

	$scope.success = function(id){
		console.log(id);
		$http.post('/model/admin/adsUpdate', {id: id}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		   
		    if(response.statusText == 'OK'){
		    	$route.reload();
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};


}])
.controller('UserListCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){
		$scope.totalVisits = 0;
		$http.post('/model/admin/users', {}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.items = response.data;
		    for(var i in $scope.items){
		    	$scope.totalVisits += $scope.items[i].visits;
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	} else {
		$location.path( "/" );

	}
}])
.directive("fileread", function () {
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
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
});