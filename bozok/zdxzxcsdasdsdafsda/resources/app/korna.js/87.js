const r = require("./11.js");
const {
  rgbToHsv: i,
  hsvToRgb: s
} = require("./275.js");
const o = require("./28.js");
const a = 0.5;
const c = 0.5;
const l = [0, 0, 0];
module.exports = class {
  static transformColor(e, t, n) {
    if (t[3] === 0) {
      return t;
    }
    let r = e.enabledEffects;
    if (typeof n == "number") {
      r &= n;
    }
    const a = e.getUniforms();
    const c = !!(r & o.EFFECT_INFO.color.mask);
    const u = !!(r & o.EFFECT_INFO.brightness.mask);
    if (c || u) {
      const e = t[3] / 255;
      t[0] /= e;
      t[1] /= e;
      t[2] /= e;
      if (c) {
        const e = i(t, l);
        const n = 0.055;
        const r = 0.09;
        if (e[2] < n) {
          e[0] = 0;
          e[1] = 1;
          e[2] = n;
        } else if (e[1] < r) {
          e[0] = 0;
          e[1] = r;
        }
        e[0] = a.u_color + e[0] + 1;
        s(e, t);
      }
      if (u) {
        const e = a.u_brightness * 255;
        t[0] += e;
        t[1] += e;
        t[2] += e;
      }
      t[0] *= e;
      t[1] *= e;
      t[2] *= e;
    }
    if (r & o.EFFECT_INFO.ghost.mask) {
      t[0] *= a.u_ghost;
      t[1] *= a.u_ghost;
      t[2] *= a.u_ghost;
      t[3] *= a.u_ghost;
    }
    return t;
  }
  static transformPoint(e, t, n) {
    r.v3.copy(t, n);
    const i = e.enabledEffects;
    const s = e.getUniforms();
    if (i & o.EFFECT_INFO.mosaic.mask) {
      n[0] = s.u_mosaic * n[0] % 1;
      n[1] = s.u_mosaic * n[1] % 1;
    }
    if (i & o.EFFECT_INFO.pixelate.mask) {
      const t = e.skin.getUniforms();
      const r = t.u_skinSize[0] / s.u_pixelate;
      const i = t.u_skinSize[1] / s.u_pixelate;
      n[0] = (Math.floor(n[0] * r) + a) / r;
      n[1] = (Math.floor(n[1] * i) + c) / i;
    }
    if (i & o.EFFECT_INFO.whirl.mask) {
      const e = 0.5;
      const t = n[0] - a;
      const r = n[1] - c;
      const i = Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2));
      const o = Math.max(1 - i / e, 0);
      const l = s.u_whirl * o * o;
      const u = Math.sin(l);
      const h = Math.cos(l);
      const d = h;
      const p = -u;
      const f = u;
      const m = h;
      n[0] = d * t + f * r + a;
      n[1] = p * t + m * r + c;
    }
    if (i & o.EFFECT_INFO.fisheye.mask) {
      const e = (n[0] - a) / a;
      const t = (n[1] - c) / c;
      const r = Math.sqrt(e * e + t * t);
      const i = Math.pow(Math.min(r, 1), s.u_fisheye) * Math.max(1, r);
      const o = e / r;
      const l = t / r;
      n[0] = a + i * o * a;
      n[1] = c + i * l * c;
    }
    return n;
  }
};