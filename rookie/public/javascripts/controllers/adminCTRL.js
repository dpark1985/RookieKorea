
angular.module('admin', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/info', {
		templateUrl: '/templates/admin/mainView.html',
		controller: 'InfoCtrl',
	});
	$routeProvider.when('/info/:query', {
		templateUrl: '/templates/admin/mainView.html',
		controller: 'InfoCtrl'
	});
	$routeProvider.when('/ads', {
		templateUrl: '/templates/admin/adsView.html',
		controller: 'AdsCtrl'
	});
	$routeProvider.when('/query', {
		templateUrl: '/templates/admin/queryView.html',
		controller: 'QueryCtrl'
	});
	$routeProvider.when('/noti', {
		templateUrl: '/templates/admin/notiView.html',
		controller: 'NotiCtrl'
	});
	$routeProvider.when('/userlist', {
		templateUrl: '/templates/admin/userlistView.html',
		controller: 'UserListCtrl'
	});

	$routeProvider.otherwise('/info', {
		templateUrl: '/templates/admin/mainView.html',
		controller: 'InfoCtrl',
	});
}])



/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/17/2015
/*	Description_en	=	Ads Controller: output advertizements
/*	Description_ko	=	광고 컨트롤러: 광고 문의
/* 	Reference		= 	admin.ejs
*/
.controller('MainCtrl', function ($scope, $rootScope, $http, $route){
	$rootScope.isLogin = false;

	$scope.admin = {};
	$scope.adminLogin = function(){


		$http.post("/admin", {login: $scope.admin.id, pw: $scope.admin.pw})
		.success(function (data, status){
			//console.log(data);
			if(data.access == true){
				$rootScope.isLogin = true;
				$route.reload();
			} else {
				$rootScope.isLogin = false;
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});

	}

})


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Info Controller: Output competitions, courts, clubs list
/*	Description_ko	=	인 컨트롤러: 대회, 코트장, 동호회 정보 출력
/* 	Reference		= 	admin.ejs
/* 	Reference		= 	templates/sports/mainView.html
/* 	Reference		= 	templates/admin/newInfo/competitions.html
/* 	Reference		= 	templates/admin/newInfo/courts.html
/* 	Reference		= 	templates/admin/newInfo/clubs.html
*/
.controller('InfoCtrl', function ($scope, $rootScope, $http, $location, $sce, $filter, $route){
	if($rootScope.isLogin == true) {


		$http.get("/admin/totalnum/info")
		.success(function (data, status){
			$scope.compNum = data.compNum;
			$scope.courtsNum = data.courtsNum;
			$scope.clubsNum = data.clubsNum;

		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});


		$scope.templates = {
			"competitions" : "/templates/admin/newInfo/competitions.html",
			"courts" : "/templates/admin/newInfo/courts.html",
			"clubs" : "/templates/admin/newInfo/clubs.html",
			"rejects" : "/templates/admin/newInfo/rejects.html"
		};



		if($location.url() == '/info' || $location.url() == '/info/competitions'){
			$scope.competitionsActive = 'active';
			$scope.courtsActive = '';
			$scope.clubsActive = '';
			$scope.rejectsActive = '';
			$scope.url = 'search/competitions/false';
		}  else if ($location.url() == '/info/courts'){
			$scope.competitionsActive = '';
			$scope.courtsActive = 'active';
			$scope.clubsActive = '';
			$scope.rejectsActive = '';
			$scope.url = 'search/courts/false';
		} else if ($location.url() == '/info/clubs'){
			$scope.competitionsActive = '';
			$scope.courtsActive = '';
			$scope.clubsActive = 'active';
			$scope.rejectsActive = '';
			$scope.url = 'search/clubs/false';
		} else {
			$scope.competitionsActive = '';
			$scope.courtsActive = '';
			$scope.clubsActive = '';
			$scope.rejectsActive = 'active';
			$scope.url = 'search/rejects/rejected';
		}


		$http.get($scope.url)
		.success(function (data, status){
			$scope.itemsNum = data.length;
			$scope.itemsList = data;
			for(var i=0; i< $scope.itemsNum; i++){
				if($scope.itemsList[i].eventSport){
					var content = $filter('limitTo')($scope.itemsList[i].eventInfo, 100);
					$scope.itemsList[i].eventSummary = 
						$sce.trustAsHtml(content);

					$scope.itemsList[i].eventInfo = 
						$sce.trustAsHtml($scope.itemsList[i].eventInfo);

					$scope.itemsList[i].category = '대회';

				} else if ($scope.itemsList[i].courtSport){
					var content = $filter('limitTo')($scope.itemsList[i].courtInfo, 100);
					$scope.itemsList[i].courtSummary = 
						$sce.trustAsHtml(content);

					$scope.itemsList[i].courtInfo = 
						$sce.trustAsHtml($scope.itemsList[i].courtInfo);

					$scope.itemsList[i].category = '코트장';		
				} else if ($scope.itemsList[i].clubSport){
					var content = $filter('limitTo')($scope.itemsList[i].clubInfo, 100);
					$scope.itemsList[i].clubSummary = 
						$sce.trustAsHtml(content);

					$scope.itemsList[i].clubInfo = 
						$sce.trustAsHtml($scope.itemsList[i].clubInfo);

					$scope.itemsList[i].category = '동호회';
				}
			}

			
			$scope.items = $scope.itemsList;
		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});

		$rootScope.success = function(id, category) {
			$http.get("admin/"+category+"/"+id+"/1")
			.success(function (data, status){
				$route.reload();
				console.log(data);
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});
			$route.reload();
			$rootScope.infoNum -= 1;
		};

		$rootScope.fail = function(id, category) {
			$http.get("admin/"+category+"/"+id+"/0")
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});
			$route.reload();
			$rootScope.infoNum -= 1;
		};

	}

})

