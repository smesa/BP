
/**
 * @ngdoc service
 * @name basekampApp.usersServices
 * @description
 * # usersServices
 * Factory in the basekampApp.
 */
angular.module('basekampApp')
  .factory('usersServices', function ($http, $q, $rootScope) {


    function list(){

      var deferred = $q.defer();

      var UserInfo = Parse.Object.extend("UserInfo");
      var query    = new Parse.Query(UserInfo);

      query.find({
        success: function(data) {
          data = JSON.parse(JSON.stringify(data))

          angular.forEach(data,function(item){
            if(!item.avatar){
              item.avatar = 'images/user_default.png'
            }else{
              item.avatar = item.avatar
            }
          })


          return deferred.resolve(data);
        },
        error: function(error){
          console.log("Ocurrio el siguiente error: " + error);
          return deferred.reject(error);
        }
      });
      return deferred.promise;

    };

    function get(user_id){

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

              angular.forEach(data,function(item){
                if(!item.attributes.avatar){
                  item.attributes.avatar = 'images/user_default.png'
                }else{
                  item.attributes.avatar = item.attributes.avatar
                }
              })

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
          return deferred.resolve();

      },error: function(user,error){
        alert("Error: " + error.code + " " + error.message);
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
          return deferred.resolve();
        },
        error: function(){
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
      list:list,
      get:get,
      create:create,
      update:update,
      destroy:destroy
    };
  });
