var e = require("./18.js").Buffer;
var t = require("./115.js")(module);
(function (n) {
  "use strict";

  var r;
  var i = typeof (r = n.atob) == "function" ? r : typeof e == "function" ? function (t) {
    return new e(t, "base64").toString("binary");
  } : typeof n.base64js == "object" ? function (e) {
    var t = n.base64js.b64ToByteArray(e);
    return Array.prototype.map.call(t, function (e) {
      return String.fromCharCode(e);
    }).join("");
  } : function () {
    throw new Error("You're probably in an old browser or an iOS webworker. It might help to include beatgammit's base64-js.");
  };
  n.atob = i;
  if (t && t.exports) {
    t.exports = i;
  }
})(window);