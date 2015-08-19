var debug = require('debug')('response:static')
var path = require('path')
var mime = require('mime')
var inArray = require('../../util/helpers').inArray


/**
 * Used to serve static assets to the client. If the File
 * path is cached it will pull the path from there and
 * serve it. If the filepath is in the cached list of
 * static routes, it will pull from there.
 *
 * When the provided path isn't found in either (which usually
 * happens with dynamic URLs, e.g., route params) it will
 * find the public folder in the URL, create an anchor point
 * and then build path constructs until it finds one that
 * matches a cached path.
 *
 * @param {String} file static file path
 */

module.exports = function(app, send) {


  return function static(file) {

    var exists = true
    var public = app.state.publicPath
    var root = app.state.publicFolder
    var routes = app.state.staticRoutes
    var cache = app.state.staticRouteCache

    debug('Public path: %o', public)
    debug('Static cache: %o', JSON.stringify(cache))

    var relative = path.join(public, file)
    debug('Serving static file %o', relative)


    if (inArray(routes, relative)) {
      debug('Writing from source: %o', relative)
      send(relative)
      return
    }

    debug('Starting static route search')

    var paths = relative.split('/')
    var idx = paths.indexOf(root)

    var construct = paths.slice(++idx).join('/')
    var location = path.join(public, construct)

    while (!inArray(routes, location)) {

      construct = paths.slice(++idx).join('/')
      location = path.join(public, construct)
      if (idx > paths.length) {
        location = false
        break
      }

    }

    debug('Finished static route search')

    if (!location) return send(null, new Error('File not found!'))

    return send(location)

  }



}
