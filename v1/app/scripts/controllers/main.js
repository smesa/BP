'use strict';

/**
 * @ngdoc function
 * @name basekampApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the basekampApp
 */
angular.module('basekampApp')
.controller('MainCtrl', function ($scope, utilsServices,localStorageService) {

  // Consulto paises y los almaceno
  utilsServices.countryList().then(function(data){
    localStorageService.set('countries', data);
  });

  //Consulto ciudades y las almaceno
  utilsServices.cityList().then(function(data){
    localStorageService.set('cities', data);
  });

  // Consulto paises y los almaceno
  utilsServices.projectConfig().then(function(data){
    localStorageService.set('types', data.types);
    localStorageService.set('status', data.status);
    localStorageService.set('components', data.components);
    localStorageService.set('currency', data.currency);
  });


});
