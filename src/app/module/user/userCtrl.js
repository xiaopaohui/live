(function() {
	'use strict';

	angular.module('Live.main.user')
		.controller('userCtrl', user);

	function user($scope, $http, room) {
		$scope.user = room.user;
		console.log($scope.user);
	}
})();