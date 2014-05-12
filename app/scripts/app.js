'use strict';

angular
  .module('angularTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate'   //animation support
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
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$rootScope', '$route', function($rootScope, $route){
    
    $rootScope.historyLog = ['/'];
    $rootScope.from = '';
    $rootScope.to = '';
    $rootScope.direction = 'left'   //animation direction

    $rootScope.$on("$routeChangeStart", function(event, next, current){
      //console.log('route change start triggered');
      //console.log(current.scope);
      //console.log(current.$$route.originalPath);
      
      $rootScope.from = current.$$route.originalPath;
      $rootScope.to = next.$$route.originalPath;
      console.log('to: '+$rootScope.to );
      console.log('from: '+$rootScope.from );
      var lastState = $rootScope.historyLog.pop()
      if ($rootScope.to == lastState){
        $rootScope.direction = 'right';
        if(!current.scope.$$phase) {
          current.scope.$apply();
        }
        
      }else{
        $rootScope.historyLog.push(lastState);  //push back the previous poped state
        $rootScope.historyLog.push($rootScope.from);
        $rootScope.direction = 'left';
        if(!current.scope.$$phase) {
          current.scope.$apply();
        }
      }
      console.log($rootScope.historyLog);
    })


  }]);
