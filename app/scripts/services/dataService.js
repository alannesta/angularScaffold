'use strict'

angular.module('angularTestApp').service('dataService', ['$http', '$q', function($http, $q){
    
    var baseUrl = 'http://newdevapi.moneycloud.me/moneycloud-rest/v1/';
    $http.defaults.headers.common['Content-Type'] = 'application/json';

    function httpConnect(request){
        $http.defaults.headers.common.session = sessionStorage.getItem('session');
        var deferred = $q.defer();
        $http(request)
        .success(function(data, status, headers, config) {
            if(data&&data.message) {
                console.log(data.message);
            }
            if(data.code)
                deferred.resolve(data);
            else{
                deferred.resolve(data.result);
            }        
        })
        .error(function(data, status, headers, config) {                      
            if (data && data.message) {
                alert(data.message);
                console.log(data.message);
            } else {
                console.log('connection error');
            }

            deferred.reject(data);
        });

        // return deferred.promise.then(function(data) {
        //     return data;
        // }, function(error) {
        //     return error;
        // });
        return deferred.promise;
    }

    //expose service api
    return {
        login: function(credentials) {
            var request = {
                // http://newdevapi.moneycloud.me/moneycloud-rest/v1.0/consumers/auth
                url: baseUrl + "consumers/auth",
                method: "POST",
                cache: false,
                data: credentials
            };

            return httpConnect(request);
        },
        getTransactions: function(pagesize, current){
            var queryParams = {
                    pagesize: pagesize,
                    current: current
                };
                //http://newdevapi.moneycloud.me/moneycloud-rest/v1.0/consumers/transactions/list?pagesize=12&current=0
                var request = {
                    url: baseUrl + 'consumers/transactions/list?' + $.param(queryParams),
                    method: "GET",
                    cache: false
                };

                return httpConnect(request);
        }

    }

}]);