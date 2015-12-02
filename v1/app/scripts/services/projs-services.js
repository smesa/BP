'use strict';

/**
 * @ngdoc service
 * @name basekampApp.usersServices
 * @description
 * # usersServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('projsServices', function ($http, $q) {


    // Listar
    function list(){

      var deferred = $q.defer();

      var Projects = Parse.Object.extend("Projects");
      var query    = new Parse.Query(Projects);

      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))

          angular.forEach(data,function(item){
            if(!item.avatar){
              item.avatar = 'images/icon-project.png'
            }else{
              item.avatar = item.avatar
            }
          })

          return deferred.resolve(data);
        },
        error: function(error){
          console.log("Ocurrio el siguiente error: " + error);
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
            var data = {};
            data.projects = {};
            data.projects.attributes = {};
            data.projects.attributes = JSON.parse(JSON.stringify(projects[0]));

            angular.forEach(data,function(item){
              if(!item.attributes.avatar){
                item.attributes.avatar = 'images/icon-project.png'
              }else{
                item.attributes.avatar = item.attributes.avatar
              }
            })

            return deferred.resolve(data);

        },
        error: function(error){
          console.log("Ocurrio el siguiente error: " + error);
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
          return deferred.resolve();
        },error: function(error){
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
    function destroy(prjid){

      var deferred      = $q.defer();
      var Projects      = Parse.Object.extend("Projects");
      var newProject    = new Parse.Query(Projects);

      newProject.equalTo("prjid",prjid);

      newProject.find({
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
