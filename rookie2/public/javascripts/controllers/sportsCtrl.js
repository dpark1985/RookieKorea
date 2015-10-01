angular.module('sports', ['ngRoute'])


.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		controller: 'sportsCtrl'
	});
	$routeProvider.when('/competitions', {
		templateUrl: '/templates/sports/competitions.html',
		controller: 'CompCtrl'
	});
	$routeProvider.when('/courts', {
		templateUrl: '/templates/sports/courts.html',
		controller: 'CourtCtrl'
	});
	$routeProvider.when('/clubs', {
		templateUrl: '/templates/sports/clubs.html',
		controller: 'ClubCtrl'
	});

	$routeProvider.otherwise('/competitions', {
		templateUrl: '/templates/sports/competitions.html',
		controller: 'CompCtrl',
	});
}])


.controller('CompCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){



	$scope.curCategory = 'competitions';
	$http.get('/model/'+$rootScope.curLocation+'/competitions').
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.items = response.data;
	    //console.log($scope.items);
	    for(var i in $scope.items){
	    	$scope.items[i].eventImg = $scope.items[i].eventImg.replace("public", "");
			var today = new Date();
			var eventDateStart = new Date($scope.items[i].eventDate.start2);
			var DDay = new Date(eventDateStart-today).getDate();
			//console.log(DDay);
			if(DDay == '1'){
				$scope.items[i].DDay = 'Day';
			} else {
				$scope.items[i].DDay = DDay;
			}
	    }

	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});

	// Tab Active class
	// Initiate tab1Active = active
	/*
		$scope.tab1Active = '';		//조회순
		$scope.tab2Active = '';		//신규등록순
		$scope.tab3Active = '';		//마감일순
	*/
	$scope.tab1Active = 'active';
	$scope.tab1 = function(){
		$scope.tab1Active = 'active';
		$scope.tab2Active = '';
		$scope.tab3Active = '';
	}
	$scope.tab2 = function(){
		$scope.tab1Active = '';
		$scope.tab2Active = 'active';
		$scope.tab3Active = '';
	}
	$scope.tab3 = function(){
		$scope.tab1Active = '';
		$scope.tab2Active = '';
		$scope.tab3Active = 'active';
	}
	$scope.filteredStateEvent = function(item){
		return ($rootScope.selectedState.indexOf(item.eventLocation.state) !== -1);
	}


}])
.controller('CourtCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	

	$scope.courtCity = {
		name: 'all'
	};
	$scope.curCategory = 'courts';
	$http.get('/model/'+$rootScope.curLocation+'/courts').
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.items = response.data;
	    //console.log($scope.items);
	    for(var i in $scope.items){
	    	$scope.items[i].courtImg = $scope.items[i].courtImg.replace("public", "");
	    	
	    }

		$rootScope.selectedCity = [];
		for(var i in $rootScope.cities){
			$rootScope.selectedCity.push($rootScope.cities[i].city);
		}

	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});





	$scope.selectAllCities = function(){
		$rootScope.selectedCity = [];
		for(var i in $rootScope.cities){
			$rootScope.selectedCity.push($rootScope.cities[i].city);
		}
	}

	$scope.citySelected = function(city, id){
		$rootScope.selectedCity = [];
		$rootScope.selectedCity = city;
	}


	// Tab Active class
	// Initiate tab1Active = active
	/*
		$scope.tab1Active = '';		//조회순
		$scope.tab2Active = '';		//신규등록순
		$scope.tab3Active = '';		//마감일순
	*/
	$scope.tab1Active = 'active';
	$scope.tab1 = function(){
		$scope.tab1Active = 'active';
		$scope.tab2Active = '';
		$scope.tab3Active = '';
	}
	$scope.tab2 = function(){
		$scope.tab1Active = '';
		$scope.tab2Active = 'active';
		$scope.tab3Active = '';
	}
	$scope.tab3 = function(){
		$scope.tab1Active = '';
		$scope.tab2Active = '';
		$scope.tab3Active = 'active';
	}
	$scope.filteredStateCourt = function(item){
		if($scope.courtCity.all){
			return ($rootScope.selectedState.indexOf(item.courtLocation.state) != -1);
		} else {
			return ($rootScope.selectedCity.indexOf(item.courtLocation.city) != -1);
		}
		
	}
}])
.controller('ClubCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	

	$scope.courtCity = {
		name: 'all'
	};
	$scope.curCategory = 'clubs';
	$http.get('/model/'+$rootScope.curLocation+'/clubs').
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.items = response.data;
	    //console.log($scope.items);
	    for(var i in $scope.items){
	    	$scope.items[i].clubImg = $scope.items[i].clubImg.replace("public", "");
	    }


	    $rootScope.selectedCity = [];
		for(var i in $rootScope.cities){
			$rootScope.selectedCity.push($rootScope.cities[i].city);
		}
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});

	$scope.selectAllCities = function(){
		$rootScope.selectedCity = [];
		for(var i in $rootScope.cities){
			$rootScope.selectedCity.push($rootScope.cities[i].city);
		}
	}

	$scope.citySelected = function(city, id){
		$rootScope.selectedCity = [];
		$rootScope.selectedCity = city;
	}

	// Tab Active class
	// Initiate tab1Active = active
	/*
		$scope.tab1Active = '';		//조회순
		$scope.tab2Active = '';		//신규등록순
		$scope.tab3Active = '';		//마감일순
	*/
	$scope.tab1Active = 'active';
	$scope.tab1 = function(){
		$scope.tab1Active = 'active';
		$scope.tab2Active = '';
		$scope.tab3Active = '';
	}
	$scope.tab2 = function(){
		$scope.tab1Active = '';
		$scope.tab2Active = 'active';
		$scope.tab3Active = '';
	}
	$scope.tab3 = function(){
		$scope.tab1Active = '';
		$scope.tab2Active = '';
		$scope.tab3Active = 'active';
	}
	$scope.filteredStateClub = function(item){
		if($scope.courtCity.all){
			return ($rootScope.selectedState.indexOf(item.clubLocation.state) !== -1);
		} else {
			return ($rootScope.selectedCity.indexOf(item.clubLocation.city) != -1);
		}
		
	}
}])

