'use strict';

angular.module('onlineTestAngularApp')
.controller('questionCtrl', function ($rootScope, localStorageService, $location, Questionservice) {
  var vm = this;

  vm.auth_token = localStorageService.get('auth-token');

  // if (vm.auth_token === null) {
  //   if ($location.$$path === '/question') {
  //     $location.path('/');
  //   }
  // }

  Questionservice.getData().then(function(response) {
    vm.questionObj = response.data.QuestionList
    // vm.questionObj = [{"Id":1,"Title":"The difference between the local value and face value of 7 in the numeral 657903 is:","Option_1":"0","Option_2":"7896","Option_3":"6993","Option_4":"903","Answer":"6993"}]
    console.log(vm.questionObj)
  });

});
