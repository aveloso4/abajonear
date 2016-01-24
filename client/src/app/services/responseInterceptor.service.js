(function() {
  'use strict';

  angular.module('abajonear').factory('responseInterceptor', ResponseInterceptor);

  function ResponseInterceptor($q, $injector) {
    /**
     * @function
     * Inserts authentication data on request header
     * @name onRequest
     */
    function onRequest(configuration) {
      return configuration;
    }

    /**
     * @function
     * @name onRequestError
     */
    function onRequestError(rejection) {
      return $q.reject(rejection);
    }

    /**
     * @function
     * @name onResponse
     */
    function onResponse(response) {
      var result = response;

      if (response.data && typeof response.data.success !== 'undefined') {
        if (response.data.success) {
          result = $q.resolve(response);
        } else {
          var alertSrv = $injector.get('AlertService');
          alertSrv.show({
            msg: response.data.message
          });
          result = $q.reject(response);
        }
      }

      return result;
    }

    /**
     * @function
     * @name onResponseError
     */
    function onResponseError(rejection) {
      var promiseResponse = {};

      switch (rejection.status) {
        case 0:
        case 403:
          promiseResponse = {status: 403, text: 'Forbidden'};
          break;
        case 401:
          //return tryToRefreshToken(rejection);
          break;
        case 404:
          promiseResponse = {status: 404, text: 'API not found'};
          break;
        case 500:
          promiseResponse = {status: 500, text: 'Internal Server Error'};
          break;
        default:
          promiseResponse = {status: rejection.status, text: 'Error'};
          break;
      }

      return $q.reject(promiseResponse);
    }

    // Private -----------------------

    /*function tryToRefreshToken(rejection) {
      // circular dependency bypass - see http://bit.ly/1CUmqJZ
      var authService = $injector.get('authenticationService'),
      state = $injector.get('$state'),
      http = $injector.get('$http'),
      sessionStorage = $injector.get('sessionStorage'),
      deferred = $q.defer();

      authService.refreshToken().then(
        function onOk(response){
          var accessToken = sessionStorage.getItem('access-token');
          rejection.config.headers.Authorization = 'bearer ' + accessToken;

          return http(rejection.config).then(deferred.resolve, deferred.reject);
        },
        function onUnauthorized(response){
          state.go('login');
      });

        return deferred.promise;
    }*/

    return {
      request: onRequest,
      requestError: onRequestError,
      response: onResponse,
      responseError: onResponseError
    };
  }
}());