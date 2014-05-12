'use strict';

angular.module('angularTestApp')
  .controller('contactCtrl', function ($scope) {

    $scope.direction = $scope.$root.direction;
    console.log('contact control' + $scope.direction);

  });
