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


    function projList(){

      var deferred = $q.defer();

      var Projects = Parse.Object.extend("Projects");
      var query    = new Parse.Query(Projects);

      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))
          return deferred.resolve(data);
        },
        error: function(error){
          console.log("Ocurrio el siguiente error: " + error);
          return deferred.reject(error);
        }
      });
      return deferred.promise;
    };

    function projData(prjid){

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
            return deferred.resolve(data);

        },
        error: function(error){
          console.log("Ocurrio el siguiente error: " + error);
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    };


    function projCreate(oParameters){

      var deferred = $q.defer();

      if(oParameters.avatar.length > 0){

        var parseFile = new Parse.File("avatar", { base64: oParameters.avatar });

        parseFile.save().then(function() {

          oParameters.avatar = parseFile;
          saveParse(oParameters).then(function(){
                return deferred.resolve()
          });
        }, function(error) {
              return deferred.reject(error);
        });

      }else{
        saveParse(oParameters).then(function(){
              return deferred.resolve()
        });
      }

      return deferred.promise;
    };

    function saveParse(oParameters,oEmail,oEdu){

      var deferred   = $q.defer();
      var Projects   = Parse.Object.extend("Projects");

      var newProjects= new Projects();
      newProjects.set(oParameters)

      newProjects.save(null,{
        success: function(res){
          return deferred.resolve();
      },error: function(error){
        alert("Error: " + error.code + " " + error.message);
        return deferred.reject(error);
      }})

      return deferred.promise;
    }

    function projUpdate(oParameters){

      var deferred      = $q.defer();
      var Projects      = Parse.Object.extend("Projects");
      var queryProjects = new Parse.Query(Projects);


      queryProjects.equalTo("prjid",oParameters.attributes.prjid);

      if(oParameters.attributes.avatar.length > 0){

        var parseFile = new Parse.File("avatar", { base64: oParameters.attributes.avatar });

        parseFile.save().then(function() {

          oParameters.attributes.avatar = parseFile;

          queryProjects.find({
            success: function(proj) {
              if (proj.length > 0){
                proj[0].set(oParameters.attributes);
                proj[0].save();
                return deferred.resolve();
              }
            },
            error: function(){
              return deferred.resolve();
            }
          });
        });
      }else{

        queryProjects.find({
          success: function(proj) {
            if (proj.length > 0){
              proj[0].set(oParameters.attributes);
              proj[0].save();
              return deferred.resolve();
            }
          },
          error: function(){
            return deferred.resolve();
          }
        });
      }

      return deferred.promise;
    }

    function projDelete(prjid){

      var deferred      = $q.defer();
      var Projects      = Parse.Object.extend("Projects");
      var queryProjects = new Parse.Query(Projects);


      queryProjects.equalTo("prjid",prjid);


      queryProjects.find({
        success: function(proj) {
          if (proj.length > 0){
            proj[0].destroy();
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
      projList:projList,
      projData:projData,
      projCreate:projCreate,
      projUpdate:projUpdate,
      projDelete:projDelete
    };
  });
