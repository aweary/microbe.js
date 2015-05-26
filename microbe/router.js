
module.exports = function(baseURL) {

  var _router = {};
  _router.baseURL = baseURL;
  _router.handlers = {};

  /* Handle all GET requests for the router */
  _router.get = function(handler) {
    _router.handlers.get = handler;
    return this;
  };

  /* Handle all POST requests for the router */
  _router.post = function(handler) {
    _router.handlers.post = handler;
    return this;
  };

  /* Handle all PUT requests for the router */
  _router.put = function(handler) {
    _router.handlers.put = handler;
    return this;
  };

  /* Handle all DELETE requests for the router */
  _router.delete = function(handler) {
    _router.handlers.delete = handler;
    return this;
  };

  _router._handle404 = function(req, res) {
    res.end('404 Not Found');
  }


  return _router;

}
