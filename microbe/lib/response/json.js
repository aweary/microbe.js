import bugger from 'debug'
const debug = bugger('response:json')

/**
 * Returns a function that parses data into a
 * JSON string, sets the proper headers and
 * ends the response
 * @param {Object} response HTTP response
 * @param {Function} done finalhandler instance
 * @return {Function} response.json handler
 */

export default function(response, done) {

  return function(json) {
    if (typeof json === 'object') json = JSON.stringify(json)
    debug('Sending JSON data: %o', json)
    response.setHeader('Content-Type', 'application/json')
    response.end(json)
  }
}
