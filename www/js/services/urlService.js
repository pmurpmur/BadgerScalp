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

 .factory('BidsURL', ['$firebaseArray', 'FBDB',
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
]);