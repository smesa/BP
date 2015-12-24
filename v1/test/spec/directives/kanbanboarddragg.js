'use strict';

describe('Directive: kanbanBoardDragg', function () {

  // load the directive's module
  beforeEach(module('basekampApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kanban-board-dragg></kanban-board-dragg>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kanbanBoardDragg directive');
  }));
});