/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/17/2015
/*	Description_en	=	Ads Controller: output advertizements
/*	Description_ko	=	광고 컨트롤러: 광고 문의
/* 	Reference		= 	admin.ejs
*/
.controller('AdsCtrl', function ($scope, $rootScope, $http, $route){
	if($rootScope.isLogin == true) {

		$http.get("/admin/getInfo/ads")
		.success(function (data, status){
			$scope.items = data;
			$scope.count = data.length;
			for(var i=0; i<$scope.items.length; i++){
				$scope.items[i].queryDate = $scope.items[i].queryDate.split(' ')[0] + 
				' ' + $scope.items[i].queryDate.split(' ')[1] + 
		        ' ' + $scope.items[i].queryDate.split(' ')[2] + 
		        ' ' + $scope.items[i].queryDate.split(' ')[3] + ' ';

		        $scope.items[i].count = $scope.count;
		        $scope.count --;
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});
	}

	$scope.check = function(id, checked){
		if(!checked){
			$http.get("/admin/checkedInfo/ads/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
			$rootScope.adsNum --;
		}

	};
	$scope.delete = function(id, checked){
		if(!checked){
			$http.get("/admin/deleteInfo/ads/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
			$rootScope.adsNum --;
		} else {
			$http.get("/admin/deleteInfo/ads/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
		}

	};



})

/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/17/2015
/*	Description_en	=	Query Controller: output all querys from the user
/*	Description_ko	=	쿼리 컨트롤러: 의견보내기
/* 	Reference		= 	admin.ejs
*/
.controller('QueryCtrl', function ($scope, $rootScope, $http, $route){
	if($rootScope.isLogin == true) {
		$http.get("/admin/getInfo/query")
		.success(function (data, status){
			$scope.items = data;
			$scope.count = data.length;
			for(var i=0; i<$scope.items.length; i++){
				$scope.items[i].queryDate = $scope.items[i].queryDate.split(' ')[0] + 
				' ' + $scope.items[i].queryDate.split(' ')[1] + 
		        ' ' + $scope.items[i].queryDate.split(' ')[2] + 
		        ' ' + $scope.items[i].queryDate.split(' ')[3] + ' ';

		        $scope.items[i].count = $scope.count;
		        $scope.count --;
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});
	}

	$scope.check = function(id, checked){
		if(!checked){
			$http.get("/admin/checkedInfo/query/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
			$rootScope.queryNum --;
		}
	};
	$scope.delete = function(id, checked){
		if(!checked){
			$http.get("/admin/deleteInfo/query/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
			$rootScope.queryNum --;
		} else {
			$http.get("/admin/deleteInfo/query/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
		}

	};		
})

/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/17/2015
/*	Description_en	=	Notification Controller: output notifications & events 
/*	Description_ko	=	공지 & 이벤트 컨트롤러: 공지사항 & 이벤트
/* 	Reference		= 	admin.ejs
*/
.controller('NotiCtrl', function ($scope, $rootScope, $http, $route){
	if($rootScope.isLogin == true) {
		$http.get("/admin/getInfo/noti")
		.success(function (data, status){
			$scope.items = data;
			$scope.count = data.length;
			for(var i=0; i<$scope.items.length; i++){
				$scope.items[i].notiDate = $scope.items[i].notiDate.split(' ')[0] + 
				' ' + $scope.items[i].notiDate.split(' ')[1] + 
		        ' ' + $scope.items[i].notiDate.split(' ')[2] + 
		        ' ' + $scope.items[i].notiDate.split(' ')[3] + ' ';

		        $scope.items[i].count = $scope.count;
		        $scope.count --;
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});

		$scope.notiInput = {};
		$scope.notiSubmit = function(){
			$scope.notiInput.type = $('.selectpicker').val();

			$http.post("/noti", {
				notiType : $scope.notiInput.type,
				notiSubject : $scope.notiInput.subject,
				notiContext: $scope.notiInput.context
			})
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
			$rootScope.notiNum += 1;
		};

	}

	$scope.check = function(id, notiActive){
		if(notiActive){
			$http.get("/admin/checkedInfo/noti/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
			$rootScope.notiNum --;
		}

	};

	$scope.delete = function(id, notiActive){
		if(notiActive){
			$http.get("/admin/deleteInfo/noti/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
			$rootScope.notiNum --;
		} else {
			$http.get("/admin/deleteInfo/noti/"+id)
			.success(function (data, status){
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

			$route.reload();
		}

	};		


})

/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/17/2015
/*	Description_en	=	UserList Controller: output all users
/*	Description_ko	=	사용자 컨트롤러: 가입회원 목록
/* 	Reference		= 	admin.ejs
*/
.controller('UserListCtrl', function ($scope, $rootScope, $http){
	if($rootScope.isLogin == true) {

		$http.get("/admin/getInfo/userlist")
		.success(function (data, status){
			$scope.items = data;
			$scope.count = data.length;
			for(var i=0; i<$scope.items.length; i++){
		        $scope.items[i].count = $scope.count;
		        $scope.count --;

				$scope.items[i].since = $scope.items[i].since.split(' ')[0] + 
				        ' ' + $scope.items[i].since.split(' ')[1] + 
				        ' ' + $scope.items[i].since.split(' ')[2] + 
				        ' ' + $scope.items[i].since.split(' ')[3] + 
				        ' ' + $scope.items[i].since.split(' ')[4];
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error');
		});
	}
})

/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Side Content Controller, output 10 competitions on side
/*	Description_ko	=	사이트 컨트롤러, 10개 최신 대회 목록 출력
/* 	Reference		= 	admin.ejs
*/
.controller('SideCtrl', function ($location, $scope, $rootScope, $http, $route) {
	$scope.template = {
		"side" : "/templates/admin/side.html"
	};

	$scope.infoActive = 'active';

	$http.get("/admin/totalnum/info")
	.success(function (data, status){
		$rootScope.infoNum = data.total;
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});

	$http.get("/admin/totalnum/ads")
	.success(function (data, status){
		$rootScope.adsNum = data.total;
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});

	$http.get("/admin/totalnum/query")
	.success(function (data, status){
		$rootScope.queryNum = data.total;
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});

	$http.get("/admin/totalnum/noti")
	.success(function (data, status){
		$rootScope.notiNum = data.total;
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});

	$http.get("/admin/totalnum/userlist")
	.success(function (data, status){
		$rootScope.userListNum = data.total;
	})
	.error(function(data, status, headers, config) {
		console.log('error');
	});



	$scope.infoList = function(){
		//console.log($location.url()); 
		//http://127.0.0.1:3000/admin#/
		$scope.infoActive = 'active';
		$scope.adsActive = '';
		$scope.queryActive = '';
		$scope.notiActive = '';
		$scope.userListActive = '';
	};

	$scope.ads = function(){
		//console.log($location.url()); 
		//http://127.0.0.1:3000/admin#/ads
		$scope.infoActive = '';
		$scope.adsActive = 'active';
		$scope.queryActive = '';
		$scope.notiActive = '';
		$scope.userListActive = '';
	};

	$scope.query = function(){
		//console.log($location.url()); 
		//http://127.0.0.1:3000/admin#/query
		$scope.infoActive = '';
		$scope.adsActive = '';
		$scope.queryActive = 'active';
		$scope.notiActive = '';
		$scope.userListActive = '';
	};

	$scope.noti = function(){
		//console.log($location.url()); 
		//http://127.0.0.1:3000/admin#/noti
		$scope.infoActive = '';
		$scope.adsActive = '';
		$scope.queryActive = '';
		$scope.notiActive = 'active';
		$scope.userListActive = '';
	};;

	$scope.userList = function(){
		//console.log($location.url()); 
		//http://127.0.0.1:3000/admin#/userList
		$scope.infoActive = '';
		$scope.adsActive = '';
		$scope.queryActive = '';
		$scope.notiActive = '';
		$scope.userListActive = 'active';
	};



})



/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Navigation Controller, Check login status, keyword search
/*	Description_ko	=	네비게이션 컨트롤러, 로그인체크, 검색키워드
/* 	Reference		= 	admin.ejs
/*	Reference		=	templates/common/navBar.html
*/
.controller('NavCtrl', function ($scope, $rootScope, $window){

	$rootScope.addURL = '';

	var isLogin = $("#isLogin").html();
	$scope.userName = isLogin.trim();
	if(isLogin.trim() != ""){
		$scope.noLogin = false;
		$scope.yesLogin = true;
		$scope.noMain = true;
		$('#isLogin').hide();

	} else{
		$scope.noLogin = true;
		$scope.yesLogin = false;
		$scope.noMain = true;
		$('#isLogin').hide();
	}

	$scope.template = {
		"navBar" : "/templates/common/navBar.html"
	}	


	/*
	/*	Author 			= 	Daniel Park
	/*	Date 			= 	08/10/2015
	/*	Description_en	=	Redirect to Search Page
	/*	Description_ko	=	검색 키워드가 있을 시, /search/키워드 로 이동
	/*	url				=	/search#/KEYWORD
	/* 	Reference		= 	admin.ejs
	*/
	$scope.search = function() {		
		if($('#searchInput').val() != ''){
			$window.location = '/search#/' + $('#searchInput').val();
		}
	}

})


/*
/*	Author 			= 	Daniel Park
/*	Date 			= 	08/10/2015
/*	Description_en	=	Bread Controller: output current location
/*	Description_ko	=	브레드 컨트롤러: 현위치 출력
/* 	Reference		= 	admin.ejs
*/
.controller('breadCtrl', function ($timeout, $rootScope, $location){
	var strArr = $location.absUrl().split('/');
	if(strArr[3].substring(strArr[3].length-1, strArr[3].length) == '#'){
		var currLocation = strArr[3].substring(0, strArr[3].length-1);
	} else{
		var currLocation = strArr[3].substring(0, strArr[3].length);
	}
	$rootScope.currLocation = currLocation;
});

