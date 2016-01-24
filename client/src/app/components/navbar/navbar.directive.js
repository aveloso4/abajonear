(function() {
  'use strict';

  angular
    .module('abajonear')
    .directive('acmeNavbar', acmeNavbar);
  acmeNavbar.$inject = ['$state', 'authenticationService'];

  /** @ngInject */
  function acmeNavbar($state, authenticationService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {},
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

      vm.authSvc = authenticationService;

      vm.logout = function logout(ev) {
        ev.preventDefault();
        vm.authSvc.logout();
        $state.go('invite');
      }
    }
  }

})();
