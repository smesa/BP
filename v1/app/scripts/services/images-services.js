'use strict';

/**
 * @ngdoc service
 * @name basekampApp.imagesServices
 * @description
 * # imagesServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('imagesServices', function ($http, $q) {


    function list(){

      var deferred = $q.defer();

      var Files = Parse.Object.extend("Files");
      var query    = new Parse.Query(Files);

      query.find({
        success: function(data) {
          return deferred.resolve(data);
        },
        error: function(error){
          return deferred.reject(error);
        }
      });
      
      return deferred.promise;
    };

    return {
      list:list
    };
});
