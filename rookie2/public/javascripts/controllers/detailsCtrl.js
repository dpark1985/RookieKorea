angular.module('details', ['ngRoute'])


.controller('detailCtrl', ['$scope', '$window', '$location', '$http', '$sce', '$route', function ($scope, $window, $location, $http, $sce, $route){


	$scope.templates = {
		'competitions' : '/templates/details/competitions.html',
		'courts' : '/templates/details/courts.html',
		'clubs' : '/templates/details/clubs.html'
	};

	//$scope.curPage = $scope.templates.competitions;

	var curLocation = $location.absUrl().split('/')[3];
	var curCategory = $location.absUrl().split('/')[4];
	var curId = $location.absUrl().split('/')[5];

	$scope.noImg = false;

	$http.get('/model/'+curLocation+'/'+curCategory+'/'+curId).
	then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.data = response.data;
	    //console.log($scope.data);


	    //console.log(curCategory);

	    if(curCategory === 'competitions'){
	    	if($scope.data[0].eventImg === 'public/uploads/defaultImg.png'){
	    		$scope.noImg = true;
	    		$scope.data[0].eventImg = $scope.data[0].eventImg.replace("public", "");
	    	} else {
	    		$scope.noImg = false;
	    		$scope.data[0].eventImg = $scope.data[0].eventImg.replace("public", "");
	    	}
	    	
	    	$scope.curPage = $scope.templates.competitions;
			$scope.data[0].eventInfo = $sce.trustAsHtml($scope.data[0].eventInfo);		

			var today = new Date();
			var eventDateStart = new Date($scope.data[0].eventDate.start2);
			var DDay = new Date(eventDateStart-today).getDate();
			//console.log(DDay);
			if(DDay == '1'){
				$scope.DDay = 'Day';
			} else {
				$scope.DDay = DDay;
			}

			var registDate = new Date($scope.data[0].registDate);
			var year = registDate.getFullYear();
			var month = registDate.getMonth() + 1;
			if(month < 10){
				month = '0'+month;
			}
			var date = registDate.getDate();
			if(date < 10){
				date = '0'+date;
			}
			$scope.data[0].registDate = year+'.'+month+'.'+date;
			$scope.eventEndDate = $scope.data[0].eventDate.start1.substring(0, 10);
		


	    } else if(curCategory === 'courts'){
	    	if($scope.data[0].courtImg === 'public/uploads/default.png'){
	    		$scope.noImg = true;
	    		$scope.data[0].courtImg = $scope.data[0].courtImg.replace("public", "");
	    	} else {
	    		$scope.noImg = false;
	    		$scope.data[0].courtImg = $scope.data[0].courtImg.replace("public", "");
	    	}
	    	$scope.curPage = $scope.templates.courts;
	    	$scope.data[0].courtInfo = $sce.trustAsHtml($scope.data[0].courtInfo);	

	    	var registDate = new Date($scope.data[0].registDate);
			var year = registDate.getFullYear();
			var month = registDate.getMonth() + 1;
			if(month < 10){
				month = '0'+month;
			}
			var date = registDate.getDate();
			if(date < 10){
				date = '0'+date;
			}
	    	$scope.data[0].registDate = year+'.'+month+'.'+date;




	    } else if(curCategory === 'clubs'){
	    	if($scope.data[0].clubImg === 'public/uploads/default.png'){
	    		$scope.noImg = true;
	    		$scope.data[0].clubImg = $scope.data[0].clubImg.replace("public", "");
	    	} else {
	    		$scope.noImg = false;
	    		$scope.data[0].clubImg = $scope.data[0].clubImg.replace("public", "");
	    	}
	    	$scope.curPage = $scope.templates.clubs;
	    	$scope.data[0].clubInfo = $sce.trustAsHtml($scope.data[0].clubInfo);	

	    	var registDate = new Date($scope.data[0].registDate);
			var year = registDate.getFullYear();
			var month = registDate.getMonth() + 1;
			if(month < 10){
				month = '0'+month;
			}
			var date = registDate.getDate();
			if(date < 10){
				date = '0'+date;
			}
	    	$scope.data[0].registDate = year+'.'+month+'.'+date;

	    }
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});

	$scope.heart = function(){
		//console.log($location.absUrl());

		if($scope.isLogin){
			$http.get('/model/'+curLocation+'/'+curCategory+'/'+curId+'/heart').
			then(function(response) {
				$scope.data[0].eventLikes += 1;
				$scope.data[0].courtLikes += 1;
				$scope.data[0].clubLikes += 1;
				$route.reload();
			}, function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
		} else {
			$('#toLoginModal').modal({
		        backdrop: 'static',
		        keyboard: false
		    });
		    $('#toLoginModal').modal('show');
		}
	}

	$scope.doLogin = function(){
		var id = $('#email').val();
		var pwd = $('#password').val();

		$http.post('/login', {login: id, password: pwd}).
		then(function(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log(response.config.url);
		    //console.log(response);

		    var isError = response.data.search("userLogCtrl");
		    //console.log(isError);

		    if(isError == '-1'){
		    	$scope.isLogin = true;
		    	$scope.loginID = id;
		    	$('#toLoginModal').modal('hide');
		    	$route.reload();

		    }else {
		    	var mes = "<h5 id='errmsg' style='color: #E3434B;'>아이디 또는 비밀번호가 잘못 입력되었습니다.</h5>";
		    	$('#loginTitle').append(mes);
		    	$('#email').val('');
		    	$('#password').val('');

		    }


		}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


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