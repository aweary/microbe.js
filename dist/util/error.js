'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

exports['default'] = function (type, data) {

  var errors = {
    missing: 'Unable to locate file/folder ' + data + ':  path not found',
    engine: 'Render called before render engine was set',
    middleware: 'Cannot set middleware for route ' + data + ': route not defined'
  };

  throw new Error(_chalk2['default'].red.bold(errors[type]));
};

module.exports = exports['default'];