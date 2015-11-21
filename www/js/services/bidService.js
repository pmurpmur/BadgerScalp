 angular.module('services.bid', [])

.factory('Bid', function (BidsURL) {
    return {
        addBid: function (user, price) {
            return BidsURL.$add({
                buyer: user,
                price: price,
                createdAt: Date()
            });
        },
        getAllBids: function() {
        	return BidsURL;
        }
    };
});