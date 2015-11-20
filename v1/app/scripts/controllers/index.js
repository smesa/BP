'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('IndexCtrl', function ($scope,$rootScope,parseUtils) {

    // Valido usuario logueado
    parseUtils.activeUser().then(function(user) {
      if(user){
        $scope.isLogon = false
        $scope.data = user.attributes;        
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
            bootbox.alert('El usuario o la contraseña son invalidos' , function() {});
        }

      })
    }

    $scope.logoff = function(){
      Parse.User.logOut();
      $scope.isLogon = true;
      location.href = '#/';
    }



  });
