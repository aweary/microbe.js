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

}
