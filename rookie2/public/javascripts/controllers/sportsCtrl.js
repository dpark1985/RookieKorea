angular.module('sports', ['ngRoute'])


.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/templates/sports/competitions.html',
		controller: 'CompCtrl',
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


	$routeProvider.otherwise('/', {
		templateUrl: '/templates/sports/competitions.html',
		controller: 'CompCtrl',
	});
}])


.controller('CompCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	//console.log($rootScope.curLocation);

	$scope.curCategory = 'competitions';
	$http.get('/model/'+$rootScope.curLocation+'/competitions').
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.items = response.data;
	    //console.log($scope.items);
	    for(var i in $scope.items){
	    	$scope.items[i].eventImg = $scope.items[i].eventImg.replace("public", "");
	    }

		$http.get('/model/numbers/'+$rootScope.curLocation).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.totalNums = response.data;
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


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
		return ($scope.selectedState.indexOf(item.eventLocation.state) !== -1);
	}


}])
.controller('CourtCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	
	//console.log($rootScope.curLocation);

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

		$http.get('/model/numbers/'+$rootScope.curLocation).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.totalNums = response.data;
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


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


	$scope.filteredStateCourt = function(item){
		return ($scope.selectedState.indexOf(item.courtLocation.state) !== -1);
	}


}])
.controller('ClubCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
	
	//console.log($rootScope.curLocation);

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

		$http.get('/model/numbers/'+$rootScope.curLocation).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.totalNums = response.data;
		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
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

	$scope.filteredStateClub = function(item){
		return ($scope.selectedState.indexOf(item.clubLocation.state) !== -1);
	}


}])

.controller('sportsCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', function ($scope, $rootScope, $window, $location, $http){
	
	$rootScope.curLocation = $location.absUrl().split('/')[3];
	$rootScope.curLocation = $rootScope.curLocation.replace('#', '');

	//console.log($rootScope.curLocation);

	if ($rootScope.curLocation === 'baseball'){ $scope.curLocationText = {ko: '야구', en: 'baseball'}; } 
	else if ($rootScope.curLocation === 'basketball'){ $scope.curLocationText = {ko: '농구', en: 'basketball'}; } 
	else if ($rootScope.curLocation === 'bedminton'){ $scope.curLocationText = {ko: '배드민턴', en: 'bedminton'}; } 
	else if ($rootScope.curLocation === 'bowling'){ $scope.curLocationText = {ko: '볼링', en: 'bowling'}; } 
	else if ($rootScope.curLocation === 'soccer'){ $scope.curLocationText = {ko: '축구', en: 'soccer'}; } 
	else if($rootScope.curLocation === 'tennis'){ $scope.curLocationText = {ko: '테니스', en: 'tennis'}; } 
	else if($rootScope.curLocation === 'market'){ $scope.curLocationText = {ko: '마켓', en: 'market'}; }




	$http.get('/model/numbers/'+$rootScope.curLocation).
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.totalNums = response.data;
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});	




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
	}
	$scope.subTab2 = function(){
		$scope.subTab1Active = '';
		$scope.subTab2Active = 'active';
		$scope.subTab3Active = '';
	}
	$scope.subTab3 = function(){
		$scope.subTab1Active = '';
		$scope.subTab2Active = '';
		$scope.subTab3Active = 'active';
	}

	$scope.selectedState = ['서울특별시', '부산광역시', '부산광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '제주도', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도'];
	$scope.state = {all: true,seoul: false,busan: false,daegue: false,incheon: false,gwangju: false,daejeon: false,ulsan: false,jeju: false,gyeonggi: false,ganwon: false,chungbuk: false,chungnam: false,jeonbuk: false,jeonnam: false,gyeongbuk: false,gyeongnam: false};

	$scope.selectAll = function(){
		if($scope.state.all){
			$scope.state.seoul=false;
			$scope.state.busan=false;
			$scope.state.daegue=false;
			$scope.state.incheon=false;
			$scope.state.gwangju=false;
			$scope.state.daejeon=false;
			$scope.state.ulsan=false;
			$scope.state.jeju=false;
			$scope.state.gyeonggi=false;
			$scope.state.ganwon=false;
			$scope.state.chungbuk=false;
			$scope.state.chungnam=false;
			$scope.state.jeonbuk=false;
			$scope.state.jeonnam=false;
			$scope.state.gyeongbuk=false;
			$scope.state.gyeongnam=false;
			$scope.selectedState = ['서울특별시', '부산광역시', '부산광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '제주도', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도'];
		} else {
			$scope.selectedState = [];
		}
	}	

	$scope.stateChange = function(){

		$scope.state.all = false;
		$scope.selectedState = [];

		if($scope.state.seoul){ $scope.selectedState.push('서울특별시'); }
		if ($scope.state.busan){ $scope.selectedState.push('부산광역시'); } 
		if ($scope.state.daegue){ $scope.selectedState.push('대구광역시'); } 
		if ($scope.state.incheon){ $scope.selectedState.push('인천광역시'); } 
		if ($scope.state.gwangju){ $scope.selectedState.push('광주광역시'); }
		if ($scope.state.daejeon){ $scope.selectedState.push('대전광역시'); } 
		if ($scope.state.ulsan){ $scope.selectedState.push('울산광역시'); } 
		if ($scope.state.jeju){ $scope.selectedState.push('제주도'); } 
		if ($scope.state.gyeonggi){ $scope.selectedState.push('경기도'); } 
		if ($scope.state.ganwon){ $scope.selectedState.push('강원도'); } 
		if ($scope.state.chungbuk){ $scope.selectedState.push('충청북도'); } 
		if ($scope.state.chungnam){ $scope.selectedState.push('충청남도'); } 
		if ($scope.state.jeonbuk){ $scope.selectedState.push('전라북도'); } 
		if ($scope.state.jeonnam){ $scope.selectedState.push('전라남도'); } 
		if ($scope.state.gyeongbuk){ $scope.selectedState.push('경상북도'); } 
		if ($scope.state.gyeongnam){ $scope.selectedState.push('경상남도'); }

		if($scope.selectedState == ''){
			$scope.state.all = true;
			$scope.selectAll();
		}
		
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
