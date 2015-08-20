import path from 'path'

/**
 * Generate a state object with all the
 * required state defaults
 * @class
 */
export default class State {

  constructor() {
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

  get publicPath() {
    return path.resolve(this.publicFolder)
  }

  get viewLocation() {
    return path.resolve(this.views)
  }

}
