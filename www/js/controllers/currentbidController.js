angular.module('controllers.currentbid', [])

.controller('CurrentBidCtrl', function($scope, DB, UserStorage) {
	$scope.device = window.screen.width;

	$scope.tickets = DB.readTickets();
	$scope.userId = UserStorage.thisUser();
	$scope.bids = [];
	

	DB.getYourBids().on('child_added', function(data) {
		$scope.bids.push(data.key());
	});


	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}

	$scope.getYourBid = function(ticket) {
		var result = 0;
		DB.getOneBid(ticket).once('value', function(data) {
			result = data.val();
		});
		return result;
	};
});