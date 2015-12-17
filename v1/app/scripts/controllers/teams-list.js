'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:TeamsListCtrl
 * @description
 * # TeamsListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('TeamsListCtrl',['$scope','$rootScope', '$routeParams', 'projsServices','teamsServices','parseUtils','ngDialog',
    function ($scope,$rootScope,$routeParams,$projects,$teams,parseUtils,ngDialog){

    $scope.viewList = true;

    var prj_id = $routeParams.prj_id;

    $scope.data = {  'teamid' : '', 'prjid' : '', 'name' : '', 'desc':''}
    $scope.overlay = true;

    $projects.get(prj_id).then(function(data){
      $scope.data.proj = prj_id + ' - ' + data.name;
    });

    $teams.list(prj_id).then(function(data){

      $scope.rowCollection = JSON.parse(JSON.stringify(data))

       // Recorro cada equipo para ver cuantos miembros tiene y cuantas tareas
       angular.forEach($scope.rowCollection,function(item){
         $teams.countMembers(item.teamid).then(function(count){
           item.members = count
         })
       })

       // Recorro cada equipo para ver cuantos miembros tiene y cuantas tareas
       angular.forEach($scope.rowCollection,function(item){
         $teams.countTasks(item.teamid).then(function(count){
           item.tasks = count
         })
       })

       $scope.overlay = !$scope.overlay;

    });

    $scope.save = function(){

      $scope.overlay = !$scope.overlay;
      $scope.data.prjid = prj_id;
      $scope.data.teamid = parseUtils.generateUniqueKey();

      parseUtils.fileUrl('images/team-default-2.gif').then(function(file) {
        $scope.data.avatar = file;
        $teams.create($scope.data).then(function(data){
          ngDialog.close();
          $scope.overlay = !$scope.overlay;
          location.href = '#/teams-edit/'+$scope.data.teamid;
        });
      });
    }


    $scope.create = function(){
      ngDialog.open({
        template: 'views/dialogs/create-team.html',
        className: 'ngdialog-theme-plain',
        controller: 'TeamsListCtrl'
      });
    }

    $scope.edit = function(teamid){
        location.href = '#/teams-edit/'+teamid;
    }

    $scope.delete = function(teamid, index){

      bootbox.confirm("¿Esta seguro de eliminar el equipo?, esto eliminara tambien los miembros del equipo", function(result) {

         if(result == true){

           $scope.overlay = !$scope.overlay;
           $teams.destroy(teamid).then(function(){
             $scope.overlay = !$scope.overlay;
             $scope.rowCollection.splice(index, 1);
           });
         }
      });
    }

  }]);
