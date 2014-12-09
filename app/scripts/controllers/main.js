'use strict';

angular.module('angularTestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // $scope.direction = $scope.$root.direction;
    // console.log('main control' + $scope.direction);
    $scope.tools = [{title:'kaka', content:'lala'},{title:'kaka1', content:'lala1'},{title:'kaka2', content:'lala2'}]

    $scope.$on('$destroy', function(){
      
    });


  });
