 angular.module('services.user', [])

.factory('User', function (UserStorage, UsersOBJ) {
    return {
        thisUser: function() {
            return UserStorage.getUserId();
        },
        addListing: function(id) {
            var user = UserStorage.getUserId();
            var data = UsersOBJ(user + '/listings');
            data.$add(id);
        },
        removeListing: function(id) {   
            var user = UserStorage.getUserId();
            var data = UsersOBJ(user + 'listings');
            data.remove();
        },
        getListings: function (user) {
            return UsersOBJ(user + 'listings');
        },
        addBid: function(id) {
            var user = UserStorage.getUserId();
            var data = UsersOBJ(user + '/bids');
            data.$add(id);
        },
        getUserFirst: function(user) {
            return UsersOBJ(user);
        },
        getUserLast: function(user) {
            return UsersOBJ(user);
        },
        updateRating: function(user, rating) {
            // todo
        }
    };
});
