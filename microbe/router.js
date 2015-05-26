
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


  return _router;

}
