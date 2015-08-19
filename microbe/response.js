var path = require('path')
var final = require('finalhandler')
var cons = require('consolidate')
var state = require('./state')
var debug = require('debug')('response')
var serve = require('./util/helpers').serve
var lib = require('./util/helpers').lib

module.exports = function(request, response, app) {

  var done = final(request, response)
  var send = serve(response, done)

  response.render = lib('response', 'render')(app, send)
  response.static = lib('response', 'static')(app, send)
  response.json = lib('response', 'json')(response, done)

}
