'use strict'

angular.module('angularTestApp').directive('customInput', [function () {
    return {
        restrict: 'A,E',
        transclude: true,
        require: "ngModel",
        scope: {},
        // replace: true,
        template: '<span>Value in the customized input: </span><input type="text" ng-model="userInput">',
        link: function (scope, iElement, iAttrs, ngModelCtrl) {
            console.log(ngModelCtrl);
            scope.userInput = "in directive"

            // parent controller model changed--->formatter--->$viewModel/$render----> UI change
            ngModelCtrl.$formatters.push(function(modelValue){
                console.log("in formatter: " + modelValue);
                // scope.userInput = modelValue;     // should be done in a render function
                return modelValue;  // do not forget to return the value after processing!!
            });

            // iElement.on('keyup', function(){
            //     ngModelCtrl.$render();
            // });
            
            // this will be called automatically...
            ngModelCtrl.$render = function(){
                console.log('render function called');
                console.log(ngModelCtrl.$modelValue);
                scope.userInput = ngModelCtrl.$viewValue;
            }

            // $setViewValue ---> parser ---> parent controller model change(negative change, will not trigger formatter)
            ngModelCtrl.$parsers.push(function(modelValue){
                console.log("in parser: "+ modelValue);
                return modelValue;
            });
            
            // change the parent controlelr model via $setViewValue
            scope.$watch("userInput", function(newVal){
                ngModelCtrl.$setViewValue(newVal);

            })
        }   
    };
}])