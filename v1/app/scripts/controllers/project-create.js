'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectCreateCtrl
 * @description
 * # ProjectCreateCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectCreateCtrl',['$scope', '$rootScope', 'localStorageService', 'projsServices', 'ngDialog', 'parseUtils',
    function ($scope, $rootScope, $storage, $projects, ngDialog, parseUtils) {


    $scope.data = {  'prjid' : '', 'name' : '', 'desc':'', 'compo':'', 'init':'', 'end': '', 'locale':'', 'current':'','type':''}
    $scope.overlay = false;
    
    $scope.save = function(){

      $scope.overlay = !$scope.overlay;

      parseUtils.fileUrl('images/icon-project.png').then(function(file) {
        $scope.data.avatar = file;
        $projects.create($scope.data).then(function(data){
          ngDialog.close();
          $scope.overlay = !$scope.overlay;
          location.href = '#/project-edit/'+$scope.data.prjid;
        });
      });
    }

  }]);
