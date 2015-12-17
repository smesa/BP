'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('UserListCtrl',['$scope','$rootScope','usersServices', function ($scope,$rootScope, $users) {

   $scope.rowCollection = [];
   $scope.viewList = true;
   $scope.overlay = true;

    // Consulto usuarios
    $users.list().then(function(data){
       $scope.overlay = false;
       $scope.rowCollection = data;
    });

    $scope.create = function (){
      location.href = '#/user-create';
    };

    $scope.edit = function (userid){
      location.href = '#/user-edit/'+userid;
    };

    $scope.delete = function(index,username){

      bootbox.confirm("¿Esta seguro de eliminar el usuario?", function(result) {

         if(result == true){
             $scope.overlay = true;
             $users.destroy(username).then(function(data){
               $scope.overlay = false;
               // Extraigo el mensaje
               $scope.rowCollection.splice(index, 1);

           });
         }
      });

    }

  }]);
