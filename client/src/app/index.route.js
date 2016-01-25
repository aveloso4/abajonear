(function() {
  'use strict';

  angular
    .module('abajonear')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('invite', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        data: {
          requireAuthentication: false
        }
      });

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        data: {
          requireAuthentication: false
        }
      });

    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        data: {
          requireAuthentication: false
        }
      });

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        data: {
          requireAuthentication: true
        }
      });

    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'ctrl',
        data: {
          requireAuthentication: true
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
