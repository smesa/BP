'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectEditCtrl
 * @description
 * # ProjectEditCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectEditCtrl', function ($scope,$rootScope,localStorageService,projsServices,$routeParams) {

    var prj_id = $routeParams.prj_id;

    $scope.types   = localStorageService.get('types');
    $scope.status  = localStorageService.get('status');
    $scope.components  = localStorageService.get('components');
    $scope.currency  = localStorageService.get('currency');


    $scope.data = [];

    // Consulto usuarios
    projsServices.projData(prj_id).then(function(data){

      switch (data[0].type) {
        case 'E':
          // Extraigo el mensaje
          $rootScope.message = data.message;
          // Muestro el modal resultante
          bootbox.alert(data[0].message , function() {});

          location.href = '#/project-list/';
          break;

        default:
          $scope.data = data[0];
          $('#avatar').attr('src', data[0].avatar);
          break;
      }

    });

    // Funcion para guardar
    $scope.save = function(){


      bootbox.confirm("Esta seguro de guardar estos cambios?", function(result) {
         if(result == true){

            projsServices.projUpdate($scope.data).then(function(data){
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
