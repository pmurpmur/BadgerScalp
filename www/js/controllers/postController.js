angular.module('controllers.post', [])

.controller('PostCtrl', function($scope, $ionicHistory) {

    $scope.postTicket = function(){
        console.log("Ticket Has Been Posted")
    }
});