describe('AuthCtrl', function() {

    var controller, 
        deferredLogin,
        UserAuthMock,
        stateMock,
        ionicPopupMock;



  beforeEach(module('badgerscalp'));

  var AuthCtrl,
  scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope
    });
  }));
 

  it('says hello world!', function () {
    expect(scope.greeting).toEqual("Hello World!");
  });





// beforeEach(inject(function(_$rootScope_) {  
//     $rootScope = _$rootScope_;
//     scope.email = 'test1';
//     scope.password = 'password1';
//     scope.loginViaPassword();
// }));  

beforeEach(inject(function($controller, $q) {  
    deferredLogin = $q.defer();

    // mock dinnerService
    UserAuthMock = {
        login: jasmine.createSpy('login spy')
                      .and.returnValue(deferredLogin.promise)           
    };

    // mock $state
    // stateMock = jasmine.createSpyObj('$state spy', ['go']);

    // mock $ionicPopup
    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

    // instantiate LoginController
    controller = $controller('AuthCtrl', { 
                    // '$ionicPopup': ionicPopupMock, 
                    '$scope': scope,
                    // '$state': stateMock, 
                    'UserAuth': UserAuthMock }
                 );
}));



    it('should have a loginViaPassword function', function() {
        expect(scope.loginViaPassword).toBeDefined();
    });

        // it('should call login on loginViaPassword', function() {
        //     expect(UserAuthMock.authViaPassword).toHaveBeenCalledWith('test1', 'password1'); 
        // });

});

// describe("A suite is just a function", function() {
//   var a;

//   it("and so is a spec", function() {
//     a = true;

//     expect(a).toBe(true);
//   });
// });