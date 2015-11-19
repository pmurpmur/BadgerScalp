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
        updateListing: function(id, user, title, date, price, quantity, type, details){
            var fredNameRef = new Firebase('https://badgerscalp.firebaseio.com/listings');
            return fredNameRef.child(id).set({                
                type: type,
                title: title,
                seller: user,
                quantity: quantity,
                price: price,
                details: details,
                date: date,
                createdAt: date                            
            });
        },
        removeListing: function(id) {
            ListingsURL.$ref().child(id).remove();
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