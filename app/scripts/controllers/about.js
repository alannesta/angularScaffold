'use strict';

angular.module('angularTestApp').controller('aboutCtrl', ['$interval','$scope', '$rootScope', '$animate', function($interval, $scope, $rootScope, $animate){
    $scope.flag = 0;
    $scope.animateToggle = false;
    $scope.toggleFade = false;
    var ele = $('<div class="flyinout">Angular Animation</div>');

    $scope.animate = function(){
        $scope.animateToggle = !$scope.animateToggle
        // $scope.velocityFlyin();  // animation queued
        $scope.angularAnimate();    // animation not queued
    }

    $scope.velocityFlyin = function(){
        var div = $('.velocityFlyin');
        if ($scope.animateToggle){
            div.velocity('stop');
            div.velocity({left: -window.innerWidth, opacity: 0}, 2000);
        }else{
            div.velocity('stop');
            div.velocity({left: 500, opacity: 1}, 2000);
        }
    }

    $scope.angularAnimate = function(){
        if ($scope.animateToggle){
            $animate.leave(ele);
        }else{
            $animate.enter(ele, document.body, $('.velocityFlyin'));
        }
      $scope.animateToggle = !$scope.animateToggle;

        // $scope.animateToggle = !$scope.animateToggle;
    }

    // $scope.$watch('animateToggle', function(val){
    //     if (val){
    //         $animate.leave(ele);
    //     }else{
    //         $animate.enter(ele, document.body, $('.velocityFlyin'));
    //     }
    // });

    $scope.pullDown = function(){
        // $('#loading').removeClass('hidden');
        // $('#loading').addClass('show');

        if ($scope.animateToggle){
            $('#loading').velocity('stop');
            $('#loading')
                .velocity({height: 300}, { duration: 500});
        }else{
            $('#loading').velocity('stop');
            $('#loading').velocity({height: 0}, { duration: 500});
        }

        $scope.animateToggle = !$scope.animateToggle
    }
    // no need to call manually
	// var timer = $interval(function(){
	// 	toggle($scope.flag);
	// 	//console.log($scope.flag);
	// },2000);


    //need to call scope.$apply manually to update DOM
    // setInterval(function(){
    //  toggle($scope.flag);
    //  $scope.$apply();
    //  console.log($scope.flag);
    // },2000);

	function toggle(flag){
		$scope.flag = flag+1;
	}

    $scope.$on('$destroy', function(){
        //$interval.cancel(timer);
    })
    $scope.$watch('direction', function(newVal, oldVal){

    })
}]);
