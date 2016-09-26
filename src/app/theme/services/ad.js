(function() {
	'use strict';

	angular.module('Live.theme')
		.service('ad', ad);

	function ad($http, $filter, $q) {;
		return {
			load: function() {
				var d = $q.defer(),
					s = this;
				$http.get("/api/cs").then(function(res) {
					var data = res.data;
					s.kf = [];
					angular.forEach(data.list, function(v) {
						var item = {
							'icon': v.image,
							'url': 'http://wpa.qq.com/msgrd?v=3&uin=' + v.url + '&site=qq&menu=yes'
						};
						s.kf.push(item);
					});
					d.resolve();
				})
				return d.promise;
			}
		};
	}

})();