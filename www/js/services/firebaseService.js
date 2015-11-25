 angular.module('services.fire', [])

.factory('FB', ['FBDB', '$firebaseArray', function (FBDB, $firebaseArray) {

    var U = 'users/';
    var L = 'listings/';
    var B = 'bids/';

    function URL(path) {
<<<<<<< HEAD
        var i = new Firebase(FBDB + path);
        console.log(FBDB + path);
=======
>>>>>>> aa2c0aa124109603d3ebb30253970d4361e0dba4
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
<<<<<<< HEAD
            URL(L + id).update({price: data.price});
=======
            URL(L + id).update(data);
>>>>>>> aa2c0aa124109603d3ebb30253970d4361e0dba4
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
