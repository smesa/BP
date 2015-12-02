'use strict';

/**
 * @ngdoc service
 * @name basekampApp.teamsServices
 * @description
 * # teamsServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('teamsServices', function ($http, $q) {


    // Listar
    function list(prjid){

      var deferred = $q.defer();

      var Teams = Parse.Object.extend("Teams");
      var query = new Parse.Query(Teams);

      query.equalTo("prjid",prjid);

      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))

          angular.forEach(data,function(item){
            if(!item.avatar){
              item.avatar = 'images/team-default-2.gif'
            }else{
              item.avatar = item.avatar
            }
          })

          return deferred.resolve(data);
        },
        error: function(error){
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

        success: function(projects) {

            var data = {};
            data.attributes = {};
            data.attributes = JSON.parse(JSON.stringify(projects[0]));

            angular.forEach(data,function(item){
              if(!item.attributes.avatar){
                item.attributes.avatar = 'images/team-default-2.gif'
              }else{
                item.attributes.avatar = item.attributes.avatar
              }
            })

            return deferred.resolve(data);

        },
        error: function(error){
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    };


    function create(prjid,oData){

      var deferred = $q.defer();
      var teams    = Parse.Object.extend("Teams");

      var newTeam = new teams();
      newTeam.set('prjid',prjid);
      newTeam.set(oData);

      newTeam.save(null,{
        success: function(res){
          return deferred.resolve();
        },error: function(error){
          return deferred.reject(error);
      }})

      return deferred.promise;
    };


    // Actualizar proyectos
    function update(oData){

      var deferred  = $q.defer();
      var teams     = Parse.Object.extend("teams");
      var newTeam   = new Parse.Query(teams);

      // Consulto los datos actuales del proyecto
      newTeam.equalTo("teamid",oData.teamid);

      // consulto el proyecto
      newTeam.find({
        success: function(data) {
          if (data.length > 0){

            data[0].set(oData.attributes); // Asigno nueva info
            data[0].save(); // Guardo

            return deferred.resolve();
          }
        },
        error: function(){
          return deferred.resolve();
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
            return deferred.resolve();
          }
        },
        error: function(){
          return deferred.resolve();
        }
      });

      return deferred.promise;
    }

    return {
      list:list,
      get:get,
      create:create,
      update:update,
      destroy:destroy
    };
  });
