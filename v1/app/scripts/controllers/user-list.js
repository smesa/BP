'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('UserListCtrl', function ($scope,$rootScope, usersServices) {

   $scope.rowCollection = [];

    // Consulto usuarios
    usersServices.userList().then(function(data){
       $scope.rowCollection = data;
    });

    $scope.createUser = function (){
      location.href = '#/user-create';
    };

    $scope.editUser = function (userid){
      location.href = '#/user-edit/'+userid;
    };

    $scope.deleteUser = function(index,username){

      bootbox.confirm("Esta seguro de eliminar el usuario?", function(result) {

         if(result == true){

           usersServices.userDelete(username).then(function(data){
             // Extraigo el mensaje
             $scope.rowCollection.splice(index, 1);
             bootbox.alert('Usuario eliminado' , function() {});

           });
         }
      });

    }

  });
