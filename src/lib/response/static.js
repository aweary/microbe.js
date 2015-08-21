import bugger from 'debug'
import path from 'path'
import mime from 'mime'
import { inArray } from '../../util/helpers'

const debug = bugger('response:static')

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



export default function serveStatic(file) {

    let exists = true
    let pub = this.publicPath
    let root = this.publicFolder
    let routes = this.staticRoutes
    let cache = this.staticRouteCache

    debug('pub path: %o', pub)

    let relative = path.join(pub, file)
    debug('Serving static file %o', relative)


    if (inArray(routes, relative)) {
      debug('Writing from source: %o', relative)
      send(relative)
      return
    }

    debug('Starting static route search')

    let paths = relative.split('/')
    let idx = paths.indexOf(root)

    let construct = paths.slice(++idx).join('/')
    let location = path.join(pub , construct)

    while (!inArray(routes, location)) {

      construct = paths.slice(++idx).join('/')
      location = path.join(pub, construct)
      if (idx > paths.length) {
        location = false
        break
      }

    }

    debug('Finished static route search')

    if (!location) return send(null, new Error('File not found!'))

    return this.send(location)

  }



}
