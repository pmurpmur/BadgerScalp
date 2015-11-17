angular.module('controllers.app', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicSideMenuDelegate,$ionicModal,$ionicPopup,$cordovaCamera, Auth, DBManager, UserStorage) {

	$scope.username = DBManager.getUserName();
    $scope.ProfilePic = "";

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

    $scope.toggleSetting = function() {
    	$("#account_setting_block").toggle(1000);
    }

    $ionicModal.fromTemplateUrl('templates/profilepic.html', {
        id: '2',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.modal2 = modal;
    });

    $scope.closeModal = function() {
        $scope.modal2.hide();
    }

    $scope.choosePicture = function() {
         document.addEventListener("deviceready", function () {
            var options = {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              targetWidth: 200,
              targetHeight: 200
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              var image = document.getElementById('myImage');
              //image.src = "data:image/jpeg;base64," + imageData;
              $scope.picture = "data:image/jpeg;base64," + imageData;       
              $scope.ProfilePic = $scope.picture;
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error woiii'
                });
            });

          }, false);       
    
    }

    $scope.takePicture = function() {
         document.addEventListener("deviceready", function () {
            var options = {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 200,
              targetHeight: 200,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              var image = document.getElementById('myImage');
              //image.src = "data:image/jpeg;base64," + imageData;
              $scope.picture = "data:image/jpeg;base64," + imageData;    
              $scope.ProfilePic = $scope.picture;   
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error woiii'
                });
            });

          }, false);       
    }

    $scope.confirm = function() {
        if($scope.ProfilePic === ""){
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'You have not selected or taken any pictures'
            });            
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Nothing happens for now. The base64-encoded photo image is in \"$scope.ProfilePic\"'
            });
        }
    }

});