'use strict';

/**
 * @ngdoc service
 * @name basekampApp.membersServices
 * @description
 * # membersServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('membersServices', function ($http, $q,usersServices) {


    function list(teamid){

      var deferred      = $q.defer();
      var members       = Parse.Object.extend("Members");
      var query         = new Parse.Query(members);
      var memberList    = [];
      var count         = 0;

      usersServices.list().then(function(users){

        query.equalTo("teamid",teamid);

        query.find({
          success:function(data){
            data = JSON.parse(JSON.stringify(data))

            angular.forEach(data,function(obj){
              count ++;
              for(i = 0; i < users.length; i++) {

                if(obj.username === users[i].username){
                  users[i].leader = obj.leader;
                  memberList.push(users[i]);
                  break;
                }
              }

              if(data.length == count){
                return deferred.resolve(JSON.parse(JSON.stringify(memberList)));
              }
            })
          },
          error(error){
            AlertJS.Notify.Error("Error", error.message);
            return deferred.reject(error);
          }
        })

      });


      return deferred.promise;
    }

    function setLeader(username,teamid,option){
      var deferred   = $q.defer();
      var members    = Parse.Object.extend("Members");
      var query      = new Parse.Query(members);

      query.equalTo("teamid",teamid);
      query.equalTo("username",username);

      query.find({success:function(res){
        if(res.length > 0){
          res[0].set('leader',option);
          res[0].save();
          return deferred.resolve();
        }
      },error:function(error){
        AlertJS.Notify.Error("Error", error.message);
        return deferred.reject(error);
      }})


      return deferred.promise;

    }

    function add(memberList, teamid){

      var deferred      = $q.defer();
      var members       = Parse.Object.extend("Members");
      var allMembers    = [];

      angular.forEach(memberList,function(item){
        var newMember = new members();
        newMember.set('teamid',teamid);
        newMember.set('username',item);
        allMembers.push(newMember);
      })

      Parse.Object.saveAll(allMembers, {
        success: function(objs) {
          AlertJS.Notify.Success("Atención","Los miembros fueron agregados al equipo exitosamente");
          return deferred.resolve(objs);
        },
        error: function(error) {
          AlertJS.Notify.Error("Error", error.message);
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    }

    function remove(username, teamid){

      var deferred      = $q.defer();
      var Members      = Parse.Object.extend("Members");
      var newMembers    = new Parse.Query(Members);

      newMembers.equalTo("username",username);
      newMembers.equalTo("teamid",teamid);

      newMembers.find({
        success: function(data) {
          if (data.length > 0){
            data[0].destroy();
            AlertJS.Notify.Success("Atención", "Miembro removido exitosamente");
            return deferred.resolve();
          }
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.resolve();
        }
      });

      return deferred.promise;
    }

    function removeByTeam(teamid){

      var deferred      = $q.defer();
      var Members      = Parse.Object.extend("Members");
      var newMembers    = new Parse.Query(Members);

      newMembers.equalTo("teamid",teamid);

      newMembers.find({
        success: function(data) {

          Parse.Object.destroyAll(data).then(function(success) {
            return deferred.resolve();
          }, function(error) {
            AlertJS.Notify.Error("Error", error.message);
            return deferred.resolve();
          });
        },
        error: function(error){
          AlertJS.Notify.Error("Error", error.message);
          return deferred.resolve();
        }
      });

      return deferred.promise;
    }

    return {
      list:list,
      add:add,
      remove:remove,
      removeByTeam:removeByTeam,
      setLeader:setLeader
    };


  });
