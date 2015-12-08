 angular.module('services.data', [])

.factory('DB', function (FB, UserStorage, UserAuth) {

    function extend(a, b) {
        var result = {};
        for (var i in a) { result[i] = a[i]; }
        for (var i in b) { result[i] = b[i]; } 
        return result;
    };

    return {

        // CREATE

        createListing: function (post) {
            FB.createListing({
                date: post.date,
                image: post.image,
                price: post.price,
                quantity: post.quantity,
                title: post.title,
                type: post.type,
                details: post.details,
                seller: UserStorage.thisUser(), 
                createdAt: Firebase.ServerValue.TIMESTAMP,
                updatedAt: Firebase.ServerValue.TIMESTAMP
            });

            FB.createNotification(UserStorage.thisUser(), {
                type: 'post',
                date: post.date,
                image: post.image,
                price: post.price,
                quantity: post.quantity,
                title: post.title,
                details: post.details,
                seller: UserStorage.thisUser(), 
                createdAt: Firebase.ServerValue.TIMESTAMP
            });
        },
        createBid: function (post) {
            FB.createBid({
                price: post.price,
                listing: post.listing,
                buyer: UserStorage.thisUser(), 
                status: 'ACTIVE',
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            FB.createNotification(UserStorage.thisUser(), {
                type: 'bid',
                price: post.price,
                listing: post.listing,
                buyer: UserStorage.thisUser(), 
                createdAt: Firebase.ServerValue.TIMESTAMP
            });
        },

        
        // READ

        readNotifications: function() {
            return FB.$read('notifications/' + UserStorage.thisUser());
        },
        readTickets: function() {
            return FB.$read('listings');
        },
        readBids: function() {
            return FB.$read('bids');
        },
        readPosts: function() {
            return FB.$read('users/' + UserStorage.thisUser() + '/listings');
        },
        readUsers: function () {
            return FB.$read('users');
        },
        getUser: function(id) {
            return FB.$get('users/' + id);
        },
        getBids: function() {
            return FB.$get('bids');
        },
        getYourBids: function() {
            return FB.$get('bids/' + UserStorage.thisUser());
        },
        getOneBid: function(id) {
            return FB.$get('listings/' + id + '/bids/' + UserStorage.thisUser());
        },

        getListingBids: function(id) {
            return FB.$get('listings/' + id + '/bids');
        },
        getListingTitle: function(id) {
            var ret = '';
            FB.$get('listings/' + id + '/title')
            .once('value', function(data) {
                ret = data.val();
            });
            return ret;
        },
        getListingDate: function(id) {
            var ret = '';
            FB.$get('listings/' + id + '/date')
            .once('value', function(data) {
                ret = data.val();
            });
            return ret;
        },

        getTicket: function(id) {
            var listing, seller, sData;

            FB.$get('listings/' + id)
            .once('value', function(data) {
                listing = data.val();
                sData = data.val().seller;
            });

            FB.$get('users/' + sData)
            .once('value', function(data) {
                seller = data.val();
            }); 
            
            return {
                listing: listing,
                seller: seller
            };
        },


        // UPDATE

        updateUser: function (id, post) {
            FB.updateUser(id, extend(post, {
                updatedAt: Firebase.ServerValue.TIMESTAMP
            }));
        },
        updateListing: function (id, post) {
            FB.updateListing(id, extend(post, {
                updatedAt: Firebase.ServerValue.TIMESTAMP
            }));
        },
        updateBid: function (id, post) {
            FB.updateBid(extend(post, {
                updatedAt: Firebase.ServerValue.TIMESTAMP
            }));
        },
        

        // DELETE

        removeListing: function(id) {
            FB.deleteListing(id);
        },
        removeUser: function (id) {
            var user = FB.$get('users/' + id);
            var listings = user.child(listings);
            var bids = user.child(bids);

            angular.forEach(listings, function(item) {
                FB.deleteListing(item);
            });

            angular.forEach(bids, function(item) {
                FB.deleteBid(item);
            });

            if (user.child('email') !== undefined && user.child('password') !== undefined) {
                UserAuth.removeUser(user.child('email'), user.child('password'));
            }
            
        },

        cleanDB: function() {

        }
    };
});