'use strict';

describe('Service: utilsServices', function () {

  // load the service's module
  beforeEach(module('basekampApp'));

  // instantiate service
  var utilsServices;
  beforeEach(inject(function (_utilsServices_) {
    utilsServices = _utilsServices_;
  }));

  it('should do something', function () {
    expect(!!utilsServices).toBe(true);
  });

});
