(function() {
	'use strict';

	angular.module('abajonear').service('userApi', UserApi);
	UserApi.$inject = ['$q', '$resource', 'apiBaseUrl', 'authenticationService'];

	function UserApi($q, $resource, apiBaseUrl, authenticationService) {
		console.log('token:', authenticationService.isUserLoggedIn());
		var endpointUrl = apiBaseUrl + '/users',
			User = $resource(endpointUrl,
				{},
				{
					current: {
						method: 'GET',
						url: apiBaseUrl + '/users/me'/*,
						headers: {
							'x-access-token': authenticationService.isUserLoggedIn()
						}*/
					},
					setCompany: {
						method: 'POST',
						url: apiBaseUrl + '/companies'
					},
					addBranch: {
						method: 'POST',
						url: apiBaseUrl + '/companies/:companyId/branches'
					}
				}
			);
		function getCurrent() {
			var defer = $q.defer();

			User.current({},
				function(response) {
					defer.resolve(response);
				},
				function(response) {
					defer.reject(response);
				})

			return defer.promise;
		}

		function setCompany(company) {
			var defer = $q.defer();

			User.setCompany(company);

			return defer.promise;
		}

		function addBranch(companyId, branch) {
			var defer = $q.defer();

			User.addBranch({
				companyId: companyId
			},
			branch,
			function(response) {
				defer.resolve(response);
			},
			function(response) {
				defer.reject(response);
			});

			return defer.promise;
		}

		return {
			getCurrent: getCurrent,
			setCompany: setCompany,
			addBranch: addBranch
		};
	}
})();