angular.module('starter.controllers', [])

.controller('PlanksCtrl', function($scope, $rootScope, $state, LocalDb, Challenges) {
// console.log(test);
  $scope.dataset = Challenges.all();

  LocalDb.getAll().then(function(data){
    $scope.tryDay = data.length + 1;
  });

  $scope.goPlank = function(day) {
    $state.go('tab.planks-day', {'plankDay':day});
  };
})

.controller('PlankEachCtrl', function($scope, $state, $stateParams, $ionicModal, $interval, Challenges, LocalDb) {
  var data;
  $scope.doneFlg = false;
  data = Challenges.get($stateParams.plankDay);

  $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
    $scope.timer = data.time;
    $scope.finishText = "";
    var timer = $interval(function(){
      var hoge = this;
      $scope.timer -= 1;
      if($scope.timer === 0){
        $scope.finishText = "FINISH";
        $interval.cancel(timer);
        LocalDb.addOne({
          '_id': "day"+$stateParams.plankDay,
          'day': $stateParams.plankDay
        });
        $scope.doneFlg = true;
      }
    }, 1000);
  };

  $scope.doneChallenge = function(day){
    $scope.modal.remove();
    $state.go('tab.planks');
  };

  $scope.data = data;

})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingCtrl', function($scope, $state, $ionicPopup,LocalDb) {
  $scope.deleteAll = function() {
    LocalDb.deleteAll();
    $ionicPopup.show({
      // template: '<input type="password" ng-model="data.wifi">',
      title: 'Confirm',
      subTitle: 'Deleted all activities.',
      scope: $scope,
      buttons: [
        { text: 'Confirm',
          onTap: function(e) {
            $state.go('tab.planks');
            return true;
          }
        },
      ]
    });
  }
});
