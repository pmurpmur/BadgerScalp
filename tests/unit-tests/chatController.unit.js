describe('chatController unit testing: ', function() {

  beforeEach(module('badgerscalp'));
  var controller, 
  deferredLogin,
  DBMock,
  stateMock,
  scope;


  beforeEach(inject(function($controller, $q, $rootScope) {  
    deferredLogin = $q.defer();
    scope = $rootScope.$new();

    DBMock = {
      readNotifications: jasmine.createSpy('readNoti spy')
      .and.returnValue(deferredLogin.promise),
      getListingDate: jasmine.createSpy('getListD spy')
      .and.returnValue(deferredLogin.promise) ,
      getListingTitle: jasmine.createSpy('getListT spy')
      .and.returnValue(deferredLogin.promise)       
    };

    stateMock = jasmine.createSpyObj('$state spy', ['go']);

    controller = $controller('ChatCtrl', {
      $scope: scope, 
      '$state': stateMock, 
      'DB': DBMock }
      );
  }))

  it('should have a defined $scope.device', function () {
    expect(scope.device).toBeDefined();
  });

  it('should have a defined $scope.notifications', function () {
    expect(scope.notifications).toBeDefined();
  });

  it("should call readNotifications on DB", function () {
    expect(DBMock.readNotifications).toHaveBeenCalled();
  });  


  describe('#getStateChange', function() {
    var valuereturn;
    beforeEach(inject(function(_$rootScope_) {  
      $rootScope = _$rootScope_;
    }));

    it('if type is bid or type is post (1)', function(){
      controller.type = 'bid';
      controller.listing = '...';
      valuereturn = scope.getStateChange(controller.type,controller.listing);
      expect(valuereturn).toEqual('app.tabs.bid2({listingId:' + controller.listing + '})');
    });  

    it('if type is bid or type is post (2)', function(){
      controller.type = 'post';
      controller.listing = 'aaa';
      valuereturn = scope.getStateChange(controller.type,controller.listing);
      expect(valuereturn).toEqual('app.tabs.bid2({listingId:' + controller.listing + '})');
    });    

    it('if type is message', function(){
      controller.type = 'message';
      controller.listing = 'bbb';
      valuereturn = scope.getStateChange(controller.type,controller.listing);
      expect(valuereturn).toEqual('app.tabs.message({userId:notif.user})');
    });    

    it('if type is not bid or post or type', function(){
      controller.type = 'abc';
      controller.listing = 'ccc';
      valuereturn = scope.getStateChange(controller.type,controller.listing);
      expect(valuereturn).toEqual('app.tabs.chat');
    }); ;  
  })


describe('#getListingDate', function() {
  beforeEach(inject(function(_$rootScope_) {  
    $rootScope = _$rootScope_;
    controller.listing = 'ccc';
    scope.getListingDate(controller.listing);
  }));

  it('should call DB.getListingDate', function(){
    expect(DBMock.getListingDate).toHaveBeenCalledWith(controller.listing);
  });

})


describe('#getListingTitle', function() {
  beforeEach(inject(function(_$rootScope_) {  
    $rootScope = _$rootScope_;
    controller.listing = 'ccc';
    scope.getListingTitle(controller.listing);
  }));

  it('should call DB.getListingTitle', function(){
    expect(DBMock.getListingTitle).toHaveBeenCalledWith(controller.listing);
  });

})


describe('#getListingTime', function() {
  var valuereturn;
  beforeEach(inject(function(_$rootScope_) {  
    $rootScope = _$rootScope_;
    controller.time = Date();
    valuereturn = scope.getListingTime(controller.time);
  }));

  it('should get Now as a result', function(){
    expect(valuereturn).toEqual('Now');
  });

})


describe('#localDate', function() {
  var valuereturn;
  var datevalue;
  beforeEach(inject(function(_$rootScope_) {  
    $rootScope = _$rootScope_;
  }));

  it('should get n/a if date is undefined', function(){
    controller.date = undefined;
    valuereturn = scope.localDate(controller.date);
    expect(valuereturn).toEqual('n/a');
  });

  it('should get n/a if date is undefined', function(){
    controller.date = 12;
    valuereturn = scope.localDate(controller.date);
    datevalue = (new Date(controller.date)).toLocaleDateString();
    expect(valuereturn).toEqual(datevalue);
  });

})


});