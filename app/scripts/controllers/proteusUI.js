'use strict';

angular.module('angularTestApp')
  .controller('proteusUiCtrl', ['$scope', 'popover', function ($scope, popover) {
  	console.log("parent controller scope:");
    console.log($scope);
    $scope.query = 'one day';
    $scope.placeholder = 'proteus Ctrl scope';
    
  }]);
