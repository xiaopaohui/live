(function() {
	'use strict';

	angular.module('Live.main.chat')
		.controller('ChatCtrl', Chat);

	function Chat($scope, $http, $filter, $timeout, $interval, room, chat, SinaEmotion) {
		$scope.content = '';
		$scope.chat = {
			list: room.chat,
			admin: room.user.role != 1 ? false : true,
			top: room.top[0]
		};
		updateScrollbar();
		chat.setTime(room.data[0]['utime']);
		chat.setTopchat(room.top[0]['id']);
		$interval(function() {
			chat.update().then(function(d) {
				var chat = d.list,
					top = d.top,
					l = top.length,
					arr;
				if (chat.length > 0) {
					angular.forEach(chat, function(v) {
						$scope.chat.list.push(v);
					})
					$scope.config.scroll && updateScrollbar();
				}
				if (l > 0) {
					angular.forEach($scope.chat.top, function(v) {
						top.push(v);
					})
					$scope.chat.top = top.splice(0, 3)[0];
				}
			})
		}, 3000);
		$scope.config = {
			scroll: true,
			ct: false,
		}
		$scope.tool = {
			scroll: function() {
				$scope.config.scroll = !$scope.config.scroll;
			},
			clear: function() {
				$scope.chat.list = [];
			},
			ct: function(content) {
				chat.set(content);
				$scope.config.ct = false;
			}
		};
		$scope.admin = {
			remove: function(id, index) {
				chat.remove(id).then(function() {
					$scope.chat.list.splice(index, 1);
				})
			},
			activate: function(id, index) {
				chat.activate(id).then(function() {
					$scope.chat.list.splice(index, 1);
				})
			},
			settop: function(id) {
				chat.top(id).then(function() {})
			}
		}
		$scope.send = function() {
			var content = $scope.content;
			if (!content) {
				return;
			}
			chat.set(content);
			$scope.content = '';
		}
		$scope.keyup_to_send = function(e) {
			var keycode = window.event ? e.keyCode : e.which;
			// if (e.ctrlKey && keycode == 13) {
			if (keycode == 13) {
				$scope.send();
			}
		}

		function updateScrollbar() {
			$timeout(function() {
				$scope.updateScrollbar('scrollTo', 'bottom');
			}, 500);
		}

	}
})();