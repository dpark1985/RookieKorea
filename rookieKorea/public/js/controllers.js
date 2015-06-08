angular.module('starter.controllers', ['ionic'])




.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout) {


  if($rootScope.isLogin == false || $rootScope.isLogin == null){
    $rootScope.loginStatus = "로그인 해주세요";
    $rootScope.iconStatus = "ion-ios-person-outline";
  } else if($rootScope.isLogin == true) {
    $rootScope.loginStatus = $rootScope.userInfo.name;
    $rootScope.iconStatus = "ion-ios-person"
  }



  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/facebook.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.facebookClose = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.facebookOpen = function() {
    $scope.modal.show();
  };

})

/*********************************************************
 * Datekey: "2015.05.19"
 * Authorkey: "Daniel Park"
 * Notekey: "this controls the SETTING page" 
 ********************************************************/
.controller('settings', function($http, $state, $location, $rootScope, $scope, $ionicModal, $timeout) {


  $scope.loginData = {};
  $scope.registerData = {};
  $scope.classValid = "positive";

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {


    $rootScope.isLogin = false;
    $scope.loginData = {};
    $rootScope.userInfo = {};

    $rootScope.loginStatus = "로그인 해주세요";
    $rootScope.iconStatus = "ion-ios-person-outline";



  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    console.log('Doing login', $scope.loginData);

    $http.post('/testing', {
      status: "login",
      login : $scope.loginData.username,
      password : $scope.loginData.password
    })
    .success(function(data, status, headers, config) {


      //console.log(data[0].name);

      if(data[0]){
        $rootScope.isLogin = true;
        $rootScope.userInfo = data[0];
        $rootScope.loginStatus = $rootScope.userInfo.name;


        $rootScope.iconStatus = "ion-ios-person";

        
      } else{
        $rootScope.isLogin = false;
      }


      

      console.log(data[0]);


    })
    .error(function (data, status, headers, config){

      console.log('Oops and error \n', data);
    });



    

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
        $scope.closeLogin();


    }, 1000);
  };


  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  $scope.register = function() {
    $scope.registerModal.show();
    //$scope.facebookUrl = 'https://apps.facebook.com/RookieKorea';
  };

  $scope.registerClose = function() {
    $scope.registerModal.hide();
  };

  $scope.varification1 = function() {
    var phone = $scope.registerData.phone;
    console.log(phone);


    $scope.varification1Status = true;
    $scope.varification1Code = "4326"; 
  };

  $scope.varification2 = function() {
    if($scope.registerData.varificationText == $scope.varification1Code){
      $scope.varificationComplete = true;
      $scope.classValid="balanced";

    } else{
      $scope.classValid="assertive";
      $scope.varification1Status = false;

    }
  };

  // Perform the login action when the user submits the login form
  $scope.doRegister = function() {

    

    console.log('Doing regist', $scope.registerData);

    $http.post('/testing', {
      status: "register",
      name : $scope.registerData.userName,
      login : $scope.registerData.userLogin,
      password : $scope.registerData.password,
      phone : $scope.registerData.phone,
      email : '',
      emailDM : false
    })
    .success(function(data, status, headers, config) {
      $rootScope.isLogin = true;

      $rootScope.userInfo = data;
      $rootScope.loginStatus = $rootScope.userInfo.name;
      $rootScope.iconStatus = "ion-ios-person";

      console.log(data);


    })
    .error(function (data, status, headers, config){

      console.log('Oops and error \n', data);
    });




    //$rootScope.isLogin = true;
    //$rootScope.userInfo = {"name":"Daniel Park", "since":"2015.06.01", "phone":"01071129084"};


    //Side Menu, user account setting
    //$rootScope.loginStatus = $rootScope.userInfo.name;
    //$rootScope.iconStatus = "ion-ios-person"


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
        $scope.registerClose();
    }, 1000);
  };

})

/*********************************************************
 * Datekey: "2015.05.19"
 * Authorkey: "Daniel Park"
 * Notekey: "this controls the main.html page" 
 ********************************************************/
.controller('myPage', function($state, $rootScope, $scope) {

  $scope.goToSetting = function(){
    $state.go('app.setting');
  };

})

