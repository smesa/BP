'use strict';

describe('Service: membersServices', function () {

  // load the service's module
  beforeEach(module('basekampApp'));

  // instantiate service
  var membersServices;
  beforeEach(inject(function (_membersServices_) {
    membersServices = _membersServices_;
  }));

  it('should do something', function () {
    expect(!!membersServices).toBe(true);
  });

});
