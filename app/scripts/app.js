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
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$rootScope', '$route', 'dataService','$http', function($rootScope, $route, dataService, $http){
    
    $rootScope.historyLog = ['/'];
    $rootScope.from = '';
    $rootScope.to = '';
    $rootScope.direction = 'slide-left'   //animation direction

    var user = {
        username: 'alannesta@sina.com',
        password: '112233',
        installationID: ''
    }

    console.log('root scope run triggered')
    if (sessionStorage.getItem('session')==null){
      dataService.login(user).then(function(data){
        
        sessionStorage.setItem('session', data.sessionToken);
        // $http.defaults.headers.common.session = data.sessionToken;
      })
    }
    

    $rootScope.$on("$routeChangeStart", function(event, next, current){
      //console.log('main route change start triggered');
      
      $rootScope.from = current? current.$$route.originalPath: null;
      $rootScope.to = next.$$route.originalPath;
      
      //must trigger in scope so that it can change the rootScope.direction before routeChangeStart event(animation event)
      $rootScope.navigate = function(){
        var lastState = $rootScope.historyLog.pop()
        if ($rootScope.to == lastState){
          //console.log('history back');
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
