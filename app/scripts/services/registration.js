'use strict';

angular.module('onlineTestAngularApp')
.factory('Registrationservice', function ($http, ENV) {
  var obj = {
    postData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path+"sign_up",params).then(success, failure);
    }
  };
  return obj;
});