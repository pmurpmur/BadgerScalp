angular.module('badgerscalp.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.toggle = function() {
    	$ionicSideMenuDelegate.toggleLeft();
  	};
})

.controller('AuthCtrl', function($scope, UserAuth, Utils) {
	// $timeout(function() {
	// 	angular.element(document.querySelector('#authView')).addClass('bgAnimate');
	// }, 400);

    $scope.loginVia = function(provider) {
    	UserAuth.authViaOAuth(provider);
    }

    $scope.loginViaPassword = function(email, password) { 
    	UserAuth.authViaPassword(email, password); 
    }

    $scope.createUser = function(firstName, LastName, email, password) {
    	UserAuth.createUser(firstName, LastName, email, password);
	}

	$scope.resetPassword = function(email) {
    	UserAuth.resetPassword(email);
    }
})

.controller('BrowseCtrl', function($scope, Auth, ThisUser) {
	console.log(ThisUser.get());
	$scope.name = ThisUser.get();
	
	$scope.logout = function() { Auth.$unauth(); }
})

.controller('ChatCtrl', function($scope) {

})

.controller('MapCtrl', function($scope) {

})


