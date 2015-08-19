var proto = require('./proto')
var State = require('./state')
var merge = require('merge')


module.exports = function(opts) {

  var app = Object.create(proto)
  var state = new State()
  app.state = merge(state, opts)

  return app

}
