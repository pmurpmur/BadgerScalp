angular.module('controllers.browse', [])

.controller('BrowseCtrl', function($scope, DBManager) {
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