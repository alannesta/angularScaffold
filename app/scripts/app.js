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
    $rootScope.direction = 'slide-left'   //animation direction

    $rootScope.$on("$routeChangeStart", function(event, next, current){
      console.log('main route change start triggered');
      //console.log(current.scope);
      //console.log(current.$$route.originalPath);
      
      $rootScope.from = current.$$route.originalPath;
      $rootScope.to = next.$$route.originalPath;
      // console.log('to: '+$rootScope.to );
      // console.log('from: '+$rootScope.from );

      // $rootScope.back = function(){
      //   console.log('back triggerred');
      //   $rootScope.direction = 'slide-right';
      //   // $location.path('/about');

      // }

      // $rootScope.forward = function(){
      //   console.log('forward triggerred');
      //   $rootScope.direction = 'slide-left'

      //   // $location.path('/');
      // }

      //must trigger in scope so that it can change the rootScope.direction before routeChangeStart event(animation event)
      $rootScope.navigate = function(){
        var lastState = $rootScope.historyLog.pop()
        if ($rootScope.to == lastState){
          console.log('history back');
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

      
      // console.log($rootScope.historyLog);
    })


  }]);
