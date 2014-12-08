'use strict'

angular.module('angularTestApp').directive('ratingWidget', [function () {
    return {
        restrict: 'A,E',
        transclude: true,
        scope: {
            //do not bind to parent scope
            stars: '='      
        },
        templateUrl: './views/directives/rating.html',
        link: function (scope, iElement, iAttrs) {
            // scope.stars = [1,2,3,4,5];
            // $('ul').on('click', function(){
            //     console.log('click');
            //     scope.stars.push('');
            //     scope.$apply();
            // })
            iElement.on('click', function(){
                console.log('click');
                scope.stars.push('');
                scope.$apply();
            });

            // scope.toggleStar = function(index){
            //     // console.log(index);

            //     iElement.find('li').each(function(idx){
            //         if (idx<=index){
            //             $(this).find('i').removeClass('fa-star-o').addClass('fa-star');
            //         }else{
            //             $(this).find('i').addClass('fa-star-o').removeClass('fa-star');
            //         }
            //     })
            // }
            
            
        },
        // controller: ['$scope',function($scope){
        //     // console.log($scope);
        //     // $scope.stars = [1,2,3,4,5];
        //     $scope.toggleStar = function(index){
        //         // console.log(index);
        //         $('li').each(function(idx){
        //             if (idx<=index){
        //                 $(this).find('i').removeClass('fa-star-o').addClass('fa-star');
        //             }else{
        //                 $(this).find('i').addClass('fa-star-o').removeClass('fa-star');
        //             }
        //         })
        //     }
        //     // $('ul').on('click', function(){
        //     //     console.log('click');
        //     //     $scope.stars.push('');
        //     //     $scope.$apply();
        //     // }) 
        // }]
    };
}])