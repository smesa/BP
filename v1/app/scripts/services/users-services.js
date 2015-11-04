'use strict';

/**
 * @ngdoc service
 * @name basekampApp.usersServices
 * @description
 * # usersServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('usersServices', function ($http, $q) {

    var sURL  = 'http://colhealthcare.softlayer.com:8000/sap/bc/ibmbasekamp/services';

    function userList(){

      var deferred = $q.defer();
      var req = { method: 'GET', url: sURL, params : { 'option': 'user_list' } };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        console.log("Ocurrio el siguiente error: " + err);
        return deferred.reject(err);
      });

      return deferred.promise;

    };

    function userData(user_id){

      var deferred = $q.defer();
      var req = { method: 'GET', url: sURL, params : { 'option': 'user_data', 'user_id': user_id } };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        console.log("Ocurrio el siguiente error: " + err);
        return deferred.reject(err);
      });

      return deferred.promise;

    };

    function userEducation(user_id){

      var deferred = $q.defer();
      var req = { method: 'GET', url: sURL, params : { 'option': 'user_edu', 'user_id': user_id } };

      $http(req).then(function(response){
        return deferred.resolve(response.data);
      }, function(err){
        console.log("Ocurrio el siguiente error: " + err);
        return deferred.reject(err);
      });

      return deferred.promise;

    };

    function userCreate(oParameters){

      var deferred = $q.defer();
      var education = '';
      var count = 0;
      var sType = 'POST';

      angular.forEach(oParameters.education, function(value){
        count = count + 1;
        education = education + "{" + count + "," + value.cursetype + ',' + value.cursetitle + ',' + value.cursecertificateid + ',' + value.cursedate + '};';
      })

      oParameters.education = education;

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

    function userUpdate(oParameters){

      var deferred = $q.defer();
      var sType = 'POST';
      var education = '';
      var count = 0;
      oParameters.method = 'PUT';
      oParameters.option = 'user_update';

      angular.forEach(oParameters.education, function(value){
        count = count + 1;
        education = education + "{" + count + "," + value.cursetype + ',' + value.cursetitle + ',' + value.cursecertificateid + ',' + value.cursedate + '};';
      })

      oParameters.education = education;

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

    function userDelete(oParameters){

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
      userList:userList,
      userData:userData,
      userEducation:userEducation,
      userCreate:userCreate,
      userUpdate:userUpdate,
      userDelete:userDelete
    };
  });
