(function () {

	angular.module('app').directive('summary', function () {

		return {
			templateUrl: 'directives/summary/summary.html',
			scope: {
                user: '='
			},
            link: function (scope, element, attrs) { scope.fede = function () { console.log('esto anda'); } /*console.log(scope.user);*/ }
		};
	});
})();