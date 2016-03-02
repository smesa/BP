'use strict';

/**
 * @ngdoc overview
 * @name basekampApp
 * @description
 * # basekampApp
 *
 * Main module of the application.
 */

var initialized = false;

angular
  .module('basekampApp', [
    'ngResource',
    'ngRoute',
    'smart-table',
    'LocalStorageModule',
    'ui.bootstrap',
    'ngDialog',
    'kinvey'
  ])
  .constant('kinveyConfig', {
    appKey: 'kid_Z1dnCghqAl',
    appSecret: 'cee4f0c9935f4b5ab544b3b71b28a35b'
  })
  .config(function ($routeProvider,localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/user-list', {
        templateUrl: 'views/user-list.html',
        controller: 'UserListCtrl',
        controllerAs: 'userList'
      })
      .when('/user-create', {
        templateUrl: 'views/user-create.html',
        controller: 'UserCreateCtrl',
        controllerAs: 'userCreate'
      })
      .when('/user-edit/:user_id', {
        templateUrl: 'views/user-edit.html',
        controller: 'UserEditCtrl',
        controllerAs: 'userEdit'
      })
      .when('/project-list', {
        templateUrl: 'views/project-list.html',
        controller: 'ProjectListCtrl',
        controllerAs: 'projectList'
      })
      .when('/project-edit/:prj_id', {
        templateUrl: 'views/project-edit.html',
        controller: 'ProjectEditCtrl',
        controllerAs: 'projectEdit'
      })
      .when('/images-temp', {
        templateUrl: 'views/load-images-temp.html',
        controller: 'LoadImagesTempCtrl',
        controllerAs: 'loadImagesTemp'
      })
      .when('/teams-list/:prj_id', {
        templateUrl: 'views/teams-list.html',
        controller: 'TeamsListCtrl'
      })
      .when('/tasks-list/', {
        templateUrl: 'views/tasks-list.html',
        controller: 'TasksListCtrl'
      })
      .when('/teams-create', {
        templateUrl: 'views/teams-create.html',
        controller: 'TeamsCreateCtrl',
        controllerAs: 'teamsCreate'
      })
      .when('/teams-edit/:team_id', {
        templateUrl: 'views/teams-edit.html',
        controller: 'TeamsEditCtrl',
        controllerAs: 'teamsEdit'
      })
      .when('/members-list/:prj_id/:team_id', {
        templateUrl: 'views/members-list.html',
        controller: 'MembersListCtrl',
        controllerAs: 'membersList'
      })
      .otherwise({
        redirectTo: '/'
      });

    localStorageServiceProvider
      .setPrefix('IBM-BaseKamp')
      .setStorageType('sessionStorage')
      .setNotify(true, true);

    $.fn.datepicker.dates['ES'] = {
  		    days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
  		    daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  		    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
  		    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  		    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  		    today: "Hoy",
  		    clear: "Borrar"
  	};

    AlertJS.setSetting("sound", true);

  })
  .run(['$kinvey', '$rootScope', '$location', 'kinveyConfig', function($kinvey, $rootScope, $location, kinveyConfig) {
    $rootScope.$on('$locationChangeStart', function(event, newUrl) {
        if (!initialized) {
            //event.preventDefault(); // Stop the location change
            // Initialize Kinvey
            $kinvey.init(kinveyConfig).then(function() {
                initialized = true;
                //$location.path($location.url('/')); // Go to the page
            }, function(err) {
              console.log('Error en INIT: ' + err)
            });
        }
    });
  }]);
