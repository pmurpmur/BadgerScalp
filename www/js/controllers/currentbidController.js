angular.module('controllers.currentbid', [])

.controller('CurrentBidCtrl', function($scope, DB, UserStorage) {
	$scope.device = window.screen.width;
	

	$scope.tickets = DB.readTickets();
	$scope.bids = DB.readBids();
	$scope.userId = UserStorage.thisUser();

});