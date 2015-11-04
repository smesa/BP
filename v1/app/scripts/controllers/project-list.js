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

     $scope.deleteProj = function(index){

       bootbox.confirm("Esta seguro de eliminar el proyecto?", function(result) {

          if(result == true){

            var data = { 'option': 'proj_delete', 'method' : 'DELETE', 'prjid' : $scope.rowCollection[index].prjid }

            projsServices.projDelete(data).then(function(data){
              // Extraigo el mensaje
              $rootScope.message = data.message;

              bootbox.alert($rootScope.message , function() {});

              // Muestro el modal resultante
              switch (data.type) {
                case 'S':
                  $scope.rowCollection.splice(index, 1);
                  break;
              }

            });
          }
       });

     }
  });
