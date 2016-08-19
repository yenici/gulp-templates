/* global module, require:true */

var gulp = require('gulp'),
    path = require('./pathes'),
    filter = require('gulp-filter'),
    imagemin = require('gulp-imagemin'),
    imageminpng   = require('imagemin-pngquant'),
    connect = require('gulp-connect');

module.exports = function() {
  // Filtering files to exclude Thumbs.db files
  var imagefilter = filter([
    path.source.images + '*.jpg',
    path.source.images + '*.png',
    path.source.images + '*.svg'
  ]);
  return gulp.src(path.source.images + '*')
    .pipe(imagefilter)
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [imageminpng()]
    }))
    .pipe(gulp.dest(path.dist.images))
    .pipe(connect.reload());
};
