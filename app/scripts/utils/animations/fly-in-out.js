angular.module('angularTestApp').animation('.flyinout', function(animate, $q, $rootScope){
	return {
      enter: function(element, done) {
      	// animate(element, {left: 100, opacity: 1});
      	// element.velocity('stop');
      	element.velocity({left: 700}, {complete: function(){
      		done();
      	}, duration: 2500, queue: false});
      },

      leave: function(element, done) {
      	var viewportWidth = window.innerWidth;
      	// element.velocity('stop');
        element.velocity({left: 0}, {complete: function(){
      		done();
      	}, duration: 2000,  queue: false});
      },

      addClass: function(element, className, done) {
        
      },

      
    };
});