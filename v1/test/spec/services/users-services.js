'use strict';

describe('Service: usersServices', function () {

  // load the service's module
  beforeEach(module('basekampApp'));

  // instantiate service
  var usersServices;
  beforeEach(inject(function (_usersServices_) {
    usersServices = _usersServices_;
  }));

  it('should do something', function () {
    expect(!!usersServices).toBe(true);
  });

});
