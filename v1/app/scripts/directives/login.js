'use strict';

/**
 * @ngdoc directive
 * @name basekampApp.directive:login
 * @description
 * # login
 */
angular.module('basekampApp')
  .directive('login', function () {
    return {
      templateUrl: 'views/directives/login.html',
   		restrict: 'E'
    };
  });
