'use strict';

describe('Controller: TeamsCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('basekampApp'));

  var TeamsCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeamsCreateCtrl = $controller('TeamsCreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TeamsCreateCtrl.awesomeThings.length).toBe(3);
  });
});
