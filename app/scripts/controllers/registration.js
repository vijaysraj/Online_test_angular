'use strict';

angular.module('onlineTestAngularApp')
.controller('registrationCtrl', function ($rootScope, Registrationservice, localStorageService, $location) {
  var vm = this;
  vm.errorMsg = false;

  vm.auth_token = localStorageService.get('auth-token');

  if (vm.auth_token != null) {
    if ($location.$$path === '/') {
      $location.path('/question');
    }
  }

  vm.submit = function () {

   var params = { 
      "first_name": vm.registrationForm.first_name,
      "last_name": vm.registrationForm.last_name,
      "email": vm.registrationForm.email,
      "password": vm.registrationForm.password,
      "password_confirmation": vm.registrationForm.password_confirmation,
      "phone_number": vm.registrationForm.phone_number,
      "college": vm.registrationForm.college,
      "year_of_passing": vm.registrationForm.year_of_passing
    }

    Registrationservice.postData(params).then(function(response) {
      vm.dataObj = response.data;
      if (vm.dataObj.Success === "true") {
        localStorageService.set('auth-token', vm.dataObj.Session.Auth_token);
        localStorageService.set('id', vm.dataObj.User.Id);

        $location.path('/question');
      }
      else {
        vm.errorMsg = true;
      }
    });
  };
});
