(function () {

    angular.module('app').directive('summaryLong', ["$state", function ($state) {

        return {
            templateUrl: 'templates/directives/summary/summary-long.html',
            scope: {
                user: '='
            },
            link: function (scope, element, attrs) { }
        };
    }]);
})();