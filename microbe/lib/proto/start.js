var Server = require('../../server.js')
var debug = require('debug')('app:start')

/**
 * Used to start the actual HTTP server for the Microbe app
 * @param  {Number} port   HTTP Port for server
 * @param  {Function} callback Callback function once server starts
 */

module.exports = function(port, callback) {

  this.cache(this.state.publicPath)
  this.port = port
  this.server = Server(port, this)
  this.server.listen(port, callback)
  debug('Starting app on port %o', port)

}
