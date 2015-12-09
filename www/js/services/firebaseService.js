 angular.module('services.fire', [])

.factory('FB', ['FBDB', '$firebaseArray', function (FBDB, $firebaseArray, UserStorage) {

    var U = 'users/';
    var L = 'listings/';
    var B = 'bids/';
	var E = 'events/';
    var N = 'notifications/';

    function URL(path) {
        return new Firebase(FBDB + path);
    };

    return {
        $read: function(path) {
            return $firebaseArray(new Firebase(FBDB + path));
        },
        $get: function(path) {
            return new URL(path);
        },
		
        updateUser: function(id, data) {
            URL(U + id).update(data);
        },
		
        createListing: function(data) {
			$firebaseArray(URL(L))
            .$add(data)
            .then(function(ref) {
                $firebaseArray(URL(U + data.seller + '/listings')).$add(ref.key());
				URL(E + data.eventId + '/listings').push(ref.key());
            });
        },
        updateListing: function(id, data) {

            URL(L + id).update(data);

        },
        deleteListing: function(user_id, ticket_id, title) {
           // var user = URL(L + id + '/seller');

            //var user = UserStorage.thisUser();
            URL(L + ticket_id).remove();
            URL(U + user_id + '/listings').once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var oj = childSnapshot.val();
                    if (oj == ticket_id){
                        URL(U + user_id + '/listings/' + childSnapshot.key()).remove();
                    }
                });
            });
            URL(N + user_id).orderByChild("type").startAt('post').endAt('post').on('value', function(snapshot) { 
                snapshot.forEach(function(childSnapshot) {
                    var oj = childSnapshot.val();
                    if (oj.seller == user_id && oj.title == title) {
                        URL(N + user_id + '/' + childSnapshot.key()).remove();
                    }
                });
            });
            URL(B).once("value", function(snapshot) {
                snapshot.forEach(function(layer1) {
                    layer1.forEach(function(layer2) {
                        var oj = layer2.val();
                        if (oj.listing == ticket_id){
                            URL(B + layer1.key() + '/' + layer2.key()).remove();
                        }
                    });
                });
            });
 
        },

        deleteUser: function (userid) {
            URL(U + userid).remove();
            URL(N + userid).remove();
            URL(B + userid).remove();
            URL(L).once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {

                    var oj = childSnapshot.val();
                    if (oj.seller == userid){
                        URL(L + childSnapshot.key()).remove();
                    }
                    
                    URL(L + childSnapshot.key() + '/bids').once("value", function(layer1) {
                        layer1.forEach(function(layer2) {
                            if (layer2.key() == userid){
                                URL(L + childSnapshot.key() + '/bids/' + layer2.key()).remove();
                            }
                        });
                    });
                });
            });

        },
		
        createBid: function(data) {
            URL(B).child(data.buyer).child(data.listing).set(data);
            URL(L + data.listing + '/bids').child(data.buyer).set(data.price);
        },
        updateBid: function(id, data) {
            URL(B + id).update(data);
        },
        deleteBid: function(id, ticket_id) {
            var user = URL(B + id + '/buyer');
            // URL(B + id).remove(function() {
            //     $firebaseArray(URL(U + user + '/bids')).$remove(id);
            URL(B + id + '/' + ticket_id).remove(function() {
                //$firebaseArray(URL(U + user + '/bids')).$remove(id);
            });
            URL(L + ticket_id + '/bids/' +  id).remove();
            URL(N + id).orderByChild("type").startAt('bid').endAt('bid').on('value', function(snapshot) { 
                snapshot.forEach(function(childSnapshot) {
                    var oj = childSnapshot.val();
                    if (oj.buyer == id && oj.listing == ticket_id) {
                        console.log(childSnapshot.key());
                        URL(N + id + '/' + childSnapshot.key()).remove();
                    }
                });
            });
        },
		
		createEvent: function(data) {
			ref = URL(E).push(data);
			return ref.key();
		},
        updateEvent: function(id, data) {
            URL(E + id).update(data);
        },
        deleteEvent: function(id) {
            $firebaseArray(URL(E)).$remove(id)
        },
        createNotification: function(id, notif) {
            $firebaseArray(URL(N + id)).$add(notif);
        },
        cleanDB: function() {

        },
        acceptBid: function (bidId, listingId) {
            var listing = URL(L + listingId);
            listing.update({
                status: 'SOLD',
                winningBid: bidId
            });
        }
    };
}]);
