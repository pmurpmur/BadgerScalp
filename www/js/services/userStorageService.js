angular.module('services.userStorage', [])

.factory('UserStorage', ['LocalStorage', function (LocalStorage) {

    var userKey = 'user';

    return {
        setUser: function (user) {
            return LocalStorage.set(userKey, user);
        },
        getUser: function () {
            return LocalStorage.get(userKey);
        },
        cleanUser: function () {
            return LocalStorage.remove(userKey);
        }
    };
}]);