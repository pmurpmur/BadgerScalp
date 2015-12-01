angular.module('controllers.browse', [])

.controller('BrowseCtrl', function($scope, $ionicScrollDelegate, DB) {
	angular.element(document.querySelector('.bs-fab')).removeClass('fab-hide');
	$scope.device = window.screen.width;
	
	$scope.tickets = DB.readTickets();
	console.log($scope.tickets);

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}
	
});