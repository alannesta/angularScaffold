'use strict'

angular.module('angularTestApp').directive('ratingWidget', ['$timeout', function ($timeout) {
    return {
        restrict: 'A,E',
        transclude: true,
        require: 'ratingWidget',
        templateUrl: './views/directives/rating.html',
        controller: 'ratingWidgetCtrl',
        controllerAs: '$ratingCtrl',

        // template: '<staricon ng-repeat = "star in stars"><i class="fa fa-star"></i><span ng-bind = "star.hotel"></span></staricon>',
        // template: '<staricon><i class="fa fa-star"></i><span ng-bind = "stars[0].hotel"></span></staricon>',
        link: function (scope, iElement, iAttrs, $ratingCtrl, transcludeFn) {

            // $ratingCtrl.logFunc('from rating widget');

            iElement.on('click', function(){
                $ratingCtrl.toggle();
                scope.$apply();
            });

            transcludeFn(scope, function(clone){
                // console.log(angular.element(clone));
                iElement.append(clone);
            });
            // console.log('ratingWidget link function: --->');
            // console.log(iElement);
            
            // console.log(iElement.find('li').length);    // 0
            
            // $timeout(function(){
            //     console.log(iElement.find('li').length);    // 4
            // },100);

            // iElement.on('click', function(){
            //     console.log('click');
            //     scope.stars.push({hotel: 'new hotel'});
            //     scope.$apply();
            // });

        
        }
    };
}])