var t = require("./18.js").Buffer;
(function () {
  "use strict";

  module.exports = function (e) {
    return (e instanceof t ? e : t.from(e.toString(), "binary")).toString("base64");
  };
})();