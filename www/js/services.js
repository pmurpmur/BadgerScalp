angular.module('badgerscalp.services', [])


.factory('Auth', ['$firebaseAuth', 'FBDB',
    function($firebaseAuth, FBDB) {
        var FBRef = new Firebase(FBDB);
        return $firebaseAuth(FBRef);
    }
])

.factory('AuthUser', function ($state, Auth, $ionicPopup) {
    Auth.$onAuth(function(authData) {
      if (authData) {
        $state.go('app.browse');
        console.log("Logged in as:", authData.uid);
      } else {
        $state.go('login');
        console.log("Logged out");
      }
    });

    return {
        password: function (email, password) {
            Auth.$authWithPassword({
                email: email,
                password: password
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        },
        oAuth: function (provider) {
            Auth.$authWithOAuthPopup(provider)
            .catch(function(error) {
                console.error("Authentication failed:", error);
            });
        },
        resetPassword: function (email) {
            Auth.$resetPassword({
                email: email
            }).then(function() {
                $ionicPopup.alert({
                    title: 'Password Reset Successful',
                    template: 'You will recieve an email with a temporary password shortly.'
                }).then(function() {
                    $state.go('login');
                });
            }).catch(function(error) {
                console.log(error);
                $ionicPopup.alert({
                    title: 'Password Reset Failed',
                    template: 'The specified user does not exist.'
                });
            }); 
        },
        createUser: function (firstName, lastName, email, password) {
            Auth.$createUser({
                email: email,
                password: password
            }).then(function(userData) {
                var profile = {
                    id: userData.uid,
                    username: email.substring(0, email.indexOf("@")),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    posts: {},
                    bids: {},
                    registered_in: Date()
                };

                var profileRef = $firebaseArray(ref.child('profile'));
                return profileRef.$add(profile).then(function(ref) {
                  var id = ref.key();
                  profileRef.$indexFor(id);
                });

            }).catch(function(error) {
                console.error("Error: ", error);
            });
        }
    };
})          

 .factory('Utils', [function () {
    return {
        escapeEmailAddress: function (email) {
            if(!email) return false
                // Replace '.' (not allowed in a Firebase key) with ','
            email = email.toLowerCase();
            email = email.replace(/\./g, ',');
            return email.trim();
        },
        unescapeEmailAddress: function (email) {
            if(!email) return false
            email = email.toLowerCase();
            email = email.replace(/,/g, '.');
            return email.trim();
        },
        getHash: function (chatToUser, loggedInUser) {
            var hash = '';
            if(chatToUser > loggedInUser) {
                hash = this.escapeEmailAddress(chatToUser) + '_' + this.escapeEmailAddress(loggedInUser);
            } else {
                hash = this.escapeEmailAddress(loggedInUser) + '_' + this.escapeEmailAddress(chatToUser);
            }
            return hash;
        },
        getBase64ImageFromInput: function (input, callback) {
            window.resolveLocalFileSystemURL(input, function (fileEntry) {
                    fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (evt) {
                                callback(null, evt.target.result);
                            };
                            reader.readAsDataURL(file);
                        },
                        function () {
                            callback('failed', null);
                        });
                },
                function () {
                    callback('failed', null);
                });
        },
        alert: function (title, message) {
            $ionicPopup.alert({
                title: title,
                template: message
            });
        }
    };
}])