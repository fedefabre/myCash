(function () {
    'use strict';

    angular.module('components.users', [])
        .controller('UsersController', function ($scope, $q, Users, $rootScope) {
            var vm = this;

            vm.users = Users.getAll();
            vm.user = Users.getById(0);
            $scope.$on('newCharge',function (event,args) {
                updateMoney(args.charge);
            });

            vm.availableChart = {
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
                        "value": vm.user.totalAvailable()
                    }
                ],
                "line": {
                    "startValue": "0",
                    "endValue": vm.user.totalAvailable(),
                    "color": "#000000"
                }
            };
            vm.expensesChart = {
                chart: {
                    "bgColor": "#f5f5f5",
                    "bgAlpha" : "100",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "showShadow": "0",
                    "showValues" : "0",
                    "width": "100%",
                    "height": "100%",
                    "pieRadius" : "70"

                },
                data: [{
                    value: vm.user.expenses.fixedCost,
                    color: "#81c784"
                },
                {
                    value: vm.user.expenses.creditCard,
                    color: "#64b5f6"
                },
                {
                    value: vm.user.expenses.cash,
                    color: "#4db6ac"
                }]
            };

            function updateMoney(charge) {

                updateExpenses(charge);
                vm.user.totalAvailable();
                vm.availableChart.data[0].value = vm.user.totalAvailable();
                console.log(vm.user);

            }

            function updateExpenses(charge) {

                switch (charge.type) {
                    case 'cash':
                        vm.user.expenses.cash += charge.price;
                        vm.expensesChart.data[2].value = vm.user.expenses.cash;
                        break;
                    case 'credit':
                        vm.user.expenses.creditCard += charge.price;
                        vm.expensesChart.data[1].value = vm.user.expenses.creditCard;
                        break;
                    case 'fixed':
                        vm.user.expenses.fixedCost += charge.price;
                        vm.expensesChart.data[0].value = vm.user.expenses.fixedCost;
                        break;
                };
                

            };

        })
        .config(function ($stateProvider) {
            $stateProvider
                .state('users', {
                    url: '/',
                    templateUrl: 'component/users/users.html',
                    controller: 'UsersController as us'
                });
        });
})();