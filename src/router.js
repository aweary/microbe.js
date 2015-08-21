import pathRegEx from 'path-to-regexp'
import bugger from 'debug'
import state from './state'

const debug = bugger('router')

/**
 * The Microbe Router is a simple object which contains all
 * the route handlers for a given path. It can be used directly,
 * or implicitly by using app.route()
 *
 * @param  {String} path Base URL for the HTTP path
 * @return {Objcet} router Microbe Router object
 */

export default function(path, handler, method) {

  debug('Registered route %o', path)

  let params = []
  let match = pathRegEx(path, params)

  return { path, handler, method, match, params }


  // /* Handle all GET requests for the router */
  // router.get = function(handler) {
  //   router.handlers.get = handler
  //   return this
  // }
  //
  // /* Handle all POST requests for the router */
  // router.post = function(handler) {
  //   router.handlers.post = handler
  //   return this
  // }
  //
  // /* Handle all PUT requests for the router */
  // router.put = function(handler) {
  //   router.handlers.put = handler
  //   return this
  // }
  //
  // /* Handle all DELETE requests for the router */
  // router.delete = function(handler) {
  //   router.handlers.delete = handler
  //   return this
  // }
  //
  // router._handle404 = function(req, res) {
  //   res.end('404 Not Found')
  // }

  return router

}
