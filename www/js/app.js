angular.module('badgerscalp', [

  'ionic',
  'firebase',
  'ngMessages',
  'ngCordova',
  'controllers.app',
  'controllers.auth',
  'controllers.bid',
  'controllers.browse',
  'controllers.chat',
  'controllers.map',
  'controllers.currentbid',
  'controllers.currentpost',
  'services.firebase',
  'services.url',
  'services.auth',
  'services.bid',
  'services.event',
  'services.listing',
  'services.localStorage',
  'services.userStorage',
  'services.user',
  'services.utils'

  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

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
      templateUrl: 'templates/app.html',
      controller: 'AppCtrl'
    })
    .state('app.tabs', {
      url: '/tabs',
      views: {
        'menucontent': {
          templateUrl: 'templates/routes.html'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.tabs.browse', {
      url: '/browse',
      views: {
        'browse': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.tabs.chat', {
      url: '/chat',
      views: {
        'chat': {
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.tabs.map', {
      url: '/map',
      views: {
        'map': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.tabs.bid', {
      url: '/bid/:listingId',
      views: {
        'browse': {
          templateUrl: 'templates/bid.html',
          controller: 'BidCtrl'
        }
      },
      params: {
        listingId: null,
        ticket: null
      },
      resolve: authRequireResolve
    })
    .state('app.tabs.currentbid', {
      url: '/currentbid',
      views: {
        'browse': {
          templateUrl: 'templates/currentbid.html',
          controller: 'CurrentBidCtrl'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.tabs.currentpost', {
      url: '/currentpost',
      views: {
        'browse': {
          templateUrl: 'templates/currentpost.html',
          controller: 'CurrentPostCtrl'
        }
      },
      resolve: authRequireResolve
    })
    

    $urlRouterProvider.otherwise('/login');
})
