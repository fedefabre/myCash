(function () {

    angular.module('app').directive('availablePreview', function () {

        return {

            templateUrl: 'templates/directives/available/available_preview.html',
            scope: {
                user: '=',
                chart: '=',
                projection: '='
            }
        }

    });

})();