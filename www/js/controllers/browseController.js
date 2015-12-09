angular.module('controllers.browse', [])

.controller('BrowseCtrl', function($scope, $ionicScrollDelegate, DB) {
	angular.element(document.querySelector('.bs-fab')).removeClass('fab-hide');
	$scope.device = window.screen.width;
	
	$scope.tickets = DB.readTickets();

	$scope.getTimePassed = function(time) {
		var then = new Date(time);
		var now = new Date();

		var diff = Math.floor(Math.abs(now - then) / 36e5);
		var days = Math.floor(diff / 24);
		var hours = Math.floor(diff % 24);

		if (days == 0 && hours == 0) {
			return 'Now';
		}
		else if (days == 0) {
			return hours + 'h'
		} else {
			return days + 'd';
		}
	}

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}
	
});