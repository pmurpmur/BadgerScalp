angular.module('controllers.currentbid', [])

.controller('CurrentBidCtrl', function($scope, DBManager, UserStorage) {
	$scope.device = window.screen.width;
	
	$scope.tickets = DBManager.getAllListings();
	$scope.userId = UserStorage.getUserId();


});