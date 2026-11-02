const r = require("./242.js");
module.exports = function (e, t = {}) {
  if (typeof e != "string") {
    throw new Error("SVG to be inlined is not a string");
  }
  const n = {};
  if (t && typeof t == "object") {
    for (const [e, r] of Object.entries(t)) {
      n[i = e, i.replace(/[<>&'"]/g, e => {
        switch (e) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            return "&amp;";
          case "'":
            return "&apos;";
          case "\"":
            return "&quot;";
        }
      })] = r;
    }
  }
  var i;
  try {
    Object.assign(n, r());
  } catch (e) {}
  const s = new Set();
  const o = /font-family="([^"]*)"/g;
  let a = o.exec(e);
  while (a) {
    s.add(a[1]);
    a = o.exec(e);
  }
  if (s.size > 0) {
    let t = "<defs><style>";
    for (const e of s) {
      if (Object.prototype.hasOwnProperty.call(n, e)) {
        t += `${n[e]}`;
      }
    }
    t += "</style></defs>";
    return e = e.replace(/<svg[^>]*>/, `$&${t}`);
  }
  return e;
};