 angular.module('services.fire', [])

.factory('FB', ['FBDB', '$firebaseArray', function (FBDB, $firebaseArray) {

    var U = 'users/';
    var L = 'listings/';
    var B = 'bids/';
    var N = 'notifications/';

    function URL(path) {
        return new Firebase(FBDB + path);
    };

    return {
        $read: function(path) {
            return $firebaseArray(new Firebase(FBDB + path));
        },
        $get: function(path) {
            return new Firebase(FBDB + path);
        },
        updateUser: function(id, data) {
            URL(U + id).update(data);
        },
        createListing: function(data) {
            $firebaseArray(URL(L))
            .$add(data)
            .then(function(ref) {
                $firebaseArray(URL(U + data.seller + '/listings')).$add(ref.key());
            });
        },
        updateListing: function(id, data) {

            URL(L + id).update(data);

        },
        deleteListing: function(id) {
            var user = URL(L + id + '/seller');
            URL(L + id).remove(function() {
                $firebaseArray(URL(U + user + '/listings')).$remove(id);
            });
        },

        deleteUser: function (userid) {
            var fredRef = new Firebase('https://badgerscalp.firebaseio.com/users/' + userid);
            fredRef.remove();
        },
        createBid: function(data) {
            URL(B).child(data.buyer).child(data.listing).set(data);
            URL(L + data.listing + '/bids').child(data.buyer).set(data.price);
        },
        updateBid: function(id, data) {
            URL(B + id).update(data);
        },
        deleteBid: function(id) {
            var user = URL(B + id + '/buyer');
            URL(B + id).remove(function() {
                $firebaseArray(URL(U + user + '/bids')).$remove(id);
            });
        },
        createNotification: function(id, notif) {
            $firebaseArray(URL(N + id)).$add(notif);
        }
    };
}]);
