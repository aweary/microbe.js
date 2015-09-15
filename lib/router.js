import routington from 'routington'
import methods from 'methods'
import { EventEmitter } from 'events'
import url from 'url'


export default function Router() {
  this._router = routington()
}

methods.forEach(method => {

  Router.prototype[method] = function(path, handler) {
    let node = this._router.define(path)[0]
    node[method] = node[method] || []
    node[method].push(handler)
  }

})
