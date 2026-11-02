const r = require("./6.js");
module.exports = class {
  static getByMd5ext(e, t, n, i) {
    const s = r.splitFirst(i, ".");
    const o = s[0];
    const a = s[1].toLowerCase();
    if (t) {
      let r = t.file(i);
      if (!r) {
        const e = new RegExp(`^([^/]*/)?${i}\$`);
        r = t.file(e)[0];
      }
      if (r) {
        return e.wrapAssetRequest(() => r.async("uint8array").then(t => e.storage.createAsset(n, a, t, o, false)));
      }
    }
    return e.wrapAssetRequest(() => e.storage.load(n, o, a));
  }
};