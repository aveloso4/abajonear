(function() {
	'use strict';

	angular.module('abajonear').directive('signUp', signUp);
	signUp.$inject = ['authenticationService'];

	function signUp(authenticationService) {
		var directive = {
			retrict: 'E',
			scope: {},
			templateUrl: 'app/components/signup/signup.html',
			link: function($scope, $el, $attr) {
				$scope.submit = function() {
					var user = {
						firstName: $scope.firstName,
						lastName: $scope.lastName,
						email: $scope.email,
						password: $scope.password
					};

					authenticationService.createAccount(user)
						.then(function() {
							$state.go('home');
						}, function(err) {
							console.log(err);
						});
				};
			}
		};

		return directive;
	}
})();