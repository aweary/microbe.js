var chalk = require('chalk')

exports.middleware = function(route) {
  var err = 'Cannot set middleware for route "' + route + '": route not defined'
  var result = chalk.black.bgRed.bold(err)
  throw new Error(result)
}

exports.missing = function(path) {
  var err = 'Unable to locate file/folder: "' + path + '": path not found'
  var result = chalk.black.bgRed.bold(err)
  throw new Error(result)
}

exports.engine = function() {
  var err = 'Render called before render engine was set'
  var result = chalk.red.bold(err)
  throw new Error(result)
}
