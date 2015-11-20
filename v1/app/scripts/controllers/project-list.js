'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectListCtrl
 * @description
 * # ProjectListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectListCtrl', function ($scope,$rootScope, projsServices) {

    $scope.rowCollection = [];

     // Consulto usuarios
     projsServices.projList().then(function(data){
        $scope.rowCollection = data;
     });

     $scope.createProj = function (){
       location.href = '#/project-create';
     };

     $scope.editProj = function (prjid){
       location.href = '#/project-edit/'+prjid;
     };

     $scope.deleteProj = function(prjid, index){

       bootbox.confirm("Esta seguro de eliminar el proyecto?", function(result) {

          if(result == true){

            projsServices.projDelete(prjid).then(function(){

              bootbox.alert('Proyecto eliminado' , function() {});
              $scope.rowCollection.splice(index, 1);

            });
          }
       });

     }
  });
