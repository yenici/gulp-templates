/* global module, require:true */

var gulp = require('gulp'),
  path = require('./pathes'),
  del = require('del');

module.exports = function () {
  return del([
    path.dist.root + '**/*'
  ]);
};
