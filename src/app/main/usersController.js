(function() {
  'use strict';

  angular
  .module('cube')
  .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController($timeout, webDevTec, toastr, $http,localStorageService,$httpParamSerializer ) {
    var vm = this;
    var authKey = localStorageService.get('token');
    
    var formatedData;

    var config = {
                headers : {
                    'Authorization': authKey
                }
            }
    vm.toggle=true;
    vm.user={};
    vm.allUsers={};

   vm.formatData = function(){
      formatedData = $httpParamSerializer(vm.user);
      console.log(formatedData);

    }

        

  var reqAddPerson = {
   method: 'PUT',
   url: 'http://developer.digitalcube.rs:8999/api/contacts',
   headers:{
     'Authorization': authKey
   },
   data:formatedData
 }



   vm.putContacts = function(){
    vm.formatData();
        var reqPutPerson = {
         method: 'PUT',
         url: 'http://developer.digitalcube.rs:8999/api/contacts/'+formatedData,
         headers:{
           'Authorization': authKey
         }
       }
        
            $http(reqAddPerson)
            .then(function(response){
              console.log('prosao');
            });
        }
     vm.deleteContact = function(id){
        var reqDeletePerson = {
         method: 'DELETE',
         url: 'http://developer.digitalcube.rs:8999/api/contacts/id/'+id,
         headers:{
           'Authorization': authKey
         }
       }
            document.getElementById(id).style.display='none';
            $http(reqDeletePerson)
            .then(function(response){
              console.log('deleted');

            });

        }



     vm.editContacts = function(){

            $http(reqAddPerson)
            .then(function(response){
              console.log('prosao');
            });
        }


   


    vm.getContacts = function(){
      $http.get('http://developer.digitalcube.rs:8999/api/contacts', config)
      .then(function(response){
        vm.allUsers=response.data;
        console.log(vm.allUsers);
      });
     }
     vm.getContacts();

    console.log( authKey);

    console.log(localStorageService.get('userIsLogedIn'));




}
})();
