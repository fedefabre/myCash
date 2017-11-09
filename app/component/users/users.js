(function () {
    'use strict';

    angular.module('components.users', [])
        .controller('UsersController', ["$scope","$q","Users","$state","$rootScope",function ($scope, $q, Users, $state, $rootScope) {

            var vm = this;
            var idUser = 0;
            vm.users = Users.getAll();
            vm.user = Users.getById(idUser);
            vm.availableChart = newAvailableChart();
            vm.expensesChart = newExpensesChart();
            vm.projection = Users.projection();
            //$rootScope.state = $state.current.name;
            //console.log('entro');

            $scope.$on('newCharge', function (event, args) {
                var charge = args.charge;
                Users.addCharge(idUser, charge);
                updateMoney();
            });

            $scope.$watch('us.projection', function () {
                updateMoney();
            });

            function updateMoney() {
                Users.updateExpenses(idUser,vm.projection);
                Users.totalAvailable(idUser);
                vm.availableChart = newAvailableChart();
                vm.expensesChart = newExpensesChart();
            }

            function newExpensesChart() {

                return {
                    chart: {
                        "bgColor": "#f5f5f5",
                        "bgAlpha": "100",
                        "showBorder": "0",
                        "use3DLighting": "0",
                        "showShadow": "0",
                        "showValues": "0",
                        "width": "100%",
                        "height": "100%",
                        "pieRadius": "70"

                    },
                    data: expensesCharting()
                };

            }
            function newAvailableChart() {

                return {
                    "chart": {
                        "numberPrefix": "$",
                        "paletteColors": "#0075c2",
                        "bgColor": "#f5f5f5",
                        "canvasBgColor": "#f5f5f5",
                        "bgAlpha": "100",
                        "showBorder": "0",
                        "showCanvasBorder": "0",
                        "usePlotGradientColor": "0",
                        "plotBorderAlpha": "10",
                        "placeValuesInside": "1",
                        "valueFontColor": "#ffffff",
                        "showAxisLines": "0",
                        "axisLineAlpha": "25",
                        "divLineAlpha": "10",
                        "alignCaptionWithCanvas": "0",
                        "showAlternateVGridColor": "0",
                        "captionFontSize": "14",
                        "subcaptionFontSize": "14",
                        "subcaptionFontBold": "0",
                        "toolTipColor": "#ffffff",
                        "toolTipBorderThickness": "0",
                        "toolTipBgColor": "#f5f5f5",
                        "toolTipBgAlpha": "80",
                        "toolTipBorderRadius": "2",
                        "toolTipPadding": "0",
                        "yAxisMaxValue": vm.user.money.max,
                    },
                    "data": [
                        {
                            "value": vm.user.totalAvailable
                        }
                    ],
                    "line": {
                        "startValue": "0",
                        "endValue": vm.user.totalAvailable,
                        "color": "#000000"
                    }
                };
            }
            function expensesCharting() {

                var expenses = vm.user.expenses;
                var data = [];

                _.forEach(expenses, function (expenser) {
                    var active = expenser.active;
                    var obj = {};
                    if (active) {
                        obj = {
                            value: expenser.expense,
                            color: expenser.color
                        };
                        data.push(obj)
                    }
                });

                return data;
            }

        }]);
})();