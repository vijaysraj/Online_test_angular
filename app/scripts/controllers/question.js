'use strict';

angular.module('onlineTestAngularApp')
.controller('questionCtrl', function ($rootScope, localStorageService, $location, Questionservice, $scope, $window, $anchorScroll) {
  var vm = this;
  localStorageService.set('sectionId', 1);
  vm.id = localStorageService.get('id');
  vm.auth_token = localStorageService.get('rec-auth-token');
  vm.questionObj = localStorageService.get('question');
  vm.sectionId = localStorageService.get('sectionId');


  if (localStorageService.get('timerover')) {
    $location.path('feedback');
  } else {
    if (!localStorageService.get('timer')) {
      localStorageService.set('timer', 62);
    }

    vm.timer = localStorageService.get('timer');

    vm.updateTimer = function (){
      localStorageService.set('timer', vm.timer-1);
      vm.timer = localStorageService.get('timer');
      if (vm.timer !=0) {
        setTimeout(vm.updateTimer, 60000);
      } else {
        localStorageService.remove('timer');
        localStorageService.set('timerover',true);
      }
    }
    vm.updateTimer();
  }

  if (vm.auth_token === null) {
    if ($location.$$path === '/question') {
      $location.path('/');
    }
  }


  $scope.goto11 = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('11');

      // call $anchorScroll()
      $anchorScroll();
    };

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
        localStorageService.remove('timer');
        localStorageService.remove('timerover');
        $location.path('/feedback')
      } else {
        console.log(vm.sectionId)
        vm.sectionId = vm.sectionId + 1;
        Questionservice.getData(vm.sectionId).then(function(response){
          vm.questionObj = response.data.QuestionList;
          localStorageService.set('question', vm.questionObj);
          localStorageService.set('sectionId', response.data.SectionId);
        });
      }
    });
  }

});

