'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:MembersListCtrl
 * @description
 * # MembersListCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
  .controller('MembersListCtrl',['$scope','$rootScope', '$routeParams', 'projsServices','teamsServices','usersServices','membersServices','parseUtils','ngDialog','$window',
    function ($scope,$rootScope,$routeParams,$projects,$teams,$users,$members,parseUtils,ngDialog,$window){

      var teamid = $routeParams.team_id;
      $scope.prj_id = $routeParams.prj_id;

      $scope.users = [];
      $scope.rowCollection = [];



      // Consulto usuarios
      $users.list().then(function(data){
         $scope.users = data;
         angular.forEach($scope.users,function(item){
           item.add = false;
         })
      });



      $scope.loadMembers = function(){
        $scope.rowCollection = []
        // Consulto la lista de miembros
        $members.list(teamid).then(function(data){
          $scope.rowCollection = data
        });
      }

      $scope.loadMembers();

      $scope.addMembers = function(){
        ngDialog.open({
          template: 'views/dialogs/select-users.html',
          className: 'ngdialog-theme-plain custom-width',
          controller: 'MembersListCtrl'
        });
      }

      $scope.appendMembers = function(){
        var append = [];
        angular.forEach($scope.users,function(item){
          if(item.add === true){
            append.push(item.username)
          }
        })

        $members.add(append,teamid).then(function(){
          ngDialog.closeAll();
          $window.location.reload();
        })
      }

      $scope.removeMembers = function(username){

        bootbox.confirm("¿Esta seguro de eliminar este miembro del equipo?", function(result) {

           if(result == true){
             $members.remove(username,teamid).then(function(){
               $scope.loadMembers();
             })
           }
        });
      }


  }]);
