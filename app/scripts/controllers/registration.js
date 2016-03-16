'use strict';

angular.module('onlineTestAngularApp')
.controller('registrationCtrl', function ($rootScope, Registrationservice, localStorageService, $location) {
  var vm = this;
  vm.errorMsg = false;

  vm.auth_token = localStorageService.get('auth-token');

  // if (vm.auth_token != null) {
  //   if ($location.$$path === '/') {
  //     $location.path('/question');
  //   }
  // }

  vm.submit = function () {
    console.log(vm.registrationForm)
    Registrationservice.postData(vm.registrationForm).then(function(response) {
      vm.dataObj = response.data;
      if (vm.dataObj.Status === true) {
        console
        localStorageService.set('auth-token', vm.dataObj.Session.Auth_token);
        $location.path('/question');
      }
      else {
        vm.errorMsg = true;
      }
    });
  };
});
