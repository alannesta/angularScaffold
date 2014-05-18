'use strict';

angular.module('angularTestApp')
  .controller('promiseCtrl', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
    
    var user = {
        username: 'acao@moneycloud.me',
        password: '112233',
        installationID: ''
    }

    dataService.login(user).then(function(data){
        $http.defaults.headers.common.session = data.sessionToken;
        dataService.getTransactions({pageSize:50, current: 0}).then(function(data){
            console.log(data);
        })
    })

  }]);
