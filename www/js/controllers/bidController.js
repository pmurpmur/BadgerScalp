angular.module('controllers.bid', [])

.controller('BidCtrl', function($location,$stateParams,$ionicModal,$ionicActionSheet,$scope,$ionicPopup,DB,UserStorage,Utils) {
	angular.element(document.querySelector('.bs-fab')).addClass('fab-hide');

	var thisTicket = $stateParams.listingId;
	$scope.thisUser = UserStorage.thisUser();

	var view = DB.getTicket(thisTicket);
	$scope.ticket_id = thisTicket;
	$scope.ticket = view.listing;
	$scope.seller = view.seller;

	$scope.topPrice = -1;
	getHighestBidder();

	$scope.yourBid = -1;


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


	function getYourBid() {
		var result = 0;
		DB.getOneBid(thisTicket).once('value', function(data) {
			result = data.val();
		});
		$scope.yourBid = result;
		return result;
	};



	/*Check if the bidding price is lower than the original price
	Stored in $scope.bidding.val
	*/
	$scope.checkBid = function(bidValue){
		if(bidValue > $scope.ticket.price){
			var alertPopup = $ionicPopup.alert({
				title: 'Sorry!',
				template: 'You must bid lower than the asking price ($' + $scope.ticket.price.toString() + ')'
			});
		}
		else if(bidValue <= $scope.topPrice ) {
			var alertPopup = $ionicPopup.alert({
				title: 'Sorry!',
				template: 'You must bid higher than the top bid ($' + $scope.topPrice  + ')'
			});
		}
		else {
			DB.createBid({price:bidValue, listing:thisTicket});
			getHighestBidder();
			$scope.yourBid = bidValue;
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

	$scope.deletePost = function(user_id, ticket_id, title) {
		var hideSheet = $ionicActionSheet.show({
	     destructiveText: 'Delete',
	     titleText: 'Are you sure?',
	     cancelText: 'Cancel',
	     cancel: function() {
	     	hideSheet();
	     },
	     destructiveButtonClicked: function(){
	     	DB.removeListing(user_id, ticket_id, title);
	     	hideSheet();
	     	$location.path("/app/tabs/browse");
	     	return true;
	     }
	 });
	};

	$scope.deleteBid = function(id, ticket_id) {
		var hideSheet = $ionicActionSheet.show({
	     destructiveText: 'Delete',
	     titleText: 'Are you sure?',
	     cancelText: 'Cancel',
	     cancel: function() {
	     	hideSheet();
	     },
	     destructiveButtonClicked: function(){
	     	DB.removeBid(id, ticket_id);
	     	hideSheet();
	     	$location.path("/app/tabs/browse"); 
	     	return true;
	     }
	 });
	};

});