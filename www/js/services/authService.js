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

.factory('UserAuth', function ($state, $ionicPopup, Auth, UsersURL, User, Utils, $timeout) {
    Auth.$onAuth(function(authData) {
        if (authData) {
            $timeout(function() {
                User.setUser(UsersURL.$getRecord(authData.uid));
                $state.go('app.browse');
                console.log('Authorized');
            }, 1000);          
        } else {
            $state.go('login');
            console.log('Unauthorized');
        }
    });

    return {
        authViaPassword: function(email, password) {
            Auth.$authWithPassword({
                email: email,
                password: password
            }).then(function(authData) {
                User.setUser(UsersURL.$getRecord(authData.uid));
            }).catch(function(error) {
                Utils.errMessage('Authentication Failed', error);
            });
        },
        authViaOAuth: function(provider) {
            Auth.$authWithOAuthPopup(provider).then(function(authData) {
                if (UsersURL.$getRecord(authData.uid) == null) {
                    var firstName, lastName;
                    switch (provider) {
                        case 'google':
                            var gl = authData.google.cachedUserProfile;
                            firstName = gl.given_name;
                            lastName = gl.family_name;
                            break;
                        case 'facebook':
                            var fb = authData.facebook.cachedUserProfile;
                            firstName = fb.firsrt_name;
                            lastName = fb.last_name;
                            break;
                    }

                    UsersURL.$ref().child(authData.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        rating: 5.0
                    });
                    console.log('REF: '+UsersURL.$ref());
                }
                console.log(UsersURL.$getRecord(authData.uid));
                User.setUser(UsersURL.$getRecord(authData.uid));
            }).catch(function(error) {
                Utils.errMessage('Authentication Failed', error);
            });
        },
        createUser: function(firstName, lastName, email, password) {
            Auth.$createUser({
                email: email,
                password: password
            }).then(function(authData) {
                UsersURL.$ref().child(authData.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    rating: 5.0
                });
                User.setUser(UsersURL.$getRecord(authData.uid));
            }).then(function(userData) {
                Auth.$authWithPassword({
                    email: email,
                    password: password
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