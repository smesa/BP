'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectEditCtrl
 * @description
 * # ProjectEditCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectEditCtrl', function ($scope,$rootScope,$filter,localStorageService,projsServices,usersServices,$routeParams) {

    var prj_id = $routeParams.prj_id;

    $scope.types   = localStorageService.get('types');
    $scope.status  = localStorageService.get('status');
    $scope.components  = localStorageService.get('components');
    $scope.currency  = localStorageService.get('currency');


    $scope.data = [];
    $scope.teams = [];
    $scope.team = {};
    $scope.members = [];
    $scope.teamMembers = [];

    // Consulto usuarios
    projsServices.projData(prj_id).then(function(data){
        $scope.data = data.projects;
        $('#avatar').attr('src', data.projects.attributes.avatar.url);
    });

    $scope.viewteam = true;

    // Funcion para guardar
    $scope.save = function(){


      bootbox.confirm("Esta seguro de guardar estos cambios?", function(result) {
         if(result == true){

            projsServices.projUpdate($scope.data).then(function(data){
              bootbox.alert('Datos de proyecto actualizados' , function() {});
              location.href = '#/project-list/';
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
        $scope.data.attributes.avatar = loadEvent.target.result;
        // Actualizo el logo
        $('#avatar').attr('src', loadEvent.target.result);
      };

      // Envio el dato capturado para iniciar la carga
      reader.readAsDataURL( evt.files[0] );
    }


    $scope.getAvatarTeam = function(evt){

      // Creo reader del input file
      var reader = new FileReader();

      // Registro el evento onload
      reader.onload = function (loadEvent) {
        // Muevo el valor de la imagen en base 64
        $scope.team.avatar = loadEvent.target.result;
        // Actualizo el logo
        $('#avatarTeam').attr('src', loadEvent.target.result);
        //$('#avatarTeamDetail').attr('src', loadEvent.target.result);
        $scope.$apply();
      };

      // Envio el dato capturado para iniciar la carga
      reader.readAsDataURL( evt.files[0] );
    }

    $scope.addTeam = function(){
      $('#teamModal').modal('show');
      $('#avatarTeam').attr('src', 'images/team-default-2.gif');
    }
    $scope.appendTeam = function(){
      $scope.team.id = $scope.generateUUID();
      $scope.team.nromembers = 0;
      $scope.team.tasks = 0;
      if(!$scope.team.avatar){
        $scope.team.avatar = "images/team-default-2.gif"
      }
      $scope.teams.push($scope.team);
      $scope.team = {};
      $('#avatarTeam').attr('src', '');
      $('#teamModal').modal('hide');
    }

    $scope.detailTeam = function(team){
      $scope.viewteam    = !$scope.viewteam;
      $scope.teamMembers = [];
      $scope.team        = $filter('filter')($scope.teams, {id: team}, true)[0];
    }

    $scope.detailTeamOff = function(){
      $scope.viewteam = !$scope.viewteam;
    }

    $scope.selectMemberTeam = function(){

      // Consulto usuarios
      usersServices.userList().then(function(data){
         $scope.members = data;
      });

      $('#selectMemberModal').modal('show');

    }

    $scope.addMemberTeam = function(){

      var membersAdd  = $filter('filter')($scope.members, {mark: true}, true);
      if(!$scope.team.members){
        $scope.team.members = [];
      }
      angular.forEach(membersAdd,function(item){
        $scope.team.members.push(item);
      })

      //bootbox.alert('Miembros agregados' , function() {});

      bootbox.dialog({
        message: "I am a custom dialog",
        title: "Custom title",
        buttons: {
          success: {
            label: "Success!",
            className: "btn-success",
            callback: function() {
              Example.show("great success");
            }
          },
          danger: {
            label: "Danger!",
            className: "btn-danger",
            callback: function() {
              Example.show("uh oh, look out!");
            }
          },
          main: {
            label: "Click ME!",
            className: "btn-primary",
            callback: function() {
              Example.show("Primary button");
            }
          }
        }
      });

      $('#selectMemberModal').modal('hide');
    }

    $scope.deleteMemberTeam = function(index){

      bootbox.confirm("Esta seguro de eliminar el miembro?", function(result) {
         if(result == true){
             // Extraigo el mensaje
             $scope.team.members.splice(index, 1);
             bootbox.alert('miembro eliminado' , function() {});
             $scope.$apply();

         }
      });
    }

    $scope.generateUUID = function(){
      var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
          d += performance.now();; //use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    };

    $('.dateinput').datepicker({
      language: 'ES',
      todayHighlight: true,
      enableOnReadonly: true,
      format: "dd/mm/yyyy",
      keyboardNavigation: false
    });


  });
