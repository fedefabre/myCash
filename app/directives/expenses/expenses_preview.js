(function(){

    'use strict';

    angular.module('app').directive('expensesPreview', function () {

        return {

            templateUrl: 'directives/expenses/expenses_preview.html',
            scope: {
                user: '=',
                common: '=',
                chart: '='
            }
        };

    });

})();

/*

vm.name = 'fede';

@ text bind: In this case the modified content only affect the directive (name="{{name}}")

= two way bind: In this case the modified content affect directive and controller (name="name")

& one way bind: 

*/