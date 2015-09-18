angular.module('newinfo', ['ngRoute'])


.controller('newInfoCtrl', ['$scope', '$window', '$http', '$timeout', function ($scope, $window, $http, $timeout){



	
	$('#phase2').addClass('deactive');
	$('#phase3').addClass('deactive');


	$scope.newinfoInput = {};
	$scope.newinfoData = {
		title: '',
		author: '',
		category: { sports: '', subcategory: '' },
		location: { state: '', city: '' },
		courtName: '',
		GPS: { lat: '', lng: '' },
		eventDate: { start1: '', start2: '', end1: '', end2: '' },
		eventRegist: { start1: '', start2: '', end1: '', end2: '' },
		contact: { phone: '', email: '', url: '' },
		detailInfo: '',
		infoImg: ''
	};

	$scope.competition = false;
	$scope.court = false;
	$scope.club = false;
	$scope.inputValidation = false;
	$scope.inputValidation2 = false;
	$scope.inputValidation3 = false;
	$scope.newinfoInput.infoImg == '';



	$http.get('/model/address/states')
	.then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.states = response.data;
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});


	$scope.subCategory = function(){
		if($scope.newinfoInput.subcategory == '동호회'){
			$('#courtName').show();
			$('#courtNameSpan').html('주요 활동 코트장명');
			$('#infoMap').show();
			$('#date').hide();
			$('#phoneMust').addClass('option');	
			$('#phoneMust').html('선택');
		} else if($scope.newinfoInput.subcategory == '코트'){
			$('#date').hide();
			$('#courtName').show();
			$('#infoMap').show();
			$('#phoneMust').removeClass('option');
			$('#phoneMust').html('필수');
		} else {
			$('#courtName').show();
			$('#infoMap').show();
			$('#date').show();
			$('#phoneMust').removeClass('option');
			$('#phoneMust').html('필수');	
		}
	}

    $scope.stateChange = function(){
    	for(var i in $scope.states){
    		if($scope.states[i].providence == $scope.newinfoInput.state){
				$http.get('/model/address/'+$scope.states[i].id )
				.then(function(response) {
				    // this callback will be called asynchronously
				    // when the response is available
				    $scope.sis = response.data;
				}, function(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
    		}
    	}
    }

	$scope.phase1Next = function(){

		var latlng = $('#clickLatlng').html().split(' ');

		if($scope.newinfoInput.sports === '야구'){
			$scope.newinfoInput.sports = 'baseball';
		} else if ($scope.newinfoInput.sports === '농구'){
			$scope.newinfoInput.sports = 'basketball';
		} else if ($scope.newinfoInput.sports === '배드민턴'){
			$scope.newinfoInput.sports = 'badminton';
		} else if ($scope.newinfoInput.sports === '볼링'){
			$scope.newinfoInput.sports = 'bowling';
		} else if ($scope.newinfoInput.sports === '축구'){
			$scope.newinfoInput.sports = 'soccer';
		} else if ($scope.newinfoInput.sports === '테니스'){
			$scope.newinfoInput.sports = 'tennis';
		}


		$scope.newinfoData = {
			title: $scope.newinfoInput.title,
			author: $scope.loginID,
			category: {
				sports: $scope.newinfoInput.sports,
				subcategory: $scope.newinfoInput.subcategory
			},
			location: {
				state: $scope.newinfoInput.state,
				city: $scope.newinfoInput.city
			},
			courtName: $scope.newinfoInput.courtName,
			GPS: {
				lat: latlng[1],
				lng: latlng[3]
			},
			eventDate: {
				start1: $('#compDate1').val(),
				start2: $('#compDate11').val(),
				end1: $('#compDate2').val(),
				end2: $('#compDate22').val()
			},
			eventRegist: {
				start1: $('#registDate1').val(),
				start2: $('#registDate11').val(),
				end1: $('#registDate2').val(),
				end2: $('#registDate22').val()
			},
			contact: {
				phone: $scope.newinfoInput.phone,
				email: $scope.newinfoInput.email,
				url: $scope.newinfoInput.url
			}
		};

		


		if($scope.newinfoData.category.subcategory === '대회'){

			if($scope.newinfoData.title != '' 
				&& $scope.newinfoData.category.sports != '' 
				&& $scope.newinfoData.category.subcategory != '' 
				&& $scope.newinfoData.location.state != '' 
				&& $scope.newinfoData.location.city != '' 
				&& $scope.newinfoData.courtName != '' 
				&& $scope.newinfoData.GPS.lat != '' 
				&& $scope.newinfoData.GPS.lng != '' 
				&& $scope.newinfoData.eventDate.start1 != '' 
				&& $scope.newinfoData.eventDate.end1 != '' 
				&& $scope.newinfoData.eventRegist.start1 != '' 
				&& $scope.newinfoData.eventRegist.end1 != '' 
				&& $scope.newinfoData.contact.phone != '' 
				&& typeof($scope.newinfoData.title) != "undefined" 
				&& typeof($scope.newinfoData.category.sports) != "undefined" 
				&& typeof($scope.newinfoData.category.subcategory) != "undefined" 
				&& typeof($scope.newinfoData.location.state) != "undefined" 
				&& typeof($scope.newinfoData.location.city) != "undefined" 
				&& typeof($scope.newinfoData.courtName) != "undefined" 
				&& typeof($scope.newinfoData.GPS.lat) != "undefined" 
				&& typeof($scope.newinfoData.GPS.lng) != "undefined" 
				&& typeof($scope.newinfoData.eventDate.start1) != "undefined" 
				&& typeof($scope.newinfoData.eventDate.end1) != "undefined" 
				&& typeof($scope.newinfoData.eventRegist.start1) != "undefined" 
				&& typeof($scope.newinfoData.eventRegist.end1) != "undefined" 
				&& typeof($scope.newinfoData.contact.phone) != "undefined" 
				){
				$scope.competition = true;
				$scope.inputValidation = true;
			} else {
				$scope.competition = false;
				$scope.inputValidation = false;
			}
		} else if ($scope.newinfoData.category.subcategory == '코트'){
			if($scope.newinfoData.title != '' 
				&& $scope.newinfoData.category.sports != '' 
				&& $scope.newinfoData.category.subcategory != '' 
				&& $scope.newinfoData.location.state != '' 
				&& $scope.newinfoData.location.city != '' 
				&& $scope.newinfoData.courtName != '' 
				&& $scope.newinfoData.GPS.lat != '' 
				&& $scope.newinfoData.GPS.lng != '' 
				&& $scope.newinfoData.contact.phone != '' 
				&& typeof($scope.newinfoData.title) != "undefined" 
				&& typeof($scope.newinfoData.category.sports) != "undefined" 
				&& typeof($scope.newinfoData.category.subcategory) != "undefined" 
				&& typeof($scope.newinfoData.location.state) != "undefined" 
				&& typeof($scope.newinfoData.location.city) != "undefined" 
				&& typeof($scope.newinfoData.courtName) != "undefined" 
				&& typeof($scope.newinfoData.GPS.lat) != "undefined" 
				&& typeof($scope.newinfoData.GPS.lng) != "undefined" 
				&& typeof($scope.newinfoData.contact.phone) != "undefined" 
				){
				$scope.court = true;
				$scope.inputValidation = true;
			} else {
				$scope.court = false;
				$scope.inputValidation = false;
			}
		} else if ($scope.newinfoData.category.subcategory == '동호회'){
			if($scope.newinfoData.title != '' 
				&& $scope.newinfoData.category.sports != '' 
				&& $scope.newinfoData.category.subcategory != '' 
				&& $scope.newinfoData.location.state != '' 
				&& $scope.newinfoData.location.city != '' 
				&& $scope.newinfoData.courtName != '' 
				&& $scope.newinfoData.GPS.lat != '' 
				&& $scope.newinfoData.GPS.lng != '' 
				&& typeof($scope.newinfoData.title) != "undefined" 
				&& typeof($scope.newinfoData.category.sports) != "undefined" 
				&& typeof($scope.newinfoData.category.subcategory) != "undefined" 
				&& typeof($scope.newinfoData.location.state) != "undefined" 
				&& typeof($scope.newinfoData.location.city) != "undefined" 
				&& typeof($scope.newinfoData.courtName) != "undefined" 
				&& typeof($scope.newinfoData.GPS.lat) != "undefined" 
				&& typeof($scope.newinfoData.GPS.lng) != "undefined" 
				){
				$scope.club = true;
				$scope.inputValidation = true;
			} else {
				$scope.club = false;
				$scope.inputValidation = false;
			}
		} else {
			$scope.inputValidation = false;
		}

		if($scope.inputValidation == true){
			$('#alertSuccess').modal('show');
			$timeout(function(){
				$('#alertSuccess').modal('hide');
				$('#phase1').removeClass('deactive');
				$('#phase2').removeClass('deactive');
				$('#phase3').removeClass('deactive');

				$('#phase1').addClass('deactive');
				$('#phase3').addClass('deactive');

				$('html,body').animate({
		          scrollTop: 0
		        }, 500);

			}, 1000);
		} else {
			$('#alertModal').modal({
			 	backdrop: 'static',
			 	keyboard: false
			});
			$('#alertModal').modal('show');
	
		}
	}

	$scope.phase2Next = function(){
		var detailText = CKEDITOR.instances.editor1.getData();

		if(CKEDITOR.instances.editor1.getData() == ''){
			$scope.inputValidation2 = false;

			$('#alertModal').modal({
			 	backdrop: 'static',
			 	keyboard: false
			});
			$('#alertModal').modal('show');


		} else {
			$scope.inputValidation2 = true;
			$scope.newinfoData['detailInfo'] = detailText;


			$('#alertSuccess').modal('show');
			$timeout(function(){
				$('#alertSuccess').modal('hide');
				$('#phase1').removeClass('deactive');
				$('#phase2').removeClass('deactive');
				$('#phase3').removeClass('deactive');

				$('#phase1').addClass('deactive');
				$('#phase2').addClass('deactive');

				$('html,body').animate({
		          scrollTop: 0
		        }, 500);

			}, 2000);
		}
	}

	$scope.infoComplete = function(){
		if (typeof($scope.newinfoInput.infoImg) == "undefined"){
			$scope.inputValidation3 = false;

			$('#alertModal').modal({
			 	backdrop: 'static',
			 	keyboard: false
			});
			$('#alertModal').modal('show');

		} else {
			$scope.inputValidation3 = true;
			$scope.newinfoData['infoImg'] = $scope.newinfoInput.infoImg;

			$('#alertComplete').modal({
			 	backdrop: 'static',
			 	keyboard: false
			});
			$('#alertComplete').modal('show');
			

			//console.log($scope.newinfoData);


			$http.post('/model/newinfo', {newinfo: $scope.newinfoData}).
			then(function(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    console.log("response: " + response);
			    if(response){
			    	$scope.newinfoData = {};
			    }
			}, function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log(response);
			});


		}
	}

	$scope.goToMain = function(){
		$window.location.href = '/';
	}

	$scope.phase2Back = function(){
		$('#phase1').removeClass('deactive');
		$('#phase2').removeClass('deactive');
		$('#phase3').removeClass('deactive');

		$('#phase2').addClass('deactive');
		$('#phase3').addClass('deactive');
	}

	$scope.phase3Back = function(){
		$('#phase1').removeClass('deactive');
		$('#phase2').removeClass('deactive');
		$('#phase3').removeClass('deactive');

		$('#phase1').addClass('deactive');
		$('#phase3').addClass('deactive');
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

                    	if($("#newImg1")){
			                $("#newImg1").remove();
			            }

                    	var img = document.createElement("img");
		            	img.id = "newImg1";
		                img.width = 510;
		                img.height = 425;
	                    img.src = loadEvent.target.result;

                        scope.fileread = loadEvent.target.result;

		                var divStyle = {
		                    width: "512px",
		                    height: "427px"
		                }
		                var imgStyle = {
		                    margin: "-445px 0 0 0"
		                }
		                var navStyle = {
		                    margin: "0"
		                }
		                $(".imgupload").css(divStyle);
		                $(".imgupload").append(img);
		                $("img").css(imgStyle);
		                $(".phase3Nav").css(navStyle);
		                $("#navLogo").css(navStyle);
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
});