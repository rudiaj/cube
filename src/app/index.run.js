(function() {
  'use strict';

  angular
    .module('cube')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
