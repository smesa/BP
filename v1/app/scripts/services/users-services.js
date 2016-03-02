
/**
 * @ngdoc service
 * @name basekampApp.usersServices
 * @description
 * # usersServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('usersServices', function ($http, $q, $rootScope, $kinvey) {


    function list(){

      var deferred = $q.defer();

      var UserInfo = Parse.Object.extend("UserInfo");
      var query    = new Parse.Query(UserInfo);

      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))

          angular.forEach(data,function(item){
            if(!item.avatar){
              item.avatar = 'images/users-default.png'
            }else{
              item.avatar = item.avatar.url
            }
          })


          return deferred.resolve(data);
        },
        error: function(error){
          AlertJS.Notify.Error("Error",error.message);
          return deferred.reject(error);
        }
      });
      return deferred.promise;

    };

    function get(username){

      var deferred      = $q.defer();
      /*var UserInfo      = Parse.Object.extend("UserInfo");
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

              if(!data.userinfo.attributes.avatar){
                data.userinfo.attributes.avatar = {'url':'images/users-default.png'}
              }else{
                data.userinfo.attributes.avatar = data.userinfo.attributes.avatar
              }


              return deferred.resolve(data);
            }
          });

        },
        error: function(error){
          AlertJS.Notify.Error("Error",error.message);
          return deferred.reject(error);
        }
      });*/

      var query = new $kinvey.Query();
      query.equalTo('username', username);

      $kinvey.User.find(query).then(function(resp) {
          if(resp.length > 0){
            return deferred.resolve(resp[0]);
          }else{
            return deferred.reject();
          }

      }, function(err) {
          AlertJS.Notify.Error("Error",err.message);
          return deferred.reject(err);
      });

      return deferred.promise;

    };


    function create(oData, oEmail, oEdu){

      var deferred     = $q.defer();
      var newParse     = new Parse.User();
      var userEdu      = Parse.Object.extend("UserEdu");
      var userInfo     = Parse.Object.extend("UserInfo");
      var ArrEdu       = [];
      var sessionToken = Parse.User.current().getSessionToken();

      // Información de usuario
      var newUserInfo = new userInfo();
      newUserInfo.set(oData)

      // Educación de usuario
      angular.forEach(oEdu, function(value){
          var newUserEdu = new userEdu();
          value.username = oData.username;
          newUserEdu.set(value);
          ArrEdu.push(newUserEdu)
      })

      // Creación de usuario
      newParse.set('username',oData.username);
      newParse.set('password','init123');
      newParse.set('email',oEmail);

      // Creación de registro
      newParse.signUp(null,{
        success: function(res){
          newUserInfo.save() // Guarda datos de info
          Parse.Object.saveAll(ArrEdu); // Guarda educación
          AlertJS.Notify.Success("Atención","Usuario creado exitosamente");
          Parse.User.become(sessionToken).then(function (user) {
          }, function (error) {
          });
          return deferred.resolve();

      },error: function(user,error){
        AlertJS.Notify.Error("Error",error.message);
        return deferred.reject(error);
      }})




      return deferred.promise;
    };


    function update(info,edu){

      var deferred      = $q.defer();
      var UserInfo      = Parse.Object.extend("UserInfo");
      var UserEdu       = Parse.Object.extend("UserEdu");
      var queryUserInfo = new Parse.Query(UserInfo);
      var queryUserEdu  = new Parse.Query(UserEdu);
      var ArrEdu        = [];


      queryUserInfo.equalTo("username",info.attributes.username); // Consulta info
      queryUserEdu.equalTo("username",info.attributes.username); // Consulta educación

      // Información de usuario
      queryUserInfo.find({
        success: function(userinfo) {
          if (userinfo.length > 0){
            userinfo[0].set(info.attributes);
            userinfo[0].set('avatar',info.attributes.avatar)
            userinfo[0].save();
          }
        }
      });

      // Educación de usuario
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
          AlertJS.Notify.Success("Atención","Usuario actualizado exitosamente");
          return deferred.resolve();
        },
        error: function(error){
          AlertJS.Notify.Error("Error",error.message);
          return deferred.resolve();
        }
      });

      return deferred.promise;
    }


    function destroy(user_id){

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

            var query = new Parse.Query(Parse.User);
            query.equalTo("username",user_id);

            query.find({success:function(obj){
              //obj[0].destroy();

              /*Parse.User.become(sessionToken).then(function (user) {
              }, function (error) {
              });*/
            },error:function(error){
              AlertJS.Notify.Error("Error",error.message);

              return deferred.resolve();
            }})

            userinfo[0].destroy();
          }
        }
      });

      queryUserEdu.find({
        success: function(useredu) {
          angular.forEach(useredu, function(value){
            value.destroy();
          })
          AlertJS.Notify.Success("Atención","Usuario eliminado exitosamente");

          return deferred.resolve();
        },
        error: function(error){
          AlertJS.Notify.Error("Error",error.message);

          return deferred.resolve();
        }
      });

      return deferred.promise;
    }

    return {
      list:list,
      get:get,
      create:create,
      update:update,
      destroy:destroy
    };
  });
