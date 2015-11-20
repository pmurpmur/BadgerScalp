 angular.module('services.firebase', [])

.factory('DBManager', function (User, Listing, Bid, UserStorage) {
    return {
        createListing: function (post) {
            var user = User.thisUser();
            Listing.addListing(user, post).then(function(ref) {
                User.addListing(ref.key());
            });
        },
        updateListing: function (post) {
            var user = User.thisUser();
            Listing.updateListing(user, post);
        },
        removeListing: function(id) {
            User.removeListing(id);
            Listing.removeListing(id);
        },
        getAllListings: function () {
            return Listing.getAllListings();
        },
        getUserListings: function (user) {
            return User.getListings();
        },
        getUserName: function(){
            return UserStorage.getUserFirstName() + ' ' + UserStorage.getUserLastName();
        },
        getUserName: function(user){
            var first = User.getUserFirst(user);
            var last = User.getUserLast(user);
            console.log(first);
            console.log(last);
            return first + ' ' + last;
        },
        createBid: function (id, price) {
            var user = User.thisUser();
            Bid.addBid(user, price).then(function(ref) {
                User.addBid(ref.key());
                Listing.addBid(id, ref.key())
            });
        },
        getAllBids: function () {
            return Bid.getAllBids();
        },
        getListingBids: function (listing) {
            return Listing.getBids(listing);
        },
        getListingBid: function (listing, bid) {
            return Listing.getBid(listing, bid);
        },
        getUserBids: function (listing) {
            // todo
        },
        deleteUser: function () {
            // and all its associated data. todo
        },
        getUserImage: function (user) {
            // todo
        },
        updateRating: function (user, rating) {
            User.updateRating(user, rating);
        },
    };
});