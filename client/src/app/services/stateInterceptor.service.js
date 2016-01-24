(function() {
  'use strict';

  angular.module('abajonear').run([
    '$rootScope',
    '$state',
    'authorizationService',
    function($rootScope, $state, authorizationService) {
      var shouldRedirect = false,
          error = false,
          redirectState,
          redirectParams;

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        var loginState = 'login',
            authorized = authorizationService.isAuthorized(toState);

        if (shouldRedirect && toState.name !== loginState) {//Second validation is to avoid infinite cyclic calls
          event.preventDefault();
          shouldRedirect = false;

          $state.go(redirectState, redirectParams);
        } else if (!authorized) {
          event.preventDefault();
          shouldRedirect = true;
          redirectState = toState.name;
          redirectParams = toParams;

          $state.go(loginState);
        }
      });
    }]
  );
}());
