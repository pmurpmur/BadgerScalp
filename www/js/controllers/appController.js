angular.module('controllers.app', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicSideMenuDelegate,$ionicModal,$ionicPopup,$cordovaCamera,$ionicActionSheet, Auth, DBManager, UserStorage) {

  $scope.username = DBManager.getUserName();

  /** POST MODAL **/

  var today = new Date();
  $scope.yesterday = (new Date(today.setDate(today.getDate() - 1))).toISOString().substring(0, 10);
  $scope.oneYear = (new Date(today.setYear(today.getFullYear() + 1))).toISOString().substring(0, 10);


	function modalInitalize() {
		$ionicModal.fromTemplateUrl('templates/post.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.modal = modal;
		});
	}; modalInitalize();


  $scope.postSale = function(title, date, price, quantity, type, details) {
    DBManager.createListing({
      title: title,
      date: date.toUTCString(),
      price: price,
      quantity: quantity,
      type: type,
      details: details,
      image: $scope.ticketPic
    });
    $scope.modal.remove();
    modalInitalize();
  };


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
  $scope.close = function() {
        $scope.ticketPic = "";
        if($scope.picture_post !== undefined)$scope.picture_post = undefined;
        $scope.modal.hide();
    }

  /** POST EDIT MODAL **/
	
  function editpostInitalize() {
    $ionicModal.fromTemplateUrl('templates/editpost.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal_editpost = modal;     
    });
  }; editpostInitalize();

  $scope.EditPostModal = function(id, title, price, type, quantity, date, detail){
    $scope.id = id;
    $scope.title = title;
    $scope.price = price;
    $scope.type = type;
    $scope.quantity = quantity;
    $scope.details = detail;
    $scope.date = date;
    $scope.modal_editpost.show();
  }

  $scope.close_editpost = function() {
        $scope.ticketPic = "";
        if($scope.picture_post !== undefined)$scope.picture_post = undefined;
        $scope.modal_editpost.hide();
    }

  $scope.updatePost = function(id, title, date, price, quantity, type, details) {

    var date = date.toUTCString();
    var ticketpic = $scope.ticketPic;

    DBManager.updateListing(id, title, date, price, quantity, type, details);
    $scope.modal_editpost.hide();
    editpostInitalize();
  };
 

  /** LEFT SLIDER **/

    $scope.ProfilePic = "";
    $scope.ticketPic = "";

    $scope.logout = function() { 
        UserStorage.cleanUser();
        Auth.$unauth(); 
        $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.toggleSetting = function() {
    	$("#account_setting_block").toggle(1000);
    }

    

    /** PICTURE MODAL **/

    $ionicModal.fromTemplateUrl('templates/profilepic.html', {
        id: '2',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.modal2 = modal;
    });

    $scope.closeModal = function() {
        $scope.ProfilePic = "";
        if($scope.picture !== undefined)$scope.picture = undefined;
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
                    template: 'Camera did not work'
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


    /* For picture in Post*/
    $scope.choosePicturePost = function() {
         document.addEventListener("deviceready", function () {
            var options_post = {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              targetWidth: 200,
              targetHeight: 200
            };

            $cordovaCamera.getPicture(options_post).then(function(imageData_post) {
              var image_post = document.getElementById('myImage');
              //image_post.src = "data:image/jpeg;base64," + imageData_post;
              $scope.picture_post = "data:image/jpeg;base64," + imageData_post;       
              $scope.ticketPic = $scope.picture_post;
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error woiii'
                });
            });

          }, false); 
    }

    $scope.takePicturePost = function() {
         document.addEventListener("deviceready", function () {
            var options_post = {
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

            $cordovaCamera.getPicture(options_post).then(function(imageData_post) {
              var image_post = document.getElementById('myImage');
              //image_post.src = "data:image/jpeg;base64," + imageData_post;
              $scope.picture_post = "data:image/jpeg;base64," + imageData_post;    
              $scope.ticketPic = $scope.picture_post;   
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Error woiii'
                });
            });

          }, false);    
    }



});