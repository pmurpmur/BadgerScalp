 angular.module('services.firebase', [])

.factory('DBManager', function (User, Listing, Bid, UserStorage) {
    return {
        createListing: function (post) {
            var user = User.thisUser();
            Listing.addListing(user, post).then(function(ref) {
                User.addListing(ref.key());
            });
        },
        updateListing: function (id, title, date, price, quantity, type, details) {  
            var user = User.thisUser();  

            Listing.updateListing(id, user, title, date, price, quantity, type, details);
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
        deleteListing: function (id) {
            User.removeListing(id);
            Listing.removeListing(id);
        },
        createBid: function (bid) {
            //var id = User.addBid();
            var user = User.thisUser();  
            Bid.createBid(user, bid).then(function(ref) {
                Listing.addBid(ref.key());
            });
            //Bid.addBid(id, bidder, listing, price, date, time);
        },
        getAllBids: function () {
            return Bid.getListing();
        },
        updateRating: function (user, rating) {
            User.updateRating(user, rating);
        },
        deleteUser: function () {
            // and all its associated data
        }
    };
});