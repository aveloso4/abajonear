(function() {
	'use strict';

	angular.module('abajonear').service('userService', UserService);
	UserService.$inject = ['userApi'];

	function UserService(userApi) {
		function getCurrent() {
			var result = userApi.getCurrent();
			result.then(
				function(response) {

				},
				function(response) {

				}
			);

			return result;
		}

		function setCompany(company) {
			var result = userApi.setCompany(company);

			result.then(
				function(response) {

				}, function(response) {

				});

			return result;
		}

		return {
			getCurrent: getCurrent,
			setCompany: setCompany
		};
	}
})();