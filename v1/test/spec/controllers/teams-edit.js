'use strict';

describe('Controller: TeamsEditCtrl', function () {

  // load the controller's module
  beforeEach(module('basekampApp'));

  var TeamsEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeamsEditCtrl = $controller('TeamsEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TeamsEditCtrl.awesomeThings.length).toBe(3);
  });
});
