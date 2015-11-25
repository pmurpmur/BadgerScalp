angular.module('controllers.bid', [])

.controller('BidCtrl', function($stateParams,$ionicModal,$ionicActionSheet,$scope,$ionicPopup,DB,UserStorage,Utils) {
	angular.element(document.querySelector('.bs-fab')).addClass('fab-hide');

	var thisTicket = $stateParams.listingId;
	$scope.thisUser = UserStorage.thisUser();

	var view = DB.getTicket(thisTicket);
	$scope.ticket = view.listing;
	$scope.seller = view.seller;

	$scope.topPrice = -1;
	getHighestBidder();


	function getHighestBidder() {
		var topBuyer = {};
        DB.getListingBids(thisTicket).on('child_added', function(data) {
        	var price = data.val();
            if (price > $scope.topPrice) {
                $scope.topPrice = price;
                 
                DB.getUser(data.key())
				.once('value', function(data) {
                	$scope.topBuyer = data.val();
            	});
            }
    	});
	};


	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			var tmp = new Date(date);	
			return (Utils.getMonth(tmp.getMonth()) + ' ' + tmp.getDay() + ', ' + tmp.getFullYear());
		}
	}

	$ionicModal.fromTemplateUrl('templates/confirmbid.html', {
		id: '1',
		scope: $scope,
		backdropClickToClose: true,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal1 = modal;
	});



	/*Check if the bidding price is lower than the original price
	Stored in $scope.bidding.val
	*/
	$scope.checkBid = function(bidValue){
		if(bidValue > $scope.ticket.price){
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Your bid must be lower than the original price ($' + $scope.ticket.price.toString() + ')'
			});
		}
		else {
			DB.createBid({price:bidValue, listing:thisTicket});
			getHighestBidder();
			$scope.modal1.hide();
		}
	}

	$scope.getProfilePicture = function() {
    	var defaultImg = 'img/default_profile.jpg';

        var user = $scope.seller;
        if (user !== null) {
            var img = user.profImg;
            var imgUrl = user.imgUrl;

            if (img !== undefined) { return img; } 
            else if (imgUrl !== undefined) { return imgUrl; }
            else { return defaultImg; }
        }
        return defaultImg;
  	};

  	$scope.confirmSale = function() {
		var hideSheet = $ionicActionSheet.show({
	     destructiveText: 'Accept Offer For $' + $scope.topPrice,
	     titleText: 'Are you sure?',
	     cancelText: 'Cancel',
	     cancel: function() {
	     	hideSheet();
	     },
	     destructiveButtonClicked: function() {
	       return true;
	     }
	   });
	};

});