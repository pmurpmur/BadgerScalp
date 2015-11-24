angular.module('controllers.currentbid', [])

.controller('CurrentBidCtrl', function($scope, DB, UserStorage) {
	$scope.device = window.screen.width;
	
	$scope.tickets = DB.readTickets();
	$scope.bids = DB.readBids();
	$scope.userId = UserStorage.thisUser();

	$scope.typeSelect = function() {
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
        hideSheet();
      }
    });
  };


});