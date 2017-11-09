(function () {
    'use strict';
    angular.module('app', ['ng-fusioncharts', 'ui.router', 'api.users', 'components.users', 'components.expenses']);

    angular.module('app').config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider", "$qProvider"];

    function config($stateProvider, $urlRouterProvider, $qProvider) {
        $stateProvider
            .state('users', {
                url: '/',
                templateUrl: 'templates/component/users/home.html',
                controller: 'UsersController as us'
            })
            .state('expenses', {
                url: '/expenses',
                templateUrl: 'templates/component/expenses/expenses.html',
                controller: 'expensesController as us'
            });
        $urlRouterProvider.otherwise("/");
    }
})();