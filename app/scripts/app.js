'use strict';

angular
  .module('angularTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'proteus.uiComponents'
  ])  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about',{
        templateUrl: 'views/about.html',
        controller: 'aboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactCtrl'
      })
      .when('/directivedemo', {
        templateUrl: 'views/directive demo.html',
        controller: 'directiveCtrl'
      })
      .when('/animation', {
        templateUrl: 'views/animation_test.html',
        controller: 'animationCtrl'
      })
      .when('/promise', {
        templateUrl: 'views/promise.html',
        controller: 'promiseCtrl',
        resolve: {
          transactions: ['dataService', function(dataService){
            // var promise = dataService.getTransactions({pageSize:50, current:0}).then(function(data){
            //   console.log(data);  
            //   data.dataset.push({test:'test'});   //modify the result by extending the promise    
            //   return data.dataset
            // })

            // return promise
            // return dataService.getTransactions({pageSize:50, current:0})
          }]
        }
      })
      .when('/proteus', {
        templateUrl: 'views/proteus.html',
        controller: 'proteusUiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$rootScope', '$route', 'dataService','$http', '$templateCache', function($rootScope, $route, dataService, $http, $templateCache){
    
    $rootScope.historyLog = ['/'];
    $rootScope.from = '';
    $rootScope.to = '';
    $rootScope.direction = 'slide-left'   //animation direction

    var user = {
        username: 'alannesta@sina.com',
        password: '112233',
        installationID: ''
    }

    // console.log('root scope run triggered')
    // if (sessionStorage.getItem('session')==null){
    //   dataService.login(user).then(function(data){
        
    //     sessionStorage.setItem('session', data.sessionToken);
    //     // $http.defaults.headers.common.session = data.sessionToken;
    //   })
    // }
    


    // route change animation
    $rootScope.$on("$routeChangeStart", function(event, next, current){
      //bi-direction animation block
      $rootScope.from = current? current.$$route.originalPath: null;
      $rootScope.to = next.$$route.originalPath;
      
      //must trigger in scope so that it can change the rootScope.direction before routeChangeStart event(animation event)
      $rootScope.navigate = function(){
        var lastState = $rootScope.historyLog.pop()
        if ($rootScope.to == lastState){
          $rootScope.direction = 'slide-right';
          if(!$rootScope.$$phase) {
            $rootScope.$apply();
          }

        }else{
          console.log('history forward');
          $rootScope.historyLog.push(lastState);  //push back the previous poped state
          $rootScope.historyLog.push($rootScope.from);
          $rootScope.direction = 'slide-left';
          if(!$rootScope.$$phase) {
            $rootScope.$apply();
          }
        }
      }
    });

    // $templateCache usage, can be referred in directive
    $templateCache.put('popovercached', "<acq-panel type=\"primary\" style=\"height: 100px; padding: 15px; background-color: #55555b\">\n  <div>Popover Test</div>\n  <acq-search-field placeholder='{{placeholder}}'></acq-search-field>\n  <div>\n    <acq-icon-button icon-name=\"cross\" icon-size=\"2x\" ng-click=\"close($event)\"></acq-icon-button>\n    <acq-button ng-click=\"confirm($event)\">confirm</acq-button>\n  </div>\n</acq-panel>\n")
    
  }]);
