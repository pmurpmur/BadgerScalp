 angular.module('services.listing', [])

.factory('Listing', function (ListingsURL) {
    return {
        getAllListings: function () {
            return ListingsURL;
        },
        addListing: function (user, post) {
            console.log('date: '+user.eventDate);
            console.log('time: '+user.eventTime);
            return ListingsURL.$add({
                seller: user,
                event: post.event,
                type: post.sport,
                price: post.price,
                date: post.eventDate,
                time: post.eventTime,
                createdAt: Date()
            });
        },

        removeListing: function(id) {
            ListingsURL.$ref().child(id).remove();
        }
    };
});