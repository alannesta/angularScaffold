angular.module('angularTestApp').directive('draggable', function() {
  return {
    restrict: 'A',
    // scope: {

    // },
    link: function(scope, element, attrs) {
      var el = element[0];

      el.draggable = 'true';


      el.ondragstart = function(e) {
        e.dataTransfer.effectAllowed = "move";

        // TODO: scope.eval(card), setData: transfer the card object(serialize)
        var card = JSON.stringify(scope.$eval(attrs.item));
        e.dataTransfer.setData("card", card);

      };

      el.ondragend = function() {
        console.log('dragend');
      }
    }
  }
})
