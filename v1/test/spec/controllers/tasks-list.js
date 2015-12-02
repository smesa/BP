'use strict';

describe('Controller: TasksListCtrl', function () {

  // load the controller's module
  beforeEach(module('basekampApp'));

  var TasksListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TasksListCtrl = $controller('TasksListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
