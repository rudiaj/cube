(function() {
  'use strict';

  angular
  .module('cube')
  .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $http,localStorageService,$httpParamSerializer,$location ) {
    var vm = this;
    vm.authKey;
    vm.loginData={};



    var config = {
      headers : {
        'Authorization': 's00000EMehdRg2JNzByuS65m7l3DyxZMb8J8jh9kfoFIuAKO26aptQebI9YgQSwe',
      }
    }

    vm.login = function (){
      if(vm.loginData.username =="aj.rudi%40gmail.com" && vm.loginData.password =="rudiaj23"){

        $http.post("http://developer.digitalcube.rs:8999/user/login?username="+vm.loginData.username+"&password="+vm.loginData.password ,config )
        .then(function(response){
         localStorageService.set('token', response.data.token);
         localStorageService.set('userIsLogedIn', true);
         $location.path('/users');
         vm.authKey = localStorageService.get('token'); 
       });
      }
      else{
        console.log('wrong login data');
      }
    }
  }
})();
