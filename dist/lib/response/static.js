'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var _utilHelpers = require('../../util/helpers');

var debug = (0, _debug2['default'])('response:static');

/**
 * Used to serve static assets to the client. If the File
 * path is cached it will pull the path from there and
 * serve it. If the filepath is in the cached list of
 * static routes, it will pull from there.
 *
 * When the provided path isn't found in either (which usually
 * happens with dynamic URLs, e.g., route params) it will
 * find the pub folder in the URL, create an anchor point
 * and then build path constructs until it finds one that
 * matches a cached path.
 *
 * @param {String} file static file path
 */

exports['default'] = function (app, send) {

  return function serveStatic(file) {

    var exists = true;
    var pub = app.state.publicPath;
    var root = app.state.publicFolder;
    var routes = app.state.staticRoutes;
    var cache = app.state.staticRouteCache;

    debug('pub path: %o', pub);

    var relative = _path2['default'].join(pub, file);
    debug('Serving static file %o', relative);

    if ((0, _utilHelpers.inArray)(routes, relative)) {
      debug('Writing from source: %o', relative);
      send(relative);
      return;
    }

    debug('Starting static route search');

    var paths = relative.split('/');
    var idx = paths.indexOf(root);

    var construct = paths.slice(++idx).join('/');
    var location = _path2['default'].join(pub, construct);

    while (!(0, _utilHelpers.inArray)(routes, location)) {

      construct = paths.slice(++idx).join('/');
      location = _path2['default'].join(pub, construct);
      if (idx > paths.length) {
        location = false;
        break;
      }
    }

    debug('Finished static route search');

    if (!location) return send(null, new Error('File not found!'));

    return send(location);
  };
};

module.exports = exports['default'];