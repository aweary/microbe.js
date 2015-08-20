'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.inArray = inArray;
exports.serve = serve;
exports.lib = lib;
exports.isFolder = isFolder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var debug = (0, _debug2['default'])('helpers');

/**
 * Checks if an item exists in an array
 * @param {array} array source array
 * @param {Any} value item to check for
 * @return {Boolean} whether it exists
 */

function inArray(array, value) {
  return array.indexOf(value) !== -1;
}

/**
 * Return a partially applied function that will
 * read a file from the filesystem, send it to the
 * response, and invoke the done (finalhandler instance)
 * function afterwards
 *
 * @param {Object} response Node.js request
 * @param {Function} done finalhandler instance
 */

function serve(response, done) {

  return function (location, err, readFile) {

    if (err) return done(false);
    var type = _mime2['default'].lookup(location);

    if (readFile === false) {
      return response.end(location);
    }

    _fs2['default'].readFile(location, function (err, data) {
      if (err) done(err);
      response.setHeader('Content-Type', type);
      response.setHeader('Content-Length', Buffer.byteLength(data));
      response.setHeader('X-Content-Type-Options', 'nosniff');
      response.end(data.toString());
    });
  };
}

/**
 * A shorthand function for requiring from
 * the lib directory
 * @param {String} child folder in lib
 * @param {string} file filename
 * @return {Function} required instance
 */

function lib(folder, file) {
  return require(_path2['default'].join('../lib', folder, file + '.js'));
}

/**
 * Returns whether a path is a folder or not
 * @param {String} path file path
 * @return {Boolean} is/isn't a folder
 */

function isFolder(path) {
  return _fs2['default'].lstatSync(path).isDirectory();
}