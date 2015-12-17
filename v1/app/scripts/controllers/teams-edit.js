'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:TeamsEditCtrl
 * @description
 * # TeamsEditCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('TeamsEditCtrl', ['$scope','$rootScope','$filter','$routeParams','localStorageService','teamsServices','usersServices','parseUtils',
    function ($scope,$rootScope,$filter,$routeParams,$storage,$teams,$users,$utils) {

      var team_id = $routeParams.team_id;

      $scope.proj_id = ''
      $scope.data    = [];
      $scope.avatar  = '';
      $scope.overlay = true;

      // Consulto usuarios
      $teams.get(team_id).then(function(data){
          $scope.overlay = !$scope.overlay;
          $scope.data.attributes = data;
          $scope.proj_id = data.prjid;
          $('#avatar').attr('src', $scope.data.attributes.avatar.url);
      });

      $scope.goToTeamsList = function(){
        location.href = '#/teams-list/' + $scope.proj_id;
      }

      // Funcion para guardar
      $scope.save = function(){

        if(!$scope.avatar){
          $utils.fileUrl($scope.data.attributes.avatar.url).then(function(file){
            $scope.avatar = file;
            bootbox.confirm("¿Esta seguro de guardar estos cambios?", function(result) {
              if(result == true){
                $scope.overlay = !$scope.overlay;
                $teams.update($scope.data,$scope.avatar).then(function(data){
                  $scope.overlay = !$scope.overlay;
                  location.href = '#/teams-list/' + $scope.proj_id;
                });
              }
            });
          });
        }else{
          bootbox.confirm("¿Esta seguro de guardar estos cambios?", function(result) {
            if(result == true){
              $scope.overlay = !$scope.overlay;
              $teams.update($scope.data,$scope.avatar).then(function(data){
                $scope.overlay = !$scope.overlay;
                location.href = '#/teams-list/' + $scope.proj_id;
              });
            }
          });
        }
      }

      $scope.getAvatar = function(evt){

        // Creo reader del input file
        var reader = new FileReader();

        // Registro el evento onload
        reader.onload = function (loadEvent) {
          $utils.createImage(loadEvent.target.result).then(function(file){
            $scope.avatar = file;
            $scope.data.attributes.avatar = file;
          });
          // Actualizo el logo
          $('#avatar').attr('src', loadEvent.target.result);
        };

        // Envio el dato capturado para iniciar la carga
        reader.readAsDataURL( evt.files[0] );
      }

  }]);
