angular.module('services.auth', [])

.factory('Auth', ['$firebaseAuth', 'FBDB',
    function($firebaseAuth, FBDB) {
        var FBRef = new Firebase(FBDB);
        return $firebaseAuth(FBRef);
    }
])

.factory('UsersURL', ['$firebaseArray', 'FBDB',
    function($firebaseArray, FBDB) {
        var FBRef = new Firebase(FBDB + 'users');
        return $firebaseArray(FBRef);
    }
])

.factory('UserAuth', function ($state, $ionicPopup, Auth, UsersURL, ThisUser, Utils) {
    Auth.$onAuth(function(authData) {
        if (authData) {
            $state.go('app.browse');
        } else {
            $state.go('login');
            console.log('logged out');
        }
    });

    function isRegistered(uid) {
        var reg = false;
        UsersURL.forEach(function(user) {
            if (uid == user.registration) {
                ThisUser.set(user.$id); 
                reg = true; return; }
        }); return reg;
    }

    return {
        authViaPassword: function(email, password) {
            Auth.$authWithPassword({
                email: email,
                password: password
            }).catch(function(error) {
                Utils.errMessage('Authentication Failed', error);
            });
        },
        authViaOAuth: function(provider) {
            Auth.$authWithOAuthPopup(provider).then(function(authData) {
                if (!isRegistered(authData.uid)) {
                    console.log(authData);
                    switch (provider) {
                        case 'google':
                            var gl = authData.google.cachedUserProfile;
                            UsersURL.$add({
                                username: gl.given_name + gl.family_name.substring(0,1),
                                firstName: gl.given_name,
                                lastName: gl.family_name,
                                rating: 5,
                                state: 'ONLINE',
                                registration: authData.uid
                            }).then(function(ref) {
                                ThisUser.set(ref.key());
                            });
                            break;
                        case 'facebook':
                            var fb = authData.facebook.cachedUserProfile;
                            UsersURL.$add({
                                username: fb.first_name + fb.last_name.substring(0,1),
                                firstName: fb.first_name,
                                lastName: fb.last_name,
                                rating: 5,
                                state: 'ONLINE',
                                registration: authData.uid
                            }).then(function(ref) {
                                ThisUser.set(ref.key());
                            });
                            break;
                    }
                }
            }).catch(function(error) {
                Utils.errMessage('Authentication Failed', error);
            });
        },
        createUser: function(firstName, lastName, email, password) {
            Auth.$createUser({
                email: email,
                password: password
            }).then(function(userData) {
                Auth.$authWithPassword({
                    email: email,
                    password: password
                });
            }).then(function(userData) {
                UsersURL.$add({
                    username: email.substring(0, email.indexOf("@")),
                    firstName: firstName,
                    lastName: lastName,
                    rating: 5,
                    state: 'ONLINE',
                    registration: email
                }).then(function(ref) {
                    ThisUser.set(ref.key());
                });
            }).catch(function(error) {
                Utils.errMessage('Authentication Failed', error);
            });
        },
        changeEmail: function(oldEmail, newEmail, password) {
            Auth.$changeEmail({
                oldEmail: oldEmail,
                newEmail: newEmail,
                password: password
            }).then(function() {
                $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Email has been changed!'
                }).then(function() {
                    $state.go('app.browse');
                });
            }).catch(function(error) {
                $ionicPopup.alert({
                    title: 'Password Change Failed',
                    template: 'Sorry there was an error. Please try again.'
                });
            });
        },
        changePassword: function(email, oldPassword, newPassword) {
            Auth.$changePassword({
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword
            }).then(function() {
                $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Password has been changed!'
                }).then(function() {
                    $state.go('app.browse');
                });
            }).catch(function(error) {
                $ionicPopup.alert({
                    title: 'Password Change Failed',
                    template: 'Sorry there was an error. Please try again.'
                });
            });
        },
        resetPassword: function(email) {
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
        removeUser: function(email, password) {
            Auth.$removeUser({
                email: email,
                password: password
            }).then(function() {
                Auth.$unAuth();
            }).catch(function(error) {
                $ionicPopup.alert({
                    title: 'Remove User Failed',
                    template: 'Sorry there was an error. Please try again.'
                });
            });
        },
        unAuth: function() {
            Auth.$unAuth();
        }
    };
});