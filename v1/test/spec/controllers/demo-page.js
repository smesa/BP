'use strict';

describe('Controller: DemoPageCtrl', function () {

  // load the controller's module
  beforeEach(module('basekampApp'));

  var DemoPageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DemoPageCtrl = $controller('DemoPageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DemoPageCtrl.awesomeThings.length).toBe(3);
  });
});
