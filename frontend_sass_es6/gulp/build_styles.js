/* global module, require:true */

var gulp = require('gulp'),
    path = require('./pathes'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');

module.exports = function() {
  return gulp.src(path.source.styles + 'main.scss')
    .pipe(sass().on('error', sass.logError), {
      outputStyle: 'expanded',
      indentType: 'space',
      indentWidth: 2,
      precision: 10
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 8'],
      cascade: true
    }))
    .pipe(sourcemaps.init())
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.styles))
    .pipe(connect.reload());
};
