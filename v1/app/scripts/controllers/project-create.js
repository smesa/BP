'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectCreateCtrl
 * @description
 * # ProjectCreateCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectCreateCtrl',['$scope', '$rootScope', 'localStorageService', 'projsServices', 'ngDialog',
    function ($scope, $rootScope, $storage, $projects, ngDialog) {


    $scope.data = {  'prjid' : '', 'name' : ''}
    $scope.overlay = false;

    $scope.save = function(){

      $scope.overlay = !$scope.overlay;

      $projects.create($scope.data).then(function(data){
        ngDialog.close();
        $scope.overlay = !$scope.overlay;
        AlertJS.Notify.Success("Atención","Proyecto creado exitosamente");
        location.href = '#/project-list/';
      },function(reason) {
        AlertJS.Notify.error("Atención", "Error creando el proyecto");
      });
    }

  }]);
