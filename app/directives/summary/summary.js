(function () {

    angular.module('app').directive('summary', ["$state",function ($state) {

        return {
            templateUrl: 'templates/directives/summary/summary.html',
            scope: {
                user: '='
            },
            link: function (scope, element, attrs) { }
        };
    }]);
})();