'use strict';

/**
 * @ngdoc service
 * @name basekampApp.usersServices
 * @description
 * # usersServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('projsServices', function ($http, $q, parseUtils,teamsServices) {


    // Listar
    function list(){

      var deferred = $q.defer();
      var Projects = Parse.Object.extend("Projects");
      var query    = new Parse.Query(Projects);

      query.find({
        success: function(data) {
          return deferred.resolve(data);
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    };

    function get(prjid){

      var deferred      = $q.defer();
      var Projects      = Parse.Object.extend("Projects");
      var queryProjects = new Parse.Query(Projects);


      queryProjects.equalTo("prjid",prjid);

      queryProjects.find({

        success: function(projects) {
            return deferred.resolve(JSON.parse(JSON.stringify(projects[0])));
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    };


    function create(oParameters){

      var deferred = $q.defer();
      var Projects   = Parse.Object.extend("Projects");

      var newProjects= new Projects();
      newProjects.set(oParameters)

      newProjects.save(null,{
        success: function(res){
          AlertJS.Notify.Success("Atención", "Proyecto creado exitosamente");
          return deferred.resolve();
        },error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
      }})

      return deferred.promise;
    };


    // Actualizar proyectos
    function update(oData){

      var deferred      = $q.defer();
      var oProjects     = Parse.Object.extend("Projects");
      var newProject    = new Parse.Query(oProjects);

      // Consulto los datos actuales del proyecto
      newProject.equalTo("prjid",oData.attributes.prjid);

      // consulto el proyecto
      newProject.find({
        success: function(data) {
          if (data.length > 0){
            data[0].set(oData.attributes); // Asigno nueva info
            data[0].save(); // Guardo
            AlertJS.Notify.Success("Atención", "Proyecto actualizado exitosamente");
            return deferred.resolve();
          }
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.resolve();
        }
      });

      return deferred.promise;
    }

    // Eliminar proyectos
    function destroy(prjid){

      var deferred      = $q.defer();
      var Projects      = Parse.Object.extend("Projects");
      var newProject    = new Parse.Query(Projects);

      newProject.equalTo("prjid",prjid);

      newProject.find({
        success: function(data) {
          if (data.length > 0){
            data[0].destroy();
            teamsServices.destroyByProject(prjid);
            AlertJS.Notify.Success("Atención", "Proyecto eliminado exitosamente");
            return deferred.resolve();
          }
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.resolve();
        }
      });

      return deferred.promise;
    }

    function countByUser(username){

      var deferred   = $q.defer();
      var Members = Parse.Object.extend("Members");
      var query   = new Parse.Query(Members);
      query.equalTo("username", username);

      query.find({
        success: function(mem) {

          var Teams             = Parse.Object.extend("Teams");
          var teamArray         = JSON.parse(JSON.stringify(mem));
          var queryArrayTeam   = [];

          if(mem.length == 0){
            return deferred.resolve(0);
          }

          angular.forEach(teamArray,function(item){
            var queryTeams        = new Parse.Query(Teams);
            queryTeams.equalTo("teamid", item.teamid);
            queryArrayTeam.push(queryTeams);
          })

          //var mainQueryTeams = new Parse.Query._orQuery(queryArrayTeam);
          var mainQueryTeams = Parse.Query.or.apply(Parse.Query, queryArrayTeam);

          mainQueryTeams.find({success:function(res){

            var Projects        = Parse.Object.extend("Projects");
            var projArray       = JSON.parse(JSON.stringify(res));
            var queryArrayProj  = [];

            angular.forEach(projArray,function(item){
              var queryProjects   = new Parse.Query(Projects);
              queryProjects.equalTo("prjid", item.prjid);
              queryArrayProj.push(queryProjects)
            })

            //var mainQueryTeams = new Parse.Query._orQuery(queryArrayTeam);
            var mainQueryProj = Parse.Query.or.apply(Parse.Query, queryArrayProj);

            mainQueryProj.find({
              success: function(obj) {
                var projArray  = JSON.parse(JSON.stringify(obj));
                return deferred.resolve(projArray);
              },error:function(error){
                AlertJS.Notify.Error("Error", error.message);
                return deferred.reject(error);
              }
            })

          },error:function(error){
            AlertJS.Notify.Error("Error", error.message);
            return deferred.reject(error);
          }})
        },
        error: function(error) {
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;

    }

    function count(teamid){

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

    return {
      list:list,
      get:get,
      create:create,
      update:update,
      destroy:destroy,
      countByUser:countByUser
    };
  });
