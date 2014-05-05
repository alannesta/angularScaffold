'use strict'
angular.module('angularTestApp').directive('toolInfo', function(){
    return {
        templateUrl: './views/directives/toolinfo.html',
        scope: {
            tool: '=info'   //the tool will be denoted by the info attribute
        }
    }
})