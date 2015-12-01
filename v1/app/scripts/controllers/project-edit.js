'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:ProjectEditCtrl
 * @description
 * # ProjectEditCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('ProjectEditCtrl',['$scope','$rootScope','$filter','$routeParams','$storage','$projects','usersServices',
    function ($scope,$rootScope,$filter,$routeParams,$storage,$projects,$users) {

    var prj_id = $routeParams.prj_id;

    $scope.types       = $storage.get('types');
    $scope.status      = $storage.get('status');
    $scope.components  = $storage.get('components');
    $scope.currency    = $storage.get('currency');


    $scope.data = [];
    $scope.teams = [];
    $scope.team = {};
    $scope.members = [];
    $scope.teamMembers = [];

    // Consulto usuarios
    $projects.get(prj_id).then(function(data){
        $scope.data = data.projects;
        $('#avatar').attr('src', data.projects.attributes.avatar.url);
    });

    $scope.viewteam = true;

    // Funcion para guardar
    $scope.save = function(){


      bootbox.confirm("Esta seguro de guardar estos cambios?", function(result) {
         if(result == true){
            $projects.update($scope.data).then(function(data){
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

      bootbox.confirm("¿Esta seguro de crear este equipo?", function(result) {

         if(result == true){

           $scope.team.tmid       = $scope.generateUUID();
           $scope.team.prjid      = $scope.data.prjid;
           $scope.team.nromembers = 0;
           $scope.team.nrotasks   = 0;

           if(!$scope.team.avatar){
             $scope.team.avatar = "images/team-default-2.gif"
           }

           $scope.teams.push($scope.team);
           $scope.team = {};
           $('#avatarTeam').attr('src', '');
           $('#teamModal').modal('hide');
           $scope.$apply();

         }else{
           $scope.team = {};
           $('#avatarTeam').attr('src', '');
           $('#teamModal').modal('hide');
         }
      });


    }

    $scope.detailTeam = function(team){
      $scope.viewteam    = !$scope.viewteam;
      $scope.team        = $filter('filter')($scope.teams, {id: team}, true)[0];
    }

    $scope.detailTeamOff = function(){
      $scope.viewteam = !$scope.viewteam;
    }

    $scope.selectMemberTeam = function(){

      // Consulto usuarios
      $users.list().then(function(data){
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

      $('#selectMemberModal').modal('hide');
    }

    $scope.deleteMemberTeam = function(index){

      bootbox.confirm("Esta seguro de eliminar el miembro?", function(result) {
         if(result == true){
             // Extraigo el mensaje
             $scope.team.members.splice(index, 1);
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
