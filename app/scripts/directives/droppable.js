angular.module('angularTestApp').directive('droppable', function(){
    return {
    	restrict: 'A',
        // scope: {
            
        // },
        link: function(scope, element, attrs){
            el = element[0];
        	
            el.addEventListener(
                'dragenter',
                function(e) {
                    this.classList.add('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragleave',
                function(e) {
                    this.classList.remove('over');
                    return false;
                },
                false
            );

            

        }
    }
})