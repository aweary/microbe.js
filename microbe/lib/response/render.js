var debug = require('debug')('response:render')
var cons = require('consolidate')
var path = require('path')
var err = require('../../util/error')


/**
 * response.render
 * @param  {String} view View to render
 * @param  {data} data Data to render with the view
 * @summary renders the handebar partials using streams
 */


module.exports = function(app, send) {

  return function(view, data) {

    debug('Rendering view %o', view)
    var engine = app.state.engine
    var ext = app.state.ext || engine

    if (engine === undefined) err.engine()

    debug('Render %o with ext %o', engine, ext)

    var root = app.state.viewLocation
    var file = view + '.' + ext
    var location = path.resolve(root, file)
    debug('Serving %o', location)

    cons[engine](location, data, function(err, html) {
      send(html, null, false)
    })
  }
}
