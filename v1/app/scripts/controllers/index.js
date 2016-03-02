'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('IndexCtrl',['$scope','$rootScope','parseUtils','usersServices','projsServices',
    function ($scope,$rootScope,parseUtils,$users,$proj) {

    $scope.isError = false;

    // Valido usuario logueado
    parseUtils.activeUser().then(function(user) {
      if(user){
        $scope.isLogon = false
        //$scope.data = user.attributes;

        $users.get(user.username).then(function(user){

          $scope.data = user.userinfo;

          // Consulto nro de proyectos
          /*$proj.countByUser($scope.data.username).then(function(data){

          },function(error){

          });*/
          // Consulto los mensajes que tiene

          // Consulto las notificaciones que tiene

          // Consulto tareas nuevas

        })

      }else{
        $scope.isLogon = true;
      }
    },function(error){
      $scope.isLogon = true;
    });

    $scope.login = function(){

      // Autentico usuario para ingresar
      parseUtils.login($scope.username,$scope.userpass).then(function(user) {
        $scope.isLogon = false
        $scope.data = user.attributes;
      },function(error){
        $scope.isError = true;
      });

      /*Parse.User.logIn($scope.username, $scope.userpass, {
        success: function(user) {

          parseUtils.activeUser().then(function(user) {
            if(user){
              $scope.isLogon = false
              $scope.data = user.attributes;
            }else{
              $scope.isLogon = true;
            }
          });
          $scope.$apply();
        },
        error: function(user, error) {
          $scope.isError = true;
          $scope.$apply();
        }

      })*/
    }

    $scope.logoff = function(){
      // Valido usuario logueado
      parseUtils.logoff().then(function() {
        $scope.isLogon = true;
        location.href = '#/';
      },function(){
        location.href = '#/';
        $scope.isLogon = false;
      });

    }



  }]);
