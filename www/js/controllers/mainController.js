angular.module('controllers.main', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, Auth, User) {

	$scope.logout = function() { 
        User.cleanUser();
        Auth.$unauth(); 
        $ionicSideMenuDelegate.toggleLeft();
    }
});