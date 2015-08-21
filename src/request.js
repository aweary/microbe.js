import url from 'url'
import bugger from 'debug'
import parse from 'parseurl'
import qs from 'query-string'

const debug = bugger('request')


/**
 * Export an object that provides a public
 * interface to the internal Node request object.
 * Defines numerous getters and setters to avoid
 * direct manipulation of the HTTP request object
 *
 */

export default {

  _params: [],

  get headers() {
    return this.req.headers
  },

  get url() {
    return this.req.url
  },

  get method() {
    return this.req.method
  },

  get path() {
    return parse(this.req).pathname || ''
  },

  get host() {
    return parse(this.req).host || ''
  },

  get querystring() {
    return parse(this.req).query || ''
  },

  get query() {
    return qs.parse(this.querystring)
  },

  get search() {
    return parse(this.req).search || ''
  },

  get socket() {
    return this.req.socket
  },

  get asset() {
    let match = /\.(css|js|png|gif|txt|ico|xml|rss|jpeg|jpg|svg|pdf)$/
    return match.test(this.path)
  },

  get params() {
    return this._params || []
  }


}
