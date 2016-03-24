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
    'ngTouch',
    'LocalStorageModule',
    'config',
    'timer'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/registration.html',
        controller: 'registrationCtrl',
        controllerAs: 'registration'
      })
      .when('/question', {
        templateUrl: 'views/question.html',
        controller: 'questionCtrl',
        controllerAs: 'question'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'feedbackCtrl',
        controllerAs: 'feedback'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
