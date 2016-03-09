'use strict';

/**
 * @ngdoc overview
 * @name onlineTestAngularApp
 * @description
 * # onlineTestAngularApp
 *
 * Main module of the application.
 */
angular
  .module('onlineTestAngularApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'main'
      })
      .when('/question', {
        templateUrl: 'views/question.html',
        controller: 'questionCtrl',
        controllerAs: 'question'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
