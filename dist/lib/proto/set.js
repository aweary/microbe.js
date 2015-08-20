'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('app:set');

/**
 * Set configuration variables
 * @param  {String} key   setting being changed
 * @param  {String} value new value for the setting
 */

exports['default'] = function (key, value) {
  this.state[key] = value;
  debug('Set { %o: %o }', key, value);
};

module.exports = exports['default'];