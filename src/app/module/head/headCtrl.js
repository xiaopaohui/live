(function() {
	'use strict';

	angular.module('Live.main.head')
		.controller('headCtrl', head);

	function head($scope, $http,ad) {
		$scope.kf = ad.kf;
	}
})();