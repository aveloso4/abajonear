(function() {
  'use strict';

  angular
    .module('abajonear')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $state, $rootScope) {

    $log.debug('runBlock end');
    
    $rootScope.goTo = $state.go;
  }

})();
