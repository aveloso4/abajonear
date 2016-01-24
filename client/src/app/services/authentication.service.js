(function() {
  'use strict';

  angular.module('abajonear').service('authenticationService', AuthenticationService);
  AuthenticationService.$inject = ['$rootScope', '$q', 'authenticationApi', 'sessionStorage'];

  function AuthenticationService($rootScope, $q, authenticationApi, sessionStorage) {

    function login(creds) {
      //call login service
      var result = authenticationApi.login(creds);
      result.then(
        function(response) {
          saveTokens(response);
        },
      //ON ERROR
      //erase token and refreshToken
        function() {
          eraseTokens();
        });

      return result;
    }

    function create(user) {
      var result = authenticationApi.create(user);
      result.then(
        function(response) {
          // user logs in after creating account
          saveTokens(response.tokens);
        }, function() {
          eraseTokens();
        });

      return result;
    }
    
    function logout() {
      eraseTokens();
    }

    function saveTokens(tokens) {
      sessionStorage.setItem('access-token', tokens.access_token, 30);
      sessionStorage.setItem('refresh-token', tokens.refresh_token, 30);
    }

    function eraseTokens() {
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('refresh-token');
    }

    function isUserLoggedIn() {
      //returns true if token && refreshToken
      var token = sessionStorage.getItem('access-token'),
          refreshToken = sessionStorage.getItem('refresh-token');

      return token && refreshToken;
    }

    return {
      login: login,
      logout: logout,
      isUserLoggedIn: isUserLoggedIn,
      createAccount: create
    };
  }
}());
