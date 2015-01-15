'use strict';

angular.module('angularTestApp')
  .controller('directiveCtrl', ['$scope', '$modal',function ($scope, $modal) {
    $scope.stars = [{hotel: 'hilton'}, {hotel: 'shearton'}, {hotel: 'holiday inn'}, {hotel: 'marriote'}];
    $scope.modalVisible = false;
    $scope.modalText = 'Enjoy the same scope';
    $scope.userInput = 'original';

    /*ngmodel controller*/
    $scope.changeUserInput = function(){
      $scope.userInput = 'changed';
    }

    $scope.$watch('userInput', function(newVal, oldVal){
      // console.log('parent ctrl val changed: ---->' + newVal);
    })

    /*rating widget*/
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

    /* Title directive */
    // $scope.title = 'some text';
    $scope.title = '<h4 style="color:blue">Yeehaw</h4>'
    

    
  }]);
