angular.module('badgerscalp', [

  'ionic',
  'firebase',
  'ngMessages',
  'ngCordova',
  'filters',
  'controllers.app',
  'controllers.auth',
  'controllers.bid',
  'controllers.browse',
  'controllers.chat',
  'controllers.map',
  'controllers.currentbid',
  'controllers.currentpost',
  'services.fire',
  'services.data',
  'services.auth',
  'services.localStorage',
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
.constant('FACEBOOKKEY', '678220878944353')
.constant('AUTHSCOPE', ['email'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.views.transition('platform');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.position("top"); 
  ionic.Platform.setPlatform('ios');
  ionic.Platform.fullScreen();

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
      cache: false,
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
        listingId: null
      },
      resolve: authRequireResolve
    })
    .state('app.tabs.bid2', {
      url: '/bid/:listingId',
      views: {
        'chat': {
          templateUrl: 'templates/bid.html',
          controller: 'BidCtrl'
        }
      },
      params: {
        listingId: null
      },
      resolve: authRequireResolve
    })
    .state('app.bid', {
      url: '/bid/:listingId',
      views: {
        'menucontent': {
          templateUrl: 'templates/bid.html',
          controller: 'BidCtrl'
        }
      },
      params: {
        listingId: null
      },
      resolve: authRequireResolve
    })
    .state('app.currentbid', {
      url: '/currentbid',
      views: {
        'menucontent': {
          templateUrl: 'templates/currentbid.html',
          controller: 'CurrentBidCtrl'
        }
      },
      resolve: authRequireResolve
    })
    .state('app.currentpost', {
      url: '/currentpost',
      views: {
        'menucontent': {
          templateUrl: 'templates/currentpost.html',
          controller: 'CurrentPostCtrl'
        }
      },
      resolve: authRequireResolve
    })

    $urlRouterProvider.otherwise('/login');
})
