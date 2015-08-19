var lib = require('./util/helpers').lib
var debug = require('debug')('proto')

var proto = module.exports = {}

proto.cache = lib('proto', 'cache')
proto.route = lib('proto', 'route')
proto.use = lib('proto', 'use')
proto.start = lib('proto', 'start')
proto.set = lib('proto', 'set')
