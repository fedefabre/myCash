(function(){

    'use strict';

    angular.module('app').directive('expensesPreview', function () {

        return {

            templateUrl: 'templates/directives/expenses/expenses_preview.html',
            scope: {
                user: '=',
                common: '=',
                chart: '='
            },
            link: function (scope, elem, atr) { }
        };

    });

})();