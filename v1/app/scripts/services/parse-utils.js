'use strict';

/**
 * @ngdoc service
 * @name basekampApp.parseUtils
 * @description
 * # parseUtils
 * Factory in the basekampApp.
 */
angular.module('basekampApp')

  .factory('parseUtils', function ($q, $kinvey) {

    var kinveyConfig =  {
      appKey: 'kid_Z1dnCghqAl',
      appSecret: 'cee4f0c9935f4b5ab544b3b71b28a35b'
    }

    // Obtener usuario activo
    function activeUser(){
      // creo deferred
      var deferred = $q.defer();

      // Valido usuario con session
      $kinvey.init(kinveyConfig).then(function() {
        $kinvey.User.me().then(function(user) {
          deferred.resolve(user);
        }, function(err) {
          return deferred.reject(err);
        });
      }, function(err) {
        return deferred.reject(err);
      });

      return deferred.promise;
    }


    // Login de usuario
    function login(username, userpass){
      var deferred     = $q.defer();
      $kinvey.User.login(username, userpass).then(function(user) {
          deferred.resolve(user);
      }, function(err) {
          return deferred.reject(err);
      });

      return deferred.promise;

    }

    function logoff(){
      var deferred     = $q.defer();
      var user = $kinvey.getActiveUser();

      if(null !== user) {
          var promise = $kinvey.User.logout();
          promise.then(function() {
              deferred.resolve();
          }, function(err) {
              return deferred.reject(err);
          });
      }

      return deferred.promise;
    }

    function createImageFile(base64){
        var deferred = $q.defer();

        var file = new Parse.File('imageFile', { base64: base64 });

        file.save().then(function(file){
          return deferred.resolve(file);
        },function(error){
          AlertJS.Notify.Error("Error",error.message);
          return deferred.reject(error);
        })

        return deferred.promise;
    }


    function imageUrl(url){
        var deferred = $q.defer();
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
            var reader  = new FileReader();
            reader.onloadend = function () {
                 var base64 =  reader.result;
                 return deferred.resolve(base64);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();

        return deferred.promise;
    }

    function fileUrl(url){

        var deferred = $q.defer();

        // Vuelvo a base64 una url
        this.imageUrl(url).then(function(base64){
          var file = new Parse.File('imageFile', { base64: base64 });
          file.save().then(function(){
            return deferred.resolve(file);
          },function(error){
            AlertJS.Notify.Error("Error",error.message);
            return deferred.reject(error);
          })
        });


        return deferred.promise;
    }

    function generateUniqueKey(){

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
    }


    // Public API here
    return {
      activeUser: activeUser,
      login: login,
      logoff: logoff,
      createImage:createImageFile,
      imageUrl: imageUrl,
      fileUrl: fileUrl,
      generateUniqueKey: generateUniqueKey
    }

  });
