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
}])

.factory('UserStorage', ['LocalStorage', function (LocalStorage) {

    var userKey = 'user';

    return {
        setUser: function (user) {
            return LocalStorage.set(userKey, user);
        },
        thisUser: function() {
            return LocalStorage.get(userKey).$id;
        },
        getUserRating: function () {
            return LocalStorage.get(userKey).rating;
        },
        getUserNumReviews: function () {
            return LocalStorage.get(userKey).numReviews;
        },
        getEmail: function () {
            return LocalStorage.get(userKey).email;
        },
        getPassword: function () {
            return LocalStorage.get(userKey).password;
        },
        setPassword: function (data) {
            return LocalStorage.set(userKey, data);
        },
        getFullName: function () {
            var user = LocalStorage.get(userKey);
            if (user !== null) {
                return { first:user.firstName, last:user.lastName };
            }
            return { first:'No User', last:''};
        },
        getProfilePicture: function () {
            var defaultImg = 'img/default_profile.jpg';

            var user = LocalStorage.get(userKey);
            if (user !== null) {
                var img = user.profImg;
                var imgUrl = user.imgUrl;

                if (img !== undefined) { return img; } 
                else if (imgUrl !== undefined) { return imgUrl; }
                else { return defaultImg; }
            }
            return defaultImg;
        },
        cleanUser: function () {
            return LocalStorage.remove(userKey);
        }
    };
}]);