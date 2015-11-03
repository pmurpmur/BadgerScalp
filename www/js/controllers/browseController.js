angular.module('controllers.browse', [])

.controller('BrowseCtrl', function($scope, Auth, User) {
    console.log(User.getUser());
	$scope.name = User.getUser().firstName + ' ' + User.getUser().lastName;
	
	$scope.logout = function() { 
        User.cleanUser();
        Auth.$unauth(); 
    }
});