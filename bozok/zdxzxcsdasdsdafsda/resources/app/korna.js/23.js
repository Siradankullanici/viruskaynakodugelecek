class n {
  static get RGB_BLACK() {
    return {
      r: 0,
      g: 0,
      b: 0
    };
  }
  static get RGB_WHITE() {
    return {
      r: 255,
      g: 255,
      b: 255
    };
  }
  static decimalToHex(e) {
    if (e < 0) {
      e += 16777216;
    }
    let t = Number(e).toString(16);
    t = `#${"000000".substr(0, 6 - t.length)}${t}`;
    return t;
  }
  static decimalToRgb(e) {
    const t = e >> 24 & 255;
    return {
      r: e >> 16 & 255,
      g: e >> 8 & 255,
      b: e & 255,
      a: t > 0 ? t : 255
    };
  }
  static hexToRgb(e) {
    if (e.startsWith("#")) {
      e = e.substring(1);
    }
    const t = parseInt(e, 16);
    if (isNaN(t)) {
      return null;
    }
    if (e.length === 6) {
      return {
        r: t >> 16 & 255,
        g: t >> 8 & 255,
        b: t & 255
      };
    }
    if (e.length === 3) {
      const e = t >> 8 & 15;
      const n = t >> 4 & 15;
      const r = t & 15;
      return {
        r: e << 4 | e,
        g: n << 4 | n,
        b: r << 4 | r
      };
    }
    return null;
  }
  static rgbToHex(e) {
    return n.decimalToHex(n.rgbToDecimal(e));
  }
  static rgbToDecimal(e) {
    return (e.r << 16) + (e.g << 8) + e.b;
  }
  static hexToDecimal(e) {
    return n.rgbToDecimal(n.hexToRgb(e));
  }
  static hsvToRgb(e) {
    let t = e.h;
    if (t < 0 || t >= 360) {
      t %= 360;
      if (t < 0) {
        t += 360;
      }
    }
    const n = Math.max(0, Math.min(e.s, 1));
    const r = Math.max(0, Math.min(e.v, 1));
    const i = Math.floor(t / 60);
    const s = t / 60 - i;
    const o = r * (1 - n);
    const a = r * (1 - n * s);
    const c = r * (1 - n * (1 - s));
    let l;
    let u;
    let h;
    switch (i) {
      default:
      case 0:
        l = r;
        u = c;
        h = o;
        break;
      case 1:
        l = a;
        u = r;
        h = o;
        break;
      case 2:
        l = o;
        u = r;
        h = c;
        break;
      case 3:
        l = o;
        u = a;
        h = r;
        break;
      case 4:
        l = c;
        u = o;
        h = r;
        break;
      case 5:
        l = r;
        u = o;
        h = a;
    }
    return {
      r: Math.floor(l * 255),
      g: Math.floor(u * 255),
      b: Math.floor(h * 255)
    };
  }
  static rgbToHsv(e) {
    const t = e.r / 255;
    const n = e.g / 255;
    const r = e.b / 255;
    const i = Math.min(Math.min(t, n), r);
    const s = Math.max(Math.max(t, n), r);
    let o = 0;
    let a = 0;
    if (i !== s) {
      o = ((t === i ? 3 : n === i ? 5 : 1) - (t === i ? n - r : n === i ? r - t : t - n) / (s - i)) * 60;
      if (o === 360) {
        o = 0;
      }
      a = (s - i) / s;
    }
    return {
      h: o,
      s: a,
      v: s
    };
  }
  static mixRgb(e, t, n) {
    if (n <= 0) {
      return e;
    }
    if (n >= 1) {
      return t;
    }
    const r = 1 - n;
    return {
      r: r * e.r + n * t.r,
      g: r * e.g + n * t.g,
      b: r * e.b + n * t.b
    };
  }
}
module.exports = n;