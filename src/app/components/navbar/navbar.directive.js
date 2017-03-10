(function() {
  'use strict';

  angular
  .module('cube')
  .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $location,$http,localStorageService ) {
      var vm = this;
      var authKey = localStorageService.get('token');
      var config = {
        headers : {
          'Authorization': authKey
        }
      }

      vm.logOut = function (){
        localStorageService.remove('token');
        localStorageService.remove('userIsLogedIn');
        $location.path('/');
        console.log('logout');
        $http.post('http://developer.digitalcube.rs:8999/user/logout', config)
        .then(function(response){

          console.log(response);
        });
      }
    }
  }

})();
