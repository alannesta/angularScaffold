'use strict';

angular.module('angularTestApp')
  .controller('directiveCtrl', ['$scope',function ($scope) {
    $scope.stars = [1,2,3,4,5];
  }]);
