/* global module, require:true */

var gulp = require('gulp'),
  path = require('./pathes'),
  browserify = require('browserify'),
  util = require('gulp-util'),
  vinylsource = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect');

module.exports = function() {
  return browserify(path.source.scripts + 'main.js')
    .bundle()
    .on('error', function(e) {
      util.log(e);
    })
    .pipe(vinylsource('bundle.js'))
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    // .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.dist.scripts))
    .pipe(connect.reload());
};
