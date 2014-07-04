'use strict';

angular.module('angularTestApp')
  .controller('animationCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    
    $scope.animate = function(){
        var div = $('#tweenmaxblock');
        var div2 = $('#jqueryblock');


        div2.animate({
            width:200,
            top:100,
            left:100
        },1500, function(){
            div2.animate({
                width:100,
                top:0,
                left:0
            },1500)
        });

        // TweenLite.to(div, 1.5, {width:200, top:100,left:100});
        TweenLite.to(div, 1.5, {width:200, x:100, y:100});
        TweenLite.to(div, 1.5, {width:100, x:0, y:0, delay:1.5});

        
    }

  }]);
