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

		function addBranch(companyId, branch) {
			var result = userApi.addBranch(companyId, branch);

			result.then(
				function(response) {
					result.resolve(response);
				}, function(response) {
					result.reject(response);
				});

			return result;
		}

		return {
			getCurrent: getCurrent,
			setCompany: setCompany,
			addBranch: addBranch
		};
	}
})();