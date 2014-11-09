angular.module('angularTestApp').controller('selectModalCtrl', function($scope, $modalInstance){
	$scope.items = [1,2,3,4,5,6];
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
})