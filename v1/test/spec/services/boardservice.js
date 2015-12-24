'use strict';

describe('Service: boardService', function () {

  // load the service's module
  beforeEach(module('basekampApp'));

  // instantiate service
  var boardService;
  beforeEach(inject(function (_boardService_) {
    boardService = _boardService_;
  }));

  it('should do something', function () {
    expect(!!boardService).toBe(true);
  });

});
