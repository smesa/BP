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

    // Guardar nuevo proyecto
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


    // Actualizar proyectos
    function projUpdate(projects,teams){

      var deferred      = $q.defer();
      var oProjects     = Parse.Object.extend("Projects");
      var newProject    = new Parse.Query(oProjects);
      var oTeams        = Parse.Object.extend("teams");
      var newTeam       = new Parse.Query(oTeams);
      var oMembers      = Parse.Object.extend("members");
      var newMembers    = new Parse.Query(oMembers);


      // Arreglo datos de equipos.
      var dataTeams   = [];
      var dataMembers = [];

      angular.forEach(teams, function(item){

        // Saco el numero de miembros
        item.nromembers = item.members.length;
        // Saco el numero de tareas
        //item.nrotasks   = item.tasks.length;

        dataTeams.push({'prjid':projects.prjid, 'tmid':item.tmid,'name':item.name,'desc':item.desc,'nromembers':item.nromembers,'nrotasks':item.nrotasks})

        // Para cada equipo recorro los miembros
        angular.forEach(item.members,function(member){
          dataMembers.push({'prjid':projects.prjid,'tmid':item.tmid,'username':member.username})
        })

      })

      // Consulto los datos actuales del proyecto
      newProject.equalTo("prjid",projects.attributes.prjid);

      // Guardo el avatar del proyecto
      var newFile = new Parse.File("avatar", { base64: projects.attributes.avatar.url });

      // Cuando guarde entonces guardo los datos del proyecto
      newFile.save().then(function() {

        // Agrego el avatar
        projects.attributes.avatar = newFile;

        // consulto el proyecto
        newProject.find({
          success: function(proj) {
            if (proj.length > 0){
              proj[0].set(projects.attributes); // Asigno nueva info
              proj[0].save(); // Guardo
              return deferred.resolve();
            }
          },
          error: function(){
            return deferred.resolve();
          }
        });
      });

      return deferred.promise;
    }

    // Eliminar proyectos
    function projDelete(prjid){

      var deferred      = $q.defer();
      var Projects      = Parse.Object.extend("Projects");
      var newProject    = new Parse.Query(Projects);

      newProject.equalTo("prjid",prjid);

      newProject.find({
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
