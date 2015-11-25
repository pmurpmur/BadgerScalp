angular.module('controllers.currentpost', [])

.controller('CurrentPostCtrl', function($scope,$ionicModal,$ionicActionSheet,$stateParams, UserStorage, DB) {
	$scope.device = window.screen.width;
	
	$scope.tickets = DB.readTickets();
	$scope.userId = UserStorage.thisUser();

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}
 
	$scope.toDateObj = function(dateStr) {
		return new Date(dateStr);
	}


  /** POST EDIT MODAL **/

  $scope.typeEdit = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ionic ion-ios-americanfootball"></i>Football' },
        { text: '<i class="icon ionic ion-ios-basketball"></i>Basketball' },
        { text: '<i class="icon ionic ion-ios-baseball"></i>Baseball' },
        { text: '<i class="icon ionic ion-ios-football"></i>Soccer' },
        { text: '<i class="icon ionic ion-ios-tennisball"></i>Tennis' },
        { text: '<i class="icon ionic ion-ios-musical-notes"></i>Music' },
        { text: '<i class="icon ionic ion-plus"></i>Other' }
      ],
      titleText: 'Event Type',
      buttonClicked: function(index) {
        switch(index) {
          case 0: $scope.eventType = 'Football'; break;
          case 1: $scope.eventType = 'Basketball'; break;
          case 2: $scope.eventType = 'Baseball'; break;
          case 3: $scope.eventType = 'Soccer'; break;
          case 4: $scope.eventType = 'Tennis'; break;
          case 5: $scope.eventType = 'Music'; break;
          case 6: $scope.eventType = 'Other'; break;
        }
        $scope.$apply();
        hideSheet();
      }
    });
  };
	
  function editpostInitalize() {
    $ionicModal.fromTemplateUrl('templates/editpost.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal_editpost = modal;     
    });
  }; editpostInitalize();

  $scope.EditPostModal = function(id, title, price, type, quantity, date, details){
    $scope.eventId = id;
    $scope.eventTitle = title;
    $scope.eventPrice = price;
    $scope.eventType = type;
    $scope.eventQuantity = quantity;
    $scope.eventDetails = details;
    $scope.eventDate = date;
    $scope.modal_editpost.show();
  }

  $scope.close_editpost = function() {
        $scope.ticketPic = "";
        if($scope.picture_post !== undefined)$scope.picture_post = undefined;
        $scope.modal_editpost.hide();
    }


  $scope.updatePost = function(id, title, date, price, quantity, type, details) {
    console.log(id);
    DB.updateListing(id, {
      title: title,
      date: date.toString(),
      price: price,
      quantity: quantity,
      type: type,
      details: details,
      image: $scope.ticketPic
    });

    $scope.modal_editpost.remove();
    editpostInitalize();
  };

  $scope.removePost = function() {
  	console.log($stateParams.listingId)
    DB.removeListing($stateParams.listingId);
    $scope.modal_editpost.remove();
    editpostInitalize();
  };

});