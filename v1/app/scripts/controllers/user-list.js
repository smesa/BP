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

    $scope.deleteUser = function(index){

      bootbox.confirm("Esta seguro de eliminar el usuario?", function(result) {

         if(result == true){

           var data = { 'option': 'user_delete', 'method' : 'DELETE', 'userid' : $scope.rowCollection[index].userid }

           usersServices.userDelete(data).then(function(data){
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
