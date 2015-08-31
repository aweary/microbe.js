import fs from 'fs'
import path from 'path'
import util from 'util'
import { methods } from './util/constants'
import { EventEmitter } from 'events'
import merge from 'merge-descriptors'
import Server from './server'
import Router from './router'
import error from './util/error'
import bugger from 'debug'
import { isFolder } from './util/helpers'

const debug = bugger('app')


/* Microbe prototype */
export default function Application(root) {

  this.env = process.env.NODE_ENV || 'development'
  this.settings = {}
  this.router = new Router()
  this.caches = {}
  this.stack = []
  this.kickoff(root)

}

var proto = Application.prototype
Object.setPrototypeOf(proto, EventEmitter.prototype)


/**
 * Populate default settings on start
 * @private
 */

proto.kickoff = function kickoff(root) {

  var root = path.resolve(root)
  console.log('ROOT', root)
  this.set('routeParamters', [])
  this.set('staticRoutes', [])
  this.set('routes', [])
  this.set('projectRoot', root)
  this.set('views', 'views')
  this.set('publicFolder', 'public')
  this.set('publicPath', path.resolve(root, 'public'))
  this.set('viewLocation', path.resolve(root, 'views'))
  this.emit('kickoff')

}

/**
 * Get an internal `settings` value
 *
 * @param {String} key settings map key
 * @return {*} resulting value or false
 * @example
 */

proto.get = function get(key) {
  return this.settings[key]

}


/**
 * Set an internal `settings` value
 * @param {String|Object} key(s)
 * @param {*} value
 */

proto.set = function set(setting, value) {

  arguments.length === 1
      ? merge(this.settings, setting)
      : this.settings[setting] = value
  return this
}

/**
 * Return a JSON representation
 * @return {[type]} [description]
 */
proto.toJSON = function inspect() {
  return {
    settings: this.settings,
    env: this.env
  }
}

/**
 * builds an in-memory cache of the existing static files.
 * It recursively climbs the decalured static resource folder
 * and builds a cache of all the file paths. proto.cache
 * @param  {String} root path to recursively search in
 */

proto.cache = function cache(root) {

   const self = this
   let cached = this.caches.assets = []

   debug('Caching static paths for %o', root)

   fs.readdir(root, (err, files) => {

     if (err) error('missing', root)

     files.forEach(file => {

       const location = path.resolve(root, file)
       debug('Static path: %o', location)

       isFolder(location)
           ? self.cache(location)
           : cached.push(location)

     })
   })
}



/**
 * proto.route
 * @param  {String} path base location for route
 * @param  {Object} router  Microbe router object
 * @summary used to set the routes for the Microbe proto
 */

proto.route = function route(options) {

  let { path, method, handler } = options
  let router = this.router
  router[method](path, handler)
  this.emit('route', { path, method, handler })

}


/**
 * Used to start the actual HTTP server for the Microbe app
 * @param  {Number} port   HTTP Port for server
 * @param  {Function} callback Callback function once server starts
 */

proto.start = function start(port, callback) {

  let cb = callback || function() {}
  let pub = this.get('publicPath')
  console.log(pub)
  this.cache(pub)
  this.set('port', port)
  this.server = Server(port, this)
  this.server.listen(port, cb)
  this.emit('start', port)
  debug('Starting app on port %o', port)

}


/**
 * Register middleware handlers with routes
 * @param  {String} route      route for the middleware
 * @param  {Function} handler actual middleware handler
 */

proto.use = function use(route, handler) {

  let stack = this.stack

  handler === undefined
      ? stack.push({route: '*', handler: route})
      : stack.push({route: route, handler: handler})

  debug('Registered middleware on %o', route)

}
