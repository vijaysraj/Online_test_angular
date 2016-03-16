'use strict';

angular.module('onlineTestAngularApp')
.factory('Registrationservice', function ($http, ENV) {
  var obj = {
    postData: function(data) {
      console.log(data)
      function success (response) {
        console.log(response)
        return response;
      }
      function failure (response) {
        console.log(response)
        return response;
      }
      return $http.post(ENV.api_path+"sign_up",{first_name: data.first_name, last_name: data.last_name, email: data.email, password: data.password, password_confirmation: data.password_confirmation, phone_number: data.phone_number, college: data.college, year_of_passing: data.year_of_passing}).then(success, failure);
    }
  };
  return obj;
});