angular.module('controllers.bid', [])

.controller('BidCtrl', function($stateParams, $scope) {
	$scope.ticket = $stateParams.ticket;
	
});