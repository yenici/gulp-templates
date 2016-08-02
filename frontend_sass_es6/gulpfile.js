'use strict';

// gulp modules
var gulp        = require('gulp'),
  bowerfiles    = require('gulp-main-bower-files'),
  flatten       = require('gulp-flatten'),
  connect       = require('gulp-connect'),
  // plumber       = require('gulp-plumber'),
  rename        = require('gulp-rename'),
  rigger        = require('gulp-rigger'),
  // rimraf        = require('rimraf'),
  sequence      = require('run-sequence'),
  filter        = require('gulp-filter'),
  sass          = require('gulp-sass'),
  autoprefixer  = require('gulp-autoprefixer'),
  cleancss      = require('gulp-clean-css'),
  jshint        = require('gulp-jshint'),
  jshintstylish = require('jshint-stylish'),
  babel         = require('gulp-babel'),
  browserify    = require('browserify'),
  babelify      = require('babelify'),
  vinylsource   = require('vinyl-source-stream'),
  utils         = require('gulp-util'),
  uglify        = require('gulp-uglify'),
  spritesmith   = require('gulp.spritesmith'),
  imagemin      = require('gulp-imagemin'),
  imageminpng   = require('imagemin-pngquant');

// Connect server parameters
var testServer = {
  // host: '192.168.88.231',
  host: '192.168.0.2',
  port: 3000,
  root: 'dist/'
};

// Pathes
var path = {
  source: {
    views: 'source/views/',
    styles: 'source/styles/',
    fonts: 'source/styles/fonts/',
    images: 'source/images/',
    scripts: 'source/scripts/'
  },
  dist: {
    dist: 'dist/',
    views: 'dist/',
    styles: 'dist/styles/',
    fonts: 'dist/fonts/',
    images: 'dist/images/',
    scripts: 'dist/scripts/'
  },
  tmp: 'source/tmp/'
};

// Tasks
gulp.task('clean:tmp', function (cb) {
  // rimraf(path.tmp, cb);
  return true;
});

gulp.task('clean:dist', function (cb) {
  // rimraf(path.dist, cb);
  return true;
});

// H T M L
gulp.task('build:html', function() {
  return gulp.src(path.source.views + '*.html')
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.views))
    .pipe(connect.reload());
});

// S t y l e s
gulp.task('build:styles', ['build:sprites', 'build:fonts'], function() {
  return gulp.src(path.source.styles + '**/*.scss')
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
    .pipe(gulp.dest(path.tmp))
    // .pipe(sourcemaps.init())
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.styles))
    .pipe(connect.reload());
});

// F o n t s
gulp.task('build:fonts', function() {
  return gulp.src(path.source.fonts + '*')
  .pipe(gulp.dest(path.dist.fonts))
  .pipe(connect.reload());
});

// S c r i p t s
gulp.task('build:scripts', function() {
  return browserify(path.source.scripts + 'main.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .on('error', function(e) {
      utils.log(e);
    })
    .pipe(vinylsource('bundle.js'))
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.scripts))
    .pipe(connect.reload());
});

// B o w e r   C o m p o n e n t s
gulp.task('build:bower', function () {
  const FILTER_JS = filter('**/*.js', {restore: true});
  const FILTER_CSS = filter('**/*.css', {restore: true});
  return gulp.src('./bower.json')
    .pipe(bowerfiles())
    .pipe(flatten())
    .pipe(FILTER_JS)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.dist.scripts))
    .pipe(FILTER_JS.restore)
    .pipe(FILTER_CSS)
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.dist.styles));
});

// I m a g e s
gulp.task('build:images',  function() {
  const imagefilter = filter([
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
});

gulp.task('build:sprites', function() {
  var spriteData = gulp.src(path.source.images + 'sprites/*.png')
    .pipe(spritesmith({
      algorithm: 'left-right',
      cssFormat: 'scss_maps',
      cssName: '_sprite.scss',
      imgName: 'sprites.png',
      imgPath: '../images/sprites.png'
    }));
  spriteData.img.pipe(gulp.dest(path.dist.images));
  spriteData.css.pipe(gulp.dest(path.source.styles + 'components/'));
});

gulp.task('build', function(callback) {
  sequence(
    // ['clean:tmp', 'clean:dist'],
    ['build:html', 'build:scripts', 'build:styles', 'build:bower', 'build:images'],
    callback
  );
});

gulp.task('server', function() {
  connect.server({
    root: testServer.root,
    host: testServer.host,
    port: testServer.port,
    livereload: true,
    debug: true
  });
});

gulp.task('watch', function() {
  gulp.watch(path.source.views + '**/*.html', ['build:html']);
  gulp.watch(path.source.styles + '**/*.scss', ['build:styles']);
  gulp.watch(path.source.images + 'sprites/', ['build:styles']);
  gulp.watch(path.source.scripts + '**/*.js', ['build:scripts']);
  gulp.watch(path.source.images, ['build:images']);
});

gulp.task('default', function() {
  sequence(
    'build',
    ['server', 'watch']
  );
});
