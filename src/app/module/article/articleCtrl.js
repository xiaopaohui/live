(function() {
	'use strict';

	angular.module('Live.main.article')
		.controller('articleCtrl', article);

	function article($scope, article, $uibModal, ad) {
		$scope.article = {
			hot: article.hot,
			new: article.new,
			content: function(v) {
				article.content(v.id).then(function(d) {
					$uibModal.open({
						animation: true,
						templateUrl: 'app/module/article/article.html',
						size: 'md',
						resolve: {
							data: {
								title: v.title,
								content: d,
								kf: ad.kf
							}
						},
						controller: function($scope, data) {
							$scope.title = data.title;
							$scope.content = data.content;
							$scope.kf = data.kf;
						}
					}).result.then(function(d) {

					});
				})
			}
		}
	}
})();