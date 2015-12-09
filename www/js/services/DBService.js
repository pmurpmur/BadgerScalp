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
			var id = null;
			
			if (!post.eventId)
			{
				var eventData = {};
				eventData.date = post.date.substring(0,15);
				eventData.sport = post.type;
				eventData.opponent = post.opponent? post.opponent : "OPPONENT";
				eventData.name = eventData.date+" - "+eventData.sport+" VS "+eventData.opponent;
				eventData.createdAt = Firebase.ServerValue.TIMESTAMP;
				eventData.updatedAt = Firebase.ServerValue.TIMESTAMP;
				id = FB.createEvent(eventData);
			}
			else {
				id = post.eventId;
			}
			
			post.details = post.details? post.details : "" 
			post.seller = UserStorage.thisUser();
			post.eventId = id;
			post.createdAt = Firebase.ServerValue.TIMESTAMP;
            post.updatedAt = Firebase.ServerValue.TIMESTAMP;
			FB.createListing(post);

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
            post.status = 'ACTIVE';
            post.buyer = UserStorage.thisUser();
            post.createdAt = Firebase.ServerValue.TIMESTAMP;
            post.updatedAt = Firebase.ServerValue.TIMESTAMP;
            FB.createBid(post);

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
		getEvents: function() {
			return FB.$get('events');
		},
		getEvent: function(id) {
			return FB.$get('events/' + id);
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
		updateEvent: function (id, post) {
			FB.updateEvent(id, extend(post, {
				updatedAt: Firebase.ServerValue.TIMESTAMP
			}));
		},
        
        acceptBid: function (buyerId, message, price, listingId) {
            FB.acceptBid(listingId);

            FB.createNotification(buyerId, {
                type: 'sold',
                message: message,
                price: price
            });
        },

        // DELETE
        removeBid: function(id, ticket_id) {
            FB.deleteBid(id, ticket_id);
        },
        removeListing: function(user_id, ticket_id, title) {
			
			//var listing = FB.$get('listings/' + id);
			//var eventRef = FB.$get('events/' + listing.eventId);
			//var index = eventRef.listings.indexOf(id);
			//eventRef.listings.splice(index, 1);
			//if (eventRef.listings.length < 1) {
			//	FB.deleteEvent(listing.eventId)
			//}
			
            FB.deleteListing(user_id, ticket_id, title);
        },
        removeUser: function (id) {
            var user = FB.$get('users/' + id);
            FB.deleteUser(id);
            if (user.child('email') !== undefined && user.child('password') !== undefined) {
                UserAuth.removeUser(user.child('email'), user.child('password'));
            }
            
        },
		removeEvent: function(id) {
			var eventRef = FB.$get('events/' + id);
			var listings = eventRef.child(listings);
			
			FB.deleteEvent(id);
		},

        addPhoto: function(listingId) {
            FB.addPhoto(listingId);
        }
    };
});