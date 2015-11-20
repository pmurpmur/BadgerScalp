angular.module('controllers.currentpost', [])

.controller('CurrentPostCtrl', function($scope, UserStorage, DBManager) {
	$scope.device = window.screen.width;
	
	$scope.tickets = DBManager.getAllListings();
	$scope.userId = UserStorage.getUserId();

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}

	$scope.toDateObj = function(dateStr) {
		return new Date(dateStr);
	}


});