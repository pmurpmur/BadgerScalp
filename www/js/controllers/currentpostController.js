angular.module('controllers.currentpost', [])

.controller('CurrentPostCtrl', function($scope, DBManager) {
	$scope.device = window.screen.width;
	
	$scope.tickets = DBManager.getAllListings();

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}

});