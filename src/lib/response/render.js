import bugger from 'debug'
import cons from 'consolidate'
import path from 'path'
import err from '../../util/error'

const debug = bugger('response:render')

/**
 * response.render
 * @param  {String} view View to render
 * @param  {data} data Data to render with the view
 * @summary renders the handebar partials using streams
 */


export default function(app, send) {

  return function(view, data) {

    debug('Rendering view %o', view)
    let engine = app.state.engine
    let ext = app.state.ext || engine

    if (engine === undefined) err('engine')
    debug('Render %o with ext %o', engine, ext)

    let root = app.state.viewLocation
    let file = `${view}.${ext}`
    let location = path.resolve(root, file)
    debug('Serving %o', location)

    cons[engine](location, data, (err, html) => {
      send(html, null, false)
    })
  }

}
