const r = require("./63.js");
module.exports = function (e, t) {
  var n;
  try {
    n = r.parse(e.replace(/(\\+)(b|u0008)/g, (e, t, n) => t.length % 2 ? e.replace("\\" + n, "") : e));
  } catch (e) {
    return t(e.toString());
  }
  return t(null, n);
};