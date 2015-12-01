'use strict';

describe('Service: imagesServices', function () {

  // load the service's module
  beforeEach(module('basekampApp'));

  // instantiate service
  var imagesServices;
  beforeEach(inject(function (_imagesServices_) {
    imagesServices = _imagesServices_;
  }));

  it('should do something', function () {
    expect(!!imagesServices).toBe(true);
  });

});
