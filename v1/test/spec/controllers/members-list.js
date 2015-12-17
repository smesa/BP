'use strict';

describe('Controller: MembersListCtrl', function () {

  // load the controller's module
  beforeEach(module('basekampApp'));

  var MembersListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MembersListCtrl = $controller('MembersListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MembersListCtrl.awesomeThings.length).toBe(3);
  });
});
