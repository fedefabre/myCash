(function () {
    "use strict";

    angular.module("api.users", []).factory("Users", function () {

        var Users = {};
        var projection = true;

        // Hard coded list of users to work with at frontend
        var UserList = [
            {
                id: 0,
                name: "Federico",
                lastname: "Fabre",
                money: { max: 20000 },
                expenses: [
                    { name: "fixedCost", shortName: "fixed", elegantName: "Fixed Cost",
                        periodicity: [
                            {
                                name: "diary",
                                value: 1
                            },
                            {
                                name: "weekly",
                                value: 7
                            },
                            {
                                name: "monthly",
                                value: 30
                            },
                            {
                                name: "anually",
                                value: 365
                            },
                        ],
                        expense: 8345, active: true, paid: false, color: "#81c784" },
                    { name: "creditCard", shortName: "credit", elegantName: "Credit Card", origin: [
                            {
                                name: "master",
                                bank: "HBSC",
                                type: "Mastercard"
                            },
                            {
                                name: "visa",
                                bank: "HBSC",
                                type: "Visa"
                            }
                        ],
                        expense: 3200, active: true, paid: false, color: "#64b5f6" },
                    { name: "cash", shortName: "cash", elegantName: "Cash", expense: 1333, active: true, paid: true, color: "#4db6ac"},
                    { name: "ahorros", shortName: "extra1", elegantName: "Ahorros", expense: 0, active: true, paid: false, color: "#e63f3f" },
                    { name: "extra2", shortName: "extra2", elegantName: "Extra 2", expense: 0, active: false, paid: false, color: "#d06ae9" },
                    { name: "extra3", shortName: "extra3", elegantName: "Extra 2", expense: 0, active: false, paid: false, color: "#e46829" }
                ],
//                expenses: { fixed: 8345, credit: 3200, cash: 1333, extra1: 0 },
                summary: [
                    { name: 'Fixed', date: new Date('2017', '9', '1'), periodicity: "monthly", price: 8345, type: "fixed", paid: true },
                    { name: 'Dinner', date: new Date('2017', '8', '9'), price: 850, type: "cash", paid: true },
                    { name: 'Jacket', date: new Date('2017', '8', '21'), origin: "master", due: 3, price: 3200, type: "credit", paid: false },
                    { name: 'Movie', date: new Date('2017', '9', '19'), price: 483, type: "cash", paid: true },
                    { name: 'Dinner', date: new Date('2017', '9', '22'), price: 850, type: "cash", paid: true },
                    { name: 'Jacket', date: new Date('2017', '7', '21'), origin: "visa", due: 12, price: 3200, type: "credit", paid: false },
                    { name: 'Movie', date: new Date('2017', '9', '19'), price: 483, type: "cash", paid: true }
                ],
                common: { date: new Date(), currency: '$' },
                totalExpense: 12878,
                totalAvailable: 7122
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

        Users.getExpenseType = function (user,type) {
            return user.expenses.find(function (expense) {
                return expense.shortName === type;
            });
        }

        Users.expenseTotal = function (userId, type) {
            var user = Users.getById(userId);
            var expense = Users.getExpenseType(user, type);
            return expense.expense;
        }

        Users.updateExpenses = function (userId,CtrlProjection) {

            var user = Users.getById(userId);
            var expenses = user.expenses;
            var summarys = user.summary;
            projection = CtrlProjection;

            _.forEach(expenses, function (expenser) {
                var type = expenser.shortName;
                var acum = 0;
                _.forEach(summarys, function (summary) {
                    var typeSum = summary.type;
                    var paid = summary.paid;                    
                    if (type == typeSum) {
                        if (projection) {
                            acum += summary.price;
                        } else {
                            if (paid) { acum += summary.price; }
                        }                        
                    }
                });
                expenser.expense = acum;
            });          

            Users.totalExpense(userId);

        }

        Users.totalExpense = function (userId) {
            var user = Users.getById(userId);
            var expenses = user.expenses;
            var acum = 0;

            _.forEach(expenses, function (expenser) {
                var active = expenser.active;
                if (active) {
                    acum += expenser.expense;
                }               
            });      

            user.totalExpense = acum;

        }

        Users.totalAvailable = function (userId) {
            var user = Users.getById(userId);
            user.totalAvailable = user.money.max - user.totalExpense
        }

        Users.addCharge = function (userId, charge) {
            var user = Users.getById(userId);
            user.summary.push(charge);
        }

        Users.projection = function () { return projection; }

        return Users;

    });

})();