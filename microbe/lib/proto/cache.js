var debug = require('debug')('app:cache')
var fs = require('fs')
var path = require('path')
var err = require('../../util/error')
var isFolder = require('../../util/helpers').isFolder

/**
 * builds an in-memory cache of the existing static files.
 * It recursively climbs the decalured static resource folder
 * and builds a cache of all the file paths. proto.cache
 * @param  {String} root path to recursively search in
 */


module.exports = function(root) {

  var self = this
  var routes = this.state.staticRoutes

  debug('Caching static paths for %o', root)

  fs.readdir(root, function(err, files) {

    if (err) err.missing(root)

    files.forEach(function(file) {

      var location = path.resolve(root, file)
      isFolder(location)
          ? self.cache(location)
          : routes.push(location)

    })
  })
}
