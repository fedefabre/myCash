(function(){
    'use strict';

    angular.module('components.expenses', []).controller('expensesController', ["Users", "$scope", function (Users,$scope) {

        var vm = this;
        var idUser = 0;
        vm.users = Users.getAll();
        vm.user = Users.getById(0);
        vm.projection = Users.projection();
        vm.today = new Date();
        vm.dueMaker = function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth() + 1;
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }

        $scope.$on('newCharge', function (event, args) {
            var charge = args.charge;
            Users.addCharge(idUser, charge);
            updateMoney();
        });

        function updateMoney() {
            Users.updateExpenses(idUser);
            Users.totalAvailable(idUser);
        }

       


    }]);

})();