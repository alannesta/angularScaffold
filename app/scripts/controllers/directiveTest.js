'use strict';

angular.module('angularTestApp')
  .controller('directiveCtrl', ['$scope',function ($scope) {
    // var count = 0;
    $scope.stars = [];
    $scope.addStar = function(){
        $scope.stars.push('');
        
    }
    $scope.removeStar = function(){
        
        $scope.stars.pop();
          
    }
  }]);
