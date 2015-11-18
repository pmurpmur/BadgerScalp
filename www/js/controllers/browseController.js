angular.module('controllers.browse', [])

.controller('BrowseCtrl', function($scope, DBManager) {
	$scope.device = window.screen.width;
	
	$scope.tickets = DBManager.getAllListings();

	$scope.scroll = function() {
		console.log('is scrolling');
	};
});