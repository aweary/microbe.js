import bugger from 'debug'
const debug = bugger('app:set')

/**
 * Set configuration variables
 * @param  {String} key   setting being changed
 * @param  {String} value new value for the setting
 */

export default function(key, value) {
  this.state[key] = value
  debug('Set { %o: %o }', key, value)
}
