describe('Users factory', function () {

    var Users;

    var userList = [
        {
            id: 0,
            name: 'Federico',
            lastname: 'Fabre',
            money: [{ max: 20000, expenses: [{ fixedCost: 8345, creditCard: 5083.52, cash: 1250 }] }],
            summary: [{ name: 'Dinner', date: '21/10', price: 1230.1, type: "credit" }]
        }
    ];

    var singleUser = {
        id: 0,
        name: 'Federico',
        lastname: 'Fabre',
        money: [{ max: 20000, expenses: [{ fixedCost: 8345, creditCard: 5083.52, cash: 1250 }] }],
        summary: [{ name: 'Dinner', date: '21/10', price: 1230.1, type: "credit" }]
    };

    beforeEach(angular.mock.module('api.users'));

    beforeEach(inject(function (_Users_) {
        Users = _Users_;
    }));

    it('should exist', function () {

        expect(Users).toBeDefined();

    });

    describe('.getAll()', function () {

        it('should exist', function () {
            expect(Users.getAll).toBeDefined();
        });

        it('should return hard coded users', function () {
            expect(Users.getAll()).toEqual(userList);
        });
    });

    describe('.getById()', function () {

        var id = 0;

        it('should exist', function () {
            expect(Users.getById).toBeDefined();
        });

        it('should return first user (id:0)', function () {
            expect(Users.getById(id)).toEqual(singleUser);
        });

    });

});