const r = require("./290.js");
module.exports = function (e) {
  if (typeof document != "undefined") {
    return r(e);
  }
};