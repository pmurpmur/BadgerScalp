angular.module('controllers.app', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicSideMenuDelegate, Auth, DBManager, UserStorage) {
	function modalInitalize() {
		$ionicModal.fromTemplateUrl('templates/post.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.modal = modal;
		});
	}; modalInitalize();
		

	$scope.postSaleTestDouble = function() {
		post = {};
        post.event = 'test event';
        post.sport = 'test type';
        post.price = '35';
        post.eventDate = '12/12/2012';
        post.eventTime = '11:00AM';
		DBManager.createListing(post);
    }

    $scope.postSale = function(post) {
		DBManager.createListing(post);
		$scope.modal.remove();
		modalInitalize();
    }

    $scope.logout = function() { 
        UserStorage.cleanUser();
        Auth.$unauth(); 
        $ionicSideMenuDelegate.toggleLeft();
    }

});