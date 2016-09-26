(function() {
	'use strict';

	angular.module('Live.theme')
		.service('article', article);

	function article($http, $filter, $q) {
		function content($id) {
			var d = $q.defer(),
				s = this;
			$http.get("/api/article/get/" + $id).then(function(res) {
				var data = res.data;
				d.resolve(data.content);
			})
			return d.promise;
		}
		return {
			content: content,
			load: function() {
				var d = $q.defer(),
					s = this;
				$http.get("/api/article").then(function(res) {
					var data = res.data;
					s.hot = [];
					angular.forEach(data.hot, function(v) {
						var item = {
							'id': v.id,
							'title': v.title,
							'img': v.img || '/assets/images/no-picture.jpg',
							'description': v.description.substring(0,40)+'...' 
						}
						s.hot.push(item);
					});
					s.new = [];
					angular.forEach(data.new, function(v) {
						var item = {
							'id': v.id,
							'title': v.title,
							'ctime': $filter('date')(v.ctime * 1000, "[MM/dd]")
						}
						s.new.push(item);
					});
					d.resolve();
				})
				return d.promise;
			}
		};
	}

})();