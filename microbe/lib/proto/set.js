var debug = require('debug')('app:set')

/**
 * Set configuration variables
 * @param  {String} key   setting being changed
 * @param  {String} value new value for the setting
 * @summary
 */

module.exports = function(key, value) {
  this.state[key] = value
  debug('Set { %o: %o }', key, value)
}
