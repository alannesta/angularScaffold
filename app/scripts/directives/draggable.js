angular.module('angularTestApp').directive('draggable', function(){
    return {
    	restrict: 'A',
        // scope: {
            
        // },
        link: function(scope, element, attrs){
            el = element[0];
        	el.ondragstart = function(event){
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("cardName", $(this).attr('cardName'));
            }
            el.ondragend = function(event){
                //cannot get mouse position properly here, rather set the position on drop zone;
                // $(this).removeClass('dragging');
            }
        }
    }
})