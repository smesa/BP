'use strict';

describe('Service: teamServices', function () {

  // load the service's module
  beforeEach(module('basekampApp'));

  // instantiate service
  var teamServices;
  beforeEach(inject(function (_teamServices_) {
    teamServices = _teamServices_;
  }));

  it('should do something', function () {
    expect(!!teamServices).toBe(true);
  });

});
