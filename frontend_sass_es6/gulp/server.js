/* global module, require:true */

var gulp = require('gulp'),
    path = require('./pathes'),
    connect = require('gulp-connect');

module.exports = function() {
  connect.server({
    root: path.dist.root,
    host: '192.168.0.2',
    port: 3000,
    livereload: true,
    debug: true
  });
};
