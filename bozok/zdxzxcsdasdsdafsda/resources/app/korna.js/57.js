const r = require("./5.js");
module.exports = function (e, t, n) {
  if (e && e.id && e.default) {
    return r(e, t, n);
  } else {
    return e;
  }
};