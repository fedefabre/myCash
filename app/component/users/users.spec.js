describe('User Controller', function () {

    var $controller, UsersController;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('components.users'));
    beforeEach(angular.mock.module('api.users'));

    var userList = [
        {
            id: 0,
            name: 'Federico',
            lastname: 'Fabre',
            money: [{ max: 20000, expenses: [{ fixedCost: 8345, creditCard: 5083.52, cash: 1250 }] }],
            summary: [{ name: 'Dinner', date: '21/10', price: 1230.1, type: "credit"  }]
        }
    ];

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
        UsersController = $controller('UsersController', {})
    }));

    it('should exist', function () {
        expect(UsersController).toBeDefined();
    });

    it('should return all users', function () {
        expect(UsersController.users).toEqual(userList);
    });

});