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
        }

        removeListing: function(id) {
            var user = UserStorage.getUserId();
            var data = UsersOBJ(user + '/listings');
            data.$remove(id);
        }

    //     getListings: function (user) {
    //         var listings = UsersURL.$getRecord(user).$getRecord('listings');

    //         var list = [];
    //         for (var i = 0; i < listings.length; i++) {
    //             list[i] = BidsURL.$getRecord(listings[i]);
    //         }
    //         return list;
    //     },
    //     createListing: function (listing) {
    //         ListingsURL.$add(listing);
    //     },
    //     getBids: function (user) {
    //         var bids = UsersURL.$getRecord(user).$getRecord('bids');

    //         var list = [];
    //         for (var i = 0; i < bids.length; i++) {
    //             list[i] = BidsURL.$getRecord(bids[i]);
    //         }
    //         return list;
    //     },
    //     createBid: function (bid) {
    //         BidsURL.$add(bid);
    //     },
    //     getRating: function (user) {
    //         return UsersURL.$getRecord(user).$getRecord('rating');
    //     },
    //     addRating: function (user, rating) {
    //         var user = UsersURL[user];

    //         user.reviews = user.reviews + 1;
    //         user.rating = (user.rating + rating) / num;

    //         num.$save('reviews');
    //         prev.$save('rating');
    //     }
    };
});
