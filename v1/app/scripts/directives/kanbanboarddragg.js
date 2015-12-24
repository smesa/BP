'use strict';

/**
 * @ngdoc directive
 * @name basekampApp.directive:kanbanBoardDragg
 * @description
 * # kanbanBoardDragg
 */
angular.module('basekampApp')
  .directive('kanbanBoardDragg', function () {
    return {
        link: function ($scope, element, attrs) {
          var dragData = "";
          $scope.$watch(attrs.kanbanBoardDragg, function (newValue) {
              dragData = newValue;
          });

          element.bind('dragstart', function (event) {
              event.originalEvent.dataTransfer.setData("Text", JSON.stringify(dragData));
          });
        }
    };
  });
