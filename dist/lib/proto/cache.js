'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utilError = require('../../util/error');

var _utilError2 = _interopRequireDefault(_utilError);

var _utilHelpers = require('../../util/helpers');

var debug = (0, _debug2['default'])('app:cache');

/**
 * builds an in-memory cache of the existing static files.
 * It recursively climbs the decalured static resource folder
 * and builds a cache of all the file paths. proto.cache
 * @param  {String} root path to recursively search in
 */

exports['default'] = function (root) {

  var self = this;
  var routes = this.state.staticRoutes;

  debug('Caching static paths for %o', root);

  _fs2['default'].readdir(root, function (err, files) {

    if (err) (0, _utilError2['default'])('missing', root);

    files.forEach(function (file) {

      var location = _path2['default'].resolve(root, file);

      (0, _utilHelpers.isFolder)(location) ? self.cache(location) : routes.push(location);
    });
  });
};

module.exports = exports['default'];