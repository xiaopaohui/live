/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function() {
  'use strict';

  angular.module('Live.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($rootScope, $timeout, $q, room, SinaEmotion, article,ad) {
    $rootScope.$pageFinishedLoading = false;
    var ct = [{
      "title": "[pt顶一个]",
      "url": "/assets/face/ct/1.png"
    }, {
      "title": "[pt赞一个]",
      "url": "/assets/face/ct/2.png"
    }, {
      "title": "[pt掌声]",
      "url": "/assets/face/ct/3.png"
    }, {
      "title": "[pt鲜花]",
      "url": "/assets/face/ct/4.png"
    }, {
      "title": "[pt看多]",
      "url": "/assets/face/ct/5.png"
    }, {
      "title": "[pt看空]",
      "url": "/assets/face/ct/6.png"
    }, {
      "title": "[pt震荡]",
      "url": "/assets/face/ct/7.png"
    }];
    var whatToWait = [
      SinaEmotion.load(),
      room.load(),
      article.load(),
      ad.load(),
    ];
    $q.all(whatToWait).then(function() {
      SinaEmotion.put(ct);
      room.decode();
      $rootScope.$pageFinishedLoading = true;
      $timeout(init, 0);
    });
  }

  function init() {}


})();