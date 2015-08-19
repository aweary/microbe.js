var fs = require('fs')
var path = require('path')
var debug = require('debug')('helpers')
var mime = require('mime')


/**
 * Checks if an item exists in an array
 * @param {array} array source array
 * @param {Any} value item to check for
 * @return {Boolean} whether it exists
 */

exports.inArray = function inArray(array, value) {
  return array.indexOf(value) !== -1
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

exports.serve = function(response, done) {

  return function(location, err, readFile) {

    if (err) return done(false)
    var type = mime.lookup(location)

    if (readFile === false) {
      return response.end(location)
    }

    fs.readFile(location, function(err, data) {
      if (err) done(err)
      response.setHeader('Content-Type', type)
      response.setHeader('Content-Length', Buffer.byteLength(data))
      response.setHeader('X-Content-Type-Options', 'nosniff')
      response.end(data.toString())
    })
  }
}

/**
 * A shorthand function for requiring from
 * the lib directory
 * @param {String} child folder in lib
 * @param {string} file filename
 * @return {Function} required instance
 */

exports.lib = function(folder, file) {
  return require(path.join('../lib', folder, file + '.js'))
}


/**
 * Returns whether a path is a folder or not
 * @param {String} path file path
 * @return {Boolean} is/isn't a folder
 */

exports.isFolder = function(path) {
  return fs.lstatSync(path).isDirectory()
}
