angular.module('rookieKorea', [
        'ngRoute'
    ])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/competitions', {
                templateUrl: '/templates/competitions.html',
                controller: 'CompetitionsCtrl',
                controllerAs: 'compeititions'
            })
            .when('/courts', {
                templateUrl: '/templates/courts.html',
                controller: 'CourtsCtrl',
                controllerAs: 'courts'
            }).when('/clubs', {
                templateUrl: '/templates/clubs.html',
                controller: 'ClubsCtrl',
                controllerAs: 'clubs'
            }).when('/newinfo', {
                templateUrl: '/templates/newinfo.html',
                controller: 'NewInfoCtrl',
                controllerAs: 'newinfo'
            }).when('/register', {
                controller: 'RegisterCtrl',
                controllerAs: 'register'
            });
    }
])
.controller('MainCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

    if ($location.url() == '/newinfo') {
        $rootScope.mainAdds = false;
    } else {
        $rootScope.mainAdds = true;
    }

    $scope.loginStatus = false;
    var loginCheck = $('#loginCheck').html();

    if (loginCheck == '1111') {
        $scope.loginStatus = false;
    } else {
        $scope.loginStatus = true;
    }


}])
.controller('CompetitionsCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

    if ($location.url() == '/newinfo') {
        $rootScope.mainAdds = false;
    } else {
        $rootScope.mainAdds = true;
    }




}])
.controller('CourtsCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

    if ($location.url() == '/newinfo') {
        $rootScope.mainAdds = false;
    } else {
        $rootScope.mainAdds = true;
    }


}])
.controller('ClubsCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

    if ($location.url() == '/newinfo') {
        $rootScope.mainAdds = false;
    } else {
        $rootScope.mainAdds = true;
    }

    $scope.mainAdds = true;
    $scope.sportsItems = ['전체', '테니스', '축구', '야구', '농구', '배드민턴', '볼링'];
    $scope.selection = $scope.sportsItems[0];


}])
.controller('RegisterCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$window', function($rootScope, $scope, $http, $timeout, $window) {
    $scope.registerData = {};
    $scope.varification1Status = false;
    $scope.registComplite = false;;

    $scope.phoneV1 = function() {
        $scope.inputValid = "";

        if ($scope.registerData.userName == null || $scope.registerData.userName == '') {
            $scope.varification1Status = false;
            $scope.inputValidName = {
                border: '1px solid red',
                background: 'yellow'
            };
        } else {
            $scope.inputValidName = "";
        }

        if ($scope.registerData.userLogin == null || $scope.registerData.userLogin == '') {
            $scope.varification1Status = false;
            $scope.inputValidLogin = {
                border: '1px solid red',
                background: 'yellow'
            };
        } else {
            $http.post('http://52.69.2.200/happ/testingUserID', {
                login: $scope.registerData.userLogin
            })
            .success(function(data, status, headers, config) {
                if (data == null) {
                    $scope.userIdVarify = true;
                    $scope.inputValidLogin = "";
                } else if (data.login == $scope.registerData.userLogin) {
                    $scope.userIdVarify = false;
                    $scope.inputValidLogin = {
                        border: '1px solid red',
                        background: 'yellow'
                    };
                }
            })
            .error(function(data, status, headers, config) {
                console.log('Oops and error : user Login\n', data); // consloe.log the error data
            });
        }

        if ($scope.registerData.password == null || $scope.registerData.password == '') {
            $scope.varification1Status = false;
            $scope.inputValidPW = {
                border: '1px solid red',
                background: 'yellow'
            };
            $scope.inputValidPWCheck = false;
        } else {
            $scope.inputValidPW = "";
            $scope.inputValidPWCheck = true;
        }

        if ($scope.registerData.confirmpassword == null || $scope.registerData.confirmpassword == '') {
            $scope.varification1Status = false;
            $scope.inputValidCPW = {
                border: '1px solid red',
                background: 'yellow'
            };
            $scope.inputValidPWRECheck = false;
        } else {
            $scope.inputValidCPW = "";
            $scope.inputValidPWRECheck = true;
        }

        if ($scope.inputValidPWCheck && $scope.inputValidPWRECheck) {
            if ($scope.registerData.password != $scope.registerData.confirmpassword) {
                $scope.inputValidPW = {
                    border: '1px solid red',
                    background: 'yellow'
                };
                $scope.inputValidCPW = {
                    border: '1px solid red',
                    background: 'yellow'
                };
                $scope.varification1Status = false;
            } else {
                $scope.inputValidPW = "";
                $scope.inputValidCPW = "";
            }
        }

        if ($scope.registerData.email) {
            $scope.varification1Status = false;

            $http.post('http://52.69.2.200/happ/testingUserEmail', {
                email: $scope.registerData.email
            })
            .success(function(data, status, headers, config) {
                if (data == null) {
                    $scope.userEmailVarify = 1;
                    $scope.inputValidEmail = "";
                } else if (data.email == $scope.registerData.email) {
                    $scope.userEmailVarify = 0;
                    $scope.inputValidEmail = {
                        border: '1px solid red',
                        background: 'yellow'
                    };
                }
            })
            .error(function(data, status, headers, config) {
                console.log('Oops and error \n', data); // consloe.log the error data
            });
        } else {
            $scope.inputValidEmail = "";
            $scope.userEmailVarify = 2;
        }

        if ($scope.registerData.phone == null || $scope.registerData.phone == '' || $scope.registerData.phone.length != 11) {
            $scope.varification1Status = false;
            $scope.inputValidPhone = {
                border: '1px solid red',
                background: 'yellow'
            };
        } else {
            $http.post('http://52.69.2.200/happ/testingUserPhone', {
                    phone: $scope.registerData.phone
            })
            .success(function(data, status, headers, config) {
                if (data == null) {
                    $scope.userPhoneVarify = true;
                    $scope.inputValidPhone = "";
                    var phoneEdit1 = $scope.registerData.phone.substring(1, 11);
                    var phoneEdit2 = phoneEdit1.substring(0, 2);
                    var phoneEdit3 = phoneEdit1.substring(2, 6);
                    var phoneEdit4 = phoneEdit1.substring(6, 10);
                    var phoneEdit5 = new Array(3);
                    phoneEdit5[0] = phoneEdit2;
                    phoneEdit5[1] = phoneEdit3;
                    phoneEdit5[2] = phoneEdit4;
                    $scope.phoneEdit6 = "+82 " + phoneEdit5.join('-');
                    console.log($scope.phoneEdit6);

                } else if (data.phone == $scope.registerData.phone) {
                    //$scope.userPhoneVarify = false;
                    //$scope.inputValidPhone = { border: '1px solid red', background: 'yellow' };
                    $scope.userPhoneVarify = true; // DELETE THIS LINE
                    $scope.inputValidPhone = ""; // DELETE THIS LINE
                    var phoneEdit1 = $scope.registerData.phone.substring(1, 11);
                    var phoneEdit2 = phoneEdit1.substring(0, 2);
                    var phoneEdit3 = phoneEdit1.substring(2, 6);
                    var phoneEdit4 = phoneEdit1.substring(6, 10);
                    var phoneEdit5 = new Array(3);
                    phoneEdit5[0] = phoneEdit2;
                    phoneEdit5[1] = phoneEdit3;
                    phoneEdit5[2] = phoneEdit4;
                    $scope.phoneEdit6 = "+82 " + phoneEdit5.join('-');
                    console.log($scope.phoneEdit6);
                }
            })
            .error(function(data, status, headers, config) {
                console.log('Oops and error \n', data); // consloe.log the error data
            });
        }

        $timeout(function() {
            if ($scope.inputValidName == "" && $scope.inputValidLogin == "" && $scope.inputValidPW == "" && $scope.inputValidCPW == "" && $scope.inputValidEmail == "" && $scope.inputValidPhone == "") {
                if ($scope.userIdVarify == true && $scope.userPhoneVarify == true) {
                    if ($scope.userEmailVarify == 2 || $scope.userEmailVarify == 1) {
                        $http.post('http://52.69.2.200/happ/testingUserRegistration', {
                            userPhone: $scope.phoneEdit6
                        })
                        .success(function(data, status, headers, config) {
                            if (data.body) {
                                $scope.varification1Code = data.body;
                                $scope.varification1Status = true;
                            } else {
                                $scope.varification1Status = false;
                            }
                        })
                        .error(function(data, status, headers, config) {
                            console.log('Oops and error : Registration Error \n', data);
                        });
                    } else {
                        console.log('Oops something Wrong : Email \n');
                    }
                } else {
                    console.log('Oops something Wrong : ID or Phone \n');
                }
            } else {
                console.log('Oops something Wrong : Input Error \n');
            }
        }, 1000);




    }

    $scope.phoneV2 = function() {
        if ($scope.registerData.varificationText == $scope.varification1Code) {
            $scope.varificationComplete = true;
            $scope.classValid = "";
            $scope.registComplite = true;
        } else {
            $scope.classValid = {
                border: '1px solid red',
                background: 'yellow'
            };
            $scope.registComplite = false;
        }
    }

    $scope.doRegister = function() {
        $http.post('http://52.69.2.200/happ/testing', {
            status: "register",
            name: $scope.registerData.userName,
            login: $scope.registerData.userLogin,
            password: $scope.registerData.password,
            phone: $scope.registerData.phone,
            email: '',
            emailDM: false
        })
        .success(function(data, status, headers, config) {

            $window.location.href = '/';
        })
        .error(function(data, status, headers, config) {
            console.log('Oops and error : doRegister() \n', data);
        });



    };

}]).controller('NewInfoCtrl', ['$scope', '$location', '$rootScope', '$http', function($scope, $location, $rootScope, $http) {


    if ($location.url() == '/newinfo') {
        $rootScope.mainAdds = false;
    } else {
        $rootScope.mainAdds = true;
    }


    $scope.state1 = true;
    $scope.state2 = false;
    $scope.sportsSelected = '';
    $scope.categorySelected = '';
    $scope.competitionInfo = false;
    $scope.courtInfo = false;
    $scope.clubInfo = false;
    $scope.newCompData = {};


    $scope.baseball = function() {
        $scope.state1 = false;
        $scope.state2 = true;
        $scope.sportsSelected = 'baseball';
    }

    $scope.basketball = function() {
        $scope.state1 = false;
        $scope.state2 = true;
        $scope.sportsSelected = 'basketball';


    }

    $scope.bedminton = function() {
        $scope.state1 = false;
        $scope.state2 = true;
        $scope.sportsSelected = 'bedminton';


    }

    $scope.bowling = function() {
        $scope.state1 = false;
        $scope.state2 = true;
        $scope.sportsSelected = 'bowling';


    }

    $scope.soccer = function() {
        $scope.state1 = false;
        $scope.state2 = true;
        $scope.sportsSelected = 'soccer';


    }

    $scope.tennis = function() {
        $scope.state1 = false;
        $scope.state2 = true;
        $scope.sportsSelected = 'tennis';


    }

    $scope.competition = function() {
        $scope.state1 = false;
        $scope.state2 = false;
        $scope.competitionInfo = true;
        $scope.categorySelected = 'competition';
    }

    $scope.court = function() {
        $scope.state1 = false;
        $scope.state2 = false;
        $scope.courtInfo = true;
        $scope.categorySelected = 'court';
    }

    $scope.club = function() {
        $scope.state1 = false;
        $scope.state2 = false;
        $scope.clubInfo = true;
        $scope.categorySelected = 'club';
    }


    $scope.compSubmit = function() {
        $http.post('http://52.69.2.200/newdata', {
        	sport: $scope.sportsSelected,
            category: $scope.categorySelected,
            title: $scope.newCompData.compName,
   			compDateStart: $scope.newCompData.compDate1,
   			compDateEnd: $scope.newCompData.compDate2,
   			compLocation: $scope.newCompData.compLocation,
   			compHost: $scope.newCompData.compHost,
   			compSupervision: $scope.newCompData.compSupervision,
   			compSponser: $scope.newCompData.compSponser,
   			compSponsorship: $scope.newCompData.compSponsorship,
   			compRegistDate: $scope.newCompData.compRegistDate,
   			compInfo: $scope.newCompData.compInfo,
   			compURL: $scope.newCompData.compURL,
   			compImg: $scope.newCompData.compFile

        })
        .success(function(data, status, headers, config) {

            $window.location.href = '/';
        })
        .error(function(data, status, headers, config) {
            console.log('Oops and error : compSubmit() \n', data);
        });



    };



}]);