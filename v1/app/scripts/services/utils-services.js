'use strict';

/**
 * @ngdoc service
 * @name basekampApp.utilsServices
 * @description
 * # utilsServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('utilsServices', function ($http, $q) {

    function projectConfig(){

      var deferred = $q.defer();
      var req = { method: 'GET', url: 'json/projectconf.json' };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        return deferred.reject(err);
      });

      return deferred.promise;
    };

    return {
      projectConfig:projectConfig
    };

  });
