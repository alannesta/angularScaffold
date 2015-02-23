angular.module('angularTestApp').animation('.flyinout', function(animate, $q, $rootScope){
	return {
      enter: function(element, done) {
      	// animate(element, {left: 100, opacity: 1});
      	element.velocity('stop');
      	console.log('enter begin');
      	element.velocity({left: 700}, {complete: function(){
      		done();
      	}, duration: 2500});

      	return function(isCancelled) {
      		if(isCancelled) {
      			console.log('enter canceled callback');
      			element.velocity('stop', true);
      		}
      	}

      },

      leave: function(element, done) {
      	var viewportWidth = window.innerWidth;
      	element.velocity('stop');
      	console.log('leave begin');
        element.velocity({left: 0}, {complete: function(){
      		done();
      	}, duration: 2000});

        return function(isCancelled) {
      		if(isCancelled) {
      			console.log('leave canceled callback');
      			//element.velocity('stop', true);
      		}
      	}

      },

      addClass: function(element, className, done) {

      }


    };
});
