angular.module('profile', ['common', 'ui.bootstrap'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '../../../templates/coach/setup/init.html',
		controller: 'setupCtrlInit'
	});

	$routeProvider.when('/setup1', {
		templateUrl: '../../../templates/coach/setup/1.html',
		controller: 'setupCtrl1'
	});

	$routeProvider.when('/setup2', {
		templateUrl: '../../../templates/coach/setup/2.html',
		controller: 'setupCtrl2'
	});

	$routeProvider.when('/setup3', {
		templateUrl: '../../../templates/coach/setup/3.html',
		controller: 'setupCtrl3'
	});

	$routeProvider.when('/setup4', {
		templateUrl: '../../../templates/coach/setup/4.html',
		controller: 'setupCtrl4'
	});

	$routeProvider.when('/complete', {
		templateUrl: '../../../templates/coach/setup/complete.html',
		controller: 'setupCtrlComplete'
	});

	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})


.factory('coachData', function() {
	return {
		coachData : {
			personalInfo: {
				coachID: null,
				coachName: null,
				coachPhone: null,
				coachEmail: null,
				sex: null,
				dob: {
					year: '1985',
					month: null,
					day: null
				},
				address: {
					zipcode: null,
					roadAddress: null,
					jibunAddress: null,
					extra: null
				},
				img: null
			},
			lessonInfo: {
				lessonSports: null,
				lessonTime: null,
				lessonFee: null,
				lessonDays: [],
				lessonGPS: {
					courtName: null,
					lat: null,
					lng: null,
					address: null
				}
			},
			opTime: {
				start: "06:00",
				end: "23:00",
				schedule: null
			},
			members: []

		}
	};
})

.controller('profileLeftCtrl', ['$scope', '$http', 'coachData', function ($scope, $http, coachData) {
	$scope.coachData = coachData.coachData;
	$scope.userID = userID;

	var req = {
		method: 'POST',
		url: '/getData/userData',
		data: { userID: $scope.userID }
	};

	$http(req).then(function(res){
		$scope.coachData.personalInfo.coachID = res.data.login;
		$scope.coachData.personalInfo.coachName = res.data.userName;
		$scope.coachData.personalInfo.coachPhone = res.data.phone;
		$scope.coachData.personalInfo.coachEmail = res.data.loginEmail;
	}, function(res){});

}])

.controller('setupCtrlInit', ['$scope', '$location', '$http', 'coachData', function ($scope, $location, $http, coachData) {
	
	$scope.setupIntro = function(){ $location.path('/setup1'); };

}])

.controller('setupCtrl1', ['$scope', '$location', '$http', 'coachData', function ($scope, $location, $http, coachData) {
	$scope.coachData = coachData.coachData.personalInfo;


	var today = new Date();
	$scope.years = [];
	for(var i=1945; i<= today.getFullYear(); i++){
		$scope.years.push(i);
	};

	$scope.months = [
		{month: '1', days: '31'},
		{month: '2', days: '28'},
		{month: '3', days: '31'},
		{month: '4', days: '30'},
		{month: '5', days: '31'},
		{month: '6', days: '30'},
		{month: '7', days: '31'},
		{month: '8', days: '31'},
		{month: '9', days: '30'},
		{month: '10', days: '31'},
		{month: '11', days: '30'},
		{month: '12', days: '31'},
	];

	$scope.monthSelected = function(){
		$scope.days = [];
		for(var i =0; i< $scope.months.length; i++){
			if($scope.coachData.dob.month == $scope.months[i].month){
				var monthDays = $scope.months[i].days;
				for(var j=1; j<= monthDays; j++){
					$scope.days.push(j);
				}
			}
		}
	};

	function setup1Check (data){
		var errors = [];
		$scope.coachData.address.zipcode = $('#postcode').val();
		$scope.coachData.address.roadAddress = $('#roadAddress').val();
		$scope.coachData.address.jibunAddress = $('#jibunAddress').val();
		$scope.coachData.address.extra = $('#extraAddress').val();
		
		if(data.coachName == null || data.coachName == ""){ errors.push('코치님 이름을 입력해주세요.'); }
		if(data.sex == null){ errors.push('성별을 선택해주세요.'); }
		if(data.img == null){ errors.push('코치님 사진을 업로드해주세요.'); } 
		if(data.dob.year == null || data.dob.month == null || data.dob.day == null ){ errors.push('생년월일을 입력해주세요.'); }
		if(data.address.roadAddress == ""){
			if($scope.coachData.address.jibunAddress == ""){
				errors.push('주소를 입력해주세요.');
			}
		}

		//console.log(data);
		return errors;
	};
	
	$scope.setupPage1 = function(){ 
		$scope.errs = setup1Check($scope.coachData);

		if($scope.errs.length > 0){
			$('#alertModal1').modal('show');
		} else {
			$location.path('/setup2'); 
		}

		//$location.path('/setup2'); 

	};
}])

