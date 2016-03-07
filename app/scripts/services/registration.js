'use strict';

angular.module('onlineTest')
.factory('Registrationservice', function ($http, ENV) {
  var obj = {
    postData: function(data) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path+"api/v1/sign_up",{firstname: data.firstname, lastname: data.lastname email: data.email, password: data.password}).then(success, failure);
    }
  };
  return obj;
});