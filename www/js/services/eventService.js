 angular.module('services.event', [])

.factory('Event', function (UserStorage, UsersURL, BidsURL, ListingsURL) {
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