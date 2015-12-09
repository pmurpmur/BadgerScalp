angular.module('controllers.auth', [])

.controller('AuthCtrl', function($scope, Auth, UserAuth, Utils) {
    Auth.$unauth();  

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

});