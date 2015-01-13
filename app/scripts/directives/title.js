angular.module('angularTestApp').directive('title', ['$sanitize', function($sanitize){
    return {
    	restrict: 'A',
    	compile: function(tElements, tAttrs){
    		var title = tAttrs.title;
    		delete(tAttrs.title);
    		tElements.removeAttr('title');

    		return function link(scope, iElements, iAttrs){
    			var tootip = angular.element('<div style="position: absolute">'+ title +'</div>');
    			var unsafe = '<p style="color:blue">an html<em onmouseover="">click here</em>';
    			console.log($sanitize(unsafe));
    			console.log(unsafe);
    			iElements.after(tootip);
    			iElements.on('mouseenter', function(e){
    				
    			});
    		}
    	}
    }
}])