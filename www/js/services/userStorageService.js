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
        getEmail: function () {
            return LocalStorage.get(userKey).email;
        },
        getPassword: function () {
            return LocalStorage.get(userKey).password;
        },
        getProfilePicture: function () {
            var img = LocalStorage.get(userKey).profImg;
            var imgUrl = LocalStorage.get(userKey).imgUrl;
            var defaultImg = 'img/default_profile.jpg';

            if (img !== undefined) { return img; } 
            else if (imgUrl !== undefined) { return imgUrl; }
            else { return defaultImg; }
        },
        cleanUser: function () {
            return LocalStorage.remove(userKey);
        } 
    };
}]);