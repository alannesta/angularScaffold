angular.module('angularTestApp').animation('.fadeinout', function(animate, $q, $rootScope){
  return {
    enter: function(element, done) {

    },

    leave: function(element, done) {

    },

    addClass: function(element, className, done) {
      element.velocity({opacity: 1}, {complete: function(){
        done();
      }, duration: 1500});

      return function(isCancelled) {
        if(isCancelled) {
          element.velocity('stop', true);
        }
      }
    },

    removeClass: function(element, className, done){
      element.velocity({opacity: 0}, {complete: function(){
        done();
      }, duration: 1500});

      return function(isCancelled) {
        if(isCancelled) {
          console.log('leave canceled callback');
          //element.velocity('stop', true);
        }
      }
    }
  };
});
