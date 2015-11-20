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
  utilsServices.projectConfig().then(function(data){
    localStorageService.set('types', data.types);
    localStorageService.set('status', data.status);
    localStorageService.set('components', data.components);
    localStorageService.set('currency', data.currency);
    localStorageService.set('countries', data.countries);
    localStorageService.set('cities', data.cities);
  });


});
