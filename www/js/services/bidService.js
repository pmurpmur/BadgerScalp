 angular.module('services.bid', [])

.factory('Bid', function (UserStorage, UsersURL, BidsURL, ListingsURL) {
    return {
        getListing: function (user) {
            return BidsURL; 
        },
        createListing: function (listing) {

        },
        getBid: function (user) {

        },
        createBid: function (user, bid) {
            return BidsURL.$add({
                bid: bid.bid, 
                bidder: user,
                createdAt: Date(),
                relateTicket: bid.relateTicket,
                status: "highest bid"
            });
        },
        getRating: function (user) {

        },
        addRating: function (user, rating) {

        }
    };
});