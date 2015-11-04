'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:UserEditCtrl
 * @description
 * # UserEditCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('UserEditCtrl', function ($scope,$rootScope,localStorageService,usersServices,$routeParams) {

    var user_id = $routeParams.user_id;

    $scope.countries  = localStorageService.get('countries');
    $scope.cities     = localStorageService.get('cities');

    $scope.data = [];
    $scope.education = [];
    $scope.curso = [];

    // Consulto usuarios
    usersServices.userData(user_id).then(function(data){

      switch (data[0].type) {
        case 'E':
          // Extraigo el mensaje
          $rootScope.message = data.message;
          // Muestro el modal resultante
          bootbox.alert(data[0].message , function() {});

          location.href = '#/user-list/';
          break;

        default:
          $scope.data = data[0];
          $('#avatar').attr('src', data[0].avatar);
          break;
      }

    });

    // Consulto usuarios
    usersServices.userEducation(user_id).then(function(data){
          if(data.length > 0){
            $scope.education = data;            
          }
    });

    // Funcion para guardar
    $scope.save = function(){


      bootbox.confirm("Esta seguro de guardar estos cambios?", function(result) {
         if(result == true){

            $scope.data.education = $scope.education
            usersServices.userUpdate($scope.data).then(function(data){
              // Extraigo el mensaje
              $rootScope.message = data.message;
              bootbox.alert($rootScope.message , function() {});

              // Muestro el modal resultante
              switch (data.type) {
                case 'S':
                  location.href = '#/user-list/';
                  break;
              }
            });
         }
      });

    }

    $scope.addEducation = function(){
      $('#educationModal').modal('show');
    }

    $scope.addCurse = function(){
      var values = $scope.curso;
      $scope.curso = [];
      $scope.education.push(values);
      $('#educationModal').modal('hide');
    }

    $scope.removeCurse = function(index){

      bootbox.confirm("Esta seguro de eliminar el curso?", function(result) {
         if(result == true){
            $scope.education.splice(index,1);
            $scope.$apply();
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
