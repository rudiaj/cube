(function() {
  'use strict';

  angular
    .module('cube')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController as vm',
      })
      .when('/users', {
        resolve:{
          'check':function($location, localStorageService){
            if (!localStorageService.get('userIsLogedIn') == true) {
               $location.path('/');
            }
          }
        },
        templateUrl: 'app/main/users.html',
        controller: 'UsersController as vm',
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
