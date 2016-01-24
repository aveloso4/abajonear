(function() {
  'use strict';

  angular
    .module('abajonear')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, $state, authenticationService) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1453654074385;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

    if (authenticationService.isUserLoggedIn()) {
      return $state.go('home');
    }
  }
})();
