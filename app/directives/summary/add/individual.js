(function () {

    'use strict';

    angular.module('app').directive('addIndividual', ["Users", "$q", "$rootScope", function (Users, $q, $rootScope) {

        function Function($scope, elem, atrs) {

            $scope.charge = { due: 1};
            $scope.save = function (form) {
                $scope.charge.type = $scope.type.shortName;
                if ($scope.charge.type == "fixed") { $scope.charge.date = new Date(); }
                var summary = $q.defer();
                if (form.$valid) {
                    summary.resolve();
                } else {
                    summary.reject('There is an error with the info submitted');
                }
                summary.promise.then(
                    function () {
                        var obj = $scope.charge;
                        $('#addCharge' + $scope.type.shortName).modal('toggle');
                        $scope.charge = {};
                        $scope.form.$setPristine();
                        $rootScope.$broadcast('newCharge', { charge: obj })
                    }, function (err) {
                        $scope.error = err;
                    });
            }
        };

        return {
            templateUrl: 'templates/directives/summary/add/individual.html',
            scope: {
                type: '='
            },
            link: Function
        }

    }]);
    
})();