'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectCreateCtrl
 * @description
 * # ProjectCreateCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectCreateCtrl', function ($scope, $rootScope, localStorageService, projsServices) {


    $scope.data = { 'option': 'proj_create', 'id' : '', 'name' : '', 'desc' : '', 'status' : '', 'type' : '', 'compo' : '', 'init' : '', 'end' : '', 'locale' : '','current' : '', 'avatar': ''}

    $scope.types   = localStorageService.get('types');
    $scope.status  = localStorageService.get('status');
    $scope.components  = localStorageService.get('components');
    $scope.currency  = localStorageService.get('currency');


    $scope.save = function(){

      projsServices.projCreate($scope.data).then(function(data){
        // Extraigo el mensaje
        $rootScope.message = data.message;
        bootbox.alert($rootScope.message , function() {});

        // Muestro el modal resultante
        switch (data.type) {
          case 'S':
            location.href = '#/project-list/';
            break;
        }
      });
    }

    $scope.getAvatar = function(evt){

      // Creo reader del input file
      var reader = new FileReader();

      // Registro el evento onload
      reader.onload = function (loadEvent) {
        // Muevo el valor de la imagen en base 64
        $scope.data.avatar = loadEvent.target.result;
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

  });
