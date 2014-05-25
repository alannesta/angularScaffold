'use strict'

angular.module('angularTestApp').directive('ratingWidget', [function () {
    return {
        restrict: 'A,E',
        scope: {
            stars: '='
        },
        templateUrl: './views/directives/rating.html',
        link: function (scope, iElement, iAttrs) {
            // iElement.each(function(index){
            //     console.log(index);
            // })
            $('li').each(function(){
                // $(this).on('click', function(){
                //     console.log('onclick');
                //     scope.stars.pop();
                // })
                console.log(this);
            });

            $('ul').on('click', function(){
                console.log('click');
                scope.stars.pop();
                scope.$apply();
            })
            
        }
    };
}])