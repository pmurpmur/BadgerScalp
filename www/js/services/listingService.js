 angular.module('services.listing', [])

<<<<<<< HEAD
.factory('Listing', function (ListingsURL, ListingsOBJ) {
=======
.factory('Listing', function (ListingsURL, UsersURL) {
>>>>>>> origin/development
    return {
        getAllListings: function () {
            return ListingsURL;
        },
        addListing: function (user, post) {
            return ListingsURL.$add({
                seller: user, 
                title: post.title,
                type: post.type,
                price: post.price,
                quantity: post.quantity,
                date: post.date,
                image: post.image,
                details: details,
                createdAt: Date()
            });
        },
        updateListing: function(user, post){
            return ListingsURL.$ref().child(post.id).set({                
                seller: user, 
                title: post.title,
                type: post.type,
                price: post.price,
                quantity: post.quantity,
                date: post.date,
                image: post.image,
                details: details,
                updatedAt: Date()                          
            });
        },
<<<<<<< HEAD
        addBid: function(listingId, bidId) {
            var data = ListingsOBJ(listingId + '/bids');
            data.$add(bidId);
=======
        addBid: function(id){
            var user = UserStorage.getUserId();
            var data = UsersOBJ(user + '/listings');
            data.$add(id);
        },
        removeListing: function(id) {
            ListingsURL.$ref().child(id).remove();
        },
        getBid: function (user) {

>>>>>>> origin/development
        },
        getBids: function(listingId) {
            return ListingsOBJ(listingId + '/bids');
        },
        getBid: function(listingId, bid) {
            return ListingsOBJ(listingId + '/' + bid);
        },
        removeListing: function(id) {
            ListingsURL.$ref().child(id).remove();
        }
    };
});