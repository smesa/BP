'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:UserCreateCtrl
 * @description
 * # UserCreateCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('UserCreateCtrl',['$scope','$rootScope','localStorageService','usersServices','parseUtils',
    function ($scope,$rootScope,$storage,$users,$utils) {

      $scope.data = { 'username' : '', 'email' : '', 'name' : '', 'lastname' : '', 'birth' : '', 'contract' : '', 'country' : '', 'city' : '', 'phoneibm' : '',
        'phoneperson' : '', 'mailperson' : '', 'skype' : '', 'extibm' : '', 'company' : '', 'area' : '', 'typemachine' : '', 'serialmachine' : '',
        'atyt' : '', 'conference' : '', 'card' : '', 'claim' : '', 'amex' : '', 'locker' : '', 'hourplan' : '', 'conductcourse' : '', 'hv' : '', 'hvdate' : '',
        'avatar' : 'images/user_default.png', "active": "true" }


      $scope.countries  = $storage.get('countries');
      $scope.cities     = $storage.get('cities');

      $scope.education = [];
      $scope.email = "";
      $scope.curso = [];


      // Funcion para guardar
      $scope.save = function(){

        $scope.data.email = $scope.email
        $users.create($scope.data, $scope.data.email, $scope.education).then(function(data){
          location.href = '#/user-list/';
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

        bootbox.confirm("¿Esta seguro de eliminar el curso?", function(result) {
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

          $utils.createImage(loadEvent.target.result).then(function(file){
            $scope.data.avatar = file;
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
