angular.module('services.url', [])

.factory('UsersURL', ['$firebaseArray', 'FBDB',
    function($firebaseArray, FBDB) {
        var FBRef = new Firebase(FBDB + 'users');
        return $firebaseArray(FBRef);
    }
])

.factory('UsersOBJ', ['$firebaseArray', 'FBDB', function($firebaseArray, FBDB) {
    return function(user) {
        var FBRef = new Firebase(FBDB + 'users/' + user);
        return $firebaseArray(FBRef);
    } 
}])

<<<<<<< HEAD
.factory('BidsURL', ['$firebaseArray', 'FBDB',
=======
 .factory('ListingsOBJ', ['$firebaseArray', 'FBDB', function($firebaseArray, FBDB) {
    return function(list) {
        var FBRef = new Firebase(FBDB + 'listings/' + list);
        return $firebaseArray(FBRef);
    } 
}])

 .factory('BidsURL', ['$firebaseArray', 'FBDB',
>>>>>>> origin/development
    function($firebaseArray, FBDB) {
        var FBRef = new Firebase(FBDB + 'bids');
        return $firebaseArray(FBRef);
    }
])

.factory('ListingsURL', ['$firebaseArray', 'FBDB',
    function($firebaseArray, FBDB) {
        var FBRef = new Firebase(FBDB + 'listings');
        return $firebaseArray(FBRef);
    }
])

.factory('ListingsOBJ', ['$firebaseArray', 'FBDB', function($firebaseArray, FBDB) {
    return function(listing) {
        var FBRef = new Firebase(FBDB + 'listings/' + listing);
        return $firebaseArray(FBRef);
    } 
}])