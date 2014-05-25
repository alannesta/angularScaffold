'use strict'

angular.module('angularTestApp').directive('ratingWidget', [function () {
    return {
        restrict: 'A,E',
        templateUrl: './views/directives/rating.html',
        link: function (scope, iElement, iAttrs) {
            
        }
    };
}])