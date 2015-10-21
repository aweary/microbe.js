import fs from 'fs'
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
    let engine = app.query('engine')
    let ext = app.query('ext') || engine

    debug('Rendering view %o', view)

    if (engine === undefined) err('engine')
    debug('Render %o with ext %o', engine, ext)

    let root = app.query('viewLocation')
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



  static(filePath) {

    let app = this.app;
    let folder = app.query('publicFolder')
    let root = app.query('projectRoot')

    let pub = path.resolve(root, folder)


    if (pub === undefined && !filePath) {
      return this.send(null, new Error('File not found!'))
    }

    let exists = true
    let file = filePath || this.path
    let cache = app.caches.assets
    debug('Asset cache: %o', cache)
    debug('pub path: %o', pub)

    let relative = path.join(pub, file)
    debug('Serving static file %o', relative)


    if (inArray(cache, relative)) {
      debug('Writing from source: %o', relative)
      return fs.createReadStream(relative).pipe(this.res)
    }

    debug('Starting static route search')

    let paths = relative.split('/')
    let idx = paths.indexOf(root)

    let construct = paths.slice(++idx).join('/')
    let location = path.join(pub , construct)
    debug('Static cache: %o', cache)

    while (!inArray(cache, location)) {

      construct = paths.slice(++idx).join('/')
      location = path.join(pub, construct)
      if (idx > paths.length) {
        location = false
        break
      }

    }

    debug('Finished static route search: %o', location)

    return location
        ? fs.createReadStream(location).pipe(this.res)
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
      this.res.setHeader('Content-Type', 'application/json')
      this.res.end(json)
    }


}
