angular.module('services.user', [])

.factory('ThisUser', ['$rootScope', '$firebaseArray', 'FBDB', 
	function($rootScope, $firebaseArray, FBDB) {
		return {
			get: function() {
				var FBRef = new Firebase(FBDB + 'users/' + $rootScope.user + '/firstName');
	        	return $firebaseArray(FBRef);
			},
			set: function(userData) {
				$rootScope.user = userData;
			}
		}
	}
])

.factory('User', function() {
	return {

	};
});