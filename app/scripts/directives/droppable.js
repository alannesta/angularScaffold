angular.module('angularTestApp').directive('droppable', function() {
  return {
    restrict: 'A',
    scope: {
      onDrop: '&',
      itemList: '='
    },
    link: function(scope, element, attrs) {
      el = element[0];

      el.addEventListener('dragenter', function() {
        this.classList.add('over');
        return false;
      }, false);

      el.addEventListener('dragleave', function() {
        this.classList.remove('over');
        return false;
      }, false);

      el.on("drop", function(e) {
        if (e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }

        if (e.stopPropogation) {
          e.stopPropogation(); // Necessary. Allows us to drop.
        }

        var data = e.dataTransfer.getData("cardName");
        console.log(data);
        selectedCards
        scope.onDrop({dragEl: src, dropEl: dest});
      });

    }
  }
})
