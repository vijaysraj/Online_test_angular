'use strict';

angular.module('onlineTestAngularApp')
.factory('Questionservice', function ($http, ENV) {
  var obj = {
    getData: function(id) {
      function success (response) {
        return response;
      }
      function failure (response) {
        console.log(response)
        return response;
      }
      return $http.get(ENV.api_path+"questions/"+id).then(success, failure);
    },
    postData: function(params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path+"section/evaluate", params).then(success, failure);
    }
  };
  return obj;
});