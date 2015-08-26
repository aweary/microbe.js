import fs from 'fs'
import path from 'path'
import util from 'util'
import { EventEmitter } from 'events'
import merge from 'merge-descriptors'
import Server from './server'
import Router from './router'
import error from './util/error'
import bugger from 'debug'
import { isFolder } from './util/helpers'

const debug = bugger('app')


/* Microbe prototype */
function Application() {

  this.env = process.env.NODE_ENV || 'development'
  this.settings = {}
  this.routes = []
  this.routers = []
  this.caches = {}
  this.stack = []
  this.kickoff()

}

var proto = Application.prototype
Object.setPrototypeOf(proto, EventEmitter.prototype)


/**
 * Populate default settings on start
 * @private
 */

proto.kickoff = function kickoff() {

  this.set('routeParamters', [])
  this.set('staticRoutes', [])
  this.set('routes', [])
  this.set('projectRoot', path.resolve('./'))
  this.set('views', 'views')
  this.set('publicFolder', 'public')
  this.set('publicPath', path.resolve(this.get('publicFolder')))
  this.emit('kickoff')

}

/**
 * Get an internal `settings` value
 *
 * @param {String} key settings map key
 * @return {*} resulting value or false
 * @example
 *
 * app.get('views')
 * 		-> 'path/to/views'
 *
 * app.get('undefined value')
 * 		-> false
 */

proto.get = function get(key) {
  return this.settings[key]

}


/**
 * Set an internal `settings` value
 * @param {String|Object} key(s)
 * @param {*} value
 * @example
 *
 * 	app.set('views', 'view/folder')
 * 	app.get('view')
 * 		-> 'view/folder'
 *
 * app.set({
 * 			views: 'view/folder',
 * 			engine: 'handlebars'
 * 	})
 *
 * app.get('engine')
 * 		-> 'handlebars'
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
   let cached = this.caches.assets = {}

   debug('Caching static paths for %o', root)

   fs.readdir(root, (err, files) => {

     if (err) error('missing', root)

     files.forEach(file => {

       const location = path.resolve(root, file)

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

proto.route = function route(path, handler) {

  console.log('sdfsdfsd', path)
  this.emit('route', path)
  let routers = this.routers
  this.routes.push(path)

  debug('Registering route %o', path)

  switch (typeof handler) {

    case 'function':
      debug('Registered function for %o', path)
      let router = Router(path, handler, 'GET')
      routers.push(router)
      return

    case 'object':
      handler.path = path
      routers.push(handler)
      return

    case 'undefined':
      routers.push(Router(path))
      return router

    default:
    /* noop */

  }

}


/**
 * Used to start the actual HTTP server for the Microbe app
 * @param  {Number} port   HTTP Port for server
 * @param  {Function} callback Callback function once server starts
 */

proto.start = function start(port, callback) {

  let pub = this.get('publicPath')
  this.cache(pub)
  this.set('port', port)
  this.server = Server(port, this)
  this.server.listen(port, callback)
  this.emit('server', port)
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




const app = new Application()

app.on('route', function(path){
  console.log('fklsdjflksdjflksd', path)
})

app.on('server', function(port) {
  console.log('THE PORT IS ', port)
})

app.on('request', function(req) {
  console.log('Request', req)
})

app.route('/', function() {

})

app.start(8080, function() { console.log('started') })



app.on('kickoff', function(){
  console.log('sdfsd')
})
