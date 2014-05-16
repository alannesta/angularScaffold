'use strict';

angular.module('angularTestApp')
  .controller('contactCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    console.log('contact init');
    // $scope.direction = $scope.$root.direction;
    // console.log('contact control' + $scope.direction);

    // $scope.back = function(){
    //     $rootScope.direction = 'right';
    //     // $location.path('/about');
    // }

    // $scope.forward = function(){
    //     $rootScope.direction = 'left'
    //     // $location.path('/');
    // }

    $scope.$on('$destroy', function(){
        console.log('contact ctrl destroy, direction: '+ $rootScope.direction);

    })

    $scope.$on('$routeChangeStart', function(){
        console.log('contact controller route change listener');
    })

    $scope.$watch('direction', function(newVal, oldVal){
        console.log('contact direction changed to: ' + newVal);
        
    })      

  }]);
