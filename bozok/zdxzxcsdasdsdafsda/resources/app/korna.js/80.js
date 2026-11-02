let r;
let i;
if (typeof TextEncoder == "undefined") {
  r = require("./21.js").TextEncoder;
  i = require("./21.js").TextDecoder;
} else {
  r = TextEncoder;
  i = TextDecoder;
}
const s = `<!${"-".repeat(2)}`;
const o = `${"-".repeat(2)}>`;
const a = new RegExp(`${s}rotationCenter:(-?[\\d\\.]+):(-?[\\d\\.]+)${o}\$`);
module.exports = {
  parseVectorMetadata: e => {
    const t = e.match(a);
    if (!t) {
      return null;
    }
    const n = +t[1];
    const r = +t[2];
    if (Number.isNaN(n) || Number.isNaN(r)) {
      return null;
    } else {
      return [n, r];
    }
  },
  exportCostume: e => {
    const t = e.asset.data;
    if (e.dataFormat !== "svg") {
      return t;
    }
    let n = new i().decode(t);
    n = n.replace(a, "");
    const c = e.rotationCenterX;
    const l = e.rotationCenterY;
    n += `${s}rotationCenter:${c}:${l}${o}`;
    return new r().encode(n);
  }
};