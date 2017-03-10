(function() {
  'use strict';

  angular
  .module('cube')
  .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController($timeout, webDevTec, toastr, $http,localStorageService,$httpParamSerializerJQLike) {
    var vm = this;
    var authKey = localStorageService.get('token');

    (function(){
        console.log('self')
    }());
    
    

    var config = {
                headers : {
                    'Authorization': authKey
                }
            }

    vm.toggle=true;
    vm.user={};
    vm.allUsers={};
    vm.userEdit={};
    vm.formSettings={};
    vm.countries={};
    vm.selectedCountry={};





    vm.getContacts = function(){
      $http.get('http://developer.digitalcube.rs:8999/api/contacts', config)
      .then(function(response){
        vm.allUsers=response.data;
        console.log(vm.allUsers);
      });
     }
     vm.getContacts();

     vm.getCountries = function(){
      $http.get('http://developer.digitalcube.rs:8999/api/countries', config)
      .then(function(response){
        vm.countries=response.data.countries;
        
        console.log(vm.countries);
      });
     }
     vm.getCountries();





   vm.putContact = function(){
        var reqPutPerson = {
         method: 'PUT',
         url: 'http://developer.digitalcube.rs:8999/api/contacts?'+$httpParamSerializerJQLike(vm.user),
         headers:{
           'Authorization': authKey
         }
       }
            $http(reqPutPerson)
            .then(function(response){
              vm.getContacts();
              console.log('prosao');
            });
    }

    vm.sendUser = function (user){
      vm.userEdit = user;
    }

    vm.changeContact = function (){
          var reqChangePerson = {
         method: 'PATCH',
         url: 'http://developer.digitalcube.rs:8999/api/contacts/id_contact/'+vm.userEdit.id+'?'+$httpParamSerializerJQLike(vm.userEdit),
         headers:{
           'Authorization': authKey
         }
       } 
        $http(reqChangePerson)
            .then(function(response){
              vm.getContacts();
              console.log('user changed');

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


    console.log( authKey);

    console.log(localStorageService.get('userIsLogedIn'));

    // dialog code
    var editUserDialog = document.querySelector('#editUserDialog');
    var addUserDialog = document.querySelector('#addUserDialog');



    vm.showModal = function(dialogType){
      if (dialogType == 1) {
        editUserDialog.showModal();
      }
      else if(dialogType == 2){
          addUserDialog.showModal();
      }
      
    }
     vm.closeModal = function(dialogType){
       if (dialogType == 1) {
        editUserDialog.close();
      }
      else if(dialogType == 2){
          addUserDialog.close();
      }
    }
}
})();
