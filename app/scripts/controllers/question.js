'use strict';

angular.module('onlineTestAngularApp')
.controller('questionCtrl', function ($rootScope, localStorageService, $location, Questionservice, $scope, $window) {
  var vm = this;

  vm.id = localStorageService.get('id');

  vm.auth_token = localStorageService.get('auth-token');

  if (vm.auth_token === null) {
    if ($location.$$path === '/question') {
      $location.path('/');
    }
  }

  // for restricting page refresh

//   document.onkeydown = function(){
//   switch (event.keyCode){
//         case 116 : //F5 button
//             event.returnValue = false;
//             event.keyCode = 0;
//             return false;
//         case 82 : //R button
//             if (event.ctrlKey){ 
//                 event.returnValue = false;
//                 event.keyCode = 0;
//                 return false;
//             }
//     }
// }

  Questionservice.getData(2).then(function(response) {
    vm.questionObj = response.data.QuestionList
    // vm.questionObj = fakeResponse
  });

  vm.submitAnswers = function() {
    var selectedOptions = [];
    angular.forEach(vm.questionObj, function(question) {
      selectedOptions.push({ 
        "QuestionId": question.Id,
        "Answer": question.selectedOption
      })
    });

    var params = {
      "SectionId": 1,
      "UserId": vm.id,
      "Questions": selectedOptions
    }
    Questionservice.postData(params).then(function(response){
      localStorageService.remove('id')
      localStorageService.remove('auth-token');
      $location.path('/')
    })
    // 1 - Submit the answers
    // 2 - Get new set of questions
  }
});

