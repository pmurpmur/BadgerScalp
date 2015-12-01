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
        },
        createBid: function (post) {
            FB.createBid({
                price: post.price,
                listing: post.listing,
                buyer: UserStorage.thisUser(), 
                status: 'ACTIVE',
                createdAt: Firebase.ServerValue.TIMESTAMP
            });
        },
		createEvent: function (post) {
			FB.createEvent({
				title: "vs " + post.opponent,
				dateTime: Date(),
				sport: post.sport,
				opponent: post.opponent,
				listings: []
			});
		},

        
        // READ

        readTickets: function() {
            return FB.$read('listings');
        },
        readBids: function() {
            return FB.$read('bids');
        },
		readEvents: function() {
			return FB.$read('events');
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
		getEvent: function(id) {
			return FB.$get('events/' + id);
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
		updateEvent: function (id, post) {
			FB.updateEvent(id, extend(post, {
				updatedAt: Firebase.ServerValue.TIMESTAMP
			}));
		},
        

        // DELETE

        removeListing: function(id) {
			
			var listing = FB.$get('listings/' + id);
			var eventRef = FB.$get('events/' + listing.eventId);
			var index = eventRef.listings.indexOf(id);
			eventRef.listings.splice(index, 1);
			if (eventRef.listings.length < 1) {
				FB.deleteEvent(listing.eventId)
			}
			
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
		removeEvent: function(id) {
			var eventRef = FB.$get('events/' + id);
			var listings = eventRef.child(listings);
			
			angular.forEach(listings, function(item) {
                FB.deleteListing(item);
            });
			
			FB.deleteEvent(id);
		}
    };
});