/* global moment:false */
(function() {
  'use strict';

  angular
    .module('abajonear')
    .constant('moment', moment)
    .constant('apiBaseUrl', 'http://localhost:8080/api');
})();
