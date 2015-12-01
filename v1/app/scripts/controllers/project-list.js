'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectListCtrl
 * @description
 * # ProjectListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectListCtrl',['$scope','$rootScope', 'projsServices', function ($scope,$rootScope,$projects) {

    $scope.rowCollection = [];

     // Consulto usuarios
     $projects.list().then(function(data){
        $scope.rowCollection = data;
     });

     $scope.create = function (){
       location.href = '#/project-create';
     };

     $scope.edit = function (prjid){
       location.href = '#/project-edit/'+prjid;
     };

     $scope.delete = function(prjid, index){

       bootbox.confirm("¿Esta seguro de eliminar el proyecto?", function(result) {

          if(result == true){

            $projects.destroy(prjid).then(function(){

              bootbox.alert('Proyecto eliminado' , function() {});
              $scope.rowCollection.splice(index, 1);

            });
          }
       });

     }
  }]);
