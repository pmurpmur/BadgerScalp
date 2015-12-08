angular.module('controllers.chat', [])

.controller('ChatCtrl', function($scope, $state, DB) {
	angular.element(document.querySelector('.bs-fab')).removeClass('fab-hide');
	$scope.device = window.screen.width;


	$scope.notifications = DB.readNotifications();
	console.log($scope.notifications);

	$scope.getStateChange = function(type, listing) {
		if (type == 'bid' || type == 'post') {
			return "app.tabs.bid2({listingId:" + listing + "})";
		}
		else if (type == 'message') {
			return "app.tabs.message({userId:notif.user})";
		}
		else {
			return 'app.tabs.chat';
		}
	};

	$scope.getListingDate = function(listing) {
		return (new Date(DB.getListingDate(listing))).toLocaleDateString();
	};

	$scope.getListingTitle = function(listing) {
		return DB.getListingTitle(listing);
	};

	$scope.getListingTime = function(time) {
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
	};

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}	

});