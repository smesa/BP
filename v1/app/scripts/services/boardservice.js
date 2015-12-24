'use strict';

/**
 * @ngdoc service
 * @name basekampApp.boardService
 * @description
 * # boardService
 * Service in the basekampApp.
 */
angular.module('basekampApp')
  .service('boardService', function ($http, $q, $rootScope) {


    var getColumnsByUser = function (username) {

      var deferred = $q.defer();

      var TaskColumns = Parse.Object.extend("TaskColumns");
      var query       = new Parse.Query(TaskColumns);

      query.equalTo("username",username);


      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))
          return deferred.resolve(data);
        },
        error: function(error){
          AlertJS.Notify.Error("Error",error.message);
          return deferred.reject(error);
        }
      });
      return deferred.promise;

    };

    var getColumnsByTeam = function (teamid) {

      var deferred = $q.defer();

      var TaskColumns = Parse.Object.extend("TaskColumns");
      var query       = new Parse.Query(TaskColumns);

      query.equalTo("teamid",teamid);


      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))
          return deferred.resolve(data);
        },
        error: function(error){
          AlertJS.Notify.Error("Error",error.message);
          return deferred.reject(error);
        }
      });
      return deferred.promise;
    };

    var canMoveTask = function (sourceColIdVal, targetColIdVal) {
        return $http.get("/api/BoardWebApi/CanMove",
                        { params: { sourceColId: sourceColIdVal, targetColId: targetColIdVal } })
            .then(function (response) {
                return response.data.canMove;
            }, function (error) {
                return $q.reject(error.data.Message);
            });
    };

    var moveTask = function (taskIdVal, targetColIdVal) {
        return $http.post("/api/BoardWebApi/MoveTask",
                         { taskId: taskIdVal, targetColId: targetColIdVal })
            .then(function (response) {
                return response.status == 200;
            }, function (error) {
                return $q.reject(error.data.Message);
            });
    };

    var proxy = null;

    var initialize = function () {

        connection = jQuery.hubConnection();
        this.proxy = connection.createHubProxy('KanbanBoard');

        // Listen to the 'BoardUpdated' event that will be pushed from SignalR server
        this.proxy.on('BoardUpdated', function () {
            $rootScope.$emit("refreshBoard");
        });

        // Connecting to SignalR server
        return connection.start()
        .then(function (connectionObj) {
            return connectionObj;
        }, function (error) {
            return error.message;
        });
    };

    // Call 'NotifyBoardUpdated' on SignalR server
    var sendRequest = function () {
        this.proxy.invoke('NotifyBoardUpdated');
    };

    return {
        initialize: initialize,
        sendRequest: sendRequest,
        getColumnsByUser: getColumnsByUser,
        getColumnsByTeam: getColumnsByUser,
        canMoveTask: canMoveTask,
        moveTask: moveTask
    };
  });
