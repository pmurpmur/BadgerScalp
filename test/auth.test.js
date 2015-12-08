describe('During authorization', function() {  
    var forgotPassword, register, newEmail;

    beforeEach(function() {
        browser.get('/#/');
        forgotPassword = element(by.id('fPasswordLink'));
        register = element(by.id('registerLink'));

        var newEmail = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for(var i = 0; i < 23; i++) { 
            newEmail += possible.charAt(Math.floor(Math.random() * possible.length));
        } newEmail += '@bs.io';
    });

    it('should start at login page', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/login');
    })

    it('should send user to register account if email and password do not exist', function() {
        // grab form fields by id
        var username = element(by.model('user.email'));
        var password = element(by.model('user.password'));

        // send input to respective form fields
        username.sendKeys('unlikelyemailtohave@bs.io');
        password.sendKeys('badgerscalp');

        // click the login button
        var loginButton = element(by.id('loginButton'));
        loginButton.click().then(function() {
            setTimeout(function() {
                expect(browser.getLocationAbsUrl()).toMatch('/register');

                var popup = element(by.css('.popup-container.popup-showing.active'));
                expect(popup.isDisplayed()).toBeTruthy();
            }, 2000);
        });
    })

    it('should signup, logout, and login with newly created account', function() {
        register.click();

        var pass = 'badgerscalp';

        var firstName = element(by.model('user.firstName'));
        var lastName = element(by.model('user.lastName'));
        var username = element(by.model('user.email'));
        var password = element(by.model('user.password'));

        firstName.sendKeys('Buckingham');
        lastName.sendKeys('Badger');
        username.sendKeys(newEmail);
        password.sendKeys(pass);

        var registerButton = element(by.id('registerButton'));
        registerButton.click().then(function() {
            setTimeout(function() {
                expect(browser.getLocationAbsUrl()).toMatch('/browse');
            }, 2000);
        });

        var registerButton = element(by.id('menuButton'));
        menuButton.click().then(function() {
            setTimeout(function() {
                var logoutButton = element(by.id('logButton'));
                logoutButton.click().then(function() {
                    expect(browser.getLocationAbsUrl()).toMatch('/login');
                })
            }, 2000);
        });

        var username = element(by.model('user.email'));
        var password = element(by.model('user.password'));

        username.sendKeys(newEmail);
        password.sendKeys(pass);

        var loginButton = element(by.id('loginButton'));
        loginButton.click().then(function() {
            setTimeout(function() {
                expect(browser.getLocationAbsUrl()).toMatch('/register');

                var popup = element(by.css('.popup-container.popup-showing.active'));
                expect(popup.isDisplayed()).toBeTruthy();
            }, 2000);
        });
    })

    it('should initialize the local storage with current user info', function() {
        var username = element(by.model('user.email'));
        var password = element(by.model('user.password'));

        username.sendKeys('register@imp.io');
        password.sendKeys('register');

        var loginButton = element(by.id('loginButton'));
        loginButton.click().then(function() {
            setTimeout(function() {
                expect(browser.getLocationAbsUrl()).toMatch('/browse');

                var user = JSON.parse(localStorage.getItem('user'));
                console.log(user);
                expect(user).toBeDefined();
            }, 2000);
        });
    })

    it('should signup/login via google', function() {
        var gl = element(by.id('googleButton'));
        gl.click().then(function() {
            setTimeout(function() {
                expect(browser.getLocationAbsUrl()).toMatch('/browse');
            }, 3000);
        });
    })

    it('should signup/login via facebook', function() {
        var fb = element(by.id('facebookButton'));
        fb.click().then(function() {
            setTimeout(function() {
                expect(browser.getLocationAbsUrl()).toMatch('/browse');
            }, 3000);
        });
    })

    it('should display error if invalid email is entered into forgot password field', function() {
        forgotPassword.click().then(function() {
            setTimeout(function() {
                var email = element(by.model('user.email'));
                email.sendKeys('unlikelyemailtohaveimp.io');

                var retrieveButton = element(by.id('retrieveButton'));
                retrieveButton.click().then(function() {
                    setTimeout(function() {
                        var popup = element(by.css('.popup-container.popup-showing.active'));
                        expect(popup.isDisplayed()).toBeTruthy();
                    }, 2000);
                });
            }, 2000);
        });
    });
});