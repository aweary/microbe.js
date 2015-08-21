import http from 'http'
import delegate from 'delegates'
import final from 'finalhandler'

import merge from 'merge'
import except from '@aweary/except'
import _response from './response'
import _request from './request'
import handler from './handler'
import bugger from 'debug'
import { blacklist } from './util/constants'
import { serve } from './util/helpers'


export default function(port, app) {

  const debug = bugger('app:server')
  debug('Starting app with port %o', port)

  let state = app.state


  return http.createServer((req, res) => {

    _request.req = req
    _response.res = res

    let duplex = merge(_request, _response)
    duplex.done = final(req, res)
    duplex.send = serve(res, duplex.done)

    Object.setPrototypeOf(duplex, state)

    handler(duplex)

  })

}
