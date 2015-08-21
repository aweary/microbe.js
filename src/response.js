import path from 'path'
import final from 'finalhandler'
import cons from 'consolidate'
import state from './state'
import bugger from 'debug'
import { serve, lib } from './util/helpers'

const debug = bugger('response')


export default {

  _check: 'This is render',
  render: lib('response', 'render'),
  static: lib('response', 'static')
  // json: lib('response', 'json')(this.res, done)

}
//
// export default function(request, response, app) {
//
//   const done = final(request, response)
//   const send = serve(response, done)
//
//   response.render = lib('response', 'render')(app, send)
//   response.static = lib('response', 'static')(app, send)
//   response.json = lib('response', 'json')(response, done)
//
// }
