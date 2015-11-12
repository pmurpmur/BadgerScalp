angular.module('controllers.post', [])

.controller('PostCtrl', function($scope, $ionicModal, $ionicHistory) {
    $scope.postTicket = function(){
        console.log("Ticket Has Been Posted")
    }
});