angular.module('controllers.currentbid', [])

.controller('CurrentBidCtrl', function($scope, DBManager) {
	$scope.device = window.screen.width;
	
	$scope.tickets = DBManager.getAllListings();

	console.log($scope.tickets);

	$scope.scroll = function() {
		console.log('is scrolling');
	};
});