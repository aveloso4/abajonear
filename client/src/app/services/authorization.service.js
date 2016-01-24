(function() {
  'use strict';

  angular.module('abajonear').service('authorizationService', AuthorizationService);
  AuthorizationService.$inject = ['authenticationService'];

  function AuthorizationService(authenticationService) {

    function isAuthorized(state) {
      var requireLogin = state.data && state.data.requireAuthentication;
      var isLoggedIn = authenticationService.isUserLoggedIn();
      var authorized = !requireLogin || !!isLoggedIn;

      return authorized;
    }

    return {
      isAuthorized: isAuthorized
    };
  }
}());