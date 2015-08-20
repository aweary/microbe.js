'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utilError = require('../../util/error');

var _utilError2 = _interopRequireDefault(_utilError);

var debug = (0, _debug2['default'])('response:render');

/**
 * response.render
 * @param  {String} view View to render
 * @param  {data} data Data to render with the view
 * @summary renders the handebar partials using streams
 */

exports['default'] = function (app, send) {

  return function (view, data) {

    debug('Rendering view %o', view);
    var engine = app.state.engine;
    var ext = app.state.ext || engine;

    if (engine === undefined) (0, _utilError2['default'])('engine');
    debug('Render %o with ext %o', engine, ext);

    var root = app.state.viewLocation;
    var file = view + '.' + ext;
    var location = _path2['default'].resolve(root, file);
    debug('Serving %o', location);

    _consolidate2['default'][engine](location, data, function (err, html) {
      send(html, null, false);
    });
  };
};

module.exports = exports['default'];