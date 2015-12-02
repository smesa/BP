'use strict';

/**
 * @ngdoc overview
 * @name basekampApp
 * @description
 * # basekampApp
 *
 * Main module of the application.
 */
angular
  .module('basekampApp', [
    'ngResource',
    'ngRoute',
    'smart-table',
    'LocalStorageModule',
    'ui.bootstrap',
    'ngDialog'
  ])
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
      .when('/project-create', {
        templateUrl: 'views/project-create.html',
        controller: 'ProjectCreateCtrl',
        controllerAs: 'projectCreate'
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

    Parse.$ = jQuery;
    Parse.initialize("azXqupSuOSFLFgVnelWhl6x44rtScVwwvEg9Gh5c", "U4ACfj9UzW1tV8b1OxpBSmOcMntVN8YsAju6ORIg");

  });
