angular.module('coachCommon', ['ngRoute'])




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
		if(res.data.initialSetup == false){
			$scope.coachData.coachID = res.data.login;
			$scope.coachData.coachName = res.data.userName;
			$scope.coachData.coachPhone = res.data.phone;
			$scope.coachData.coachEmail = res.data.loginEmail;
		} else {

			var req = {
				method: 'POST',
				url: '/getData/coachData',
				data: { userID: $scope.userID }
			};

			$http(req).then(function(res){
				$scope.coachData = res.data;
				$scope.coachData.personalInfo.img = $scope.coachData.personalInfo.img.replace('public/', '');
				console.log($scope.coachData);
			}, function(res){});


		}
	}, function(res){});

}]);