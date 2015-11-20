 angular.module('services.bid', [])

.factory('Bid', function (BidsURL) {
    return {
<<<<<<< HEAD
        addBid: function (user, price) {
            return BidsURL.$add({
                buyer: user,
                price: price,
                createdAt: Date()
            });
        },
        getAllBids: function() {
        	return BidsURL;
=======
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

>>>>>>> origin/development
        }
    };
});