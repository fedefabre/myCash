(function () {
    'use strict';
    angular.module('app', ['ng-fusioncharts', 'ui.router', 'api.users','components.users'])
        .config(function ($urlRouterProvider, $qProvider) {
            $urlRouterProvider.otherwise("/");
        });
})();