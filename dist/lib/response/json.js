'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('response:json');

/**
 * Returns a function that parses data into a
 * JSON string, sets the proper headers and
 * ends the response
 * @param {Object} response HTTP response
 * @param {Function} done finalhandler instance
 * @return {Function} response.json handler
 */

exports['default'] = function (response, done) {

  return function (json) {
    if (typeof json === 'object') json = JSON.stringify(json);
    debug('Sending JSON data: %o', json);
    response.setHeader('Content-Type', 'application/json');
    response.end(json);
  };
};

module.exports = exports['default'];