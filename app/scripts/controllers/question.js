'use strict';

angular.module('onlineTestAngularApp')
.controller('questionCtrl', function ($rootScope, localStorageService, $location, Questionservice, $scope, $window) {
  var vm = this;

  vm.id = localStorageService.get('id');
  vm.auth_token = localStorageService.get('rec-auth-token');
  vm.questionObj = localStorageService.get('question');
  vm.sectionId = localStorageService.get('sectionId');

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

if (vm.questionObj === null || vm.questionObj === undefined) {
Questionservice.getData(1).then(function(response) {
   vm.questionObj = response.data.QuestionList;
  localStorageService.set('question', vm.questionObj)
  localStorageService.set('sectionId', response.data.SectionId)
});
}




vm.submitAnswers = function() {
  var selectedOptions = [];
  angular.forEach(vm.questionObj, function(question) {
    selectedOptions.push({
      "QuestionId": question.Id,
      "Answer": question.selectedOption
    })
  });

  var params = {
    "SectionId": vm.sectionId,
    "UserId": vm.id,
    "Questions": selectedOptions
  }
  Questionservice.postData(params).then(function(response){
    if (vm.sectionId === 3){
    localStorageService.remove('id')
    localStorageService.remove('rec-auth-token');
    localStorageService.remove('question');
    localStorageService.remove('sectionId');
    $location.path('/')
    }
    else {
      Questionservice.getData(vm.sectionId + 1).then(function(response){
        console.log(vm.sectionId + 1);
        vm.questionObj = response.data.QuestionList;
        localStorageService.set('question', vm.questionObj)
        localStorageService.set('sectionId', response.data.SectionId)
      });
    }
  });
  }
});

