 angular.module('services.firebase', [])

.factory('DBManager', function (User, Listing, Bid) {
    return {
        createListing: function (post) {
            var user = User.thisUser();
            Listing.addListing(user, post).then(function(ref) {
                User.addListing(ref.key());
            });
        },
        updateListing: function (id, listing) {
            User.removeListing(id);
            Listing.removeListing(id);
        },
        getAllListings: function () {
            return Listing.getAllListings();
        },
        deleteListing: function (id) {
            User.removeListing(id);
            Listing.removeListing(id);
        },
        createBid: function (bidder, listing, price, date, time) {
            var id = User.addBid();
            Bid.addBid(id, bidder, listing, price, date, time);
        },
        updateRating: function (user, rating) {
            User.updateRating(user, rating);
        }
    };
});