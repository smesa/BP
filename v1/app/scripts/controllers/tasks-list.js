'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:TasksListCtrl
 * @description
 * # TasksListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('TasksListCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
