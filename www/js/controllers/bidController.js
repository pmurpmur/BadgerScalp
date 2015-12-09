angular.module('controllers.bid', [])

.controller('BidCtrl', function($location,$stateParams,$ionicModal,$ionicActionSheet,$scope,$ionicPopup,DB,UserStorage,Utils) {
	angular.element(document.querySelector('.bs-fab')).addClass('fab-hide');

	var thisTicket = $stateParams.listingId;
	$scope.thisUser = UserStorage.thisUser();

	var view = DB.getTicket(thisTicket);
	$scope.ticket_id = thisTicket;
	$scope.ticket = view.listing;
	$scope.seller = view.seller;
	// $scope.sellerPic = DB.getUserPic(view.seller.image);

	$scope.topPrice = -1;
	getHighestBidder();

	$scope.yourBid = -1;
	getYourBid();


	function getHighestBidder() {
		var topBuyer = {};
        DB.getListingBids(thisTicket).on('child_added', function(data) {
        	var price = data.val();
            if (price > $scope.topPrice) {
                $scope.topPrice = price;
                 
                $scope.topBuyer_id = data.key();
                DB.getUser(data.key())
				.once('value', function(data) {
                	$scope.topBuyer = data.val();
            	});
            }
    	});
	};

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
			DB.notifyUserBid($scope.ticket.seller, $scope.ticket.title, $scope.ticket.image, bidValue);
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
  		$scope.confirm = {};
  		var myPopup = $ionicPopup.show({
		    template: '<textarea name="details" placeholder="Explain buyer how to reach you in order to finish transaction..." ng-model="confirm.message"></textarea> ',
		    title: 'Confirm Sale!',
		    subTitle: 'Please use a minimum of 10 characters',
		    scope: $scope,
		    buttons: [
		      { text: 'CANCEL' },
		      {
		        text: '<b>SELL</b>',
		        type: 'button-assertive',
		        onTap: function(e) {
		          if ($scope.confirm.message.length >= 10) {
		        	DB.notifyUserAccept($scope.topBuyer_id, $scope.topBuyer.firstName, $scope.topBuyer.lastName, thisTicket, $scope.topPrice, $scope.confirm.message);
		          }
		        }
		      }
		    ]
		  });

		// var hideSheet = $ionicActionSheet.show({
	 //     destructiveText: 'Accept Offer For $' + $scope.topPrice,
	 //     titleText: 'Are you sure?',
	 //     cancelText: 'Cancel',
	 //     cancel: function() {
	 //     	hideSheet();
	 //     },
	 //     destructiveButtonClicked: function() {
	 //       DB.notifyUserAccept();
	 //       return true;
	 //     }
	 //   });
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