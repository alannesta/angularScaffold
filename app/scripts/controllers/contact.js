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

    $scope.draggable = {attr: 'draggable'};

    $scope.dropzone = {};

    $scope.addElement = function(){
        var index = getRandomIndex();

        $scope.items.push(guid()+'alan');
        // $location.hash($scope.items.length);
    }
    $scope.removeElement = function(){
        var length = $scope.items.length;
        var index = getRandomIndex();
        $scope.items.splice(index,1);
    }

    function getRandomIndex(){
        var length = $scope.items.length;
        var index = Math.floor((Math.random()*length));
        // var index = parseInt((Math.random()*length),10);
        console.log(index+"/"+length);
        return index;
    }

    //id generator from mass framework(no conflict garanteed?)
    function generateID(){
        return setTimeout("1")+"";
    }

    // Generate four random hex digits.
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    // Generate a pseudo-GUID by concatenating random hexadecimal.(from backbone localstorage)
    function guid() {
       return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };


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
    });

    $scope.$on('$routeChangeStart', function(){
    });

    $scope.$watch('direction', function(newVal, oldVal){
    });

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
