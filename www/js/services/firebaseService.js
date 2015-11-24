 angular.module('services.fire', [])

.factory('FB', ['FBDB', '$firebaseArray', function (FBDB, $firebaseArray) {

    var U = 'users/';
    var L = 'listings/';
    var B = 'bids/';

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
        createBid: function(data) {
            $firebaseArray(URL(B))
            .$add(data)
            .then(function(ref) {
                $firebaseArray(URL(U + data.buyer + '/bids')).$add(ref.key());
                $firebaseArray(URL(L + data.listing + '/bids')).$add(ref.key());
            });
        },
        updateBid: function(id, data) {
            URL(B + id).update(data);
        },
        deleteBid: function(id) {
            var user = URL(B + id + '/buyer');
            URL(B + id).remove(function() {
                $firebaseArray(URL(U + user + '/bids')).$remove(id);
                $firebaseArray(URL(L + user + '/bids')).$remove(id);
            });
        }
    };
}]);
