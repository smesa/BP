'use strict';

describe('Controller: LoadImagesTempCtrl', function () {

  // load the controller's module
  beforeEach(module('basekampApp'));

  var LoadImagesTempCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoadImagesTempCtrl = $controller('LoadImagesTempCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoadImagesTempCtrl.awesomeThings.length).toBe(3);
  });
});
