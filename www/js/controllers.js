angular.module('badgerscalp.controllers', [])

.controller('AuthCtrl', function($scope, AuthUser, Utils) {
	// $timeout(function() {
	// 	angular.element(document.querySelector('#authView')).addClass('bgAnimate');
	// }, 400);

	$scope.auth = {};
	$scope.auth.email = '';
	$scope.auth.firstname = '';
	$scope.auth.lastname = '';
	$scope.auth.password = '';

	$scope.loginViaGoogle = function() {
		AuthUser.oAuth('google');
	}

    $scope.loginViaFacebook = function() {
    	AuthUser.oAuth('facebook');
    }

    $scope.loginViaPassword = function() { 
    	AuthUser.password($scope.auth.username, $scope.auth.password); 
    }

    $scope.createUser = function(firstName, LastName, email, password) {
    	AuthUser.createUser(firstName, LastName, email, password);
	}

	$scope.resetPassword = function(email) {
    	AuthUser.resetPassword(email);
    }
})

.controller('BrowseCtrl', function($scope, Auth) {
	$scope.logout = function() { Auth.$unauth(); }
})


