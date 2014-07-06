'use strict';

angular.module('angularTestApp')
  .controller('contactCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
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

    $scope.items = ['ss','aa', 'cc', 'bb', 'dd', 'gg', 'ff'];
    $scope.addElement = function(){
        var index = (Math.random()*10000 % ($scope.items.length-1)).toFixed(0)
        console.log(index);
        $scope.items.push($scope.items[index]+'alan');
    }
    $scope.removeElement = function(){
        var index = (Math.random()*10000 % ($scope.items.length-1)).toFixed(0);
        $scope.items.splice(index,1);
    }

    $scope.$on('$destroy', function(){
        console.log('contact ctrl destroy, direction: '+ $rootScope.direction);

    })

    $scope.$on('$routeChangeStart', function(){
        console.log('contact controller route change listener');
    })

    $scope.$watch('direction', function(newVal, oldVal){
        console.log('contact direction changed to: ' + newVal);
        
    })      

  }]).animation('.fly-in-out', function(){
    return {
        enter: function(element, done) {
            var $element = $(element);
            TweenLite.to($element, 0.5, {scale:1.5});
            TweenLite.to($element, 0.5, {scale:1, delay:0.5});
            done();
            
        },
        leave: function(element, done) {
            var $element = $(element);
            TweenLite.to($element, 0.5, {scale:0.5,onComplete: done});
            // done();
        }

    }
  });
