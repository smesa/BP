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

        $users.get(user.attributes.username).then(function(user){
          $scope.data = user.userinfo.attributes;

          // Consulto nro de proyectos
          $proj.countByUser($scope.data.username).then(function(data){

          },function(error){

          });
          // Consulto los mensajes que tiene

          // Consulto las notificaciones que tiene

          // Consulto tareas nuevas

        })

      }else{
        $scope.isLogon = true;
      }
    });

    $scope.login = function(){

      Parse.User.logIn($scope.username, $scope.userpass, {
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

      })
    }

    $scope.logoff = function(){
      Parse.User.logOut();
      $scope.isLogon = true;
      location.href = '#/';
    }



  }]);
