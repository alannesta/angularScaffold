'use strict'

angular.module('angularTestApp').directive('ratingWidget', ['$timeout', function ($timeout) {
    return {
        restrict: 'A,E',
        transclude: true,
        scope: {
            //do not bind to parent scope
            stars: '='      
        },
        templateUrl: './views/directives/rating.html',
        // template: '<staricon ng-repeat = "star in stars"><i class="fa fa-star"></i><span ng-bind = "star.hotel"></span></staricon>',
        // template: '<staricon><i class="fa fa-star"></i><span ng-bind = "stars[0].hotel"></span></staricon>',
        link: function (scope, iElement, iAttrs) {
            // console.log('ratingWidget link function: --->');
            // console.log(iElement);
            
            // console.log(iElement.find('li').length);    // 0
            
            // $timeout(function(){
            //     console.log(iElement.find('li').length);    // 4
            // },100);

            iElement.on('click', function(){
                console.log('click');
                scope.stars.push({hotel: 'new hotel'});
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