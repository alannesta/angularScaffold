'use strict';

angular.module('angularTestApp').controller('aboutCtrl', ['$interval','$scope',function($interval, $scope){
	$scope.flag = 0
	$interval(function(){
		toggle($scope.flag);
		console.log($scope.flag);
	},2000);

	function toggle(flag){
		$scope.flag = flag+1;
	}
}])