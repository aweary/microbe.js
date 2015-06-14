exports.middleware = function(route) {
  var err = 'Cannot set middleware for route "' + route + '": route not defined'
  throw new Error(err);
}