.controller('setupCtrl2', ['$scope', '$location', '$http', 'coachData', function ($scope, $location, $http, coachData) {
	$scope.coachData = coachData.coachData.lessonInfo;
	$scope.sportsList = ['축구', '농구', '배구', '핸드볼', '야구', '탁구', '테니스', '배드민턴', '필드하키', '럭비', '미식축구', '스쿼시', '당구', '골프', '태권도', '택견', '쿵푸', '가라데', '유도', '복싱', '킥복싱', '레슬링', '승마', '스케이팅', '스피드 스케이팅', '피켜', '스키', '알파인 스키', '노르딕 스키', '스노우 보드', 'MTB'];

	var convertENKO = function (checkDay){
		var enDay = ['mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun'];
		var koDay = ['월', '화', '수', '목', '금', '토', '일'];
		if(enDay.indexOf(checkDay) >= 0){
			var result = getDayOrderEN(checkDay);
		} else if(koDay.indexOf(checkDay) >= 0){
			var result = getDayOrderKO(checkDay);
		}
		return result;
	}

	var getDayOrderEN = function (day){
		var ko = null;
		var order = null;
		if(day == 'sun'){ ko = '일'; order = 1; } 
		else if(day == 'mon'){ ko = '월'; order = 2; } 
		else if(day == 'tue'){ ko = '화'; order = 3; } 
		else if(day == 'wed'){ ko = '수'; order = 4; } 
		else if(day == 'thr'){ ko = '목'; order = 5; } 
		else if(day == 'fri'){ ko = '금'; order = 6; } 
		else if(day == 'sat'){ ko = '토'; order = 7; }	
		return [ko, order];
	}

	var getDayOrderKO = function (day){
		var en = null;
		var order = null;
		if(day == '일'){ en = 'sun'; order = 1; } 
		else if(day == '월'){ en = 'mon'; order = 2; } 
		else if(day == '화'){ en = 'tue'; order = 3; } 
		else if(day == '수'){ en = 'wed'; order = 4; } 
		else if(day == '목'){ en = 'thr'; order = 5; } 
		else if(day == '금'){ en = 'fri'; order = 6; } 
		else if(day == '토'){ en = 'sat'; order = 7; }	
		return [en, order];
	}

	var getDayIndexKO = function (day){
		var ko = day;
		var order = null;
		if(day == '일'){ order = 1; } 
		else if(day == '월'){ order = 2; } 
		else if(day == '화'){ order = 3; } 
		else if(day == '수'){ order = 4; } 
		else if(day == '목'){ order = 5; } 
		else if(day == '금'){ order = 6; } 
		else if(day == '토'){ order = 7; }	
		return [ko, order];
	}

	$scope.available = function(day){
		var result = convertENKO(day);
		var index = $scope.coachData.lessonDays.indexOf(result[0]);

		if(index >= 0){
			$scope.coachData.lessonDays.splice(index, 1);
			$('#lesson'+day).removeClass('availableDay');
			$('#lesson'+day).html("X");
		} else {
			if($scope.coachData.lessonDays.length == 0){
				$scope.coachData.lessonDays.push(result[0]);
			} else {
				for(var i=0; i< $scope.coachData.lessonDays.length; i++){
					var sortingOrder = getDayIndexKO($scope.coachData.lessonDays[i]);
					if(sortingOrder[1] < result[1]){
						if(($scope.coachData.lessonDays.length-i) == 1){
							$scope.coachData.lessonDays.push(result[0]);
							break;
						} else {
							var tempIndex = $scope.coachData.lessonDays.indexOf(sortingOrder[0])+1;
						}
					} else {
						$scope.coachData.lessonDays.splice(tempIndex, 0, result[0]);
						break;
					}
				}
			}
			$('#lesson'+day).addClass('availableDay');
			$('#lesson'+day).html("O");
		}
	};

	function setup2Check (data){
		var errors = [];
		data.lessonGPS.lat = $('#clickLatlng').html().split(' ')[1];
		data.lessonGPS.lng = $('#clickLatlng').html().split(' ')[3];
		data.lessonGPS.address = $('#address').html();

		if(data.lessonSports == null){ errors.push('레슨할 스포츠 종목을 입력해주세요.'); }	
		if(data.lessonTime == null){ errors.push('레슨시간을 입력해주세요.'); }	
		if(data.lessonFee == null){ errors.push('레슨비를 입력해주세요.'); }
		if(data.lessonDays.length == 0){ errors.push('레슨 가능 요일을 선택해 주세요.'); }
		if(data.lessonGPS.courtName == null){ errors.push('레슨할 코트의 이름을 입력해주세요.'); }	
		if(data.lessonGPS.lat == null || $scope.coachData.lessonGPS.lat == ""){ errors.push('코트의 위치를 지도에서 찾아 더블클릭 해주세요.'); }
		
		//console.log(data);
		return errors;
	};

	$scope.setupPage2 = function(){ 
		$scope.errs = setup2Check($scope.coachData);

		if($scope.errs.length > 0){
			$('#alertModal2').modal('show');
		} else {
			$location.path('/setup3'); 
		}	

		//$location.path('/setup3'); 
	};
	$scope.toBackward1 = function(){ $location.path('/setup1'); };
}])

