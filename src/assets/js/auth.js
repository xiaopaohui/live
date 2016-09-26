(function() {
  'use strict';
  angular.module('Live', [
      'ngAnimate',
      'ui.bootstrap',
      'ngTouch',
      'toastr',
    ], function($httpProvider) {
      $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
      $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      var param = function(obj) {
        var query = "",
          name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
          value = obj[name];
          if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
              subValue = value[i];
              fullSubName = name + "[" + i + "]";
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + "&";
            }
          } else if (value instanceof Object) {
            for (subName in value) {
              subValue = value[subName];
              fullSubName = name + "[" + subName + "]";
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + "&";
            }
          } else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
          }
        }
        return query.length ? query.substr(0, query.length - 1) : query;
      };
      $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== "[object File]" ? param(data) : data;
      }];
    })
    .controller('authCtrl', auth);

  function auth($scope, $http, $timeout, toastr) {
    $scope.user = {
      username: "",
      password: "",
      signin: function() {
        var data = {
          username: this.username,
          password: this.password
        };
        $http.post("/api/user/signin", data).then(function(res) {
          var d = res.data;
          if (d.code != 1) {
            angular.forEach(d.msg, function(v) {
              toastr.warning(v, '提示');
            })
          } else {
            toastr.success('登陆成功');
            $timeout(function() {
              location.href = './';
            }, 1000)
          }
        })
      }
    }
  }

})();