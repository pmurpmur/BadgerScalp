angular.module('controllers.bid', [])

<<<<<<< HEAD
.controller('BidCtrl', function($stateParams,$ionicModal, $scope,$ionicPopup,DBManager,UserStorage,Utils) {
=======
.controller('BidCtrl', function($stateParams,$ionicModal, $scope,$ionicPopup, DBManager) {
>>>>>>> origin/development
	angular.element(document.querySelector('.bs-fab')).addClass('fab-hide');



	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			var tmp = new Date(date);	
			return (Utils.getMonth(tmp.getMonth()) + ' ' + tmp.getDay() + ', ' + tmp.getFullYear());
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
<<<<<<< HEAD
	$scope.checkBid = function(bidValue){
		if(bidValue > $scope.ticket.price){
=======
	$scope.checkBid = function(ticketId, bidPrice){
		if($scope.bidding.val > $scope.ticket.price){
>>>>>>> origin/development
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Your bid must be lower than the original price ($' + $scope.ticket.price.toString() + ')'
			});
		}
		else {
<<<<<<< HEAD
			DBManager.createBid($scope.ticket.$id, bidValue);
			$scope.getHighestBidder();
			$scope.modal1.hide();
=======

			DBManager.createBid({
		      relateTicket: ticketId,
		      bid: bidPrice
		    });

			var alertPopup = $ionicPopup.alert({
				title: 'Success',
				template: 'Bid \"' + $scope.ticket.title + '\" for ' + $scope.bidding.val.toString()
			});
			$scope.modal1.hide()
>>>>>>> origin/development
		}
	}

	$scope.getProfilePicture = function() {
    	return UserStorage.getProfilePicture();
  	};

  	$scope.getHighestBidder = function() {		
  		var all = DBManager.getAllBids();

  		var topPrice = -1;
  		var topBid = {};

  			angular.forEach(all, function(item) {
  				var bid = DBManager.getListingBid($scope.ticket.$id, item.$id)
		        if (bid !== undefined && item.price > topPrice) {
		        	topPrice = item.price;
		        	topBid = item;
		        }
	    });

  		$scope.bidderPrice = topPrice;
  		$scope.bidderName = DBManager.getUserName(topBid.buyer);
  	}; $scope.getHighestBidder();

});