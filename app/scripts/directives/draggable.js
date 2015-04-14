angular.module('angularTestApp').directive('draggable', function() {
  return {
    restrict: 'A',
    // scope: {

    // },
    link: function(scope, element, attrs) {
      el = element[0];
      el.ondragstart = function(event) {
        event.dataTransfer.effectAllowed = "move";

        // TODO: scope.eval(card), setData: transfer the card object
        console.log(attr);
        event.dataTransfer.setData("cardName", $(this).attr('cardName'));
      }
      el.ondragend = function(event) {
        console.log('dragend');
      }
    }
  }
})
