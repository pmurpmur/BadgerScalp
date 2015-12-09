angular.module('controllers.app', [])
.controller('AppCtrl', function($scope,$state,$ionicModal,$ionicScrollDelegate,$location, $ionicSideMenuDelegate,$ionicModal,$ionicPopup,$cordovaCamera,$ionicActionSheet,DB,UserAuth,UserStorage) {

  $scope.filtC = 'all';
  $scope.sorter = '-$id';
  $scope.ticketPic = '';
  $scope.thisUser = UserStorage.thisUser();

  var full = UserStorage.getFullName();
  $scope.username = full.first + ' ' + full.last;

  $scope.recent = {};

  $scope.canPassChange = UserStorage.getEmail() !== undefined;

  $scope.profilePic = UserStorage.getProfilePicture();
  console.log($scope.profilePic);

  var lastPos = 0;
  $scope.fabControl = function ($event) {
      var elem = event.target.attributes['delegate-handle'].value;
      var pos = $ionicScrollDelegate.$getByHandle(elem).getScrollPosition().top;

      if (pos > 75 && pos > lastPos + 5) {
        var tmp = angular.element(document.querySelectorAll('.bs-fab'));
        tmp.addClass('fab-hide');
      }
      else if (pos < lastPos - 5) {
        var tmp = angular.element(document.querySelectorAll('.bs-fab'));
        tmp.removeClass('fab-hide');
      }
    lastPos = pos;
  }

  $scope.closeMenu = function(hide) {
    $ionicSideMenuDelegate.toggleLeft();
    if (hide) {
      angular.element(document.querySelector('.bs-fab')).addClass('fab-hide');
    } else {
      angular.element(document.querySelector('.bs-fab')).removeClass('fab-hide');
    }
  };

  $scope.getProfilePicture = function() {
    $scope.profilePic = UserStorage.getProfilePicture();
  };

  /** POST MODAL **/

  var today = new Date();
  $scope.yesterday = (new Date(today.setDate(today.getDate() - 1))).toISOString().substring(0, 10);
  $scope.oneYear = (new Date(today.setYear(today.getFullYear() + 1))).toISOString().substring(0, 10);

	function postModalInitalize() {
		$ionicModal.fromTemplateUrl('templates/post.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.postModal = modal;
		});
	}; postModalInitalize();

  $scope.postSale = function(title, eventName, date, opponent, price, quantity, type, details) {
	var eventsRef = DB.getEvents();
	var eventId = undefined;
	eventsRef.on('value', function(snapshot) {
		snapshot.forEach(function(item) {
			if (item.child('name') == eventName) {
				eventId = item.ref().key();
			}
		});
	});
	
    DB.createListing({
      title: title,
	  eventId: eventId,
      date: date.toString(),
	  opponent: opponent,
      price: price,
      quantity: quantity,
      type: type,
      details: details,
      image: $scope.ticketPic
    });
    $scope.postModal.remove();
    postModalInitalize();
  };

  $scope.useCamera = function() {
        document.addEventListener("deviceready", function () {
            var options_post = {
              quality: 75,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 500,
              targetHeight: 500,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options_post).then(function(imgData) {
              $scope.ticketPic = imgData;
            });

        }, false);    
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
  
  $scope.eventSelect = function() {
	var eventsRef = DB.getEvents();
	var buttonArr = [{ text: '<i class="icon ionic ion-plus"></i>New Event' }];
	eventsRef.on('value', function(snapshot) {
		snapshot.forEach(function(item) {
			buttonArr.push(
				{ 
					text: item.child('name').val(), 
					date: new Date(item.child('date').val()),
					opponent: item.child('opponent').val(),
					sport: item.child('sport').val()
				}
			);
		});
	});
	
	var hideSheet = $ionicActionSheet.show({
		buttons : buttonArr,
		titleText: 'Select Event',
		buttonClicked: function(index) {
			switch(index) {
				case 0:
					$scope.eventName = "New Event";
					break;
				default:
					$scope.eventName = buttonArr[index].text;
					$scope.eventDate = buttonArr[index].date;
					$scope.opponent =  buttonArr[index].opponent;
					$scope.eventType = buttonArr[index].sport;
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

    $scope.choosePicture = function() {
      var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Choose Picture' },
        { text: 'Take Picture' },
      ],
      titleText: 'Event Type',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        switch(index) {
          case 0: 
          document.addEventListener("deviceready", function () {
            var options = {
              quality: 75,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              targetWidth: 200,
              targetHeight: 200
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.profilePic = "data:image/jpeg;base64," + imageData;  
              DB.updateUser(UserStorage.thisUser(), {image:$scope.profilePic});
            });

          }, false);  
          break;

          case 1: 
          document.addEventListener("deviceready", function () {
            var options = {
              quality: 75,
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
              $scope.profilePic = "data:image/jpeg;base64," + imageData;
              DB.updateUser(UserStorage.thisUser(), {image:$scope.profilePic}); 
            });

          }, false);    
          break;
        }
        hideSheet();
      }
    });
  };


 

  /** LEFT SLIDER **/

  /** SEARCH MODAL **/

  $scope.category;
  $scope.categories = [
    { text: "All", value: "all", icon: "ion-ios-circle-outline" },
    { text: "Football", value: "football", icon: "ion-ios-americanfootball" },
    { text: "Basketball", value: "basketball", icon: "ion-ios-basketball" },
    { text: "Baseball", value: "baseball", icon: "ion-ios-baseball" },
    { text: "Soccer", value: "soccer", icon: "ion-ios-football" },
    { text: "Tennis", value: "tennis", icon: "ion-ios-tennisball" },
    { text: "Music", value: "music", icon: "ion-ios-musical-notes" },
    { text: "Other", value: "other", icon: "ion-plus" }
  ];

  function searchModalInitalize() {
    $ionicModal.fromTemplateUrl('templates/search.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchModal = modal;
        $scope.category = 'all';
        $scope.sorting = 'recent';
    });
  }; searchModalInitalize();

  $scope.orderByDate = function(item) {
    return new Date(item.date);
  };

  $scope.resetSearch = function() {
    $scope.searchModal.remove().then(function() {
      searchModalInitalize();

      $scope.filtQ = undefined;
      $scope.filtC = 'all';
      $scope.filtD = undefined;
      $scope.filtMinP = undefined;
      $scope.filtMaxP = undefined;
      $scope.sorter = '-$id';
    });
  }

  $scope.applySearch = function(query, category, exactDate, minPrice, maxPrice, sorting) {
    $scope.filtQ = query;
    $scope.filtC = category;
    $scope.filtD = exactDate;
    $scope.filtMinP = minPrice;
    $scope.filtMaxP = maxPrice;

    if (sorting == 'recent')            { $scope.sorter = '-$id'; }
    else if (sorting == 'next')         { $scope.sorter = $scope.orderByDate; }
    else if (sorting == 'lowPrice')     { $scope.sorter = 'price'; }
    else if (sorting == 'highPrice')    { $scope.sorter = '-price'; }

    $scope.searchModal.hide();
  }


  /** SEARCH MODAL END **/


  

  
    $scope.ProfilePic = "";
    $scope.ticketPic = "";



    $scope.toggleSetting = function() {
    	angular.element(document.getElementById("account_setting_block")).toggleClass('setting-toggle');
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

    $ionicModal.fromTemplateUrl('templates/profilepic.html', {
        id: '3',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.modal3 = modal;
    });

    $scope.closeModal = function() {
        $scope.ProfilePic = "";
        if($scope.picture !== undefined)$scope.picture = undefined;
        $scope.modal2.hide();
        $scope.modal3.hide();
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
                    template: 'Error'
                });
            });

          }, false); 
    }

    $scope.takePicturePost = function() {
         document.addEventListener("deviceready", function () {
            var options_post = {
              quality: 75,
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
              DB.addPhoto(listingId);
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Sorry!',
                    template: 'Camera failure.'
                });
            });

          }, false);    
    }


    /** Account Settings **/

    $scope.logout = function() { 
        $scope.toggleSetting();
        $ionicSideMenuDelegate.toggleLeft();
        UserStorage.cleanUser();
    }

    $scope.changePassword = function() { 
      $scope.pop = {};
      var email = UserStorage.getEmail();

      var myPopup = $ionicPopup.show({
        template: '<input type="password" placeholder="Current Password" ng-model="pop.oldPass"><br/><input type="password" placeholder="New Password" ng-model="pop.newPass">',
        title: 'Change Password',
        subTitle: 'Please use over 5 characters',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          { text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.pop.oldPass == UserStorage.getPassword()) {
                if ($scope.pop.newPass.length > 5) {
                  UserAuth.changePassword(email, $scope.pop.oldPass, $scope.pop.newPass)
                  .then(function() {
                    DB.updateUser(UserStorage.thisUser(), { password:$scope.pop.newPass });
                    $ionicPopup.alert({
                        title: 'Success!',
                        template: 'Password has been changed!'
                    });
                  })
                } else {
                  myPopup.close();
                  var passwordChangeFail = $ionicPopup.alert({
                    title: 'Sorry!',
                    template: 'New password must be over 5 characters'
                  });
                }
              } else {
                myPopup.close();
                var passwordChangeFail = $ionicPopup.alert({
                  title: 'Sorry!',
                  template: 'Current password was incorrect'
                });
              }
            } 
          }
        ]
      });
      
      myPopup.then(function() {
        angular.element(document.querySelector('.popup-container')).remove();
      }); 
    } 

    $scope.removeUser = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Account',
        template: 'Are you sure you want to delete your account?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          var email = UserStorage.getEmail();
          var pass = UserStorage.getPassword();
          if (pass !== undefined){
            UserAuth.removeUser(email, pass);
            UserStorage.cleanUser();
          }
          
          DB.removeUser(id);


          $location.path("/login"); 
          $scope.toggleSetting();
          $ionicSideMenuDelegate.toggleLeft();

        }
      });
    };
  
});