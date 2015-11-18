 angular.module('services.listing', [])

.factory('Listing', function (ListingsURL) {
    return {
        getAllListings: function () {
            return ListingsURL;
        },
        addListing: function (user, post) {
            return ListingsURL.$add({
                seller: user,
                title: post.title,
                date: post.date,
                price: post.price,
                quantity: post.quantity,
                type: post.type,
                details: post.details,
                createdAt: Date()
            });
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