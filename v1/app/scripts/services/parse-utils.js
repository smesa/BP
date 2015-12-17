'use strict';

/**
 * @ngdoc service
 * @name basekampApp.parseUtils
 * @description
 * # parseUtils
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('parseUtils', function ($q) {

    function activeUser(){

      // creo deferred
      var deferred = $q.defer();

      // Valido usuario con session
      var currentUser = Parse.User.current();
      deferred.resolve(currentUser);
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
      createImage:createImageFile,
      imageUrl: imageUrl,
      fileUrl: fileUrl,
      generateUniqueKey: generateUniqueKey
    }

  });
