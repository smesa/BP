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
    $scope.overlay = true;
    $scope.viewList = true;

     // Consulto usuarios
     $projects.list().then(function(data){
        $scope.overlay = !$scope.overlay;

        $scope.rowCollection = JSON.parse(JSON.stringify(data))

        angular.forEach($scope.rowCollection,function(item){
          switch (item.status) {
            case 'On Going':
              item.style = 'label-success';
              break;
            case 'Propuesta':
              item.style = 'label-warning';
              break;
            default:
              item.style = 'label-default';
              break;
          }
        })
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

       bootbox.confirm("¿Esta seguro de eliminar el proyecto?, esto eliminara los equipos y los miembros de equipo", function(result) {

          if(result == true){

            $scope.overlay = !$scope.overlay;
            $projects.destroy(prjid).then(function(){
              $scope.overlay = !$scope.overlay;
              $scope.rowCollection.splice(index, 1);
            });
          }
       });

     }
  }]);
