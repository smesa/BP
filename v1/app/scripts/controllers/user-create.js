'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:UserCreateCtrl
 * @description
 * # UserCreateCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('UserCreateCtrl', function ($scope,$rootScope,localStorageService,usersServices) {

      $scope.data = { 'option': 'user_create', 'id' : '', 'doc' : '', 'name' : '', 'lastname' : '', 'birth' : '', 'contract' : '', 'country' : '', 'city' : '', 'phoneibm' : '',
        'phoneperson' : '', 'mailibm' : '', 'mailperson' : '', 'skype' : '', 'extibm' : '', 'company' : '', 'area' : '', 'typemachine' : '', 'serialmachine' : '',
        'atyt' : '', 'conference' : '', 'card' : '', 'claim' : '', 'amex' : '', 'locker' : '', 'hourplan' : '', 'conductcourse' : '', 'hv' : '', 'hvdate' : '',
        'avatar' : '', 'pass' : '' }


      $scope.countries  = localStorageService.get('countries');
      $scope.cities     = localStorageService.get('cities');

      $scope.education = [];
      $scope.curso = [];


      // Funcion para guardar
      $scope.save = function(){

        $scope.data.education = $scope.education;
        usersServices.userCreate($scope.data).then(function(data){
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
