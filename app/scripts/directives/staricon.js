'use strict'

angular.module('angularTestApp').directive('staricon', [function () {
    return {
        restrict: 'A,E',
        transclude: true,
        replace: true,
        require:'^ratingWidget',
        templateUrl: './views/directives/staricon.html',
        link: function (scope, iElement, iAttrs, $ratingCtrl) {
            // console.log('staricon link function: --->');
            // console.log(iElement);
            $ratingCtrl.logFunc('from staricon');
        }   
    };
}])