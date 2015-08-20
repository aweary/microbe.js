import url from 'url'
import bugger from 'debug'

const debug = bugger('request')

export default function(request, response, app) {

  debug('requested url: %o', request.url)

  const staticMatch = /\.(css|js|png|gif|txt|ico|xml|rss|jpeg|jpg|svg|pdf)$/
  request.path = url.parse(request.url).pathname
  request.type = request.method.toString().toLowerCase()

  if (staticMatch.test(request.path)) {
    request.staticRequest = true
   }

}
