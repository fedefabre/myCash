(function () {

    angular.module('app').directive('availablePreview', function () {

        return {

            templateUrl: 'directives/available/available_preview.html',
            scope: {
                user: '=',
                chart: '='
            }
        }

    });

})();