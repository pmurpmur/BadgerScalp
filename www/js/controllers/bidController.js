angular.module('controllers.bid', [])

.controller('BidCtrl', function($stateParams,$ionicModal, $scope,$ionicPopup) {
	angular.element(document.querySelector('.bs-fab')).addClass('fab-hide');

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}

	$scope.initt = function(){
		$scope.ticket = $stateParams.ticket;
		$scope.bidding = {};
	}
	$scope.initt();

	$ionicModal.fromTemplateUrl('templates/confirmbid.html', {
		id: '1',
		scope: $scope,
		backdropClickToClose: false,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal1 = modal;
	});

	/*Check if the bidding price is lower than the original price
	Stored in $scope.bidding.val
	*/
	$scope.checkBid = function(){
		if($scope.bidding.val > $scope.ticket.price){
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Your bid must be lower than the original price ($' + $scope.ticket.price.toString() + ')'
			});
		}
		else {
			var alertPopup = $ionicPopup.alert({
				title: 'Success',
				template: 'Bid \"' + $scope.ticket.event + '\" for ' + $scope.bidding.val.toString()
			});
			$scope.modal1.hide()
		}
	}

});