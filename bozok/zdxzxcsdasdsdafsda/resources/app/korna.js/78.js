const r = require("./79.js");
module.exports = (e, t) => {
  let n = new XMLSerializer().serializeToString(e);
  if (t) {
    n = r(n, t);
  }
  return n;
};