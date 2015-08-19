var path = require('path')
var merge = require('merge')

function State() {

  this.projectRoot = path.resolve('./')
  this.views = 'views'
  this.publicFolder = 'public'
  this.middleware = []
  this.routeParamters = []
  this.staticRoutes = []
  this.staticRouteCache  = {}
  this.routes = []
  this.routers = {}

}

/* Define Getters for the dyanically generated publicPath and viewLocation */

Object.defineProperty(State.prototype, 'publicPath', {
  get: function() {
    return path.resolve(this.publicFolder)
  }
})

Object.defineProperty(State.prototype, 'viewLocation', {
  get: function() {
    return path.resolve(this.views)
  }
})

module.exports = State
