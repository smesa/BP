'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectEditCtrl
 * @description
 * # ProjectEditCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectEditCtrl',['$scope','$rootScope','$filter','$routeParams','localStorageService','projsServices','usersServices','parseUtils',
    function ($scope,$rootScope,$filter,$routeParams,$storage,$projects,$users,$utils) {

    var prj_id = $routeParams.prj_id;

    $scope.types       = $storage.get('types');
    $scope.status      = $storage.get('status');
    $scope.components  = $storage.get('components');
    $scope.currency    = $storage.get('currency');
    $scope.overlay = true;


    $scope.data = [];
    $scope.avatar = "";

    // Consulto usuarios
    $projects.get(prj_id).then(function(data){
        $scope.overlay = !$scope.overlay;
        $scope.data.attributes = data;
        $('#avatar').attr('src', $scope.data.attributes.avatar.url);
    });


    // Funcion para guardar
    $scope.save = function(){

      if(!$scope.avatar){
        $utils.fileUrl($scope.data.attributes.avatar.url).then(function(file){
          $scope.avatar = file;
          bootbox.confirm("¿Esta seguro de guardar estos cambios?", function(result) {
            if(result == true){
              $scope.overlay = !$scope.overlay;
              $projects.update($scope.data,$scope.avatar).then(function(data){
                $scope.overlay = !$scope.overlay;
                location.href = '#/project-list/';
              });
            }
          });
        });
      }else{
        bootbox.confirm("¿Esta seguro de guardar estos cambios?", function(result) {
          if(result == true){
            $scope.overlay = !$scope.overlay;
            $projects.update($scope.data,$scope.avatar).then(function(data){
              $scope.overlay = !$scope.overlay;
              location.href = '#/project-list/';
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


    $('.dateinput').datepicker({
      language: 'ES',
      todayHighlight: true,
      enableOnReadonly: true,
      format: "dd/mm/yyyy",
      keyboardNavigation: false
    });


  }]);