.controller('setupCtrl3', ['$scope', '$location', '$http', 'coachData', function ($scope, $location, $http, coachData) {
	$scope.coachData = coachData.coachData.opTime;

	$scope.opTimeStart = [ '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ];
	$scope.opTimeID = [ '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23' ];
	var lessonTimeAvailable = { sun: [], mon: [], tue: [], wed: [], thr: [], fri: [], sat: [] };

	//timePicker
	$scope.startTime = new Date();
	$scope.startTime.setHours(6);
	$scope.startTime.setMinutes(0);
	$scope.startTime.setMilliseconds(0);

  	$scope.endTime = new Date();
	$scope.endTime.setHours(23);
	$scope.endTime.setMinutes(0);
	$scope.endTime.setMilliseconds(0);

	$scope.hstep = 1;
  	$scope.mstep = 30;
  	$scope.ismeridian = ! $scope.ismeridian;

	$scope.getOpTimeHours = function(index1, index2){
		$scope.opTimeHours = $scope.opTimeID.slice(index1, index2);
	}

	var startHourIndex = $scope.opTimeStart.indexOf($scope.coachData.start);
	var endHourIndex = $scope.opTimeStart.indexOf($scope.coachData.end) + 1;

	$scope.getOpTimeHours(startHourIndex, endHourIndex);

	$scope.opTimeStartSelected = function(){
		var opTimeIndex = $scope.opTimeStart.length;
		$scope.coachData.start = $scope.startTime.toString().split(' ')[4].slice(0, 5);
		startHourIndex = $scope.opTimeStart.indexOf($scope.coachData.start.split(':')[0]+":00");
		$scope.getOpTimeHours(startHourIndex, opTimeIndex);
	}

	$scope.opTimeEndSelected = function(){
		$scope.coachData.end = $scope.endTime.toString().split(' ')[4].slice(0, 5);
		endHourIndex = $scope.opTimeStart.indexOf($scope.coachData.end.split(':')[0]+":00") + 1;
		$scope.getOpTimeHours(startHourIndex, endHourIndex);
	}

	$scope.lessonTime = function(day, time){
		if(day == 'sun'){
			var index = lessonTimeAvailable.sun.indexOf(time);
			var lessonDay = lessonTimeAvailable.sun;
		} else if(day == 'mon'){
			var index = lessonTimeAvailable.mon.indexOf(time);
			var lessonDay = lessonTimeAvailable.mon;
		} else if(day == 'tue'){
			var index = lessonTimeAvailable.tue.indexOf(time);
			var lessonDay = lessonTimeAvailable.tue;
		} else if(day == 'wed'){
			var index = lessonTimeAvailable.wed.indexOf(time);
			var lessonDay = lessonTimeAvailable.wed;
		} else if(day == 'thr'){
			var index = lessonTimeAvailable.thr.indexOf(time);
			var lessonDay = lessonTimeAvailable.thr;
		} else if(day == 'fri'){
			var index = lessonTimeAvailable.fri.indexOf(time);
			var lessonDay = lessonTimeAvailable.fri;
		} else if(day == 'sat'){
			var index = lessonTimeAvailable.sat.indexOf(time);
			var lessonDay = lessonTimeAvailable.sat;
		}

		if(index >= 0){
			lessonDay.splice(index, 1);
			$('#'+day+time).removeClass('availableDay');
			$('#'+day+time).html("X")
		} else {
			lessonDay.push(time);
			$('#'+day+time).addClass('availableDay');
			$('#'+day+time).html("O");
		}
	}

	$scope.selectAllSun = {check: false};
	$scope.selectAllMon = {check: false};
	$scope.selectAllTue = {check: false};
	$scope.selectAllWed = {check: false};
	$scope.selectAllThr = {check: false};
	$scope.selectAllFri = {check: false};
	$scope.selectAllSat = {check: false};

	$scope.selectAll = function(day){
		if(day == 'sun'){
			lessonTimeAvailable.sun = [];
			var allDay = lessonTimeAvailable.sun;
			var selectedDay = $scope.selectAllSun;
		} else if (day == 'mon'){
			lessonTimeAvailable.mon = [];
			var allDay = lessonTimeAvailable.mon;
			var selectedDay = $scope.selectAllMon;
		} else if (day == 'tue'){
			lessonTimeAvailable.tue = [];
			var allDay = lessonTimeAvailable.tue;
			var selectedDay = $scope.selectAllTue;
		} else if (day == 'wed'){
			lessonTimeAvailable.wed = [];
			var allDay = lessonTimeAvailable.wed;
			var selectedDay = $scope.selectAllWed;
		} else if (day == 'thr'){
			lessonTimeAvailable.thr = [];
			var allDay = lessonTimeAvailable.thr;
			var selectedDay = $scope.selectAllThr;
		} else if (day == 'fri'){
			lessonTimeAvailable.fri = [];
			var allDay = lessonTimeAvailable.fri;
			var selectedDay = $scope.selectAllFri;
		} else if (day == 'sat'){
			lessonTimeAvailable.sat = [];
			var allDay = lessonTimeAvailable.sat;
			var selectedDay = $scope.selectAllSat;
		}

		if(selectedDay.check == false){
			for(var i in $scope.opTimeHours){
				allDay.push($scope.opTimeHours[i]);
				$('#'+day+$scope.opTimeHours[i]).addClass('availableDay');
				$('#'+day+$scope.opTimeHours[i]).html("O");
			}
			selectedDay.check = true;
		} else {
			for(var i in $scope.opTimeHours){
				$('#'+day+$scope.opTimeHours[i]).removeClass('availableDay');
				$('#'+day+$scope.opTimeHours[i]).html("X");
			}
			selectedDay.check = false;
		}
	}

	function setup3Check (data){
		var errors = [];
		var count = 0;
		data.schedule = lessonTimeAvailable;
		for(var i in data.schedule){
			count += data.schedule[i];
		}
		if(count == 0){ errors.push('레슨 스케줄을 설정해주십시오.'); }
		
		//console.log(data);
		return errors;
	};

	$scope.setupPage3 = function(){ 
		$scope.errs = setup3Check($scope.coachData);

		if($scope.errs.length > 0){
			$('#alertModal3').modal('show');
		} else {
			$location.path('/setup4'); 
		}

		//$location.path('/setup4'); 
	};

	$scope.toBackward2 = function(){ $location.path('/setup2'); };


}])

.controller('setupCtrl4', ['$scope', '$location', '$http', 'coachData', function ($scope, $location, $http, coachData) {
	$scope.coachData = coachData.coachData;

	//datePicker
	$scope.format = 'yyyy/MM/dd';
	$scope.dt = new Date();
	$scope.open = function($event) {
		$scope.status.opened = true;
	};
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	$scope.status = {
		opened: false
	};

	//timePicker
	$scope.lessonTime = new Date();
	$scope.lessonTime.setHours(Number($scope.coachData.opTime.start.split(':')[0]));
	$scope.lessonTime.setMinutes(0);
	$scope.lessonTime.setMilliseconds(0);
	$scope.hstep = 1;
  	$scope.mstep = Number($scope.coachData.lessonInfo.lessonTime);
  	$scope.ismeridian = ! $scope.ismeridian;


	$scope.member = {
		name : null,
		phone : null,
		lessonTime : null,
		startDate : null
	}


	duplicateCheck = function(member){
		var errors = [];
		for(var i in $scope.coachData.members){
			if($scope.coachData.members[i].phone == member.phone){
				errors.push('같은 전화번호의 회원이 이미 있습니다.');
			}

			if($scope.coachData.members[i].lessonTime == member.lessonTime){
				errors.push('같은 시간대의 레슨회원이 이미 있습니다.');
			}
		}
		return errors;
	}

	$scope.addMember = function(){

		var lessonTime = $scope.lessonTime.toString().split(' ')[4];
		$scope.member.lessonTime = lessonTime.split(':')[0]+":"+lessonTime.split(':')[1];
		$scope.member.startDate = $scope.dt;
		$scope.member.startDate.setHours(Number(lessonTime.split(':')[0]));
		$scope.member.startDate.setMinutes(Number(lessonTime.split(':')[1]));
		$scope.member.startDate.setSeconds(0);


		$scope.errs = duplicateCheck($scope.member);
		if($scope.errs.length > 0){
			$('#alertModal4').modal('show');
		} else {
			$scope.coachData.members.push($scope.member);
			$scope.member = {
				name : null,
				phone : null,
				lessonTime : null,
				startDate : null
			}
		}
	}


	$scope.deleteMember = function(phone){
		for(var i in $scope.coachData.members){
			if($scope.coachData.members[i].phone.indexOf(phone)){
				var deleteIndex = $scope.coachData.members[i].phone.indexOf(phone);
			}
		}
		$scope.coachData.members.splice(deleteIndex, 1);
	}


	$scope.setupPage4 = function(){ $location.path('/complete'); };


	$scope.toBackward3 = function(){ $location.path('/setup3'); };

}])

.controller('setupCtrlComplete', ['$scope', '$location', '$http', 'coachData', function ($scope, $location, $http, coachData) {

	$scope.coachData = coachData.coachData;
	//console.log($scope.coachData);
	var req = {
		method: 'POST',
		url: '/setData/coachData',
		data: { coachData: $scope.coachData }
	};

	$http(req).then(function(res){
		//console.log(req);
	}, function(res){});
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

                    	if($("#newImg1")){
			                $("#newImg1").remove();
			            }

                    	var img = document.createElement("img");
		            	img.id = "newImg1";
		                img.width = 200;
		                img.height = 200;
	                    img.src = loadEvent.target.result;

                        scope.fileread = loadEvent.target.result;

		                var divStyle = {
		                    width: "200px",
		                    height: "200px"
		                }
		                var imgStyle = {
		                    margin: "-221px 0 0 0"
		                }
		                var navStyle = {
		                    margin: "0"
		                }
		                var footerStyle = {
		                    margin: "17 0 20 0"
		                }

		                $(".imgupload").css(divStyle);
		                $(".imgupload").append(img);
		                $("#newImg1").css(imgStyle);
		                $("#newImg1").addClass('img-circle');
		                //$(".phase3Nav").css(navStyle);
		                $("#navLogo").css(navStyle);
		                $("#logo-footer").css(footerStyle);
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
});
