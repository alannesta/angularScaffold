'use strict'

angular.module('angularTestApp').directive('ratingWidget', [function () {
    return {
        restrict: 'A,E',
        scope: {
            //do not bind to parent scope
            // stars: '='      
        },
        templateUrl: './views/directives/rating.html',
        // link: function (scope, iElement, iAttrs) {
        //     scope.stars = []
        //     $('ul').on('click', function(){
        //         console.log('click');
        //         scope.stars.push('');
        //         scope.$apply();
        //     })  
        // }
        controller: ['$scope',function($scope){
            console.log($scope);
            $scope.stars = [];
            $('ul').on('click', function(){
                console.log('click');
                $scope.stars.push('');
                $scope.$apply();
            }) 
        }]
    };
}])