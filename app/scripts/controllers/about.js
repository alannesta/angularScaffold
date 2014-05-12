'use strict';

angular.module('angularTestApp').controller('aboutCtrl', ['$interval','$scope',function($interval, $scope){
	console.log('about control init');
    $scope.flag = 0;
    // $scope.direction = $scope.$root.direction;
    $scope.animateToggle = false; 
    $scope.animate = function(){
        $scope.animateToggle = !$scope.animateToggle
    }

    $scope.pullDown = function(){
        // $('#loading').removeClass('hidden');
        $('#loading').addClass('show');
    }
    // no need to call manually
	var timer = $interval(function(){
		toggle($scope.flag);
		//console.log($scope.flag);
	},2000);
    

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
        console.log('about ctrl destroy');
        $interval.cancel(timer);
    })
    // $scope.$watch('flag', function(newVal, oldVal){
    //     console.log('newVal: '+ newVal+ " oldVal: "+oldVal);
    // },true)
}])