var t = require("./18.js").Buffer;
var r = require("./257.js");
module.exports = function (e, n, i) {
  if (typeof e == "string") {
    return i(null, [e, null]);
  }
  if (!t.isBuffer(e)) {
    try {
      e = new t(e);
    } catch (e) {
      return i("Input must be a Buffer or a string.");
    }
  }
  var s = e.slice(0, 3).join(" ");
  var o = false;
  var a = false;
  if (s.indexOf("83 99 114") === 0) {
    o = true;
  }
  if (s.indexOf("80 75") === 0) {
    a = true;
  }
  if (!a && !o) {
    return i(null, [new TextDecoder().decode(e), null]);
  }
  if (o) {
    return i("Parser only supports Scratch 2.X and above");
  }
  r(e, n, i);
};