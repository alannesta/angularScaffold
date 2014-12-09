'use strict';

angular.module('angularTestApp').controller('ratingWidgetCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	var ctrl = this;
	ctrl.open = true;
	ctrl.logFunc = function(str){
		console.log(str);
	}
	ctrl.toggle = function(){
		ctrl.open = !ctrl.open;
	}	

}]);