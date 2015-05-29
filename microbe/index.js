var proto = require('./proto');
var State = require('./state');

module.exports = function() {

  /* Instantiate the returned object, which will be the app itself */
  var app = {};

  /* Inherit from the proto.js object */
  app.__proto__ = proto;

  app._state = new State();

  /* Instantiate the route handler cache */
  app._routeHandlers = { };

  return app;

}
