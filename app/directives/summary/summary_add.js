(function(){
    'use strict';

    angular.module('app').directive('addChargeModal', function (Users, $q, $rootScope) {

        function Function($scope, elem, atrs) {

            $scope.charge = {};         
            $scope.save = function (form) {
                var summary = $q.defer();
                if (form.$valid) {
                    summary.resolve();
                } else {
                    summary.reject('There is an error with the info submitted');
                }
                summary.promise.then(
                    function () {
                        let obj = $scope.charge;
                        Users.addCharge(0, obj);
                        $('#addCharge').modal('toggle');                       
                        $scope.charge = {};
                        $scope.form.$setPristine();
                        $rootScope.$broadcast('newCharge', {charge:obj})
                    }, function (err) {
                        $scope.error = err;
                    });
            }
        };

        return {
            templateUrl: 'directives/summary/summary_add.html',
            scope: {
                user: '='
            },
            link: Function
        };

    });

})();