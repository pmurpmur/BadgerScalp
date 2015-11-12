angular.module('services.userStorage', [])

.factory('UserStorage', ['LocalStorage', function (LocalStorage) {

    var userKey = 'user';

    return {
        setUser: function (user) {
            return LocalStorage.set(userKey, user);
        },
        getUserId: function () {
            return LocalStorage.get(userKey).$id;
        },
        getUserFirstName: function () {
            return LocalStorage.get(userKey).firstName;
        },
        getUserLastName: function () {
            return LocalStorage.get(userKey).lastName;
        },
        getUserRating: function () {
            return LocalStorage.get(userKey).rating;
        },
        getUserNumReviews: function () {
            return LocalStorage.get(userKey).numReviews;
        },
        cleanUser: function () {
            return LocalStorage.remove(userKey);
        }
    };
}]);