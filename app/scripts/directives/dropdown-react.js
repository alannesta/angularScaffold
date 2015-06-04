angular.module('angularTestApp').directive('reacttest', function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
      var dropdown = React.createFactory(ReactHeader)
      React.render(
        dropdown(),
        element[0]
      );
    }
  }
})
