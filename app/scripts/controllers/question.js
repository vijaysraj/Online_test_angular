'use strict';

angular.module('onlineTestAngularApp')
.controller('questionCtrl', function ($rootScope, localStorageService, $location, Questionservice, $scope, $window) {
  var vm = this;

  vm.id = localStorageService.get('id');
  vm.auth_token = localStorageService.get('rec-auth-token');
  vm.questionObj = localStorageService.get('question');

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
  console.log(vm.questionObj)
if (vm.questionObj === null || vm.questionObj === undefined) {
Questionservice.getData(2).then(function(response) {
   vm.questionObj = response.data.QuestionList;
  localStorageService.set('question', vm.questionObj)
});
}

console.log(vm.questionObj)



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
    console.log(response)
    localStorageService.remove('id')
    localStorageService.remove('rec-auth-token');
    localStorageService.remove('question');
    $location.path('/')
  })
    // 1 - Submit the answers
    // 2 - Get new set of questions
  }
});