.controller('sportsCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$route', function ($scope, $rootScope, $window, $location, $http, $route){
	
	$rootScope.curLocation = $location.absUrl().split('/')[3].replace('#', '');
	$('#loadingModal').modal('show');

	$http.get('/model/numbers/'+$rootScope.curLocation).
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    var totalNums = response.data;

	    $scope.compNum = totalNums[0];
	    $scope.courtNum = totalNums[1];
	    $scope.clubNum = totalNums[2];


		$http.get('/model/address/states')
		.then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $rootScope.states = response.data;
		    $rootScope.allStates = [];
		    for(var i in $rootScope.states){
		    	$rootScope.allStates.push($rootScope.states[i].providence);
		    }

		    $rootScope.selectedState = $rootScope.allStates;

		    $scope.state = 'all';
		    $('#loadingModal').modal('hide');
		    $location.path('/competitions');

		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


	    
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});	


	$rootScope.selectAllStates = function(){
		$rootScope.selectedState = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '제주', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남'];
		$rootScope.cities = [];
		$rootScope.stateSelected = false;
		$route.reload();
	}	

	$rootScope.stateChange = function(state){
		$rootScope.selectedState = state;

    	for(var i in $rootScope.states){
    		if($rootScope.states[i].providence === state){
				$http.get('/model/address/'+$rootScope.states[i].id )
				.then(function(response) {
				    // this callback will be called asynchronously
				    // when the response is available
				    $rootScope.cities = [];
				    for(var i in response.data){
				    	$rootScope.cities.push(response.data[i]);
				    }
				    $rootScope.stateSelected = true;
				}, function(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
    		}
    	}
    	$route.reload();
	}


	if ($rootScope.curLocation === 'baseball'){ $scope.curLocationText = {ko: '야구', en: 'baseball'}; } 
	else if ($rootScope.curLocation === 'basketball'){ $scope.curLocationText = {ko: '농구', en: 'basketball'}; } 
	else if ($rootScope.curLocation === 'badminton'){ $scope.curLocationText = {ko: '배드민턴', en: 'badminton'}; } 
	else if ($rootScope.curLocation === 'bowling'){ $scope.curLocationText = {ko: '볼링', en: 'bowling'}; } 
	else if ($rootScope.curLocation === 'soccer'){ $scope.curLocationText = {ko: '축구', en: 'soccer'}; } 
	else if($rootScope.curLocation === 'tennis'){ $scope.curLocationText = {ko: '테니스', en: 'tennis'}; } 
	else if($rootScope.curLocation === 'market'){ $scope.curLocationText = {ko: '마켓', en: 'market'}; }

	// Subcategory (SubTab) Active class
	// Initiate subcategory active = active;
	/*
		$scope.subTab1Active = '';		//대회
		$scope.subTab2Active = '';		//코트장
		$scope.subTab3Active = '';		//동호회
	*/
	$scope.subTab1Active = 'active';
	$scope.subTab1 = function(){
		$scope.subTab1Active = 'active';
		$scope.subTab2Active = '';
		$scope.subTab3Active = '';

		$scope.state = 'all';
		$rootScope.stateSelected = false;
	}
	$scope.subTab2 = function(){
		$scope.subTab1Active = '';
		$scope.subTab2Active = 'active';
		$scope.subTab3Active = '';

		$scope.state = 'all';
		$rootScope.stateSelected = false;
	}
	$scope.subTab3 = function(){
		$scope.subTab1Active = '';
		$scope.subTab2Active = '';
		$scope.subTab3Active = 'active';

		$scope.state = 'all';
		$rootScope.stateSelected = false;
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

	$http.get('/model/noti').
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.notiData = response.data;
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});
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
});
