var url = require('url')
var debug = require('debug')('request')

module.exports = function(request, response, app) {

  debug('requested url: %o', request.url)

  request.path = url.parse(request.url).pathname
  request.type = request.method.toString().toLowerCase()
  var staticMatch = /\.(css|js|png|gif|txt|ico|xml|rss|jpeg|jpg|svg|pdf)$/

  if (staticMatch.test(request.path)) {
    request.staticRequest = true
  }

}
