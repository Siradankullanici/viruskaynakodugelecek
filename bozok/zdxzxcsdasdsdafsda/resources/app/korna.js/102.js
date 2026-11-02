var e = require("./8.js");
var r = e !== undefined && e || typeof self != "undefined" && self || window;
var i = Function.prototype.apply;
function s(e, t) {
  this._id = e;
  this._clearFn = t;
}
exports.setTimeout = function () {
  return new s(i.call(setTimeout, r, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new s(i.call(setInterval, r, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (e) {
  if (e) {
    e.close();
  }
};
s.prototype.unref = s.prototype.ref = function () {};
s.prototype.close = function () {
  this._clearFn.call(r, this._id);
};
exports.enroll = function (e, t) {
  clearTimeout(e._idleTimeoutId);
  e._idleTimeout = t;
};
exports.unenroll = function (e) {
  clearTimeout(e._idleTimeoutId);
  e._idleTimeout = -1;
};
exports._unrefActive = exports.active = function (e) {
  clearTimeout(e._idleTimeoutId);
  var t = e._idleTimeout;
  if (t >= 0) {
    e._idleTimeoutId = setTimeout(function () {
      if (e._onTimeout) {
        e._onTimeout();
      }
    }, t);
  }
};
require("./103.js");
exports.setImmediate = typeof self != "undefined" && self.setImmediate || e !== undefined && e.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self != "undefined" && self.clearImmediate || e !== undefined && e.clearImmediate || this && this.clearImmediate;