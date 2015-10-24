angular.module('services.utils', [])

.factory('Utils', function($state, $ionicPopup) {
	return {
		alertshow: function (title, message) {
            $ionicPopup.alert({
                title: title,
                template: message
            });
        },
		errMessage: function(title, err) {
		    var msg = 'Unknown Error...';

		    if(err && err.code) {
		    	switch (err.code) {
			        case "EMAIL_TAKEN":
			          msg = "This Email is already registered. Please login."; 
			          $state.go('login');
			          break;
			        case "INVALID_EMAIL":
			          msg = "Invalid Email."; break;
		          	case "NETWORK_ERROR":
			          msg = "Network Error."; break;
			        case "INVALID_PASSWORD":
			          msg = "Password is invalid. Try again."; break;
			        case "INVALID_USER":
			          msg = "Email is invalid. Please register an account."; 
			          $state.go('register');
			          break;
		    	}
		    }
			$ionicPopup.alert({
                title: title,
                template: msg
            });
			console.log(err);
		},
	}
});