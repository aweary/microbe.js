import path from 'path'
import final from 'finalhandler'
import cons from 'consolidate'
import bugger from 'debug'
import { serve, lib, isFolder, inArray } from './util/helpers'
import error from './util/error'

const debug = bugger('response')


export default {

  _check: 'This is render',

  /**
   * response.render
   * @param  {String} view View to render
   * @param  {data} data Data to render with the view
   * @summary renders the handebar partials using streams
   */


  render(view, data)  {

    let app = this.app
    let engine = app.get('engine')
    let ext = app.get('ext') || engine

    debug('Rendering view %o', view)

    if (engine === undefined) err('engine')
    debug('Render %o with ext %o', engine, ext)

    let root = app.get('viewLocation')
    debug('viewLocation: ', root)
    let file = `${view}.${ext}`
    let location = path.resolve(root, file)
    debug('Serving %o', location)

    cons[engine](location, data, (err, html) => {
      this.send(html, null, false)
    })
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



  static() {

      let app = this.app
      let exists = true
      let file = this.path
      let pub = app.get('publicPath')
      let root = app.get('publicFolde')
      let cache = app.caches.assets
      debug('Asset cache: %o', cache)

      debug('pub path: %o', pub)

      let relative = path.join(pub, file)
      debug('Serving static file %o', relative)


      if (inArray(cache, relative)) {
        debug('Writing from source: %o', relative)
        return this.send(relative)
      }

      debug('Starting static route search')

      let paths = relative.split('/')
      let idx = paths.indexOf(root)

      let construct = paths.slice(++idx).join('/')
      let location = path.join(pub , construct)

      while (!inArray(cache, location)) {

        construct = paths.slice(++idx).join('/')
        location = path.join(pub, construct)
        if (idx > paths.length) {
          location = false
          break
        }

      }

      debug('Finished static route search')

      return location
          ? this.send(location)
          : this.send(null, new Error('File not found!'))

    },



  /**
   * Returns a function that parses data into a
   * JSON string, sets the proper headers and
   * ends the response
   * @param {Object} response HTTP response
   * @param {Function} done finalhandler instance
   * @return {Function} response.json handler
   */


  json(json) {
      if (typeof json === 'object') json = JSON.stringify(json)
      debug('Sending JSON data: %o', json)
      response.setHeader('Content-Type', 'application/json')
      response.end(json)
    }


}
