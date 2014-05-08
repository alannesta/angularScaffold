'use strict';

angular.module('angularTestApp').controller('aboutCtrl', ['$interval','$scope',function($interval, $scope){
	$scope.flag = 0;
    $scope.animateToggle = false;

    $scope.animate = function(){
        $scope.animateToggle = !$scope.animateToggle
    }

    // no need to call manually
	var timer = $interval(function(){
		toggle($scope.flag);
		console.log($scope.flag);
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
        console.log('destroy');
        $interval.cancel(timer);
    })
    // $scope.$watch('flag', function(newVal, oldVal){
    //     console.log('newVal: '+ newVal+ " oldVal: "+oldVal);
    // },true)
}])