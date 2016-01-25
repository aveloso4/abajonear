(function() {
	'use strict';

	angular.module('abajonear').controller('SettingsController', SettingsController);
	SettingsController.$inject = ['userService'];

	function SettingsController(userService) {
		var ctrl = this;
		userService.getCurrent()
			.then(function(user) {
				console.log(user);
				ctrl.currentUser = user;
				ctrl.companyName = user.company && user.company.name;
			}, function(error) {
				console.log(error);
			});

		ctrl.setCompany = function setCompany() {
			userService.setCompany({ name: ctrl.companyName});
		}
	}
})();