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
        deleteListing: function(id) {
           // var user = URL(L + id + '/seller');

            var user = UserStorage.thisUser();
            URL(L + id).remove(function() {
                $firebaseArray(URL(U + user + '/listings')).$remove(id);
            });
        },

        deleteUser: function (userid) {
            var fredRef = URL(U + userid);
            fredRef.remove();
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
