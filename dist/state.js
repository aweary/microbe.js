'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

/**
 * Generate a state object with all the
 * required state defaults
 * @class
 */

var _path2 = _interopRequireDefault(_path);

var State = (function () {
  function State() {
    _classCallCheck(this, State);

    this.projectRoot = _path2['default'].resolve('./');
    this.views = 'views';
    this.publicFolder = 'public';
    this.middleware = [];
    this.routeParamters = [];
    this.staticRoutes = [];
    this.staticRouteCache = {};
    this.routes = [];
    this.routers = {};
  }

  _createClass(State, [{
    key: 'publicPath',
    get: function get() {
      return _path2['default'].resolve(this.publicFolder);
    }
  }, {
    key: 'viewLocation',
    get: function get() {
      return _path2['default'].resolve(this.views);
    }
  }]);

  return State;
})();

exports['default'] = State;
module.exports = exports['default'];