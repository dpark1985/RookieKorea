angular.module('newinfo', ['ngRoute'])


.controller('newInfoCtrl', ['$scope', '$window', '$http', '$timeout', function ($scope, $window, $http, $timeout){



	
	$('#phase2').addClass('deactive');
	$('#phase3').addClass('deactive');
	$('#MainTitle').hide();
	$('#MainDate').hide();
	$('#MainLocation').hide();
	$('#MainContact1').hide();
	$('#MainContact2').hide();
	$('#MainContact3').hide();

	$('#MainCategory').css('border-bottom', '1px solid #888888');




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
		contact: { phone: '', phone2: '', phone3: '', email: '', url: '' },
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


	CKEDITOR.replace( 'editor1' );
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


/*
	$http.get('/model/address/states')
	.then(function(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.states = response.data;
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});
*/

	$scope.subCategory = function(){
		if($scope.newinfoInput.subcategory == '동호회'){
			$('#MainTitle').show();
			$('#MainLocation').show();
			$('#MainContact1').show();
			$('#MainContact2').show();
			$('#MainContact3').show();
			$('#courtName').show();
			$('#infoMap').show();
		
			$('#MainDate').hide();
			$('#location').hide();

			$('#MainCategory').css('border-bottom', '');
			$('#titleSpan').html('동호회 명칭을 입력해주세요.');
			$('#courtNameSpan').html('주요 활동 코트장 이름');
			$('#phoneMust').addClass('option');	
			$('#phoneMust').html('선택');
		} else if($scope.newinfoInput.subcategory == '코트'){
			$('#MainTitle').show();
			$('#MainLocation').show();
			$('#MainContact1').show();
			$('#MainContact2').show();
			$('#MainContact3').show();
			$('#infoMap').show();

			$('#MainDate').hide();
			$('#location').hide();
			$('#courtName').hide();

			$('#MainCategory').css('border-bottom', '');
			$('#titleSpan').html('코트장 명칭을 입력해주세요.');
			$('#phoneMust').removeClass('option');
			$('#phoneMust').html('필수');
		} else if($scope.newinfoInput.subcategory == '대회') {
			$('#MainTitle').show();
			$('#MainLocation').show();
			$('#MainContact1').show();
			$('#MainContact2').show();
			$('#MainContact3').show();
			$('#courtName').show();
			$('#infoMap').show();
			$('#MainDate').show();

			$('#location').hide();

			$('#MainCategory').css('border-bottom', '');
			$('#titleSpan').html('대회 명칭을 입력해주세요.');
			$('#courtNameSpan').html('대회 코트장 이름');
			$('#phoneMust').removeClass('option');
			$('#phoneMust').html('필수');	
		}
	}

/*
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
*/

	$scope.phase1Next = function(){

		var latlng = $('#clickLatlng').html().split(' ');
		var address = $('#address').html().split(' ');

		var state = address[3].substring(0, 2);
		var city = address[4];


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
				state: state,
				city: city
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
				phone: $scope.newinfoInput.phone1,
				phone2: $scope.newinfoInput.phone2,
				phone3: $scope.newinfoInput.phone3,
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
				&& $scope.newinfoData.GPS.lat != '' 
				&& $scope.newinfoData.GPS.lng != '' 
				&& $scope.newinfoData.contact.phone != '' 
				&& typeof($scope.newinfoData.title) != "undefined" 
				&& typeof($scope.newinfoData.category.sports) != "undefined" 
				&& typeof($scope.newinfoData.category.subcategory) != "undefined" 
				&& typeof($scope.newinfoData.location.state) != "undefined" 
				&& typeof($scope.newinfoData.location.city) != "undefined" 
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

		if(detailText == ''){
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
		if ($scope.newinfoInput.infoImg === undefined){

			$('#alertComplete').modal({
			 	backdrop: 'static',
			 	keyboard: false
			});
			$('#alertComplete').modal('show');

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


		} else {
			$scope.newinfoData['infoImg'] = $scope.newinfoInput.infoImg;

			$('#alertComplete').modal({
			 	backdrop: 'static',
			 	keyboard: false
			});
			$('#alertComplete').modal('show');
			

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