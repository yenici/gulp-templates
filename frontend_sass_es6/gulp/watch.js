/* global module, require:true */

var gulp = require('gulp'),
  path = require('./pathes');

module.exports = function() {
  'use strict';
  gulp.watch(path.source.views + '**/*.html', ['build:html']);
  gulp.watch(path.source.styles + '**/*.scss', ['build:styles']);
  gulp.watch(path.source.images + 'sprites/', ['build:styles']);
  gulp.watch(path.source.scripts + '**/*.js', ['build:scripts']);
  gulp.watch(path.source.images, ['build:images']);
};
