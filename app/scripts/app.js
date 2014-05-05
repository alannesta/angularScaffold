'use strict';

angular
  .module('angularTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
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
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$rootScope', function($rootScope){
    $rootScope.flag = 'I am root';
  }]);
