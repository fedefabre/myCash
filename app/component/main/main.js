(function () {

    'use strict';

    angular.module('app').controller('mainController', ["$state", function ($state) {

        var vm = this;
        vm.state = $state;

    }]);

})();