'use strict';

angular.module('angularTestApp')
  .controller('promiseCtrl', ['$scope', '$http', '$q','dataService', 'transactions',function ($scope, $http, $q, dataService, transactions) {

    // $scope.transactions = transactions
    //console.log(transactions);
    // dataService.getTransactions({pageSize:50, current: 0}).then(function(data){
    //         console.log(data);
    //         $scope.transactions = data.dataset;
    //     })

    // $scope.transactions = dataService.getTransactions({pageSize:50, current:0}).then(function(data){
    // console.log(data);  
    // data.dataset.push({test:'test'});   //modify the result by extending the promise 
    // console.log($scope.transactions);
    // return data.dataset
    // })

    var deferred = $q.defer();
    dataService.getTransactions({pageSize:50, current: 0}).then(function(data){
        $scope.transactions = data.dataset;
        data.dataset.push({test:'test'});   
        deferred.resolve(data.dataset)
    })

    // $scope.otherTransactions = deferred.promise;
    // console.log($scope.otherTransactions);

    $scope.refresh = function(){
        $(".container2").append("<ul ng-repeat = 'transaction in transactions'><li>{{transaction.firstname}}</li></ul>");
        $(".container2").append("<p>fuck</p>");
    }

  }]);
