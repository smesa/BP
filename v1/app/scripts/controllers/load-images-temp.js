'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:LoadImagesTempCtrl
 * @description
 * # LoadImagesTempCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('LoadImagesTempCtrl', function ($scope, imagesServices) {


    $scope.rowCollection = [];
    $scope.view = false;
    $scope.image = '';

    // Obtengo listado de imagenes
    imagesServices.list().then(function(data){
       $scope.rowCollection = data;
    });

    $scope.show = function(){
      $scope.view = !$scope.view;
    }

    $scope.save = function(){

    }

    $scope.loadImage = function(evt){

      // Creo reader del input file
      var reader = new FileReader();

      // Registro el evento onload
      reader.onload = function (loadEvent) {
        // Muevo el valor de la imagen en base 64
        $scope.image = loadEvent.target.result;
        // Actualizo el logo
        $('#image').attr('src', loadEvent.target.result);
      };

      // Envio el dato capturado para iniciar la carga
      reader.readAsDataURL( evt.files[0] );
    }


  });
