/* global module, require:true */

var gulp = require('gulp'),
    path = require('./pathes'),
    rigger = require('gulp-rigger'),
    connect = require('gulp-connect');

module.exports = function(){
  return gulp.src(path.source.views + '*.html')
      .pipe(rigger())
      .pipe(gulp.dest(path.dist.views))
      .pipe(connect.reload());
};
