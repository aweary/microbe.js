'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _serverJs = require('../../server.js');

var _serverJs2 = _interopRequireDefault(_serverJs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('app:start');

/**
 * Used to start the actual HTTP server for the Microbe app
 * @param  {Number} port   HTTP Port for server
 * @param  {Function} callback Callback function once server starts
 */

exports['default'] = function (port, callback) {

  this.cache(this.state.publicPath);
  this.port = port;
  this.server = (0, _serverJs2['default'])(port, this);
  this.server.listen(port, callback);
  debug('Starting app on port %o', port);
};

module.exports = exports['default'];