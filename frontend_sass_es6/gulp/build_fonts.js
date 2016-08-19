/* global module, require:true */

var gulp = require('gulp'),
  path = require('./pathes'),
  connect = require('gulp-connect');

module.exports = function() {
  return gulp.src(path.source.fonts + '*')
  .pipe(gulp.dest(path.dist.fonts))
  .pipe(connect.reload());
};
