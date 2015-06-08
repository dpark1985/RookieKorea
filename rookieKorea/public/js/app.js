// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
  'ionic.service.deploy',
  'starter.controllers'
])

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'YOUR_APP_ID',
    // The public API key all services will use for this app
    api_key: 'YOUR_PUBLIC_KEY',
    // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
    // gcm_id: 'GCM_ID'
  });
}])

.run(function($rootScope, $ionicDeploy, $ionicPlatform, $cordovaStatusbar) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // Color the iOS status bar text to white
    if (window.StatusBar) {
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusBar.style(1); //Light
    }

    // Default update checking
    $rootScope.updateOptions = {
      interval: 2 * 60 * 1000
    };

    // Watch Ionic Deploy service for new code
    $ionicDeploy.watch($rootScope.updateOptions).then(function() {}, function() {}, function(hasUpdate) {
      $rootScope.lastChecked = new Date();
      console.log('WATCH RESULT', hasUpdate);
    });
  });
})

/*********************************************************
 * Datekey: "2015.05.18"
 * Authorkey: "Daniel Park"
 * Notekey: "Page router" 
 ********************************************************/
.config(function($stateProvider, $urlRouterProvider) {
    
  $stateProvider

  /*********************************************************
   * Datekey: "2015.05.18"
   * Authorkey: "Daniel Park"
   * Notekey: "Menu contents, this structs the layout of the app" 
   ********************************************************/
  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
  })

  .state('app.search', {
      url: "/search",
      views: {
          'menuContent': {
              templateUrl: "templates/search.html",
              controller: "DaumMap",
          }
      }
  })

  .state('app.myPage', {
      url: "/myPage",
      views: {
          'menuContent': {
              templateUrl: "templates/myPage.html",
              controller: "myPage",
          }
      }
  })

  /*********************************************************
   * Datekey: "2015.06.01"
   * Authorkey: "Daniel Park"
   * Notekey: "My Activity" 
   ********************************************************/
  .state('app.myActivity', {
      url: "/myActivity",
      views: {
          'menuContent': {
              templateUrl: "templates/myActivity.html",
              controller: 'myActivity'
          }
      }
  })

  .state('app.myAccount', {
      url: "/myAccount",
      views: {
          'menuContent': {
              templateUrl: "templates/myAccount.html",
              controller: 'myAccount'
          }
      }
  })

  .state('app.browse', {
      url: "/browse",
      views: {
          'menuContent': {
              templateUrl: "templates/browse.html"
          }
      }
  })

  .state('app.terms', {
      url: "/terms",
      views: {
          'menuContent': {
              templateUrl: "templates/terms.html",
              controller: 'terms'
          }
      }
  })






  /*********************************************************
   * Datekey: "2015.05.18"
   * Authorkey: "Daniel Park"
   * Notekey: "Main contents, with list of Sports and Menu" 
   ********************************************************/
  .state('app.main', {
      url: "/main",
      views: {
          'menuContent': {
              templateUrl: "templates/main.html",
              controller: 'MainlistsCtrl'
          }
      }
  })


  /*********************************************************
   * Datekey: "2015.05.18"
   * Authorkey: "Daniel Park"
   * Notekey: "Directs to Sports contents" 
   ********************************************************/
  .state('app.setting', {
      url: "/setting",
      views: {
          'menuContent': {
              templateUrl: "templates/setting.html",
              controller: 'settings'
          }
      }
  })

  /*********************************************************
   * Datekey: "2015.05.18"
   * Authorkey: "Daniel Park"
   * Notekey: "Directs to Sports contents" 
   ********************************************************/
  .state('app.sports', {
      url: "/main/:sportsId",
      views: {
          'menuContent': {
              templateUrl: "templates/sports.html",
              controller: 'sports'
          }
      }
  })

  /*********************************************************
   * Datekey: "2015.05.26"
   * Authorkey: "Daniel Park"
   * Notekey: "Directs to Sports contents" 
   ********************************************************/
  .state('app.details', {
      url: "/main/:sportsId/:category/:itemId",
      views: {
          'menuContent': {
              templateUrl: "templates/details.html",
              controller: 'details'
          }
      }
  })

  .state('app.playlist', {
      url: "/playlist/:sportsId",
      views: {
          'menuContent': {
              templateUrl: "templates/playlist.html",
              controller: 'sports'
          }
      }
  });




  /*********************************************************
   * Datekey: "2015.05.18"
   * Authorkey: "Daniel Park"
   * Notekey: "This points to the MAIN PAGE" 
   ********************************************************/
  $urlRouterProvider.otherwise('/app/main');
});