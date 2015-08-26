import routington from 'routington'
import methods from 'methods'
import { EventEmitter } from 'events'
import url from 'url'


export default function Router() {

  this._events = new EventEmitter()
  this._router = routington()

}

methods.forEach(method => {

  Router.prototype[method] = function(path, handler) {
    let node = this._router.define(path)[0]
    node[method] = node[method] || []
    node[method].push(handler)
  }

})

let router = new Router()

router.get('/home/:id', function(duplex) {
  console.log('This is a get request')
})


var match = router._router.match('/home/54kjlg345')
console.log(match)

// import pathRegEx from 'path-to-regexp'
// import bugger from 'debug'
// import state from './state'
//
// const debug = bugger('router')
//
// /**
//  * The Microbe Router is a simple object which contains all
//  * the route handlers for a given path. It can be used directly,
//  * or implicitly by using app.route()
//  *
//  * @param  {String} path Base URL for the HTTP path
//  * @return {Objcet} router Microbe Router object
//  */
//
// export default function(path, handler, method) {
//
//   debug('Registered route %o', path)
//
//   let params = []
//   let match = pathRegEx(path, params)
//
//   return { path, handler, method, match, params }
//
// }
