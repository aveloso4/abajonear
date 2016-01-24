(function() {
	'use strict';

	angular.module('abajonear').directive('logIn', logIn);
	logIn.$inject = ['$state', 'authenticationService'];

	function logIn($state, authenticationService) {
		var directive = {
			retrict: 'E',
			scope: {},
			templateUrl: 'app/components/login/login.html',
			link: function($scope, $el, $attr) {
				$scope.rememberMe = localStorage.rememberMe;

				if ($scope.rememberMe) {
					$scope.email = authenticationService.getCredentials().userName;
					$scope.password = authenticationService.getCredentials().password;
				}

				$scope.submit = function() {
					console.log('email', $scope.email);
					console.log('contraseña', $scope.password);

					var creds = {
						email: $scope.email,
						password: $scope.password
					};

					authenticationService.login(creds, $scope.rememberMe)
						.then(function() {
							$state.go('home');
						}, function(err) {
							AlertService.show({
								msg: err.text
							});
						});
				};
			}
		};

		return directive;
	}
})();