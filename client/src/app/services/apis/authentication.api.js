(function() {
  'use strict';

  angular.module('abajonear').service('authenticationApi', AuthenticationApi);
  AuthenticationApi.$inject = ['$q', '$resource', 'apiBaseUrl'];

  function AuthenticationApi($q, $resource, apiBaseUrl) {

    var endpointUrl = apiBaseUrl + '/auth',
        authEndpoint = $resource(endpointUrl,
          {},
          {
            login: {
              method: 'POST'
            },
            logout: {
              method: 'DELETE'
            },
            create: {
              method: 'POST',
              url: apiBaseUrl + '/auth/create'
            }
          });

    function login(creds) {
      var defer = $q.defer();

      authEndpoint.login(creds,
        function(response) {
          defer.resolve(response);
        },
        function(response) {
          defer.reject(response);
        })

      return defer.promise;
    }

    function logout() {
      var defer = $q.defer();

      authEndpoint.logout({},
        function(response) {
          defer.resolve(response);
        },
        function(response) {
          defer.reject(response);
        })

      return defer.promise;
    }

    function create(user) {
      var defer = $q.defer();

      authEndpoint.create(user,
        function(response) {
          defer.resolve(response);
        },
        function(response) {
          defer.reject(response);
        })

      return defer.promise;
    }

    return {
      login: login,
      logout: logout,
      create: create
    };
  }
}());