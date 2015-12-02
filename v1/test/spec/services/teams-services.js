'use strict';

describe('Service: teamsServices', function () {

  // load the service's module
  beforeEach(module('basekampApp'));

  // instantiate service
  var teamsServices;
  beforeEach(inject(function (_teamsServices_) {
    teamsServices = _teamsServices_;
  }));

  it('should do something', function () {
    expect(!!teamsServices).toBe(true);
  });

});
