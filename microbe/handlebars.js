var handlebars = require('handlebars');
var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

/* Stream transform for Handlebar templating */
function Handlify(data) {

  if (!(this instanceof Handlify)) {
    return new Handlify;
  }

  Transform.call(this, {});
  this.data = data;

}

/* Inherit from base Transform class */
util.inherits(Handlify, Transform);

Handlify.prototype._transform = function(chunk, encoding, callback) {

  var source = chunk.toString('utf8');
  var template = handlebars.compile(source);
  var result = template(this.data);
  this.push(result, 'utf8');
  callback();

};

module.exports = Handlify;
