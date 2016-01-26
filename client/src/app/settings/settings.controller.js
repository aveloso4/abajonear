(function() {
	'use strict';

	angular.module('abajonear').controller('SettingsController', SettingsController);
	SettingsController.$inject = ['userService'];

	function SettingsController(userService) {
		var ctrl = this;

		function load() {
			userService.getCurrent()
				.then(function(user) {
					console.log(user);
					ctrl.currentUser = user;
					ctrl.currentCompany = user.company;
					ctrl.companyName = user.company && user.company.name;
				}, function(error) {
					console.log(error);
				});
		}

		ctrl.setCompany = function setCompany() {
			userService.setCompany({ name: ctrl.companyName})
				.then(function() {
					load();
				});
		};

		ctrl.addBranch = function addBranch() {
			userService.addBranch(ctrl.currentCompany._id,
					{
						name: ctrl.newBranch.name
					}
				)
				.then(function(response) {
					console.log(response);
					load();
				});
		};

		load();
	}
})();