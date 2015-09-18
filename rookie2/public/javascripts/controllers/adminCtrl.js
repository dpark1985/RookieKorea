angular.module('admin', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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

	$locationProvider.html5Mode(true);
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
	};
}])
.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){

	$scope.format = 'M/d/yy h:mm:ss a';



}])


.controller('OverviewCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){

	} else {
		$location.path( "/" );
	}


}])
.controller('CompCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){

		$http.post('/model/admin/competitions', {}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;
		    $scope.count = $scope.items.length;
		    $scope.approveWait = [];
		    $scope.rejected = [];
		    $scope.approved = [];
		    $scope.expired = [];

		    for(var i in $scope.items){
		    	$scope.items[i].count = $scope.count;
		    	$scope.count --;

		    	$scope.items[i].eventDate.start2 = $scope.items[i].eventDate.start2.replace('GMT+0900 (KST)', '');
		    	$scope.items[i].registDate = $scope.items[i].registDate.replace('GMT+0900 (KST)', '');

		    	if($scope.items[i].eventApproved == false && $scope.items[i].eventRejected == false){
		    		$scope.items[i].status = '승인대기중';
		    		$scope.approveWait.push($scope.items[i]);
		    	} else if ($scope.items[i].eventApproved == true && $scope.items[i].eventExpired != true){
		    		$scope.items[i].status = '승인';
		    		$scope.approved.push($scope.items[i]);
		    	} else if ($scope.items[i].eventRejected == true){
		    		$scope.items[i].status = '거절';
		    		$scope.rejected.push($scope.items[i]);
		    	} else if ($scope.items[i].eventExpired == true){
		    		$scope.items[i].status = '만료';
		    		$scope.expired.push($scope.items[i]);
		    	}
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	} else {
		$location.path( "/" );
	}

	$scope.approve = function(id){
		$http.post('/model/admin/infoApprove', {id: id, category: "competitions"}).
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

	$scope.reject = function(id){
		$http.post('/model/admin/infoReject', {id: id, category: "competitions"}).
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

	$scope.delete = function(id){
		$http.post('/model/admin/infoDelete', {id: id, category: "competitions"}).
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

	$scope.modifyModal = function(id){

		$scope.modify = [];
		$scope.modifyItem = '';

		$http.post('/model/admin/getInfo', {id: id, category: "competitions"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    if(response.statusText == 'OK'){
		    	$scope.modifyItem = response.data;
		    	//console.log($scope.modifyItem);

				$scope.modify = {
					id: $scope.modifyItem[0]._id,
					title: $scope.modifyItem[0].eventTitle,
					category: {
						sports: $scope.modifyItem[0].eventSport,
						subcategory: '대회'
					},
					location: {
						state: $scope.modifyItem[0].eventLocation.state,
						city: $scope.modifyItem[0].eventLocation.city
					},
					courtName: $scope.modifyItem[0].eventCourtName,
					GPS: {
						lat: $scope.modifyItem[0].eventGPS.lat,
						lng: $scope.modifyItem[0].eventGPS.lng
					},
					eventDate: {
						start1: $scope.modifyItem[0].eventDate.start1,
						start2: $scope.modifyItem[0].eventDate.start2,
						end1: $scope.modifyItem[0].eventDate.end1,
						end2: $scope.modifyItem[0].eventDate.end2
					},
					eventRegist: {
						start1: $scope.modifyItem[0].eventRegistDate.start1,
						start2: $scope.modifyItem[0].eventRegistDate.start2,
						end1: $scope.modifyItem[0].eventRegistDate.end1,
						end2: $scope.modifyItem[0].eventRegistDate.end2
					},
					contact: {
						phone: $scope.modifyItem[0].eventContact.phone,
						email: $scope.modifyItem[0].eventContact.email,
						url: $scope.modifyItem[0].eventContact.url
					},
					detailInfo : $scope.modifyItem[0].eventInfo
				};


				$('#compDate1').val('');
				$('#compDate11').val('');
				$('#compDate2').val('');
				$('#compDate22').val('');

				$('#registDate1').val('');
				$('#registDate11').val('');
				$('#registDate2').val('');
				$('#registDate22').val('');

                $('#compDate1').datetimepicker();
                $('#compDate2').datetimepicker();


                $("#compDate1").on("dp.change", function (e) {
                    $('#compDate11').val(e.date._d);
                    $('#compDate22').val(e.date._d);
                    $('#compDate2').data("DateTimePicker").minDate(e.date);
                    e.date._d.setDate(e.date._d.getDate()-1);
                    $('#registDate11').val(e.date._d);
                    $('#registDate22').val(e.date._d);
                    $('#registDate1').data("DateTimePicker").maxDate(e.date);
                    $('#registDate2').data("DateTimePicker").maxDate(e.date);
                });
                $("#compDate2").on("dp.change", function (e) {
                    $('#compDate22').val(e.date._d);
                });

                $('#registDate1').datetimepicker();
                $('#registDate2').datetimepicker();

                $("#registDate1").on("dp.change", function (e) {
                    $('#registDate11').val(e.date._d);
                    $('#registDate22').val(e.date._d);
                    $('#registDate2').data("DateTimePicker").minDate(e.date);
                });
                $("#registDate2").on("dp.change", function (e) {
                    $('#registDate22').val(e.date._d);
                });

		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$scope.modifySubmit = function(id){
		//console.log($scope.modify);
		//console.log(id);

		if($('#compDate1').val() != ''){
			$scope.modify.eventDate.start1 = $('#compDate1').val();
			$scope.modify.eventDate.start2 = $('#compDate11').val();
			$scope.modify.eventDate.end1 = $('#compDate2').val();
			$scope.modify.eventDate.end2 = $('#compDate22').val();

			$scope.modify.eventRegist.start1 = $('#registDate1').val();
			$scope.modify.eventRegist.start2 = $('#registDate11').val();
			$scope.modify.eventRegist.end1 = $('#registDate2').val();
			$scope.modify.eventRegist.end2 = $('#registDate22').val();	
		} else {

		}



		$http.post('/model/admin/modifyData', {id: id, category: "competitions", data: $scope.modify}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    if(response.statusText == 'OK'){
		    	$('#modifyModal').modal('hide');
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	}

	$rootScope.iterateData = function(){
		$http.get('/model/dataIterate').
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
		$route.reload();
	}

	$('#compTabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('#modifyModal').on('hidden.bs.modal', function (e) {
		$route.reload();
	});



}])
.controller('CourtCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){

		$http.post('/model/admin/courts', {}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;
		    $scope.count = $scope.items.length;
		    $scope.approveWait = [];
		    $scope.rejected = [];
		    $scope.approved = [];

		    for(var i in $scope.items){
		    	$scope.items[i].count = $scope.count;
		    	$scope.count --;

		    	$scope.items[i].registDate = $scope.items[i].registDate.replace('GMT+0900 (KST)', '');

		    	if($scope.items[i].courtApproved == false && $scope.items[i].courtRejected == false){
		    		$scope.items[i].status = '승인대기중';
		    		$scope.approveWait.push($scope.items[i]);
		    	} else if ($scope.items[i].courtApproved == true && $scope.items[i].courtExpired != true){
		    		$scope.items[i].status = '승인';
		    		$scope.approved.push($scope.items[i]);
		    	} else if ($scope.items[i].courtRejected == true){
		    		$scope.items[i].status = '거절';
		    		$scope.rejected.push($scope.items[i]);
		    	}
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	} else {
		$location.path( "/" );
	}

	$scope.approve = function(id){
		$http.post('/model/admin/infoApprove', {id: id, category: "courts"}).
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

	$scope.reject = function(id){
		console.log('rejected');
		$http.post('/model/admin/infoReject', {id: id, category: "courts"}).
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

	$scope.delete = function(id){
		$http.post('/model/admin/infoDelete', {id: id, category: "courts"}).
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

	$scope.modifyModal = function(id){

		$scope.modify = [];
		$scope.modifyItem = '';

		$http.post('/model/admin/getInfo', {id: id, category: "courts"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    if(response.statusText == 'OK'){
		    	$scope.modifyItem = response.data;

				$scope.modify = {
					id: $scope.modifyItem[0]._id,
					title: $scope.modifyItem[0].courtTitle,
					category: {
						sports: $scope.modifyItem[0].courtSport,
						subcategory: '코트장'
					},
					location: {
						state: $scope.modifyItem[0].courtLocation.state,
						city: $scope.modifyItem[0].courtLocation.city
					},
					courtName: $scope.modifyItem[0].courtCourtName,
					GPS: {
						lat: $scope.modifyItem[0].courtGPS.lat,
						lng: $scope.modifyItem[0].courtGPS.lng
					},
					contact: {
						phone: $scope.modifyItem[0].courtContact.phone,
						email: $scope.modifyItem[0].courtContact.email,
						url: $scope.modifyItem[0].courtContact.url
					},
					detailInfo : $scope.modifyItem[0].courtInfo
				};

		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$scope.modifySubmit = function(id){
		//console.log($scope.modify);
		//console.log(id);

		$http.post('/model/admin/modifyData', {id: id, category: "courts", data: $scope.modify}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    if(response.statusText == 'OK'){
		    	$('#modifyModal').modal('hide');
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$('#courtTabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('#modifyModal').on('hidden.bs.modal', function (e) {
		$route.reload();
	});


}])
.controller('ClubCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', function ($rootScope, $scope, $http, $location, $route){
	if($rootScope.isLogin){

		$http.post('/model/admin/clubs', {}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;
		    $scope.count = $scope.items.length;
		    $scope.approveWait = [];
		    $scope.rejected = [];
		    $scope.approved = [];

		    for(var i in $scope.items){
		    	$scope.items[i].count = $scope.count;
		    	$scope.count --;

		    	$scope.items[i].registDate = $scope.items[i].registDate.replace('GMT+0900 (KST)', '');

		    	if($scope.items[i].clubApproved == false && $scope.items[i].clubRejected == false){
		    		$scope.items[i].status = '승인대기중';
		    		$scope.approveWait.push($scope.items[i]);
		    	} else if ($scope.items[i].clubApproved == true && $scope.items[i].clubExpired != true){
		    		$scope.items[i].status = '승인';
		    		$scope.approved.push($scope.items[i]);
		    	} else if ($scope.items[i].clubRejected == true){
		    		$scope.items[i].status = '거절';
		    		$scope.rejected.push($scope.items[i]);
		    	}

		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	} else {
		$location.path( "/" );
	}

	$scope.approve = function(id){
		$http.post('/model/admin/infoApprove', {id: id, category: "clubs"}).
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

	$scope.reject = function(id){
		console.log('rejected');
		$http.post('/model/admin/infoReject', {id: id, category: "clubs"}).
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

	$scope.delete = function(id){
		$http.post('/model/admin/infoDelete', {id: id, category: "clubs"}).
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

	$scope.modifyModal = function(id){

		$scope.modify = [];
		$scope.modifyItem = '';

		$http.post('/model/admin/getInfo', {id: id, category: "clubs"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    if(response.statusText == 'OK'){
		    	$scope.modifyItem = response.data;

				$scope.modify = {
					id: $scope.modifyItem[0]._id,
					title: $scope.modifyItem[0].clubTitle,
					category: {
						sports: $scope.modifyItem[0].clubSport,
						subcategory: '동호회'
					},
					location: {
						state: $scope.modifyItem[0].clubLocation.state,
						city: $scope.modifyItem[0].clubLocation.city
					},
					courtName: $scope.modifyItem[0].clubCourtName,
					GPS: {
						lat: $scope.modifyItem[0].clubGPS.lat,
						lng: $scope.modifyItem[0].clubGPS.lng
					},
					contact: {
						phone: $scope.modifyItem[0].clubContact.phone,
						email: $scope.modifyItem[0].clubContact.email,
						url: $scope.modifyItem[0].clubContact.url
					},
					detailInfo : $scope.modifyItem[0].clubInfo
				};

		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$scope.modifySubmit = function(id){
		//console.log($scope.modify);
		//console.log(id);

		$http.post('/model/admin/modifyData', {id: id, category: "clubs", data: $scope.modify}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    if(response.statusText == 'OK'){
		    	$('#modifyModal').modal('hide');
		    }
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	$('#clubTabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('#modifyModal').on('hidden.bs.modal', function (e) {
		$route.reload();
	});


}])
.controller('EventCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', 'notiDelete', 'notiDeActive', 'notiActive', function ($rootScope, $scope, $http, $location, $route, notiDelete, notiDeActive, notiActive){
	if($rootScope.isLogin){
		$scope.activateNum = 0;
		$scope.deActivateNum = 0;
		$http.post('/model/admin/noti', {type: "event"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;
		    $scope.count = $scope.items.length;

		    for(var i in $scope.items){
		    	$scope.items[i].count = $scope.count;
		    	$scope.count --;

		    	$scope.items[i].date = $scope.items[i].date.replace('GMT+0900 (KST)', '');

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
		notiActive(id);
	};

	$scope.deActivate = function(id){
		notiDeActive(id);
	};

	$scope.delete = function(id){
		notiDelete(id);
	};

}])
.controller('PromoCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', 'notiDelete', 'notiDeActive', 'notiActive', function ($rootScope, $scope, $http, $location, $route, notiDelete, notiDeActive, notiActive){
	if($rootScope.isLogin){
		$scope.activateNum = 0;
		$scope.deActivateNum = 0;
		$http.post('/model/admin/noti', {type: "promotion"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;
		    $scope.count = $scope.items.length;

		    for(var i in $scope.items){
		    	$scope.items[i].count = $scope.count;
		    	$scope.count --;

		    	$scope.items[i].date = $scope.items[i].date.replace('GMT+0900 (KST)', '');


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
		notiActive(id);
	};

	$scope.deActivate = function(id){
		notiDeActive(id);
	};

	$scope.delete = function(id){
		notiDelete(id);
	};

}])
.controller('BlogCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location){
	if($rootScope.isLogin){

	} else {
		$location.path( "/" );
	}


}])
.controller('NotiCtrl', ['$rootScope', '$scope', '$http', '$location', '$route', 'notiDelete', 'notiDeActive', 'notiActive', function ($rootScope, $scope, $http, $location, $route, notiDelete, notiDeActive, notiActive){
	if($rootScope.isLogin){
		$scope.activateNum = 0;
		$scope.deActivateNum = 0;
		$http.post('/model/admin/noti', {type: "noti"}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available

		    $scope.items = response.data;
		    $scope.count = $scope.items.length;

		    for(var i in $scope.items){
		    	$scope.items[i].count = $scope.count;
		    	$scope.count --;

		    	$scope.items[i].date = $scope.items[i].date.replace('GMT+0900 (KST)', '');


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
		notiActive(id);
	};

	$scope.deActivate = function(id){
		notiDeActive(id);
	};

	$scope.delete = function(id){
		notiDelete(id);
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
.factory('notiDelete', ['$http', '$route', function ($http, $route) {
	return function(id) {
		$http.post('/model/admin/notiDelete', {id: id}).
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
.factory('notiDeActive', ['$http', '$route', function ($http, $route) {
	return function(id) {
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
.factory('notiActive', ['$http', '$route', function ($http, $route) {
	return function(id) {
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
})
.directive('myCurrentTime', ['$interval', 'dateFilter', '$rootScope', function($interval, dateFilter, $rootScope) {
	// return the directive link function. (compile function not needed)
	return function(scope, element, attrs) {
		var format,  // date format
			stopTime; // so that we can cancel the time updates

		// used to update the UI
		function updateTime() {
			element.text(dateFilter(new Date(), format));
			var curTime = element.text(dateFilter(new Date(), format)).context.innerText.split(' ')[1];
			//console.log(curTime);
			if(curTime === '12:00:00'){	
			//if(curTime === '4:17:00'){	
				//console.log('testing');
				$rootScope.iterateData();
			}
		}

		// watch the expression, and update the UI on change.
		scope.$watch(attrs.myCurrentTime, function(value) {
			format = value;
			updateTime();
		});

		stopTime = $interval(updateTime, 1000);

		// listen on DOM destroy (removal) event, and cancel the next UI update
		// to prevent updating time after the DOM element was removed.
		element.on('$destroy', function() {
			$interval.cancel(stopTime);
		});
	}
}]);


