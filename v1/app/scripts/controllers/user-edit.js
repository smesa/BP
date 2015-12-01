'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:UserEditCtrl
 * @description
 * # UserEditCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('UserEditCtrl',['$scope','$rootScope','$routeParams','localStorageService','usersServices',
    function ($scope,$rootScope,$routeParams,$storage,$users) {

    var user_id = $routeParams.user_id;

    $scope.countries  = $storage.get('countries');
    $scope.cities     = $storage.get('cities');

    $scope.data = [];
    $scope.useredu = [];
    $scope.curso = [];

    // Consulto usuarios
    $users.get(user_id).then(function(data){
          $scope.userinfo = data.userinfo;
          $scope.useredu  = data.useredu;
          $('#avatar').attr('src', $scope.userinfo.attributes.avatar._url);
    });

    // Funcion para guardar
    $scope.save = function(){


      bootbox.confirm("Esta seguro de guardar estos cambios?", function(result) {
         if(result == true){
            $users.update($scope.userinfo,$scope.useredu).then(function(data){
              bootbox.alert('Datos de usuario guardados' , function() {});
              location.href = '#/user-list/';
            });
         }
      });

    }

    $scope.addEducation = function(){
      $('#educationModal').modal('show');
    }

    $scope.addCurse = function(){
      var values = {};
      values.attributes =  $scope.curso;
      $scope.curso = [];
      $scope.useredu.push(values);
      $('#educationModal').modal('hide');
    }

    $scope.removeCurse = function(index){

      bootbox.confirm("Esta seguro de eliminar el curso?", function(result) {
         if(result == true){
            $scope.useredu.splice(index,1);
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
        $scope.userinfo.attributes.avatar = loadEvent.target.result;
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
