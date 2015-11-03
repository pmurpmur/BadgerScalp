angular.module('services.localStorage', [])

.factory('LocalStorage', [function () {
    return {
        set: function (key, value) {
            return localStorage.setItem(key, JSON.stringify(value));
        },

        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },

        remove: function (key) {
            return localStorage.removeItem(key);
        },
    };
}]);