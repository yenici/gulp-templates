/* global module, require:true */

var gulp = require('gulp');
var path = require('./pathes');
var browserify = require('browserify');
var util = require('gulp-util');
var vinylsource = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

module.exports = function() {
  'use strict';
  var buf = browserify(path.source.scripts + 'main.js');
  return buf.bundle()
    .on('error', function(e) {
      util.log(e);
    })
    .pipe(vinylsource('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', function(e) {
      util.log(e);
    })
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.dist.scripts))
    .pipe(connect.reload());
};
