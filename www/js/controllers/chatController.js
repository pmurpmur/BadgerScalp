angular.module('controllers.chat', [])

.controller('ChatCtrl', function($scope,$cordovaLocalNotification,$ionicPlatform) {

	$scope.noti = {};
	$scope.noti.ntitle = "";
	$scope.noti.ntext = "";

	$scope.pushNoti = function(){

		$ionicPlatform.ready(function() {
			$cordovaLocalNotification.schedule({
				id: 1,
				title: $scope.noti.ntitle,
				text: $scope.noti.ntext,
				sound: null,
				data: { customProperty: 'custom value' }
			});
		});


	}

	$scope.clearNoti = function(){
		$scope.noti.ntitle = "";
		$scope.noti.ntext = "";		
	}



});