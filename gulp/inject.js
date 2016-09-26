'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles', 'copyVendorImages'], function() {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], {
    read: false
  });

  var injectScripts = gulp.src([
      path.join(conf.paths.src, '/app/**/*.module.js'),
      path.join(conf.paths.src, '/app/**/*.js'),
      path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
      path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
    ])
    /*.pipe($.angularFilesort())*/
    .on('error', conf.errorHandler('AngularFilesort'));
  var injectHtml = gulp.src([
    path.join(conf.paths.src, '/**/_*.html'),
  ], {
    read: true
  });
  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  var injectPathOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    starttag: '<!-- inject:{{path}} -->',
    transform: function(filePath, file) {
      var ext = path.extname(filePath);
      switch (ext) {
        case '.html':
          return file.contents.toString('utf8');
          break;
        case '.js':
          return $.inject.transform.html.js(filePath).toString('utf8');
          break;
        case '.css':
          return $.inject.transform.html.css(filePath).toString('utf8');
          break;
      }

    }
  };

  return gulp.src([
      path.join(conf.paths.src, '/*.html'),
      path.join('!' + conf.paths.src, '/template/**/*.html'),
      path.join('!' + conf.paths.src, '/app/**/*.html')
    ])
    .pipe($.inject(injectStyles, injectPathOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(injectHtml, injectPathOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});