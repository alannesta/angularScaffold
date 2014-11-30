/**
 * @ngdoc module
 * @name proteus.uiComponents
 * @module proteus.uiComponents
 */
angular
  .module('proteus.uiComponents', [
    'ngAnimate'
  ]);

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqBody
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqBody` directive.
   */
  module.directive('acqBody', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(scope, function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqButton
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqButton` directive.
   *
   * @param {string=} type The type of button. Can be one of primary|secondary|important.
   * @param {string=} size The size of the button. Can be one of small|medium|large.
   * @param {expression=} disabled Whether the button is disabled.
   *
   * @example
   <example module="proteus.uiComponents">
     <file name="index.html">
       <acq-button>Base</acq-button>
       <acq-button type="primary">Primary</acq-button>
       <acq-button type="primary" disabled>Primary (disabled)</acq-button>
       <acq-button type="secondary">Secondary</acq-button>
       <acq-button type="secondary" disabled>Secondary (disabled)</acq-button>
       <acq-button type="important">Important</acq-button>
       <acq-button type="important" disabled>Important (disabled)</acq-button>

       <br><br>

       <acq-button size="small">Small</acq-button>
       <acq-button size="medium">Medium</acq-button>
       <acq-button size="large">Large</acq-button>
     </file>
   </example>
   */
  module.directive('acqButton', function() {
    var types = ['primary', 'secondary', 'important'];
    var sizes = ['small', 'medium', 'large'];

    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      templateUrl: 'button/button.html',
      compile: function(tElement, tAttrs) {
        if (tAttrs.type === undefined) {
          tAttrs.type = 'secondary';
        }

        if (tAttrs.size === undefined) {
          tAttrs.size = 'medium';
        }

        if (tAttrs.disabled === '') {
          tAttrs.disabled = 'true';
        }

        return function(scope, iElement, iAttrs, ctrl, transclude) {
          iAttrs.$observe('type', function(value) {
            var type = value || types[1];

            if (types.indexOf(type) === -1) {
              throw new Error('The expected type ' + type + ' is not supported. Supported types are: ' + types.join('|'));
            }

            iElement.children().removeClass(types.join(' ')).addClass(type);
          });

          iAttrs.$observe('size', function(value) {
            var size = value || sizes[1];

            if (sizes.indexOf(size) === -1) {
              throw new Error('The expected size ' + size + ' is not supported. Supported sizes are: ' + sizes.join('|'));
            }

            iElement.children().removeClass(sizes.join(' ')).addClass(size);
          });

          iAttrs.$observe('disabled', function(value) {
            iElement.children().prop('disabled', !!scope.$eval(value));
          });

          transclude(function(clone) {
            iElement.children().append(clone);
          });
        };
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function dialogFactory($document, $animate, $q, $rootScope, link) {
    var dialogStack = [];

    function close(response, save) {
      var dialogItem = dialogStack.pop();

      if (dialogItem) {
        dialogItem.deferred[save ? 'resolve' : 'reject'](response);
        dialogItem.closed = true;

        $animate.leave(dialogItem.element).then(function() {
          dialogItem.wrapper.remove();
        });

        $animate.leave(dialogItem.backdrop);
      }
    }

    /**
     * @ngdoc service
     * @name dialog
     * @kind object
     * @module proteus.uiComponents
     *
     * @description
     * The `dialog` service.
     *
     * @example
      <example module="demo">
        <file name="index.html">
          <div ng-controller="DemoController">
            <acq-button type="primary" ng-click="openDialog()">Open</acq-button>
          </div>
        </file>

        <file name="app.js">
          var module = angular.module('demo', ['proteus.uiComponents']);

          module.controller('DemoController', function($scope, dialog) {
            $scope.openDialog = function() {
              dialog.show({
                templateUrl: 'demo-dialog.html',
                controller: 'DemoDialogController'
              });
            };
          });

          module.controller('DemoDialogController', function($scope, dialog) {
            $scope.close = function() {
              dialog.confirm();
            };
          });
        </file>

        <file name="demo-dialog.html">
          <acq-toolbar>Demo dialog</acq-toolbar>
          <acq-button type="secondary" ng-click="close()">Close</span>
        </file>
      </example>
     */
    var dialog = {
      /**
       * @ngdoc method
       * @name dialog#show
       * @kind function
       *
       * @description
       * Shows a new dialog.
       *
       * @param {Object} [options] Dialog options
       *
       * @returns {Promise}
       */
      show: function(options) {
        options = angular.extend({}, options);

        var deferred = $q.defer();
        var scope = $rootScope.$new(true);
        var backdrop = angular.element('<div class="dialog-backdrop fade" fit></div>');
        var wrapper = angular.element('<div class="dialog-wrapper" fit horizontal layout></div>');
        var dialogNode = angular.element('<div class="dialog fade-and-scale" self-center></div>');

        var dialogItem = {
          element: dialogNode,
          backdrop: backdrop,
          wrapper: wrapper,
          deferred: deferred,
          closed: false
        };

        dialogStack.push(dialogItem);

        link({
          controller: options.controller,
          controllerAs: options.controllerAs,
          resolve: options.resolve,
          scope: scope,
          template: options.template,
          templateUrl: options.templateUrl
        }).then(function(element) {
          if (!dialogItem.closed) {
            var body = angular.element($document[0].body);

            dialogNode.append(element);

            $animate.enter(backdrop, body, angular.element(body[0].lastChild));

            body.append(wrapper);

            $animate.enter(dialogNode, wrapper, null);
          }
        });

        return deferred.promise;
      },

      /**
       * @ngdoc method
       * @name dialog#confirm
       * @kind function
       *
       * @description
       * Confirms an existing dialog.
       *
       * @param {Object} [response] The dialog response.
       */
      confirm: function(response) {
        close(response, true);
      },

      /**
       * @ngdoc method
       * @name dialog#cancel
       * @kind function
       *
       * @description
       * Cancels an existing dialog.
       *
       * @param {Object} [response] The dialog response.
       */
      cancel: function(response) {
        close(response, false);
      }
    };

    return dialog;
  }

  module.factory('dialog', dialogFactory);
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqDropdown
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqDropdown` directive.
   *
   * @param {expression} [ngModel] The model to bind the dropdown to.
   * @param {expression} [ngOptions] The options.
   *
   * @example
   <example module="proteus.ui.demo">
     <file name="index.html">
       <div ng-controller="DemoController" style="width: 200px; margin:0 auto;">
         <acq-dropdown label="currency" ng-model="currency.selected" options="currency.name for currency in currencies"></acq-dropdown>
         <br>
         {{ currency.selected | json }}
       </div>
     </file>

     <file name="app.js">
       angular.module('proteus.ui.demo', ['proteus.uiComponents'])
         .controller('DemoController', function ($scope) {
           $scope.currencies = [
           { name: 'USD'},
           { name: 'CAD'},
           { name: 'JPY'}
         ];

         $scope.currency = {};
         $scope.currency.selected = $scope.currencies[1];
       });
     </file>
   </example>
   */
  module.directive('acqDropdown', function($compile) {
    var buildDefaultSelect = function(scope, iElement, iAttrs) {

      var label = angular.element('<label></label>');
      label.text(iAttrs.label);
      var select = angular.element('<select></select>');
      select
        .attr('ng-options', iAttrs.options)
        .attr('ng-model', iAttrs.ngModel);

      $compile(select)(scope);
      iElement.append(label).append(select);
    };

    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        if (iAttrs.options) {
          buildDefaultSelect(scope, iElement, iAttrs);
        } else {
          transclude(scope, function(clone) {
            iElement.append(clone);
          });
        }
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqFooter
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqFooter` directive.
   */
  module.directive('acqFooter', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(scope, function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqGrid
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqGrid` directive.
   *
   * @example
    <example module="proteus.ui.demo">
      <file name="index.html">
        <div ng-controller="DemoController">
          <acq-grid>
            <acq-header>
              <acq-row>
                <acq-columns>
                  <acq-column flex one>First Name</acq-column>
                  <acq-column flex one>Last Name</acq-column>
                </acq-columns>
              </acq-row>
            </acq-header>

            <acq-body>
              <acq-row ng-repeat="user in users">
                <acq-cells>
                  <acq-cell flex one>{{ user.firstName }}</acq-cell>
                  <acq-cell flex one>{{ user.lastName }}</acq-cell>
                </acq-cells>
              </acq-row>
            </acq-body>
          </acq-grid>
        </div>
      </file>

      <file name="app.js">
        var module = angular.module('proteus.ui.demo', ['proteus.uiComponents']);

        module.controller('DemoController', function($scope) {
          $scope.users = [
            {firstName: 'John', lastName: 'Doe'},
            {firstName: 'John', lastName: 'Smith'},
            {firstName: 'Jane', lastName: 'Doe'},
            {firstName: 'Jane', lastName: 'Smith'}
          ];
        });
      </file>
    </example>
   */
  module.directive('acqGrid', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqHeader
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqHeader` directive.
   */
  module.directive('acqHeader', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(scope, function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqIconButton
   * @restrict E
   * @module proteus.uiComponents
   *
   * @scope
   *
   * @description
   * The `acqIconButton` directive.
   *
   * @param {string} iconName The icon name.
   * @param {string} [iconSize] The icon size.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-icon-button icon-name="cd">Ok</acq-icon-button>

        <acq-icon-button icon-name="cd" icon-size="2x">Cancel</acq-icon-button>

        <acq-icon-button icon-name="cd" icon-size="3x"></acq-icon-button>
      </file>
    </example>
   */
  module.directive('acqIconButton', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        iconName: '@',
        iconSize: '@'
      },
      templateUrl: 'icon-button/icon-button.html',
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.children().append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqIcon
   * @restrict E
   * @module proteus.uiComponents
   *
   * @scope
   *
   * @description
   * The `acqIcon` directive.
   *
   * @param {string} name The name of the icon.
   * @param {string} [size] The size of the icon. Supported sizes are: 1x|2x|3x.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-icon name="cd"></acq-icon>

        <acq-icon name="cd" size="2x"></acq-icon>

        <acq-icon name="cd" size="3x"></acq-icon>
      </file>
    </example>
   */
  module.directive('acqIcon', function() {
    var sizes = ['1x', '2x', '3x'];

    return {
      restrict: 'E',
      scope: {
        name : '@',
        size: '@'
      },
      link: function link(scope, iElement) {
        var icon = angular.element('<i></i>');
        iElement.append(icon);

        scope.$watch('name', function(newName, oldName) {
          if (!newName) {
            throw new Error('The name is mandatory.');
          }
          icon.removeClass('acq-icon-' + oldName).addClass('acq-icon-' + newName);
        });

        scope.$watch('size', function(newSize, oldSize) {
          newSize = newSize || sizes[0];
          if (sizes.indexOf(newSize) === -1) {
            throw new Error('The expected size ' + newSize + ' is not supported. Supported sizes are: ' + sizes.join('|') + '.');
          }
          icon.removeClass('size-' + oldSize).addClass('size-' + newSize);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function AcqLayoutController() {}

  AcqLayoutController.prototype.setContent = function(content) {
    this.content = content;
  };

  AcqLayoutController.prototype.toggle = function() {
    this.content.toggle();
  };

  module.controller('AcqLayoutController', AcqLayoutController);

  /**
   * @ngdoc directive
   * @name acqLayout
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqLayout` directive.
   */
  module.directive('acqLayout', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      controller: 'AcqLayoutController',
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqLink
   * @restrict E
   * @module proteus.uiComponents
   *
   * @scope
   *
   * @description
   * The `acqLink` directive.
   *
   * @param {string} [reference] The link destination.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-link reference="http://acquisio.com">My Link</acq-link>
      </file>
    </example>
   */
  module.directive('acqLink', function() {
    return {
      restrict: 'E',
      scope: {
        reference: '@'
      },
      transclude: true,
      templateUrl: 'link/link.html'
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqList
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqList` directive.
   */
  module.directive('acqList', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqPager
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqPager` directive.
   */
  module.directive('acqPager', function() {
    return {
      restrict: 'E',
      scope: {
        current: '=',
        totalItems: '=',
        itemsPerPage: '=',
        onChange: '&'
      },
      templateUrl: 'pager/pager.html',
      link: function(scope, iElement) {
        iElement.attr('layout', '').attr('horizontal', '').attr('center', '');

        scope.prev = function() {
          scope.current--;
        };

        scope.next = function() {
          scope.current++;
        };

        scope.$watch('current', function(newVal, oldVal) {
          if (Number(newVal) !== newVal || newVal % 1 !== 0 || newVal <= 0) {
            scope.current = oldVal;
          }
        });

        scope.$watchCollection('[current, totalItems, itemsPerPage]', function() {
          var lastItem = scope.current * scope.itemsPerPage;

          scope.last = Math.ceil(scope.totalItems / scope.itemsPerPage);
          scope.current = Math.min(scope.current, scope.last);
          scope.firstItem = (scope.current - 1) * scope.itemsPerPage + 1;
          scope.lastItem = lastItem - Math.max(0, lastItem - scope.totalItems);

          scope.onChange();
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqPanel
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqPanel` directive.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-panel>
          <acq-toolbar type="primary" size="small">
            <span flex>Demo Panel</span>
            <acq-icon-button icon-name="chevron-thin-down" icon-size="2x"></acq-icon-button>
          </acq-toolbar>

          content
        </acq-panel>
      </file>
    </example>
   */
  module.directive('acqPanel', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          var header;
          var body;
          var footer;
          var content = [];

          for (var i = 0, l = clone.length; i < l; i++) {
            var el = clone.eq(i);

            switch (el.prop('tagName')) {
              case 'ACQ-HEADER':
                header = el;

                break;
              case 'ACQ-BODY':
                body = el;

                break;
              case 'ACQ-FOOTER':
                footer = el;

                break;
              default:
                content.push(el);

                break;
            }
          }

          if (!body && content.length > 0) {
            body = angular.element('<acq-body>');

            content.forEach(function(el) {
              body.append(el);
            });
          }

          iElement.append(header);
          iElement.append(body);
          iElement.append(footer);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name popover
   * @restrict A
   * @module proteus.uiComponents
   *
   * @description
   * The `popover` directive.
   *
   * @param {string} [type] The type of button. Can be one of primary|secondary|important.
   * @param {string} [size] The size of the button. Can be one of small|medium|large.
   *
   * @example
   <example module="proteus.uiComponents">

   </example>
   */
  module.directive('acqPopover', function(popover) {

    return {
      restrict: 'A',
      transclude: true,
      link: function(scope, element, attrs, ctrl, transclude){
        console.log("link function scope:");
        console.log(scope);
        var popoverInstace = null;

        bindTrigger(attrs.popoverTrigger || 'click');


        // !important
        transclude(function(clone) {
          element.append(clone);
        });

        function bindTrigger(trigger){
          switch (trigger){
            case 'hover':
              element.on('mouseenter mouseleave', togglePopover);
              break;
            case 'focus':
              element.on('focus', togglePopover);
              element.on('blur', togglePopover);
              break;
            default:
              element.on('click', togglePopover);
              break;
          }

        }

        function togglePopover(){
          if (popoverInstace){
            popoverInstace.close();
            popoverInstace = null;
          }else{
            popoverInstace = popover.create({
              //template: '<acq-toolbar type="primary" >Popover Test<acq-icon-button icon-name="cross" icon-size="2x" ng-click="close($event)"></acq-icon-button><acq-button ng-click="confirm($event)">confirm</acq-button></acq-toolbar>',
              templateUrl: attrs.popoverTemplate || 'popovercached',
              position: attrs.popoverPosition || "bottom-left",
              triggerNode: element[0],
              controller: function($scope){
                console.log("popover controller scope:");
                console.log($scope);
                $scope.placeholder = 'popover scope';
                $scope.close = function($event) {
                  $event.stopPropagation();
                  popoverInstace.close();
                  popoverInstace = null;
                };
                $scope.confirm = function($event){
                  $event.stopPropagation();
                  popoverInstace.confirm();
                  popoverInstace = null;
                };
              }
            });
          }
        }

      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function popoverFactory($document, $animate, $compile, $q, $rootScope, link, position) {

    /**
     * @ngdoc service
     * @name popover
     * @kind object
     * @module proteus.uiComponents
     *
     * @description
     * The `pop` service that handles popover creation
     *
     * @example
     <example module="demo">
     <file name="index.html">
     <div ng-controller="DemoController">
     <acq-button type="primary" ng-click="openDialog()">Open</acq-button>
     </div>
     </file>

     <file name="app.js">
     var module = angular.module('demo', ['proteus.uiComponents']);

     module.controller('DemoController', function($scope, dialog) {
            $scope.openDialog = function() {
              dialog.show({
                templateUrl: 'demo-dialog.html',
                controller: 'DemoDialogController'
              });
            };
          });

     module.controller('DemoDialogController', function($scope, dialog) {
            $scope.close = function() {
              dialog.confirm();
            };
          });
     </file>

     <file name="demo-dialog.html">
     <acq-toolbar>Demo dialog</acq-toolbar>
     <acq-button type="secondary" ng-click="close()">Close</span>
     </file>
     </example>
     */
    var popoverManager = {

      openedPopovers: [],
      /**
       * @ngdoc method
       * @name popover#show
       * @kind function
       *
       * @description
       * Toggles a new popover.
       *
       * @param {Object} [options] popover options
       *
       * @returns {Object}
       */
      create: function(config) {
        var options = angular.extend({}, config);
        var self = this;
        var triggerNode = options.triggerNode || $document[0].body;
        var scope = options.scope || $rootScope.$new(true);
        var deferred = $q.defer();
        var popoverTemplate = angular.element('<div class=""></div>');   // add general popover style or animation class here

        var popoverInstance = {
          deferred: deferred,
          element: null,
          triggerNode: triggerNode,
          position: options.position || 'bottom',
          close: function(){
            destroy(this);
          },
          confirm: function(){
            destroy(this);
          }
        };

        link({
          controller: options.controller,
          controllerAs: options.controllerAs,
          resolve: options.resolve,
          scope: scope,
          template: options.template,
          templateUrl: options.templateUrl
        }).then(function(element){
            var position;
            prepareTemplate(popoverInstance, element);
            position = preparePosition(popoverInstance);
            placePopover(popoverInstance, position, options.animtaion);
            //self.openedPopovers.push(popoverInstance);
        });

        function destroy(instance){
          if (instance && instance.element){
            if (options.animation){
              //TODO: apply leave animation
              angular.noop();
            }
            instance.element.remove();
          }
          var index = getIndex(self.openedPopovers, instance, "triggerNode");
          self.openedPopovers.splice(index, 1);
          instance = null;
        }

        function prepareTemplate(instance, usrTemplate){
          popoverTemplate.append(usrTemplate);

          if (options.arrow){
            //TODO configure arrow style
            angular.noop();
          }

          instance.element = popoverTemplate[0];
        }

        function preparePosition(instance){
          var popoverEl = angular.element(instance.element);
          var elemPosition;
          popoverEl.css({'position': 'absolute', 'top': -999, 'left': -999});  // Let it have the correct dimension
         
          //FIXME: CSS styling problem
          angular.element(triggerNode).after(popoverEl);
          elemPosition = position.positionElement(instance.triggerNode, instance.element, instance.position);

          return elemPosition;
        }

        function placePopover(instance, position, animation){
          var popoverEl = angular.element(instance.element);

          if (animation){
            //TODO: apply animation
            angular.noop();
          }else{
            popoverEl.css({'top': position.top+'px', 'left': position.left+'px'});
          }
        }
        self.openedPopovers.push(popoverInstance);
        return popoverInstance;
      }

    };

    // Helper function: get the index of an obj in an array
    function getIndex(arr, obj, key){
      for (var i = 0; i<arr.length; i++){
        if (arr[i][key] === obj[key]){
          return i;
        }
      }
      return -1;
    }

    return popoverManager;
  }

  module.factory('popover', popoverFactory);


})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqProgressBar
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqProgressBar` directive.
   *
   * @param {string} [value] The current progress value.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-progress-bar value="25" ></acq-progress-bar>
        <br/>
        <acq-progress-bar value="0" disabled></acq-progress-bar>
        <br/>
        <acq-progress-bar value="1"></acq-progress-bar>
      </file>
    </example>
   */
  module.directive('acqProgressBar', function() {
    return {
      restrict: 'E',
      scope: {
        value: '@'
      },
      templateUrl: 'progress-bar/progress-bar.html',
      link: function link(scope, iElement) {
        scope.$watch('value', function (value) {
          var ratio = value || 0;
          iElement.children().css('width', ratio + '%');
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqSearchField
   * @restrict E
   * @module proteus.uiComponents
   *
   * @scope
   *
   * @description
   * The `acqSearchField` directive.
   *
   * @param {string} [placeholder] The input placeholder.
   * @param {expression} [ngModel] The model to bind the input to.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-search-field placeholder="Search"></acq-search-field>
      </file>
    </example>
   */
  module.directive('acqSearchField', function() {
    return {
      restrict: 'E',
      scope: {
        placeholder: '@',
        query: '=?ngModel'
      },
      templateUrl: 'search-field/search-field.html',
      link: function link(scope) {
        scope.resetQuery = function() {
          scope.query = '';
        };
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqSiteToolbar
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqSiteToolbar` directive.
   */
  module.directive('acqSiteToolbar', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      templateUrl: 'site-toolbar/site-toolbar.html'
    };
  });
})(angular.module('proteus.uiComponents'));
(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqToolbar
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqToolbar` directive.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-toolbar primary>
          <span flex>Label</span>
          <acq-search-field></acq-search-field>
          <acq-icon-button icon-name="chevron-thin-down"></acq-icon-button>
        </acq-toolbar>
      </file>
    </example>
   */
  module.directive('acqToolbar', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(scope, function(clone) {
          iElement.attr('layout', '').attr('horizontal', '').attr('center', '').append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqView
   * @restrict E
   * @module proteus.uiComponents
   *
   * @scope
   *
   * @description
   * The `acqView` directive.
   *
   * @param {string} [title] The view title.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-view title="My Title">
          <span>Some elements</span>
        </acq-view>
      </file>
    </example>
   */
  module.directive('acqView', function() {
    return {
      restrict: 'E',
      scope: {
        pageTitle: '@'
      },
      transclude: true,
      templateUrl: 'view/view.html'
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqWizard
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqWizard` directive.
   */
  module.directive('acqWizard', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  module.animation('.collapse', function(animate) {
    return {
      enter: function(element, done) {
        animate(element, 'slideDown').then(done);
      },

      leave: function(element, done) {
        animate(element, 'slideUp').then(done);
      },

      addClass: function(element, className, done) {
        if (className === 'ng-hide') {
          animate(element, 'slideUp').then(done);
        } else {
          done();
        }
      },

      beforeRemoveClass: function(element, className, done) {
        if (className === 'ng-hide') {
          element.css('display', 'none');
        }

        done();
      },

      removeClass: function(element, className, done) {
        if (className === 'ng-hide') {
          animate(element[0], 'slideDown').then(done);
        } else {
          done();
        }
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  module.animation('.fade-and-scale', function(animate) {
    return {
      enter: function(element, done) {
        animate(element, {
          opacity: [1, 0],
          scale: [1, 0.6]
        }).then(done);
      },

      leave: function(element, done) {
        animate(element, {
          opacity: [0, 1],
          scale: [0.6, 1]
        }).then(done);
      },

      addClass: function(element, className, done) {
        if (className === 'ng-hide') {
          animate(element, {
            opacity: [0, 1],
            scale: [0.6, 1]
          }).then(done);
        } else {
          done();
        }
      },

      beforeRemoveClass: function(element, className, done) {
        if (className === 'ng-hide') {
          element.css('display', 'none');
        }

        done();
      },

      removeClass: function(element, className, done) {
        if (className === 'ng-hide') {
          animate(element, {
            opacity: [1, 0],
            scale: [1, 0.7]
          }).then(done);
        } else {
          done();
        }
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  module.animation('.fade', function(animate) {
    return {
      enter: function(element, done) {
        animate(element, 'fadeIn').then(done);
      },

      leave: function(element, done) {
        animate(element, 'fadeOut').then(done);
      },

      addClass: function(element, className, done) {
        if (className === 'ng-hide') {
          animate(element, 'fadeOut').then(done);
        }
      },

      beforeRemoveClass: function(element, className, done) {
        if (className === 'ng-hide') {
          element.css('display', 'none');
        }

        done();
      },

      removeClass: function(element, className, done) {
        if (className === 'ng-hide') {
          animate(element, 'fadeIn').then(done);
        } else {
          done();
        }
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function animateFactory(Velocity, $q) {
    /**
     * @ngdoc service
     * @name animate
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * The `animate` service.
     *
     * @param {DOMElement} element
     * @param {Object} properties
     *
     * @returns {Promise}
     */
    var animate = function(element, properties) {
      var deferred = $q.defer();

      Velocity(element[0], properties, { duration: 220 }).then(function() {
        deferred.resolve();
      });

      return deferred.promise;
    };

    return animate;
  }

  module.factory('animate', animateFactory);
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function linkFactory($compile, $controller, $http, $injector, $q, $rootScope, $sce, $templateCache) {
    /**
     * @ngdoc service
     * @name link
     * @kind function
     * @module proteus.uiComponents
     *
     * @param {Object} options
     *
     * @description
     * The `link` service.
     *
     * @returns {Promise}
     */
    function link(options) {
      options = options || {};

      return getLocals(options)
        .then(function(locals) {
          var element = locals.$template || '<span></span>';
          var scope = options.scope && options.scope.$new() || $rootScope.$new();
          var controller = $controller(
            options.controller || function() {},
            angular.extend({
              $scope: scope
            }, locals)
          );

          if (options.controllerAs) {
            scope[options.controllerAs] = controller;
          }
          return $compile(element)(scope);
        })
        .catch(function(error) {
          return $q.reject(error);
        });
    }

    function getLocals(options) {
      var locals = angular.extend({}, options.resolve || {});
      var template = getTemplate(options);

      angular.forEach(locals, function(value, key) {
        if (angular.isString(value)) {
          locals[key] = $injector.get(value);
        } else {
          locals[key] = $injector.invoke(value);
        }
      });

      if (angular.isDefined(template)) {
        locals.$template = template;
      }

      return $q.all(locals);
    }

    function getTemplate(options) {
      var template, templateUrl;

      if (angular.isDefined(template = options.template)) {
        if (angular.isFunction(template)) {
          template = template();
        }
      } else if (angular.isDefined(templateUrl = options.templateUrl)) {
        if (angular.isFunction(templateUrl)) {
          templateUrl = templateUrl();
        }

        templateUrl = $sce.getTrustedResourceUrl(templateUrl);
        template = $http.get(templateUrl, {cache: $templateCache})
          .then(function(response) {
            return response.data;
          });
      }

      return template;
    }

    return link;
  }

  module.factory('link', linkFactory);
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function positionFactory($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    function parentOffsetEl(element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    }

    // get the position relative to nearest containing element(offsetParent: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.offsetParent)
    function position(element) {
      var elBCR = offset(element);
      var offsetParentBCR = { top: 0, left: 0 };
      var offsetParentEl = parentOffsetEl(element);
      if (offsetParentEl !== $document[0]) {
        offsetParentBCR = offset(offsetParentEl);
        offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
        offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
      }

      var boundingClientRect = element.getBoundingClientRect();
      return {
        width: boundingClientRect.width || element.prop('offsetWidth'),
        height: boundingClientRect.height || element.prop('offsetHeight'),
        top: elBCR.top - offsetParentBCR.top,
        left: elBCR.left - offsetParentBCR.left
      };
    }

    // get the position relative to document.body
    function offset(element){
      var boundingClientRect = element.getBoundingClientRect();
      return {
        width: boundingClientRect.width || element.prop('offsetWidth'),
        height: boundingClientRect.height || element.prop('offsetHeight'),
        top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
        left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
      };
    }

    function calculatePosition(element, base, pos, dimension){

      var elementWidth, elementHeight, elementPosition;

      var posArr = pos.split('-');
      var pos1 = posArr[0];   // placement: top, left, right, bottom
      var pos2 = posArr[1] || 'center';   // alignment, left, right, top, bottom, center. default to center

      elementWidth = angular.element(element).prop('offsetWidth');
      elementHeight = angular.element(element).prop('offsetHeight');

      var shiftWidth = {
        center: function () {
          return base.left + base.width / 2 - elementWidth / 2;
        },
        left: function () {
          return base.left - elementWidth;
        },
        right: function () {
          return base.left + base.width;
        }
      };

      var shiftHeight = {
        center: function () {
          return base.top + base.height / 2 - elementHeight / 2;
        },
        top: function () {
          return base.top - elementHeight;
        },
        bottom: function () {
          return base.top + base.height;
        }
      };

      var align = {
        left: function(){
          return base.left;
        },
        right: function(){
          return base.left + base.width - elementWidth;
        },
        top: function(){
          return base.top;
        },
        bottom: function(){
          return base.top + base.height - elementHeight;
        },
        center: function(){
          // when the alignment is center, the result depends on either shiftHeight or shiftWidth
          return;
        }
      };

      switch (pos1) {
        case 'right':
          elementPosition = {
            top: align[pos2]() || shiftHeight[pos2](),
            left: shiftWidth[pos1]()
          };
          break;
        case 'left':
          elementPosition = {
            top: align[pos2]() || shiftHeight[pos2](),
            left: shiftWidth[pos1]()
          };
          break;
        case 'top':
          elementPosition = {
            top: shiftHeight[pos1](),
            left: align[pos2]() || shiftWidth[pos2]()
          };
          break;
        // defaults to bottom
        default:
          elementPosition = {
            top: shiftHeight[pos1](),
            left: align[pos2]() || shiftWidth[pos2]()
          };
          break;
      }
      return elementPosition;
    }

    return {
      positionElement: function positionElement(triggerNode, element, pos, dimension){
        var base = position(triggerNode);
        //console.log(base);
        //var base = offset(triggerNode);
        var calculatedPosition = calculatePosition(element, base, pos, dimension);
        //console.log(calculatedPosition);
        return calculatedPosition;
      }
    };

  }

  module.factory('position', positionFactory);
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function VelocityFactory($window) {
    /**
     * @callback velocityCallback
     */

    /**
     * @ngdoc service
     * @name Velocity
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * A wrapper for Velocity.js.
     *
     * @param {DOMElement} element
     * @param {Object} cssProps
     * @param {Object=} options
     * @param {function()=} doneCallback
     */
    return $window.Velocity;
  }

  module.factory('Velocity', VelocityFactory);
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqCells
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqCells` directive.
   */
  module.directive('acqCells', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.attr('layout', '').attr('horizontal', '').attr('center', '').append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqColumns
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqColumns` directive.
   */
  module.directive('acqColumns', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.attr('layout', '').attr('horizontal', '').attr('center', '').append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqRowDetails
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqRowDetails` directive.
   */
  module.directive('acqRowDetails', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqRow
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqRow` directive.
   */
  module.directive('acqRow', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function AcqMainContentController($element) {
    this.$element = $element;
  }

  AcqMainContentController.prototype.toggle = function() {
    this.$element.toggleClass('opened');
  };

  module.controller('AcqMainContentController', AcqMainContentController);

  /**
   * @ngdoc directive
   * @name acqMainContent
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqMainContent` directive.
   */
  module.directive('acqMainContent', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      require: ['acqMainContent', '^acqLayout'],
      controller: 'AcqMainContentController',
      link: function link(scope, iElement, iAttrs, ctrls, transclude) {
        var contentCtrl = ctrls[0];
        var parentCtrl = ctrls[1];

        parentCtrl.setContent(contentCtrl);

        transclude(function(clone) {
          iElement.attr('fit', '').append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqSideMenu
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqSideMenu` directive.
   */
  module.directive('acqSideMenu', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.attr('fit', '').append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name sideMenuToggle
   * @restrict A
   * @module proteus.uiComponents
   *
   * @element ANY
   *
   * @description
   * The `sideMenuToggle` directive.
   */
  module.directive('sideMenuToggle', function() {
    return {
      restrict: 'A',
      scope: false,
      require: '^acqLayout',
      link: function link(scope, iElement, iAttrs, parentCtrl) {
        iElement.on('click', function() {
          parentCtrl.toggle();
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqItem
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqItem` directive.
   */
  module.directive('acqItem', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqWizardContent
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqWizardContent` directive.
   */
  module.directive('acqWizardContent', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqWizardNav
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqWizardNav` directive.
   */
  module.directive('acqWizardNav', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqWizardSteps
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqWizardSteps` directive.
   */
  module.directive('acqWizardSteps', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqCell
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqCell` directive.
   */
  module.directive('acqCell', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqColumn
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqColumn` directive.
   */
  module.directive('acqColumn', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqWizardStep
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqWizardStep` directive.
   */
  module.directive('acqWizardStep', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

//# sourceMappingURL=proteus-ui-components.js.map