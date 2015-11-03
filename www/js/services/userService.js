angular.module('services.user', [])

.factory('User', ['LocalStorage', function (LocalStorage) {

    var userKey = 'user',
        presenceKey = 'presence',
        olUsersKey = 'onlineusers';

    return {
        onlineUsers: {},
        setUser: function (user) {
            return LocalStorage.set(userKey, user);
        },
        getUser: function () {
            return LocalStorage.get(userKey);
        },
        cleanUser: function () {
            return LocalStorage.remove(userKey);
        },
        setOLUsers: function (users) {
            LocalStorage.set(olUsersKey, users);
            return this.onlineUsers = users;
        },
        getOLUsers: function () {
            if(this.onlineUsers && this.onlineUsers.length > 0) {
                return this.onlineUsers
            } else {
                return LocalStorage.get(olUsersKey);
            }
        },
        cleanOLUsers: function () {
            LocalStorage.remove(olUsersKey);
            return onlineUsers = null;
        },
        setPresenceId: function (presenceId) {
            return LocalStorage.set(presenceKey, presenceId);
        },
        getPresenceId: function () {
            return LocalStorage.get(presenceKey);
        },
        cleanPresenceId: function () {
            return LocalStorage.remove(presenceKey);
        },
    };
}]);