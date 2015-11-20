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

    };

    // Public API here
    return {
      activeUser: activeUser
    }

  });
