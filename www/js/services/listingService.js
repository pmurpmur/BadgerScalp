 angular.module('services.listing', [])

.factory('Listing', function (UserStorage, UsersURL, BidsURL, ListingsURL) {
    return {
        getListing: function (user) {
                 
        },
        createListing: function (listing) {

        },
        getBid: function (user) {

        },
        createBid: function (bid) {

        },
        getRating: function (user) {

        },
        addRating: function (user, rating) {

        }
    };
});