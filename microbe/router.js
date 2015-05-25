var url = require('url');

module.exports = function(baseUrl, server) {

  var router = this;

  router.handlers					= {};
  router.handlers.get			= {};
  router.handlers.post		= {};
  router.handlers.delete	= {};
  router.handlers.put			= {};

  if (baseUrl === undefined) throw new Error('Base URL required for router');
  router.baseUrl = baseUrl;

  router._handleRequest = function(requestType, request, response) {

    var path = url.parse(request.url).pathname;

    // Ignore favicon requests for now...
    if (path == '/favicon.ico') return;
    if (router.handlers[requestType][path] === undefined) router._handle404(request, response);
    else router.handlers[requestType][path](request, response);

  };

  router._handle404 = function(request, response) {
    response.end('404: Page Not Found!');
  }

  router.get = function(url, requestHandler) {

    if (typeof requestHandler !== 'function') throw new Error('Request handler must be a function');
    else router.handlers.get[url] = requestHandler;
    
  }

}
