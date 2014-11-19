'use strict';

angular.module('angularTestApp')
  .controller('directiveCtrl', ['$scope', '$modal',function ($scope, $modal) {
    $scope.stars = [];
    $scope.modalVisible = false;
    $scope.modalText = 'Enjoy the same scope';

    $scope.addStar = function(){
        $scope.stars.push('');
        
    }
    $scope.removeStar = function(){
        $scope.stars.pop();     
    }

    /*
      Method 1: the ui.bootstrap way of show modal---> $modal service
    */
    $scope.showModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'selectModalCtrl',
            resolve: {

            }
        })

        // console.log(modalInstance);
        /*  
            the modalInstance.result is a promise. add handler to promise.
            source:

            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              }
            };
            
        */

        modalInstance.result.then(function(result){
            // console.log(result);
            for (var i = 0; i<result; i++){
                 $scope.stars.push('');
            }
        })
    }


    /*
      Method 2: wrap bootstrap modal in customized directive
    */
    $scope.bootstrapModal = function(){
      // $("#modal-container").modal();
      $scope.modalVisible = true;
    } 

    $scope.verify = function(){
      console.log("verified");
    }

    
  }]);
