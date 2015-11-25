angular.module('controllers.map', [])

.controller('MapCtrl', function($scope,DB) {
	angular.element(document.querySelector('.bs-fab')).removeClass('fab-hide');
	$scope.device = window.screen.width;

	$scope.users = DB.readUsers();


	$scope.getProfilePicture = function(user) {
    	var defaultImg = 'img/default_profile.jpg';

        if (user !== null && user !== undefined) {
            var img = user.profImg;
            var imgUrl = user.imgUrl;

            if (img !== undefined) { return img; } 
            else if (imgUrl !== undefined) { return imgUrl; }
            else { return defaultImg; }
        }
        return defaultImg;
  	};

});