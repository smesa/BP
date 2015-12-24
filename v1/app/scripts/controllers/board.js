'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('BoardCtrl', function ($scope, boardService) {

    $scope.columns = [];
    $scope.isLoading = false;

    function init() {
      $scope.refreshBoard();
    };

    $scope.addTask = function(id){
      
    }

    $scope.refreshBoard = function refreshBoard() {
      $scope.isLoading = true;
      boardService.getColumnsByUser('036642')
         .then(function (data) {
             $scope.isLoading = false;
             $scope.columns = data;
         }, onError);
    };

    $scope.onDrop = function (data, targetColId) {
      boardService.canMoveTask(data.ColumnId, targetColId).then(
        function (canMove) {
          if (canMove) {
              boardService.moveTask(data.Id, targetColId).then(function (taskMoved) {
                  $scope.isLoading = false;
                  boardService.sendRequest();
              }, onError);
              $scope.isLoading = true;
          }
      }, onError);
    };

    // Listen to the 'refreshBoard' event and refresh the board as a result
    $scope.$parent.$on("refreshBoard", function (e) {
        $scope.refreshBoard();
        toastr.success("Board updated successfully", "Success");
    });

    var onError = function (errorMessage) {
        $scope.isLoading = false;
        toastr.error(errorMessage, "Error");
    };

    init();
  });
