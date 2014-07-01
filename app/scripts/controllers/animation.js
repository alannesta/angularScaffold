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
            TweenLite.to(div, 1.5, {width:200, top:100,left:100});
        })

        
        
        
    }

  }]);
