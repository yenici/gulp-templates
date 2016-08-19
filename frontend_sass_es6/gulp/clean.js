/* global module, require:true */

var path = require('./pathes'),
  del = require('del');

module.exports = function () {
  return del([
    path.dist.root + '**/*'
  ]);
};
