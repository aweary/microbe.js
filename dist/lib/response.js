'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _utilHelpers = require('./util/helpers');

var _utilError = require('./util/error');

var _utilError2 = _interopRequireDefault(_utilError);

var debug = (0, _debug2['default'])('response');

exports['default'] = {

  _check: 'This is render',

  /**
   * response.render
   * @param  {String} view View to render
   * @param  {data} data Data to render with the view
   * @summary renders the handebar partials using streams
   */

  render: function render(view, data) {
    var _this = this;

    var app = this.app;
    var engine = app.query('engine');
    var ext = app.query('ext') || engine;

    debug('Rendering view %o', view);

    if (engine === undefined) err('engine');
    debug('Render %o with ext %o', engine, ext);

    var root = app.query('viewLocation');
    debug('viewLocation: ', root);
    var file = view + '.' + ext;
    var location = _path2['default'].resolve(root, file);
    debug('Serving %o', location);

    _consolidate2['default'][engine](location, data, function (err, html) {
      _this.send(html, null, false);
    });
  },

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

  'static': function _static(filePath) {

    var app = this.app;
    var folder = app.query('publicFolder');
    var root = app.query('projectRoot');

    var pub = _path2['default'].resolve(root, folder);

    if (pub === undefined && !filePath) {
      return this.send(null, new Error('File not found!'));
    }

    var exists = true;
    var file = filePath || this.path;
    var cache = app.caches.assets;
    debug('Asset cache: %o', cache);
    debug('pub path: %o', pub);

    var relative = _path2['default'].join(pub, file);
    debug('Serving static file %o', relative);

    if ((0, _utilHelpers.inArray)(cache, relative)) {
      debug('Writing from source: %o', relative);
      return _fs2['default'].createReadStream(relative).pipe(this.res);
    }

    debug('Starting static route search');

    var paths = relative.split('/');
    var idx = paths.indexOf(root);

    var construct = paths.slice(++idx).join('/');
    var location = _path2['default'].join(pub, construct);
    debug('Static cache: %o', cache);

    while (!(0, _utilHelpers.inArray)(cache, location)) {

      construct = paths.slice(++idx).join('/');
      location = _path2['default'].join(pub, construct);
      if (idx > paths.length) {
        location = false;
        break;
      }
    }

    debug('Finished static route search: %o', location);

    return location ? _fs2['default'].createReadStream(location).pipe(this.res) : this.send(null, new Error('File not found!'));
  },

  /**
   * Returns a function that parses data into a
   * JSON string, sets the proper headers and
   * ends the response
   * @param {Object} response HTTP response
   * @param {Function} done finalhandler instance
   * @return {Function} response.json handler
   */

  json: function json(_json) {
    if (typeof _json === 'object') _json = JSON.stringify(_json);
    debug('Sending JSON data: %o', _json);
    this.res.setHeader('Content-Type', 'application/json');
    this.res.end(_json);
  }

};
module.exports = exports['default'];