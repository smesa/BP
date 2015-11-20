
/**
 * @ngdoc service
 * @name basekampApp.usersServices
 * @description
 * # usersServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('usersServices', function ($http, $q, $rootScope) {


    function userList(){

      var deferred = $q.defer();

      var UserInfo = Parse.Object.extend("UserInfo");
      var query    = new Parse.Query(UserInfo);
      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))
          return deferred.resolve(data);
        },
        error: function(error){
          console.log("Ocurrio el siguiente error: " + error);
          return deferred.reject(error);
        }
      });
      return deferred.promise;

    };

    function userData(user_id){

      var deferred      = $q.defer();
      var UserInfo      = Parse.Object.extend("UserInfo");
      var UserEdu       = Parse.Object.extend("UserEdu");
      var queryUserInfo = new Parse.Query(UserInfo);
      var queryUserEdu  = new Parse.Query(UserEdu);

      queryUserInfo.equalTo("username",user_id);
      queryUserEdu.equalTo("username",user_id);


      queryUserInfo.find({
        success: function(userinfo) {
          queryUserEdu.find({
            success: function(useredu) {
              var data = {};
              data.userinfo = {};
              data.userinfo.attributes = {};
              data.userinfo.attributes = JSON.parse(JSON.stringify(userinfo[0]));
              data.useredu  = useredu;
              return deferred.resolve(data);
            }
          });

        },
        error: function(error){
          console.log("Ocurrio el siguiente error: " + error);
          return deferred.reject(error);
        }
      });

      return deferred.promise;

    };


    function userCreate(oParameters, oEmail, oEdu){

      var deferred = $q.defer();
      var sessionToken = Parse.User.current().getSessionToken();

      if(oParameters.avatar.length > 0){

        var parseFile = new Parse.File("avatar", { base64: oParameters.avatar });

        parseFile.save().then(function() {

          oParameters.avatar = parseFile;
          saveParse(oParameters,oEmail,oEdu).then(function(){
                Parse.User.become(sessionToken);
                return deferred.resolve()
          });
        }, function(error) {
              return deferred.reject(error);
        });

      }else{
        saveParse(oParameters,oEmail,oEdu).then(function(){
              return deferred.resolve()
        });
      }

      return deferred.promise;
    };

    function saveParse(oParameters,oEmail,oEdu){

      var deferred   = $q.defer();
      var newParse   = new Parse.User();
      var userEdu    = Parse.Object.extend("UserEdu");
      var userInfo   = Parse.Object.extend("UserInfo");
      var ArrEdu     = [];

      var newUserInfo = new userInfo();
      newUserInfo.set(oParameters)

      angular.forEach(oEdu, function(value){
          var newUserEdu = new userEdu();
          value.username = oParameters.username;
          newUserEdu.set(value);
          ArrEdu.push(newUserEdu)
      })

      newParse.set('username',oParameters.username);
      newParse.set('password','init123');
      newParse.set('email',oEmail);

      newParse.signUp(null,{
        success: function(res){
          newUserInfo.save()
          Parse.Object.saveAll(ArrEdu);
          return deferred.resolve();

      },error: function(user,error){
        alert("Error: " + error.code + " " + error.message);
        return deferred.reject(error);
      }})

      return deferred.promise;

    }


    function userUpdate(info,edu){

      var deferred      = $q.defer();
      var UserInfo      = Parse.Object.extend("UserInfo");
      var UserEdu       = Parse.Object.extend("UserEdu");
      var queryUserInfo = new Parse.Query(UserInfo);
      var queryUserEdu  = new Parse.Query(UserEdu);
      var ArrEdu        = [];


      queryUserInfo.equalTo("username",info.attributes.username);
      queryUserEdu.equalTo("username",info.attributes.username);

      if(info.attributes.avatar.length > 0){

        var parseFile = new Parse.File("avatar", { base64: info.attributes.avatar });

        parseFile.save().then(function() {

          info.attributes.avatar = parseFile;

          queryUserInfo.find({
            success: function(userinfo) {
              if (userinfo.length > 0){
                userinfo[0].set(info.attributes);
                userinfo[0].save();
              }
            }
          });

          queryUserEdu.find({
            success: function(useredu) {

              angular.forEach(useredu, function(value){
                value.destroy();
              })

              angular.forEach(edu, function(value){
                  var newUserEdu = new UserEdu();
                  value.attributes.username = info.attributes.username;
                  newUserEdu.set(value.attributes);
                  ArrEdu.push(newUserEdu)
              })

              Parse.Object.saveAll(ArrEdu);
              return deferred.resolve();
            },
            error: function(){
              return deferred.resolve();
            }
          });

        });
      }else{

        queryUserInfo.find({
          success: function(userinfo) {
            if (userinfo.length > 0){
              userinfo[0].set(info.attributes);
              userinfo[0].save();
            }
          }
        });

        queryUserEdu.find({
          success: function(useredu) {

            angular.forEach(useredu, function(value){
              value.destroy();
            })

            angular.forEach(edu, function(value){
                var newUserEdu = new UserEdu();
                value.attributes.username = info.attributes.username;
                newUserEdu.set(value.attributes);
                ArrEdu.push(newUserEdu)
            })

            Parse.Object.saveAll(ArrEdu);
            return deferred.resolve();
          },
          error: function(){
            return deferred.resolve();
          }
        });

      }

      return deferred.promise;
    }


    function userDelete(user_id){

      var deferred      = $q.defer();
      var UserInfo      = Parse.Object.extend("UserInfo");
      var UserEdu       = Parse.Object.extend("UserEdu");
      var queryUserInfo = new Parse.Query(UserInfo);
      var queryUserEdu  = new Parse.Query(UserEdu);


      queryUserInfo.equalTo("username",user_id);
      queryUserEdu.equalTo("username",user_id);


      queryUserInfo.find({
        success: function(userinfo) {
          if (userinfo.length > 0){
            userinfo[0].destroy();
          }
        }
      });

      queryUserEdu.find({
        success: function(useredu) {
          angular.forEach(useredu, function(value){
            value.destroy();
          })
          return deferred.resolve();
        },
        error: function(){
          return deferred.resolve();
        }
      });

      return deferred.promise;
    }

    return {
      userList:userList,
      userData:userData,
      userCreate:userCreate,
      userUpdate:userUpdate,
      userDelete:userDelete
    };
  });
