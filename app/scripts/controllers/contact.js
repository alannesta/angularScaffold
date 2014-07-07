'use strict';

angular.module('angularTestApp')
  .controller('contactCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$timeout', function ($scope, $rootScope, $location, $anchorScroll, $timeout) {
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

    $scope.items = ['ss','aa', 'cc', 'bb', 'dd', 'gg', 'ff','ss','11', '22'];
    $scope.addElement = function(){
        var index = (Math.random()*10000 % ($scope.items.length-1)).toFixed(0)
        $scope.items.push($scope.items[index]+'alan');
        // $location.hash($scope.items.length);
    }
    $scope.removeElement = function(){
        var index = (Math.random()*10000 % ($scope.items.length-1)).toFixed(0);
        $scope.items.splice(index,1);
    }   

    $scope.scroll = function(){
        var $window = $(window);
        $window.scrollTop(1000);
    }

    // $timeout(function(){
    //     console.log('scroll-plz');
    //     var $window = $(window);
    //     $window.scrollTop(1000);

    // },0)   
    
    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    };

    $scope.$on('$destroy', function(){
    })

    $scope.$on('$routeChangeStart', function(){
    })

    $scope.$watch('direction', function(newVal, oldVal){
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
