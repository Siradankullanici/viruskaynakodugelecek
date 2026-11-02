const r = require("./77.js");
const i = require("./51.js");
const s = {
  sanitizeByteStream: function (e) {
    const t = new TextDecoder();
    const n = new TextEncoder();
    const r = s.sanitizeSvgText(t.decode(e));
    return n.encode(r);
  }
};
const o = `<!${"-".repeat(2)}`;
const a = `${"-".repeat(2)}>`;
const c = new RegExp(`${o}rotationCenter:(-?[\\d\\.]+):(-?[\\d\\.]+)${a}$`);
s.sanitizeSvgText = function (e) {
  let t = i.sanitize(e, {
    USE_PROFILES: {
      svg: true
    }
  });
  if (t.indexOf("]&gt;") >= 0) {
    t = t.substring(5, t.length);
  }
  t = r(t);
  const n = e.match(c);
  if (n) {
    t += n[0];
  }
  return t;
};
module.exports = s;