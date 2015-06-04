angular.module('angularTestApp').directive('reacttest', function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
      React.render(
        window.ReactTest(),
        element[0]
      );
    }
  }
})
