var proto = require('./proto');
var state = require('./state');

module.exports = function() {

  /* Instantiate the returned object, which will be the app itself */
  var app = {};

  /* Inherit from the proto.js object */
  app.__proto__ = proto;

  /* Localize the globally accessbile state object */
  app._state = state;

  /* Instantiate the route handler cache */
  app._routeHandlers = { };

  return app;

}