.controller('myActivity', function($state, $rootScope, $scope) {

  $scope.goToSetting = function(){
    $state.go('app.setting');
  };

  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Initializes the top tab bar radioModel" 
   ********************************************************/
  $scope.radioModel = 'competition';


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Initializes the Sports top tab bar style" 
   ********************************************************/
  $scope.navTabStyle1 = {
    'background-color': 'green',
    'color': 'white'
  };


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Initializes the sports content to Competition" 
   ********************************************************/


  //$scope.items = rootScope.userInfo.competitions;
  $scope.items = [
    {"id":"001", "sport":"tennis", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
    {"id":"002", "sport":"tennis", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
    {"id":"003", "sport":"tennis", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "}
  ];  

  $scope.comp = function(){

    $scope.radioModel = 'competition';
    $scope.navTabStyle1 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle2 = {};
    $scope.navTabStyle3 = {};

    $scope.iteam = '';

    //$scope.items = rootScope.userInfo.competitions;
    $scope.items = [
      {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
      {"id":"002", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
      {"id":"003", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "}
    ];


  };


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Loads court information on click" 
   ********************************************************/
  $scope.court = function(){

    $scope.radioModel = 'court';
    $scope.navTabStyle2 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle1 = {};
    $scope.navTabStyle3 = {};

    $scope.iteam = '';

    //$scope.items = rootScope.userInfo.courts;
    $scope.items = [
      {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"002", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"003", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"004", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"005", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "}
    ];
  };


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Loads club information on click" 
   ********************************************************/
  $scope.club = function(){

    $scope.radioModel = 'club';
    $scope.navTabStyle3 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle1 = {};
    $scope.navTabStyle2 = {};

    $scope.iteam = '';

    //$scope.items = rootScope.userInfo.clubs;
    $scope.items = [
      {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "text":"club club club club club club club club club club club club club club club club club club club club "},
      {"id":"002", "title":"순잼 대회", "date":"2015.05.09", "text":"club club club club club club club club club club club club club club club club club club club club "},
      {"id":"003", "title":"순잼 대회", "date":"2015.05.09", "text":"club club club club club club club club club club club club club club club club club club club club "}
    ];
  };  

})

.controller('myAccount', function($state, $rootScope, $scope) {

  $scope.goToSetting = function(){
    $state.go('app.setting');
  };

  //$scope.emailDM = true;

  $scope.userSetting = function() {
    if($scope.editUserSetting.email != ''){
      
    }

  };

  $scope.logout = function() {
    $rootScope.isLogin = false;
    $scope.loginData = {};
    $rootScope.userInfo = {};
    $rootScope.loginStatus = "로그인 해주세요";
    $rootScope.iconStatus = "ion-ios-person-outline";
  };



})

/*********************************************************
 * Datekey: "2015.05.19"
 * Authorkey: "Daniel Park"
 * Notekey: "this controls the main.html page" 
 ********************************************************/
.controller('MainlistsCtrl', function($scope) {
  $scope.mainlists = [
    { title: 'Reggae', id: 1 },  
    { title: 'Rap', id: 5 }, 
    { title: 'Cowbell', id: 6 }
  ];
})

/*********************************************************
 * Datekey: "2015.05.19"
 * Authorkey: "Daniel Park"
 * Notekey: "this controls the main.html page" 
 ********************************************************/
.controller('terms', function($scope) {
  $scope.navTabStyle1 = {
    'background-color': 'green',
    'color': 'white'
  };


  $scope.selection = 'terms';

  $scope.terms = function(){
    $scope.navTabStyle1 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle2 = {};
    $scope.navTabStyle3 = {};

    $scope.selection = 'terms';

  } 

  $scope.policies = function(){
    $scope.navTabStyle2 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle1 = {};
    $scope.navTabStyle3 = {};

    $scope.selection = 'policies';

  } 

  $scope.locationPolicies = function(){
    $scope.navTabStyle3 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle1 = {};
    $scope.navTabStyle2 = {};

    $scope.selection = 'locationPolicies';

  } 

})

/*********************************************************
 * Datekey: "2015.05.19"
 * Authorkey: "Daniel Park"
 * Notekey: "Daum Map controller" 
 ********************************************************/
.controller('DaumMap', function($scope) {    

  var x = document.getElementById("location");
  $scope.curLat = 37.3039281;
  $scope.curLng = 127.90835320000001;


  (function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }());

  function setPosition(position) {
    $scope.curLat = position.coords.latitude;
    $scope.curLng = position.coords.longitude;
  }



  var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new daum.maps.LatLng($scope.curLat, $scope.curLng), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };
  var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

  var center = map.getCenter();
  var curLat = center.getLat();
  var curLng = center.getLng();



  $scope.map = map;
})


/*********************************************************
 * Datekey: "2015.05.27"
 * Authorkey: "Daniel Park"
 * Notekey: "Details Control" 
 ********************************************************/
.controller('details', ['$http', '$scope', '$stateParams', '$location', 
  function($http, $scope, $stateParams, $location) {


  $scope.absUrl = $location.absUrl().split('/').pop();
  $scope.absUrls = $location.absUrl().split('/');
  //http:
  //
  //localhost:8100
  //?ionicplatform=ios#
  //app
  //main
  //tennis                    $scope.absUrls[6];
  //Competition               $scope.absUrls[7];
  //001                       $scope.absUrls[8];



  $scope.testing = {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "like":"5", "comments":"20", "text":"competition competition competition competition competition competition competition competition "};



}])


/*********************************************************
 * Datekey: "2015.05.19"
 * Authorkey: "Daniel Park"
 * Notekey: "this controls the sports contents page" 
 ********************************************************/
.controller('sports', ['$http', '$scope', '$stateParams', '$location', 
  function($http, $scope, $stateParams, $location) {


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Changes the header title" 
   ********************************************************/
  $scope.sportType = '';
  $scope.absUrl = $location.absUrl().split('/').pop();

  if($scope.absUrl === 'tennis'){
    $scope.sportType = '테니스';
  } else if($scope.absUrl === 'soccer'){
    $scope.sportType  = '축구';
  } else if($scope.absUrl === 'basketball'){
    $scope.sportType = '농구';
  } else if($scope.absUrl === 'baseball'){
    $scope.sportType = '야구';
  } else if($scope.absUrl === 'boweling'){
    $scope.sportType = '볼링';
  } else if($scope.absUrl === 'bedminton'){
    $scope.sportType = '배드민턴';
  } else{
    $scope.sportType = '';
  }


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Initializes the top tab bar radioModel" 
   ********************************************************/
  $scope.radioModel = 'competition';


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Initializes the Sports top tab bar style" 
   ********************************************************/
  $scope.navTabStyle1 = {
    'background-color': 'green',
    'color': 'white'
  };


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Initializes the sports content to Competition" 
   ********************************************************/
  $scope.items = [
    {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
    {"id":"002", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
    {"id":"003", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "}
  ];


  /*********************************************************
   * Datekey: "2015.05.21"
   * Authorkey: "Daniel Park"
   * Notekey: "Pull to refresh" 
   ********************************************************/
/*
  $scope.doRefresh = function() {
    $http.get('/' + $scope.sportType + '/' + $scope.radioModel )
      .success(function(newItems){
        $scope.items = newItems;
      })
      .finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });
  };
*/  

  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Loads competition information on click" 
   ********************************************************/
  $scope.comp = function(){

    $scope.radioModel = 'competition';
    $scope.navTabStyle1 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle2 = {};
    $scope.navTabStyle3 = {};

    $scope.iteam = '';

    $scope.items = [
      {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
      {"id":"002", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "},
      {"id":"003", "title":"순잼 대회", "date":"2015.05.09", "text":"competition competition competition competition competition competition competition competition "}
    ];


  };


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Loads court information on click" 
   ********************************************************/
  $scope.court = function(){

    $scope.radioModel = 'court';
    $scope.navTabStyle2 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle1 = {};
    $scope.navTabStyle3 = {};

    $scope.iteam = '';

    $scope.items = [
      {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"002", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"003", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"004", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "},
      {"id":"005", "title":"순잼 대회", "date":"2015.05.09", "text":"court court court court court court court court court court court court court court court court "}
    ];
  };


  /*********************************************************
   * Datekey: "2015.05.19"
   * Authorkey: "Daniel Park"
   * Notekey: "Loads club information on click" 
   ********************************************************/
  $scope.club = function(){

    $scope.radioModel = 'club';
    $scope.navTabStyle3 = {
      'background-color': 'green',
      'color': 'white'
    };
    $scope.navTabStyle1 = {};
    $scope.navTabStyle2 = {};

    $scope.iteam = '';

    $scope.items = [
      {"id":"001", "title":"순잼 대회", "date":"2015.05.09", "text":"club club club club club club club club club club club club club club club club club club club club "},
      {"id":"002", "title":"순잼 대회", "date":"2015.05.09", "text":"club club club club club club club club club club club club club club club club club club club club "},
      {"id":"003", "title":"순잼 대회", "date":"2015.05.09", "text":"club club club club club club club club club club club club club club club club club club club club "}
    ];
  };


}]);