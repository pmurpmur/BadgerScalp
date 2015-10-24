angular.module('badgerscalp', [

  'ionic',
  'firebase',
  'ngMessages',
  'badgerscalp.services',
  'badgerscalp.controllers',
  'services.auth',
  'services.user',
  'services.utils'

  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.constant('FBDB', 'https://badgerscalp.firebaseio.com/')
.constant('GOOGLEKEY', '775544810012-qrsl2rrbnjtjv2fudb9prfr8jmauvgr0.apps.googleusercontent.com')
.constant('GOOGLEAUTHSCOPE', ['email'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.views.transition('platform');
  $ionicConfigProvider.navBar.alignTitle('center');

  var authWaitResolve = {
    'currentAuth': ['Auth', function(Auth) {
        return Auth.$waitForAuth();
    }]
  };

  var authRequireResolve = {
    'currentAuth': ['Auth', function(Auth) {
      return Auth.$requireAuth();
    }]
  };

  $stateProvider
    // Authentication
    .state('login', {
      url: '/login',
      templateUrl: 'templates/auth/loginView.html',
      controller: 'AuthCtrl',
      resolve: authWaitResolve
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/auth/registerView.html',
      controller: 'AuthCtrl',
      resolve: authWaitResolve
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'templates/auth/forgotView.html',
      controller: 'AuthCtrl',
      resolve: authWaitResolve
    })

    // Application
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.html'
    })
    .state('app.browse', {
      url: '/browse',
      views: {
        'browse': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.chat', {
      url: '/chat',
      views: {
        'chat': {
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.map', {
      url: '/map',
      views: {
        'map': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      },
      resolve: authRequireResolve
    })

    $urlRouterProvider.otherwise('/login');
})
