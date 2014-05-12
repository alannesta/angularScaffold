'use strict';

angular.module('angularTestApp')
  .controller('contactCtrl', function ($scope) {
    console.log('contact init');
    // $scope.direction = $scope.$root.direction;
    // console.log('contact control' + $scope.direction);

    $scope.$on('$destroy', function(){
        console.log('contact ctrl destroy');
    })

    $scope.$on('$routeChangeStart', function(){
        console.log('contact controller listener');
    })

  });
