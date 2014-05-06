'use strict'
angular.module('angularTestApp').directive('popupHint', function(){
	return {
		templateUrl: './views/directives/popuphint.html',
		// scope:{
		// 	value: "@"
		// },
		link: function(scope, element, attrs) {
			// console.log(scope.flag);
			// console.log(element.text());
			scope.$watch(attrs.flagvalue, function(val1, val2){
				element.text('new value is: '+ val1 +', old value is: '+ val2);
				console.log(val1+' '+val2);
			});
			
			element.on('click', function(){
				element.hide();
			})
		}
	}
})