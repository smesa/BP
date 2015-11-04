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

    var sURL  = 'http://colhealthcare.softlayer.com:8000/sap/bc/ibmbasekamp/services';

    function countryList(){

      var deferred = $q.defer();
      var req = { method: 'GET', url: sURL, params : { 'option': 'country_list' } };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        return deferred.reject(err);
      });

      return deferred.promise;

    };


    function cityList(){

      var deferred = $q.defer();
      var req = { method: 'GET', url: sURL, params : { 'option': 'city_list' } };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        return deferred.reject(err);
      });

      return deferred.promise;

    };

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
      countryList: countryList,
      cityList: cityList,
      projectConfig:projectConfig
    };

  });
