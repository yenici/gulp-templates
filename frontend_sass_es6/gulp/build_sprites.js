/* global module, require:true */

var gulp = require('gulp'),
  path = require('./pathes'),
  spritesmith   = require('gulp.spritesmith');

module.exports = function() {
  var spriteData = gulp.src(path.source.images + 'sprites/*.png')
    .pipe(spritesmith({
      algorithm: 'left-right',
      cssFormat: 'scss_maps',
      cssName: '_sprites.scss',
      imgName: 'sprites.png',
      imgPath: '../images/sprites.png'
    }));
  spriteData.img.pipe(gulp.dest(path.dist.images));
  spriteData.css.pipe(gulp.dest(path.source.styles + 'base/'));
};
