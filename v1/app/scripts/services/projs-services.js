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

    var sURL  = 'http://colhealthcare.softlayer.com:8000/sap/bc/ibmbasekamp/services';

    function projList(){

      var deferred = $q.defer();
      var req = { method: 'GET', url: sURL, params : { 'option': 'proj_list' } };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        console.log("Ocurrio el siguiente error: " + err);
        return deferred.reject(err);
      });

      return deferred.promise;

    };

    function projData(prj_id){

      var deferred = $q.defer();
      var req = { method: 'GET', url: sURL, params : { 'option': 'proj_data', 'prj_id': prj_id } };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        console.log("Ocurrio el siguiente error: " + err);
        return deferred.reject(err);
      });

      return deferred.promise;

    };


    function projCreate(oParameters){

      var deferred = $q.defer();
      var sType = 'POST';

      jQuery.ajax({
        url: sURL,
        async: true,
        dataType: 'json',
        data: oParameters,
        type: sType,
        success: function(oData) {
          return deferred.resolve(oData[0]);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          console.log("Ocurrio el siguiente error: " + textStatus, XMLHttpRequest.responseText + ","	+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);
          return deferred.reject(err);
        }
      });

      return deferred.promise;
    };

    function projUpdate(oParameters){

      var deferred = $q.defer();
      var sType = 'POST';
      oParameters.method = 'PUT';
      oParameters.option = 'proj_update';

      jQuery.ajax({
        url: sURL,
        async: true,
        dataType: 'json',
        data: oParameters,
        type: sType,
        success: function(oData) {
          return deferred.resolve(oData[0]);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          console.log("Ocurrio el siguiente error: " + textStatus, XMLHttpRequest.responseText + ","	+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);

        }
      });

      return deferred.promise;
    }

    function projDelete(oParameters){

      var deferred = $q.defer();

      var sType = 'GET';

      jQuery.ajax({
        url: sURL,
        async: true,
        dataType: 'json',
        data: oParameters,
        type: sType,
        success: function(oData) {
          return deferred.resolve(oData[0]);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          console.log("Ocurrio el siguiente error: " + textStatus, XMLHttpRequest.responseText + ","	+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);
          return deferred.reject(err);
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
