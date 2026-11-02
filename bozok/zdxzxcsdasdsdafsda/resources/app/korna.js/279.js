const r = require("./280.js");
const i = require("./285.js");
module.exports = class {
  constructor(e) {
    this._measurementProvider = e;
    this._cache = {};
  }
  wrapText(e, t) {
    t = t.normalize();
    const n = `${e}-${t}`;
    if (this._cache[n]) {
      return this._cache[n];
    }
    const s = this._measurementProvider.beginMeasurementSession();
    const o = new r(t);
    let a;
    let c = 0;
    let l = null;
    const u = [];
    while (a = o.nextBreak()) {
      const n = t.slice(c, a.position).replace(/\n+$/, "");
      let r = (l || "").concat(n);
      let s = this._measurementProvider.measureText(r);
      if (s > e) {
        if (this._measurementProvider.measureText(n) > e) {
          let t;
          let o = 0;
          while (o !== (t = i.nextBreak(n, o))) {
            const i = n.substring(o, t);
            r = (l || "").concat(i);
            s = this._measurementProvider.measureText(r);
            if (l === null || s <= e) {
              l = r;
            } else {
              u.push(l);
              l = i;
            }
            o = t;
          }
        } else {
          if (l !== null) {
            u.push(l);
          }
          l = n;
        }
      } else {
        l = r;
      }
      if (a.required) {
        if (l !== null) {
          u.push(l);
        }
        l = null;
      }
      c = a.position;
    }
    l = l || "";
    if (l.length > 0 || u.length === 0) {
      u.push(l);
    }
    this._cache[n] = u;
    this._measurementProvider.endMeasurementSession(s);
    return u;
  }
};