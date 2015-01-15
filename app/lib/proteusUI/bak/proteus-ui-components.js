(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name proteus.uiComponents
   * @module proteus.uiComponents
   */
  angular
    .module('proteus.uiComponents', [
      'ngAnimate'
    ]);
})();

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqAccountLogo
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqAccountLogo` directive is used to display account logos that the clients have uploaded to the platform.
   * This will probably be refactored into a generic image field.
   */
  module.directive('acqAccountLogo', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      templateUrl: 'components/account-logo/account-logo.html'
    };
  });
})(angular.module('proteus.uiComponents'));

/**
 * Created by david on 11/26/14.
 */

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqBody
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqBody` directive is a utility directive for styling content.
   */
  module.directive('acqBody', function() {
    return {
      restrict: 'E'
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
   * The `acqButton` directive is used to create all buttons in the platform.
   *
   * @param {string=} [type=secondary] The type of button. Can be one of primary|secondary|flat.
   * @param {string=} [size=flat] The size of the button. Can be one of small|medium|large.
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
       <acq-button type="tertiary">Secondary</acq-button>
       <acq-button type="tertiary" disabled>Secondary (disabled)</acq-button>
       <acq-button type="flat">Flat</acq-button>
       <acq-button type="flat" disabled>Flat (disabled)</acq-button>

       <br><br>

       <acq-button size="small">Small</acq-button>
       <acq-button size="medium">Medium</acq-button>
       <acq-button size="large">Large</acq-button>
     </file>
   </example>
   */
  module.directive('acqButton', function() {
    var types = ['primary', 'secondary', 'tertiary', 'icon', 'flat'];
    var sizes = ['small', 'medium', 'large'];

    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      templateUrl: 'components/button/button.html',
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
              throw new Error(
                'The expected type ' + type + ' is not supported. Supported types are: ' + types.join('|')
              );
            }

            iElement.children().removeClass(types.join(' ')).addClass(type);
          });

          iAttrs.$observe('size', function(value) {
            var size = value || sizes[1];

            if (sizes.indexOf(size) === -1) {
              throw new Error(
                'The expected size ' + size + ' is not supported. Supported sizes are: ' + sizes.join('|')
              );
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

  /**
   * @ngdoc directive
   * @name acqButtonGroup
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqButtonGroup` directive.
   */
  module.directive('acqButtonGroup', function() {
    return {
      restrict: 'E'
    };
  });
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
   * The `acqDropdown` directive. A generic dropdown.
   *
   * @param {expression} [ngModel] The model to bind the dropdown to.
   * @param {expression=} [options] The options.
   *
   * @example
   <example module="proteus.ui.demo">
     <file name="index.html">
       <div ng-controller="DemoController" style="width: 200px; margin:0 auto;">
         <acq-dropdown label="currency"
                       ng-model="currency.selected"
                       options="currency.name for currency in currencies"></acq-dropdown>
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
   * @name  acqDropdownItem
   * @restrict E
   * @module  proteus.uiComponents
   *
   * @requires acqDropdownList
   *
   * @description
   * The `acqDropdownItem` directive contains a dropdown list item template. See {@link acqDropdownList} for an example.
   */
  module.directive('acqDropdownItem', function(repeatParser, $compile) {
    return {
      restrict: 'E',
      //scope: false,
      require: '^acqDropdownList',
      transclude: true,
      templateUrl: 'components/dropdown-list/dropdown-item.html',
      compile: function(tElement, tAttrs) {
        if (!tAttrs.repeat){
          throw new Error('Expected "repeat" expression.');
        }
        return function link(scope, element, attrs, $select, transcludeFn) {

          var groupByExp = attrs.groupBy;
          var groups = angular.element(element[0].querySelectorAll('.ui-select-choices-group'));
          if(groupByExp) {
            groups.attr('ng-repeat', repeatParser.getGroupNgRepeatExpression());
          }

          $select.parseRepeatAttr(attrs.repeat, groupByExp);

          var choices = angular.element(element[0].querySelectorAll('.acq-dropdown-item-row'));

          choices
            .attr('ng-repeat', repeatParser.getNgRepeatExpression(
              $select.parserResult.itemName, '$select.items', $select.parserResult.trackByExp, groupByExp
            ))
            .attr('ng-if', '$select.open') //Prevent unnecessary watches when dropdown is closed
            .attr('ng-mouseover', '$select.setActiveItem('+$select.parserResult.itemName +')')
            .attr('ng-click', '$select.select(' + $select.parserResult.itemName + ', $event)');

          var rowsInner = angular.element(element[0].querySelectorAll('.acq-dropdown-item-row-inner'));

          transcludeFn(scope, function(clone){
            rowsInner.append(clone);
          });

          $compile(groups)(scope);

        };
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function (module) {
  'use strict';

  var KEY = {
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40
  };

  module.controller('DropdownListCtrl', function ($scope, $element, $timeout, $filter, repeatParser) {
    var ctrl = this;

    ctrl.items = [];
    ctrl.unfiltered = [];
    ctrl.placeholder = 'Select';
    ctrl.selected = undefined;
    ctrl.activeIndex = 0;   // index of currently selected model
    ctrl.open = false;
    ctrl.disabled = false;

    ctrl.searchEnabled = true;
    ctrl.resetSearchInput = true;
    ctrl.searchThreshold = 8;
    ctrl.exceedThreshold = false;

    var threshold = $element.attr('search-threshold') === undefined ? ctrl.searchThreshold : $element.attr('search-threshold');

    var dropdownSelected = angular.element($element[0].querySelectorAll('.acq-dropdown-selected'));

    ctrl.isEmpty = function () {
      return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '';
    };

    ctrl.activate = function () {

      if(ctrl.items.length === 0){
        //TODO: show empty list?
        return;
      }

      if (ctrl.unfiltered.length === 0){
        angular.copy(ctrl.items, ctrl.unfiltered);

        if (ctrl.unfiltered.length > threshold){
          ctrl.exceedThreshold = true;
        }
      }

      if (!ctrl.disabled && !ctrl.open) {
        ctrl.open = true;
        resetSearchInput();
        //ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;
      }

      $timeout(function() {
        var searchWidget = angular.element($element[0].querySelectorAll('.acq-dropdown-search'));
        if (!searchWidget.hasClass('ng-hide')){
          var searchInput = searchWidget.find('input');
          searchInput[0].focus();
        }else{
          dropdownSelected.focus();
        }

      });
    };

    function resetSearchInput() {
      if (ctrl.resetSearchInput) {
        ctrl.search = '';
        //reset activeIndex
        if (ctrl.selected && ctrl.items.length) {
          ctrl.activeIndex = ctrl.items.indexOf(ctrl.selected);
        }
      }
    }

    ctrl.parseRepeatAttr = function (repeatAttr, groupByExp) {

      function updateGroups(items) {
        ctrl.groups = [];
        angular.forEach(items, function (item) {
          var groupFn = $scope.$eval(groupByExp);
          var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
          var group = ctrl.findGroupByName(groupName);
          if (group) {
            group.items.push(item);
          }
          else {
            ctrl.groups.push({name: groupName, items: [item]});
          }
        });
        ctrl.items = [];
        ctrl.groups.forEach(function (group) {
          ctrl.items = ctrl.items.concat(group.items);
        });
      }

      function setPlainItems(items) {
        ctrl.items = items;
      }

      var setItemsFn = groupByExp ? updateGroups : setPlainItems;
      ctrl.isGrouped = !!groupByExp;

      ctrl.parserResult = repeatParser.parse(repeatAttr);
      ctrl.itemProperty = ctrl.parserResult.itemName;

      // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259
      $scope.$watchCollection(ctrl.parserResult.source, function (items) {

        if (items === undefined || items === null) {
          // If the user specifies undefined or null => reset the collection
          // Special case: items can be undefined if the user did not initialized the collection on the scope
          // i.e $scope.addresses = [] is missing
          ctrl.items = [];
        } else {
          setItemsFn(items);

          //Force scope model value and ngModel value to be out of sync to re-run formatters
          ctrl.ngModel.$modelValue = null;
        }
      });
    };

    ctrl.findGroupByName = function(name) {
      return ctrl.groups && ctrl.groups.filter(function(group) {
          return group.name === name;
        })[0];
    };

    ctrl.setActiveItem = function (item) {
      ctrl.activeIndex = ctrl.items.indexOf(item);
    };

    ctrl.isActive = function (itemScope) {
      if (!ctrl.open) {
        return false;
      }

      var isActive = false;
      var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
      if (itemIndex !== -1){
        isActive = itemIndex === ctrl.activeIndex;
      }
      return isActive;
    };

    // When the user selects an item with ENTER or clicks the dropdown
    ctrl.select = function (item, $event) {
      ctrl.selected = item;
      ctrl.close();
      if ($event && $event.type === 'click') {
        ctrl.clickTriggeredSelect = true;
      }
    };

    // Closes the dropdown
    ctrl.close = function () {
      if (!ctrl.open) {
        return;
      }
      resetSearchInput();
      ctrl.setActiveItem(ctrl.selected);
      ctrl.open = false;
    };

    // Toggle dropdown
    ctrl.toggle = function (e) {
      if (ctrl.open) {
        ctrl.close();
      } else {
        ctrl.activate();
      }
      e.preventDefault();
      e.stopPropagation();
    };

    ctrl.handleDropDownSelection = function (key) {
      var processed = true;
      switch (key) {
        case KEY.DOWN:
          if (ctrl.activeIndex < ctrl.items.length - 1) {
            ctrl.activeIndex++;
          }
          break;
        case KEY.UP:
          if (ctrl.activeIndex > 0) {
            ctrl.activeIndex--;
          }
          break;
        case KEY.ENTER:
          if (ctrl.open) {
            ctrl.select(ctrl.items[ctrl.activeIndex]);
            ctrl.close();
          }
          break;
        case KEY.ESC:
          ctrl.close();
          break;
        default:
          break;
      }
      return processed;
    };

  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqDropdownList
   * @restrict E
   * @module proteus.uiComponents
   *
   * @scope
   *
   * @description
   * The `acqDropdownList` directive.
   *
   * @param {expression} ngModel The model to bind to.
   *
   * @example
   <example module="proteus.uiComponents">
   <file name="index.html">

   <acq-dropdown-list ng-model="selection.selected" ng-controller="DemoController">
   <acq-dropdown-selected>
   <span> {{selection.selected.publisher}} {{selection.selected.rollover}}</span>
   </acq-dropdown-selected>

   <acq-dropdown-item repeat="user in users">
   <span> {{user.publisher}} {{user.rollover}}</span>
   </acq-dropdown-item>
   </acq-dropdown-list>
   </file>

   <file name="app.js">
   var module = angular.module('demo', ['proteus.uiComponents']);

   module.controller('DemoController', function ($scope) {
          $scope.users = [
            {budgetshare: 1233.86,publisher: 'Cosmik Debris', rollover: 12345, adjustment: 434, ebudget: 34234},
            {budgetshare: 633.86,publisher: 'Electric Aunt Jemima', rollover: 345, adjustment: 341, ebudget: 1234},
            {budgetshare: 33.86,publisher: 'Bongo Fury', rollover: 9457, adjustment: 50, ebudget: 8744},
            {budgetshare: 823.86,publisher: 'Acquisio', rollover: 5645, adjustment: 984, ebudget: 9334}
          ];

          $scope.selection = {
            selected: null
          };
      </file>
   </example>
   */
  module.directive('acqDropdownList', function($document, $timeout) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'components/dropdown-list/dropdown-list.html',
      require: ['acqDropdownList', 'ngModel'],
      transclude: true,
      controller: 'DropdownListCtrl',
      controllerAs: '$select',
      link: function link(scope, element, iAttrs, ctrls, transcludeFn) {
        var $select = ctrls[0];
        var ngModel = ctrls[1];
        var scrollFlag = false;
        //From view --> model
        ngModel.$parsers.unshift(function (inputValue) {
          var locals = {},
            result;

          locals = {};
          locals[$select.parserResult.itemName] = inputValue;
          result = $select.parserResult.modelMapper(scope, locals);
          return result;

        });

        //Set reference to ngModel from dropdownListCtrl
        $select.ngModel = ngModel;

        scope.$watch('$select.selected', function(newValue) {
          if (ngModel.$viewValue !== newValue) {
            ngModel.$setViewValue(newValue);
          }
        });

        ngModel.$render = function() {
          $select.selected = ngModel.$viewValue;
        };

        element[0].addEventListener('mouseover', function(e){
          if (scrollFlag){
            e.preventDefault();
            e.stopPropagation();
          }
          scrollFlag = false;
        }, true);


        // handle ESC, ENTER key
        element.on('keydown', function(e) {
          var key = e.which;
          scope.$apply(function() {
            var processed = false;
            if (!processed && $select.items.length > 0) {
              processed = $select.handleDropDownSelection(key);
            }
            if((key === 38 || key ===40) && processed && $select.items.length > 0){
              ensureHighlightVisible();
              e.preventDefault();
              e.stopPropagation();
            }
          });
        });

        // reset hightlight if the current selected item is not in the new filtered list
        element.on('keyup', function(e) {
          var key = e.which;
          if (key!==38 && key!== 40){
            scope.$apply(function() {
              var index = $select.items.indexOf($select.selected);
              if (index === -1){
                $select.activeIndex = 0;
              }else{
                $select.activeIndex = index;
              }
            });
          }
        });

        scope.$watch('$select.open', function(open){
          if(open){
            $timeout(function(){
              ensureHighlightVisible();
            });
          }
        });

        // when move UP/DOWN, ensure that the dropdown scrolls to keep the current highlighted item in sight
        function ensureHighlightVisible() {
          // debugger;
          scrollFlag = true;
          var container = angular.element(element[0].querySelectorAll('.acq-dropdown-item'));
          var items = angular.element(container[0].querySelectorAll('.acq-dropdown-item-row'));
          var highlighted = items[$select.activeIndex];
          var highlightedHeight = highlighted.getBoundingClientRect().height;
          var posY = highlighted.offsetTop + highlightedHeight - container[0].scrollTop;
          var height = container[0].offsetHeight;

          if (posY > height) {
            container[0].scrollTop += posY - height;
          } else if (posY <= highlightedHeight) {
            if ($select.isGrouped && $select.activeIndex === 0){
              container[0].scrollTop = 0; //To make group header visible when going all the way up
            }else{
              container[0].scrollTop -= highlightedHeight - posY;
            }
          }
        }


        function onDocumentClick(e) {
          var contains = element[0].contains(e.target);

          if (!contains && !$select.clickTriggeredSelect) {
            $select.close();
            scope.$digest();
          }
          $select.clickTriggeredSelect = false;
        }

        // See Click everywhere but here event http://stackoverflow.com/questions/12931369
        $document.on('click', onDocumentClick);

        element.on('$destroy', function(){
          scope.$destroy();
        });

        scope.$on('$destroy', function() {
          $document.off('click', onDocumentClick);
        });

        transcludeFn(scope, function(clone) {
          var transcluded = angular.element('<div>').append(clone);
          var label = transcluded[0].querySelectorAll('label');
          angular.element(element[0].querySelectorAll('.acq-dropdown-label')).replaceWith(label);
          var transcludedMatch = transcluded[0].querySelectorAll('acq-dropdown-selected');
          angular.element(element[0].querySelectorAll('.acq-dropdown-selected')).replaceWith(transcludedMatch);
          var transcludedChoices = transcluded[0].querySelectorAll('acq-dropdown-item');
          angular.element(element[0].querySelectorAll('.acq-dropdown-item')).replaceWith(transcludedChoices);

        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  acqDropdownSelected
   * @restrict E
   * @module  proteus.uiComponents
   *
   * @requires acqDropdownList
   *
   * @description
   * The `acqDropdownSelected` directive contains the template for the selected item of a dropdown list. See
   * {@link acqDropdownList} for an example.
   */
  module.directive('acqDropdownSelected', function() {
    return {
      restrict: 'E',
      require: '^acqDropdownList',
      //replace: true,
      transclude: true,
      templateUrl: 'components/dropdown-list/dropdown-selected.html'
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
   * The `acqFooter` directive is a utility directive for adding footers to various content types.
   */
  module.directive('acqFooter', function() {
    return {
      restrict: 'E'
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
   * The `acqGrid` directive creates a grid.
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
                  <acq-column flex one></acq-column>
                </acq-columns>
              </acq-row>
            </acq-header>

            <acq-body>
              <acq-row ng-repeat="user in users">
                <acq-cells>
                  <acq-cell flex one>{{ user.firstName }}</acq-cell>
                  <acq-cell flex one>{{ user.lastName }}</acq-cell>
                  <acq-cell flex one self-start>
                    <acq-row-toggle></acq-row-toggle>
                  </acq-cell>
                </acq-cells>

                <acq-row-details>
                  User details
                </acq-row-details>
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
   * The `acqHeader` directive is a utility directive for adding a header to any content types.
   */
  module.directive('acqHeader', function() {
    return {
      restrict: 'E'
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
   * The `acqIcon` directive is used for displaying all entypo icons.
   *
   * @param {string} name The name of the icon.
   * @param {string=} [size=small] The size of the icon. Supported sizes are: small|medium|large.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-icon name="cd"></acq-icon>

        <acq-icon name="cd" size="medium"></acq-icon>

        <acq-icon name="cd" size="large"></acq-icon>
      </file>
    </example>
   */
  module.directive('acqIcon', function() {
    var sizes = ['small', 'medium', 'large'];

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
            throw new Error(
              'The expected size ' + newSize + ' is not supported. Supported sizes are: ' + sizes.join('|') + '.'
            );
          }
          icon.removeClass('size-' + oldSize).addClass('size-' + newSize);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqLabel
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqLabel` directive can be used inside any other directive that has a `label` attribute to use HTML instead
   * of text as the label.
   */
  module.directive('acqLabel', function() {
    return {
      restrict: 'E'
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqLayout
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqLayout` directive that wraps the entire application.
   */
  module.directive('acqLayout', function(animate) {
    return {
      restrict: 'E',
      link: function(scope, iElement) {
        animate(iElement, 'fadeIn');
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
   * @deprecated
   *
   * @scope
   *
   * @description
   * **DEPRECATED** use &lt;a&gt; instead.
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
      templateUrl: 'components/link/link.html'
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
   * The `acqList` directive for displaying all types of lists.
   */
  module.directive('acqList', function() {
    return {
      restrict: 'E'
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqMenuButton
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqMenuButton` directive.
   */
  module.directive('acqMenuButton', function() {
    return {
      restrict: 'E'
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
   * The `acqPager` directive adds a pager to the page and allows users to page through grid data.
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
      templateUrl: 'components/pager/pager.html',
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
   * The `acqPanel` directive is a container for various sections contained within a page.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-panel>
          <acq-toolbar type="primary" size="small">
            <span flex>Demo Panel</span>
            <acq-button><acq-icon name="chevron-thin-down" size="medium"></acq-icon></acq-button>
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
        transclude(scope, function(clone) {
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

(function (module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name popover
   * @restrict A
   * @module proteus.uiComponents
   *
   * @description
   * The `popover` directive adds a popover to an element.
   *
   * @param {expression=} [popover] The popover configuration. See {@link service:popover} for the list of configuration
   * options.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <div ng-controller="DemoController">
          <acq-button popover="popoverConfig"> Trigger a popover at the bottom</acq-button>
        </div>
      </file>

      <file name="app.js">
        var module = angular.module('demo', ['proteus.uiComponents']);

        module.controller('DemoController', function ($scope) {
          $scope.popoverConfig = {
            position: 'right-top',
            trigger: 'click',
            templateUrl: 'content.html',
            arrow: true,
            controller: function($scope, popoverInstance) {
              $scope.togglePopover = function() {
                popoverInstance.toggle();
              };
            }
          };
        });
      </file>

      <file name="content.html">
        <div style="width: 100px; height: 100px">
          <input type="text" ng-model="direction">
          <button ng-click="togglePopover()">close</button>
        </div>
      </file>
    </example>
   */
  module.directive('popover', function (popover, $parse) {

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var config = $parse(attrs.popover)(scope);

        var popoverInstance = popover.create({
          template: config.template,
          templateUrl: config.templateUrl,
          position: config.position,
          triggerNode: element[0],
          arrow: config.arrow,
          controller: config.controller,
          resolve: config.resolve,
          locals: config.locals
        });

        bindTrigger(config.trigger || 'click');

        function bindTrigger(trigger) {
          switch (trigger) {
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

        function togglePopover() {
          popoverInstance.toggle();
          scope.$apply();
        }
      }
    };
  });
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
   * The `acqProgressBar` directive is used to show various progress states. Loading, budget spend, etc.
   *
   * @param {Number} [value=0] The current progress value.
   * @param {void=} [disabled] Disables the progress bar if present.
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
      templateUrl: 'components/progress-bar/progress-bar.html',
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
   * @name acqProviderIcon
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqProviderIcon` directive creates an icon that contains a provider logo.
   *
   * @param {string} name The provider name.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-provider-icon name="adwords"></acq-provider-icon>
      </file>
    </example>
   */
  module.directive('acqProviderIcon', function() {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'components/provider-icon/provider-icon.html',
      link: function link(scope, iElement, iAttrs) {
        if (iAttrs.name === undefined) {
          throw new Error('A provider name is required.');
        }

        var icon = iElement.find('i');

        iAttrs.$observe('name', function(name) {
          icon.removeClass().addClass(name);
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
   * The `acqSearchField` directive is used to create a search field.
   *
   * @param {string=} [placeholder] The input placeholder.
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
      templateUrl: 'components/search-field/search-field.html',
      link: function link(scope) {
        scope.resetQuery = function() {
          scope.query = '';
        };
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function (module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqSeverity
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqSeverity` shows the severity level by rendering 6 div blocks.
   *
   * @example
   <example module="proteus.uiComponents">
   <file name="index.html">
   <acq-severity level="severityLevel"></acq-severity>
   </file>

   <file name="app.js">
   var module = angular.module('demo', ['proteus.uiComponents']);

   module.controller('DemoController', function ($scope) {
          $scope.level = 5
        });
   </file>
   </example>
   */
  module.directive('acqSeverity', function () {
    return {
      restrict: 'E',
      scope: {
        level: '='
      },
      templateUrl: 'components/severity/severity.html',
      link: function(scope, iElements){
        var indicationBlocks = iElements.find('div');
        for (var i = 0; i < scope.level; i++){
          indicationBlocks.eq(i).addClass('active-level');
        }
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
   * The `acqSiteToolbar` directive is the main site toolbar.
   */
  module.directive('acqSiteToolbar', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      templateUrl: 'components/site-toolbar/site-toolbar.html'
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqTabContent
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqTabContent` directive.
   *
   * @requires acqTabs
   */
  module.directive('acqTabContent', function() {
    return {
      restrict: 'E',
      scope: false,
      require: ['^acqTabs'],
      link: function(scope, iElement, iAttrs, ctrls) {
        var tabs = ctrls[0];

        iElement.empty();

        tabs.contentArea = iElement;
      }
    };
  });
})(angular.module('proteus.uiComponents'));


(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name acqTabs
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `tabs` directive.
   *
   * @scope
   *
   * @param {expression=} [selected] The currently selected tab index.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-tabs selected="1">
          <acq-panel>
            <acq-toolbar>
              <acq-tab label="Tab 1">
                <div ng-include="'tpl.html'" ng-controller="TplController"></div>
              </acq-tab>

              <acq-tab>
                <acq-label>Tab 2</acq-label>
                Hello from tab 2!
              </acq-tab>
            </acq-toolbar>

            <acq-tab-content></acq-tab-content>
          </acq-panel>
        </acq-tabs>
      </file>
    </example>
   */
  module.directive('acqTabs', function() {
    return {
      restrict: 'E',
      scope: {
        selectedIndex: '=?selected'
      },
      transclude: true,
      controller: 'TabsController',
      link: function postLink(scope, element, attrs, tabsCtrl, transclude) {
        configureAria();
        watchSelected();

        transclude(scope.$parent, function(clone) {
          element.append(clone);
        });

        function configureAria() {
          element.attr('role', 'tablist');
        }

        function watchSelected() {
          scope.$watch('selectedIndex', function watchSelectedIndex(newIndex, oldIndex) {
            tabsCtrl.deselect(tabsCtrl.itemAt(oldIndex));

            if (tabsCtrl.inRange(newIndex)) {
              var newTab = tabsCtrl.itemAt(newIndex);

              while (newTab && newTab.isDisabled()) {
                newTab = newIndex > oldIndex ?
                  tabsCtrl.next(newTab) :
                  tabsCtrl.previous(newTab);
              }

              tabsCtrl.select(newTab);
            }
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
   * @name acqTitle
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqTitle` directive is used for adding a title to pages, toolbars, etc.
   */
  module.directive('acqTitle', function() {
    return {
      restrict: 'E'
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name title
   * @restrict A
   * @module proteus.uiComponents
   *
   * @description
   * The `title` directive works as an attribute which overrides the default html5 'title' attribute.
   */
  module.directive('title', function(position, $animate, $compile, $timeout) {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        var tooltip;
        var title = tAttrs.title;
        delete tAttrs.title;
        tElement.removeAttr('title');
        //tAttrs.$set( 'title', null );

        return function link(scope, iElement) {

          var mouseEvent, promise;
          var tooltipOffset = {x: 5, y: 8};    // the offset from mouse cursor position;
          var screenMargin = {x: 5, y: 5};     // when adjusting element position according to viewport, leave some space to the viewport edge;

          iElement
            .on('mouseenter', function(e) {
              mouseEvent = e;
              promise = $timeout(function() {
                tooltip = angular.element('<div class="fade" style="min-width: 150px">' + title + '</div>');
                tooltip.css({display: 'none', position: 'absolute'});
                $compile(tooltip)(scope);

                $animate.enter(tooltip, iElement, null);
                $timeout(function() {
                  var mPosition = position.getRelativeMousePosition(tooltip[0], mouseEvent);

                  var left = mPosition.left + tooltipOffset.x;
                  var top = mPosition.top + tooltipOffset.y;
                  tooltip.css({'left': left + 'px', 'top': top + 'px'});
                  var delta = position.getViewportAdjusteddelta(tooltip[0]);
                  if (delta.left > 0 || delta.top > 0) {
                    left = left - (delta.left + screenMargin.x);
                    top = top - (delta.top + screenMargin.y);
                    tooltip.css({'left': left + 'px', 'top': top + 'px'});
                  }

                });
              }, 480);
            })
            .on('mousemove', function(e) {
              mouseEvent = e;
            })
            .on('mouseleave', function() {
              $timeout.cancel(promise);
              $animate.leave(tooltip);
              scope.$apply();
            });
        };
      }
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
   * The `acqToolbar` directive is used to create the various toolbars used throughout the platform.
   *
   * @param {string=} [type=primary] The type of the toolbar. Can be one of primary|secondary|tertiary.
   * @param {string=} [size=medium] The size of the toolbar. Can be one of small|medium|large.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-toolbar primary>
          <span flex>Label</span>
          <acq-search-field></acq-search-field>
          <acq-button><acq-icon name="chevron-thin-down"></acq-icon></acq-button>
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
   * @description
   * The `acqView` directive wraps all content within the {@link acqMainContent} directive excluding the module
   * navigation and {@link acqSiteToolbar}.
   *
   * @example
    <example module="proteus.uiComponents">
      <file name="index.html">
        <acq-view>
          <span>Some elements</span>
        </acq-view>
      </file>
    </example>
   */
  module.directive('acqView', function() {
    return {
      restrict: 'E'
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
   * **NOT WORKING YET**
   *
   * The `acqWizard` directive creates a wizard.
   *
   * @example
    <example module="demo">
      <file name="index.html">
        <acq-wizard>
          <acq-wizard-step label="First step">
            Hello from first step!
          </acq-wizard-step>

          <acq-wizard-step label="Second step" template="second.html"></acq-wizard-step>

          <acq-wizard-step label="Third step" controller="ThirdStepController as step">
            {{ step.message }}
          </acq-wizard-step>
        </acq-wizard>
      </file>

      <file name="app.js">
        var module = angular.module('demo', ['proteus.uiComponents']);

        module.controller('ThirdStepController', function() {
          this.message = 'Hello from third controller!';
        });
      </file>

      <file name="second.html">
        Hello from second step!
      </file>
    </example>
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

  function animateFactory(Velocity, $q, $rootScope) {
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
     * @param {Object=} options
     *
     * @returns {Promise}
     */
    var animate = function(element, properties, options) {
      var deferred = $q.defer();

      Velocity(element[0], properties, angular.extend({
        duration: 220,
        complete: function() {
          deferred.resolve();

          $rootScope.$digest();
        }
      }, options));

      return deferred.promise;
    };

    return animate;
  }

  module.factory('animate', animateFactory);
})(angular.module('proteus.uiComponents'));



(function(module) {
  'use strict';

  /**
   * @ngdoc service
   * @name position
   * @kind object
   * @module proteus.uiComponents
   *
   * @description
   * The `position` service
   */
  function positionFactory($document, $window) {
    function parentOffsetEl(element) {
      var docBody = $document[0].body;
      var offsetParent = element.offsetParent;

      return offsetParent || docBody;
    }

    // get the position relative to nearest containing element, if 'mousePosition' is provided, get the mouse position relative to the nearest contianing element
    // (offsetParent: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.offsetParent)
    function position(element, mousePosition) {
      var top, left;
      var elBCR = offset(element);
      var offsetParentBCR;
      var offsetParentEl = parentOffsetEl(element);

      offsetParentBCR = offset(offsetParentEl);
      offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
      if (angular.isDefined(mousePosition)){
        // when the offsetParent is not document.body, address window scroll to get the 'correct' mouse position
        if (offsetParentEl !== $document[0].body){
          mousePosition.y += $window.pageYOffset;
          mousePosition.x += $window.pageXOffset;
        }
        top = mousePosition.y - offsetParentBCR.top;
        left = mousePosition.x - offsetParentBCR.left;
      }else{
        top = elBCR.top - offsetParentBCR.top;
        left = elBCR.left - offsetParentBCR.left;
      }

      var boundingClientRect = element.getBoundingClientRect();
      return {
        width: boundingClientRect.width,
        height: boundingClientRect.height,
        top: top,
        left: left
      };
    }

    // get the position relative to the HTML document
    function offset(element) {
      var boundingClientRect = element.getBoundingClientRect();
      return {
        width: boundingClientRect.width,
        height: boundingClientRect.height,
        top: boundingClientRect.top + $window.pageYOffset,
        left: boundingClientRect.left + $window.pageXOffset
      };
    }

    function calculatePosition(element, base, pos, arrow) {

      var elementWidth, elementHeight, elementPosition;

      var posArr = pos.split('-');
      var pos1 = posArr[0];   // placement: top, left, right, bottom
      var pos2 = posArr[1] || 'center';   // alignment, left, right, top, bottom, center. default to center

      // TODO: configuration for this!
      var arrowOffset = 7;

      elementWidth = angular.element(element).prop('offsetWidth');
      elementHeight = angular.element(element).prop('offsetHeight');

      var shiftWidth = {
        center: function() {
          return base.left + base.width / 2 - elementWidth / 2;
        },
        left: function() {
          return base.left - elementWidth;
        },
        right: function() {
          return base.left + base.width;
        }
      };

      var shiftHeight = {
        center: function() {
          return base.top + base.height / 2 - elementHeight / 2;
        },
        top: function() {
          return base.top - elementHeight;
        },
        bottom: function() {
          return base.top + base.height;
        }
      };

      var align = {
        left: function() {
          return base.left;
        },
        right: function() {
          return base.left + base.width - elementWidth;
        },
        top: function() {
          return base.top;
        },
        bottom: function() {
          return base.top + base.height - elementHeight;
        },
        center: function() {
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

      if (arrow) {
        switch (pos1) {
          case 'left':
            elementPosition.left = elementPosition.left - arrowOffset;
            break;
          case 'right':
            elementPosition.left = elementPosition.left + arrowOffset;
            break;
          case 'top':
            elementPosition.top = elementPosition.top - arrowOffset;
            break;
          case 'bottom':
            elementPosition.top = elementPosition.top + arrowOffset;
            break;
        }

      }
      return elementPosition;
    }

    function positionArrow(triggerNode, element, pos) {
      var posArr = pos.split('-');
      var pos1 = posArr[0];   // placement: top, left, right, bottom
      var pos2 = posArr[1] || 'center';   // alignment, left, right, top, bottom, center. default to center

      var triggerElRect = triggerNode.getBoundingClientRect();
      var elementElRect = element.getBoundingClientRect();

      var triggerElDimension = {
        width: triggerElRect.width,
        height: triggerElRect.height
      };

      var elementElDimension = {
        width: elementElRect.width,
        height: elementElRect.height
      };

      if (pos1 === 'top' || pos1 === 'bottom') {
        if (triggerElDimension.width > elementElDimension.width) {
          return {left: elementElDimension.width / 2, pos: pos};
        } else {
          switch (pos2) {
            case 'left':
              return {left: triggerElDimension.width / 2, pos: pos};
            case 'right':
              return {left: elementElDimension.width - triggerElDimension.width / 2, pos: pos};
            default:
              return {left: elementElDimension.width / 2, pos: pos};
          }
        }
      } else {
        if (triggerElDimension.height > elementElDimension.height) {
          return {top: elementElDimension.height / 2, pos: pos};
        } else {
          switch (pos2) {
            case 'top':
              return {top: triggerElDimension.height / 2, pos: pos};
            case 'bottom':
              return {top: elementElDimension.height - triggerElDimension.height / 2, pos: pos};
            default:
              return {top: elementElDimension.height / 2, pos: pos};
          }
        }
      }
    }

    // get mouse position relative to the viewport, regardless of scroll
    function getMousePosition(mouseEvent){
      //var mouse = {};
      //mouse.x = mouseEvent.clientX || mouseEvent.pageX;
      //mouse.y = mouseEvent.clientY || mouseEvent.pageY;
      return {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      };
    }

    // return positive values
    function getViewportAdjusteddelta(element){
      var delta = {left: 0, top: 0};

      //var viewportWidth = $window.innerWidth;
      //var viewportHeight = $window.innerHeight;
      var viewportWidth = $document[0].documentElement.clientWidth;
      var viewportHeight =  $document[0].documentElement.clientHeight;
      var elementDimension = offset(element);
      if (elementDimension.width + elementDimension.left > viewportWidth + $window.pageXOffset){
        delta.left = elementDimension.width + elementDimension.left - (viewportWidth + $window.pageXOffset);
      }
      if (elementDimension.top + elementDimension.height > viewportHeight + $window.pageYOffset){
        delta.top = elementDimension.top + elementDimension.height - (viewportHeight + $window.pageYOffset);
      }

      return delta;
    }

    return {
      /**
       * @ngdoc method
       * @name position#positionElement
       * @kind function
       *
       * @description
       * calculate the position of the popover element
       *
       * @param {DOMElement} the Dom Element which triggers the popover
       * @param {DOMElement} the Dom Element which is to be placed
       * @param {String} position option, left|bottom|top|right
       * @param {String} dimension options
       *
       * @returns {Object} a position object. for example: {left: 12, top: -20}
       */
      positionElement: function positionElement(triggerNode, element, pos, dimension) {
        var base = position(triggerNode);
        var calculatedPosition = calculatePosition(element, base, pos, dimension);

        return calculatedPosition;
      },

      /**
       * @ngdoc method
       * @name position#positionArrow
       * @kind function
       *
       * @description
       * calculate the position of the arrow
       *
       * @param {DOMElement} the Dom Element which triggers the popover
       * @param {DOMElement} the Dom Element which is to be placed
       * @param {String} position option, left|bottom|top|right|left-bottom|top-right, etc
       *
       * @returns {Object} a position object. for example: {left: 12} or {top: -100}
       */
      positionArrow: positionArrow,
      getMousePosition: getMousePosition,

      /**
       * @ngdoc method
       * @name position#getRelativeMousePosition
       * @kind function
       *
       * @description
       * get the mouse position relative to the trigger element's nearest non-static positioned parent. used to position 'title' relative to the current mouse position
       *
       * @param {DOMElement} the Dom Element which triggers the mouseevent
       * @param {DOMEvent} the mouse event
       *
       * @returns {Object} a position object. for example: {left: 12, top: -100}
       */
      getRelativeMousePosition: function(element, mouseEvent){
        var mousePosition = getMousePosition(mouseEvent);
        var relativePosition = position(element, mousePosition);
        return {
          left: relativePosition.left,
          top: relativePosition.top
        };
      },

      /**
       * @ngdoc method
       * @name position#getViewportAdjusteddelta
       * @kind function
       *
       * @description
       * return the delta value which represents the distance that element 'exceeds' the viewport
       *
       * @param {DOMElement} the target Dom Element
       *
       * @returns {Object} a position object. will always return positive value for the delta. for example: {left: 20, top :30}
       */
      getViewportAdjusteddelta: getViewportAdjusteddelta

    };

  }

  module.factory('position', positionFactory);
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc service
   * @name repeatParser
   * @kind
   * @module  proteus.uiComponents
   *
   * @description
   * The `repeatParser` service.
   */
  function RepeatParser($parse) {
    var self = this;

    /**
     * @ngdoc method
     * @name repeatParser#parse
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * The `parse` method which parses
     *
     * @returns {Object} an object contains the parsed result.
     *
     * Example:
     * expression = "address in addresses | filter: {street: $select.search} track by $index"
     * itemName = "address",
     * source = "addresses | filter: {street: $select.search}",
     * trackByExp = "$index",
     *
     */
    self.parse = function(expression) {

      var match = expression.match(
        /^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/
      );

      if (!match) {
        throw new Error('Expected expression in form of "_item_ in _collection_[ track by _id_]" but got "{0}".');
      }

      return {
        itemName: match[2], // (lhs) Left-hand side,
        source: $parse(match[3]),
        trackByExp: match[4],
        modelMapper: $parse(match[1] || match[2])
      };

    };

    self.getGroupNgRepeatExpression = function() {
      return '$group in $select.groups';
    };

    self.getNgRepeatExpression = function(itemName, source, trackByExp, grouped) {
      var expression = itemName + ' in ' + (grouped ? '$group.items' : source);
      if (trackByExp) {
        expression += ' track by ' + trackByExp;
      }
      return expression;
    };
  }

  module.service('repeatParser', RepeatParser);
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function VelocityFactory($window) {
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
    var Velocity = $window.Velocity || $window.jQuery.Velocity;

    return Velocity;
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
   * The `acqCells` directive is for wrapping multiple {@link acqCell}. See {@link acqGrid} for an example.
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
   * The `acqColumns` directive wraps multiple {@link acqColumn}. See {@link acqGrid} for an example..
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

  function AcqRowDetailsController($element, animate) {
    this.$element = $element;
    this.animate = animate;
  }

  AcqRowDetailsController.prototype.open = function() {
    return this.animate(this.$element, 'slideDown', { easing: 'easeOut' });
  };

  AcqRowDetailsController.prototype.close = function() {
    return this.animate(this.$element, 'slideUp', { easing: 'easeIn' });
  };

  module.controller('AcqRowDetailsController', AcqRowDetailsController);

  /**
   * @ngdoc directive
   * @name acqRowDetails
   * @restrict E
   * @module proteus.uiComponents
   *
   * @requires acqRow
   *
   * @description
   * The `acqRowDetails` directive is used to contain additional layers of information and functionality for grids data.
   * See {@link acqGrid} for an example.
   */
  module.directive('acqRowDetails', function() {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      controller: 'AcqRowDetailsController',
      require: ['acqRowDetails', '^acqRow'],
      link: function link(scope, iElement, iAttrs, ctrls, transclude) {
        var ctrl = ctrls[0];
        var rowCtrl = ctrls[1];

        rowCtrl.setDetails(ctrl);

        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function AcqRowToggleController($q, $element, animate) {
    this.$q = $q;
    this.$element = $element;
    this.animate = animate;
  }

  AcqRowToggleController.prototype.open = function() {
    // TODO: support dynamic height
    return this.$q.all([
      this.animate(this.$element.find('button'), {
        backgroundColor: '#cccccd',
        height: 51
      }, { easing: 'easeIn' }),
      this.animate(this.$element.find('i'), {
        rotateX: '180deg'
      }, { easing: 'easeIn' })
    ]);
  };

  AcqRowToggleController.prototype.close = function() {
    return this.$q.all([
      this.animate(this.$element.find('button'), {
        backgroundColor: '#99999d',
        height: 40
      }, { easing: 'easeOut' }),
      this.animate(this.$element.find('i'), {
        rotateX: '0deg'
      }, { easing: 'easeOut' })
    ]);
  };

  module.controller('AcqRowToggleController', AcqRowToggleController);

  /**
   * @ngdoc directive
   * @name acqRowToggle
   * @restrict E
   * @module proteus.uiComponents
   *
   * @requires acqRow
   *
   * @description
   * The `acqRowToggle` directive creates a toggle to control its parent {@link acqRow}'s {@link acqRowDetails}. See
   * {@link acqGrid} for an example.
   */
  module.directive('acqRowToggle', function() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'AcqRowToggleController',
      require: ['acqRowToggle', '^acqRow'],
      templateUrl: 'components/grid/row/row-toggle.html',
      link: function link(scope, iElement, iAttrs, ctrls) {
        var ctrl = ctrls[0];
        var rowCtrl = ctrls[1];

        rowCtrl.setToggle(ctrl);

        iElement.on('click', function() {
          rowCtrl.toggle();
          scope.$apply();
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function AcqRowController($scope, $element, $attrs, $parse) {
    this.$scope = $scope;
    this.$element = $element;
    this.$attrs = $attrs;
    this.$parse = $parse;
    this.isOpen = 'false';
  }

  AcqRowController.prototype.toggle = function() {
    this.$scope.isOpen = !this.$scope.isOpen;
  };

  AcqRowController.prototype.open = function() {
    var expr = this.$parse(this.$attrs.isOpen);

    if (expr.assign) {
      expr.assign(this.$scope, true);
    } else {
      this.$attrs.isOpen = 'true';
    }

    this.$scope.isOpen = true;
  };

  AcqRowController.prototype.close = function() {
    var expr = this.$parse(this.$attrs.isOpen);

    if (expr.assign) {
      expr.assign(this.$scope, false);
    } else {
      this.$attrs.isOpen = 'false';
    }

    this.$scope.isOpen = false;
  };

  AcqRowController.prototype.setToggle = function(toggleCtrl) {
    this.toggleCtrl = toggleCtrl;
  };

  AcqRowController.prototype.setDetails = function(detailsCtrl) {
    this.detailsCtrl = detailsCtrl;
  };

  module.controller('AcqRowController', AcqRowController);

  /**
   * @ngdoc directive
   * @name acqRow
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqRow` directive creates a grid row. See {@link acqGrid} for an example.
   */
  module.directive('acqRow', function() {
    return {
      restrict: 'E',
      scope: {
        isOpen: '=?'
      },
      transclude: true,
      controller: 'AcqRowController',
      compile: function(tElement, tAttrs) {
        if (tAttrs.isOpen === undefined) {
          tAttrs.isOpen = 'false';
        }

        return function(scope, iElement, iAttrs, ctrl, transclude) {
          scope.$watch('isOpen', function(isOpen) {
            if (ctrl.toggleCtrl) {
              if (isOpen) {
                ctrl.toggleCtrl.open().then(function() {
                  toggleDetails();
                });
              } else {
                toggleDetails().then(function() {
                  ctrl.toggleCtrl.close();
                });
              }
            } else {
              toggleDetails();
            }

            function toggleDetails() {
              if (ctrl.detailsCtrl) {
                if (scope.isOpen) {
                  return ctrl.detailsCtrl.open();
                } else {
                  return ctrl.detailsCtrl.close();
                }
              }
            }
          });

          transclude(function(clone) {
            iElement.append(clone);
          });
        };
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function AcqMainContentController($element) {
    this.$element = $element;
  }

  AcqMainContentController.prototype.open = function() {
    this.$element.addClass('opened');
  };

  AcqMainContentController.prototype.close = function() {
    this.$element.removeClass('opened');
  };

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
   * The `acqMainContent` directive is the content area for side panels.
   */
  module.directive('acqMainContent', function(sideMenu) {
    return {
      restrict: 'E',
      scope: false,
      transclude: true,
      controller: 'AcqMainContentController',
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        sideMenu.attach(ctrl);

        iElement.on('$destroy', function() {
          sideMenu.detach(ctrl);
        });

        transclude(function(clone) {
          iElement.attr('fit', '').append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  function sidePanelFactory() {
    /**
     * @ngdoc service
     * @name sidePanel
     * @kind object
     * @module proteus.uiComponents
     *
     * @description
     * The `sidePanel` service.
     */
    function SidePanel() {}

    /**
     * @ngdoc method
     * @name sidePanel#open
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * The `open` method.
     *
     * @returns {void}
     */
    SidePanel.prototype.open = function() {
      this._controller && this._controller.open();
    };

    /**
     * @ngdoc method
     * @name sidePanel#close
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * The `close` method.
     *
     * @returns {void}
     */
    SidePanel.prototype.close = function() {
      this._controller && this._controller.close();
    };

    /**
     * @ngdoc method
     * @name sidePanel#toggle
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * The `toggle` method.
     *
     * @returns {void}
     */
    SidePanel.prototype.toggle = function() {
      this._controller && this._controller.toggle();
    };

    /**
     * @ngdoc method
     * @name sidePanel#attach
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * Attaches a delegate to the service. Only a single delegate can be attached at the moment.
     *
     * @param {Object} component The directive controller of the layout containing the actual side-panel.
     *
     * @returns {void}
     */
    SidePanel.prototype.attach = function(controller) {
      this._controller = controller;
    };

    /**
     * @ngdoc method
     * @name sidePanel#detach
     * @kind function
     * @module proteus.uiComponents
     *
     * @description
     * Detaches a delegate from the service.
     *
     * @param {Object} component The directive controller of the layout containing the actual side-panel.
     *
     * @returns {void}
     */
    SidePanel.prototype.detach = function(controller) {
      if (this._controller === controller) {
        this._controller = null;
      }
    };

    return new SidePanel();
  }

  module.factory('sideMenu', sidePanelFactory);

  /**
   * @ngdoc directive
   * @name acqSidePanel
   * @restrict E
   * @module proteus.uiComponents
   *
   * @description
   * The `acqSidePanel` directive is used to create a side panel.
   */
  module.directive('acqSidePanel', function() {
    return {
      restrict: 'E',
      scope: true,
      transclude: true,
      link: function link(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(scope, function(clone) {
          iElement.attr('fit','').attr('layout', '').attr('vertical', '').append(clone);
        });
      }
    };
  });
})(angular.module('proteus.uiComponents'));

(function(module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name sidePanelToggle
   * @restrict A
   * @module proteus.uiComponents
   *
   * @description
   * The `sidePanelToggle` directive allows the menu button and the main content to communicate so that the side panel
   * toggles.
   */
  module.directive('sidePanelToggle', function(sideMenu) {
    return {
      restrict: 'A',
      scope: false,
      link: function link(scope, iElement) {
        iElement.on('click', function() {
          sideMenu.toggle();
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
   * The `acqItem` directive is for creating items for `acqList`.
   */
  module.directive('acqItem', function() {
    return {
      restrict: 'E'
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
   * The `acqWizardContent` directive displays wizard content.
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
   * The `acqWizardNav` directive displays wizard navigation.
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
   * The `acqWizardSteps` directive wraps `acqWizardStep`.
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
   * The `acqCell` directive is for creating data cells in a grid. See {@link acqGrid} for an example.
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
   * The `acqColumn` directive is used to add labels to grid columns. See {@link acqGrid} for an example.
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
   * The `acqWizardStep` directive displays the label for each wizard step.
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