'use strict';

describe('Controller: ProjectCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('basekampApp'));

  var ProjectCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectCreateCtrl = $controller('ProjectCreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProjectCreateCtrl.awesomeThings.length).toBe(3);
  });
});
