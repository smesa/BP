'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectListCtrl
 * @description
 * # ProjectListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectListCtrl',['$scope','$rootScope', 'projsServices','ngDialog', function ($scope,$rootScope,$projects,ngDialog) {

    $scope.rowCollection = [];
    $scope.overlay = false;

     // Consulto usuarios
     $projects.list().then(function(data){
        $scope.rowCollection = data;
     });

     $scope.create = function(){
       ngDialog.open({
         template: 'views/dialogs/create-project.html',
         className: 'ngdialog-theme-plain',
         controller: 'ProjectCreateCtrl'
       });
     }


     $scope.edit = function (prjid){
       location.href = '#/project-edit/'+prjid;
     };

     $scope.delete = function(prjid, index){

       bootbox.confirm("¿Esta seguro de eliminar el proyecto?", function(result) {

          if(result == true){

            $scope.overlay = !$scope.overlay;
            $projects.destroy(prjid).then(function(){
              $scope.overlay = !$scope.overlay;
              AlertJS.Notify.Success("Atención", "Proyecto eliminado");
              $scope.rowCollection.splice(index, 1);
            },function(error){
              AlertJS.Notify.error("Atención", "Error eliminando el proyecto");
            });
          }
       });

     }
  }]);
