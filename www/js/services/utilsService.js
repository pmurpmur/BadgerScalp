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
		getMonth: function(month) {
			switch(month) {
				case 0:
					return 'January';
					break;
				case 1:
					return 'February';
					break;
				case 2:
					return 'March';
					break;
				case 3:
					return 'April';
					break;
				case 4:
					return 'May';
					break;
				case 5:
					return 'June';
					break;
				case 6:
					return 'July';
					break;
				case 7:
					return 'August';
					break;
				case 8:
					return 'September';
					break;
				case 9:
					return 'October';
					break;
				case 10:
					return 'November';
					break;
				case 11:
					return 'December';
					break;
			}
		}
	}
});