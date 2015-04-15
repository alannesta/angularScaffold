angular.module('angularTestApp').directive('droppable', function() {
  return {
    restrict: 'A',
    scope: {
      onDrop: '&',
      stars: '='
    },
    link: function(scope, element) {
      var el = element[0];

      console.log(scope.stars);
      el.addEventListener('dragenter', function(e) {
        console.log('dragenter');
      }, false);

      el.addEventListener('dragleave', function(e) {
        console.log('dragleave');
      }, false);

      el.addEventListener('dragover', function(e) {
        e.preventDefault();   // this will allow the item to "drop"
      }, false);

      el.addEventListener('drop', function(e) {
        var data = e.dataTransfer.getData("card");
        //console.log(JSON.parse(data));
        scope.$apply(function(){
          scope.stars.push(JSON.parse(data));
        });
      });
    }
  }
})
