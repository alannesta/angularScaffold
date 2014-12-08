'use strict'

angular.module('angularTestApp').directive('staricon', [function () {
    return {
        restrict: 'A,E',
        transclude: true,
        templateUrl: './views/directives/staricon.html',
        link: function (scope, iElement, iAttrs) {

        }
    };
}])