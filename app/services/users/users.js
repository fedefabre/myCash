(function () {
    'use strict';

    angular.module('api.users', []).factory('Users', function () {

        var Users = {};

        // Hard coded list of users to work with at frontend
        var UserList = [
            {
                id: 0,
                name: 'Federico',
                lastname: 'Fabre',
                money: { max: 20000 },
                expenses: { fixedCost: 8345, creditCard: 3200, cash: 1333 },
                summary: [
                    { name: 'Dinner', date: new Date('2017','10','22'), price: 850, type: "cash" },
                    { name: 'Jacket', date: new Date('2017', '10', '21'), price: 3200, type: "credit" },
                    { name: 'Movie', date: new Date('2017', '10', '19'), price: 483, type: "cash" }
                ],
                common: { date: new Date(), currency: '$' },
                totalExpense: function () {
                    return this.expenses.fixedCost + this.expenses.creditCard + this.expenses.cash;
                },
                totalAvailable: function () {
                    return this.money.max - this.totalExpense()
                }
            }
        ];

        Users.getAll = function () {
            return UserList;
        };
         
        Users.getById = function (id) {
            return UserList.find(function (user) {
                return user.id === id;
            });
        };

        Users.addCharge = function (userId, charge) {
            var user = Users.getById(userId);
            user.summary.push(charge);
        }

        return Users;

    });

})();