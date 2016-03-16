'use strict';

angular.module('onlineTestAngularApp')
.factory('Questionservice', function ($http, ENV) {
  var obj = {
    getData: function(data) {
      function success (response) {
        return response;
      }
      function failure (response) {
        console.log(response)
        return response;
      }
      return $http.get(ENV.api_path+"questions/2").then(success, failure);
    }
  };
  return obj;
});