'use strict'
angular.module('angularTestApp').directive('popupHint', function(){
	return {
		templateUrl: './views/directives/popuphint.html',
		link: function($scope, $element, $attrs) {
			console.log($scope.$parent.flag);
			$scope.$watch($scope.flag, function(val){
				$element.text('new value is: '+val+', old value is: '+val);
				//console.log(val);
			});

			$element.on('click', function(){
				$element.hide();
			})
		}
	}
})