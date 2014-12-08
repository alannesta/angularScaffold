'use strict'

angular.module('angularTestApp').directive('staricon', [function () {
    return {
        restrict: 'A,E',
        transclude: true,
        replace: true,
        templateUrl: './views/directives/staricon.html',
        link: function (scope, iElement, iAttrs) {
            console.log('staricon link function: --->');
            console.log(iElement);
        }   
    };
}])