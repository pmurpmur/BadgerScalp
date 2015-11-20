angular.module('controllers.browse', [])

.controller('BrowseCtrl', function($scope, $ionicScrollDelegate, DBManager) {
	angular.element(document.querySelector('.bs-fab')).removeClass('fab-hide');
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