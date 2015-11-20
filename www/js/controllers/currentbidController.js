angular.module('controllers.currentbid', [])

.controller('CurrentBidCtrl', function($scope, DBManager, UserStorage) {
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