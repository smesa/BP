'use strict';

/**
 * @ngdoc directive
 * @name basekampApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('basekampApp')
  .directive('mainMenu', function () {
    return {
      templateUrl: 'views/directives/mainmenu.html',
   		restrict: 'E'
    };
  });
