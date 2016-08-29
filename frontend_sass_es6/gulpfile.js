/* global module, require:true */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp'),
  sequence = require('run-sequence'),
  buildHtml = require('./gulp/build_html'),
  buildSprites = require('./gulp/build_sprites'),
  buildFonts = require('./gulp/build_fonts'),
  buildStyles = require('./gulp/build_styles'),
  buildImages = require('./gulp/build_images'),
  buildScripts = require('./gulp/build_scripts'),
  clean = require('./gulp/clean'),
  server = require('./gulp/server'),
  watch = require('./gulp/watch');

  console.log('Build environment: ' + process.env.NODE_ENV);

/* ------------------------------- B U I L D ------------------------------- */
gulp.task('build', function(callback) {
  'use strict';
  sequence(
    ['clean'],
    ['build:html', 'build:scripts', 'build:styles', 'build:images'],
    callback
  );
});
/* ------------------------------ Build  HTML ------------------------------ */
gulp.task('build:html', buildHtml);
/* ------------------------------ Build styles ----------------------------- */
gulp.task('build:styles', ['build:fonts', 'build:sprites'], buildStyles);
/* ------------------------------ Build fonts ------------------------------ */
gulp.task('build:fonts', buildFonts);
/* ----------------------------- Build sprites ----------------------------- */
gulp.task('build:sprites', buildSprites);
/* ------------------------------ Build images ----------------------------- */
gulp.task('build:images', buildImages);
/* ----------------------------- Build scripts ----------------------------- */
gulp.task('build:scripts', buildScripts);

/* ------------------------------- C L E A N ------------------------------- */
gulp.task('clean', clean);

/* ------------------------ S T A R T   S E R V E R ------------------------ */
gulp.task('serve', function() {
  'use strict';
  sequence(
    'build',
    ['server', 'watch']
  );
});
gulp.task('server',server);

/* ------------------------------- W A T C H ------------------------------- */
gulp.task('watch', watch);
