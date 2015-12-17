'use strict';

/**
 * @ngdoc service
 * @name basekampApp.teamsServices
 * @description
 * # teamsServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('teamsServices', function ($http, $q,membersServices) {


    // Listar
    function list(prjid){

      var deferred = $q.defer();

      var Teams = Parse.Object.extend("Teams");
      var query = new Parse.Query(Teams);

      query.equalTo("prjid",prjid);

      query.find({
        success: function(data) {
          return deferred.resolve(data);
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      })


      return deferred.promise;
    };

    function get(teamid){

      var deferred      = $q.defer();
      var teams         = Parse.Object.extend("Teams");
      var query         = new Parse.Query(teams);

      query.equalTo("teamid",teamid);

      query.find({

        success: function(teams) {
          return deferred.resolve(JSON.parse(JSON.stringify(teams[0])));
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    };


    function create(oData){

      var deferred = $q.defer();
      var teams    = Parse.Object.extend("Teams");

      var newTeam = new teams();
      newTeam.set(oData);

      newTeam.save(null,{
        success: function(res){
          AlertJS.Notify.Success("Atención", "Equipo creado exitosamente");
          return deferred.resolve();
        },error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
      }})

      return deferred.promise;
    };


    // Actualizar proyectos
    function update(oData){

      var deferred  = $q.defer();
      var teams     = Parse.Object.extend("Teams");
      var newTeam   = new Parse.Query(teams);

      // Consulto los datos actuales del proyecto
      newTeam.equalTo("teamid",oData.attributes.teamid);

      // consulto el proyecto
      newTeam.find({
        success: function(data) {
          if (data.length > 0){

            data[0].set(oData.attributes); // Asigno nueva info
            data[0].save(); // Guardo
            AlertJS.Notify.Success("Atención", "Equipo actualizado exitosamente");
            return deferred.resolve();
          }
        },
        error: function(){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    }

    // Eliminar proyectos
    function destroy(teamid){

      var deferred   = $q.defer();
      var teams      = Parse.Object.extend("Teams");
      var newTeam    = new Parse.Query(teams);

      newTeam.equalTo("teamid",teamid);

      newTeam.find({
        success: function(data) {
          if (data.length > 0){
            data[0].destroy();
            membersServices.removeByTeam(teamid);
            AlertJS.Notify.Success("Atención", "Equipo eliminado exitosamente");
            return deferred.resolve();
          }
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    }

    function destroyByProject(prjid){

      var deferred   = $q.defer();
      var teams      = Parse.Object.extend("Teams");
      var newTeam    = new Parse.Query(teams);

      newTeam.equalTo("prjid",prjid);

      newTeam.find({
        success: function(data) {

          var count = 0;

          var data_aux = JSON.parse(JSON.stringify(data))
          angular.forEach(data_aux,function(item){
            count ++;
            membersServices.removeByTeam(item.teamid);
          });

          do {

          } while (count != data_aux.length);

          Parse.Object.destroyAll(data).then(function(success) {
            return deferred.resolve();
          }, function(error) {
            AlertJS.Notify.Error("Error", error.message);
            return deferred.resolve();
          });

        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;

    }

    function countMembers(teamid){

      var deferred   = $q.defer();

      var Members = Parse.Object.extend("Members");
      var query   = new Parse.Query(Members);

      query.equalTo("teamid", teamid);
      query.count({
        success: function(count) {
          return deferred.resolve(count);
        },
        error: function(error) {
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;

    }

    function countTasks(teamid){

      var deferred   = $q.defer();

      var Tasks = Parse.Object.extend("Tasks");
      var query   = new Parse.Query(Tasks);

      query.equalTo("teamid", teamid);
      query.count({
        success: function(count) {
          return deferred.resolve(count);
        },
        error: function(error) {
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });
      return deferred.promise;
    }

    return {
      list:list,
      get:get,
      create:create,
      update:update,
      destroy:destroy,
      destroyByProject:destroyByProject,
      countMembers:countMembers,
      countTasks:countTasks
    };
  });
