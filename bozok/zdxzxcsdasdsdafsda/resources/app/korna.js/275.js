module.exports = {
  rgbToHsv: (e, t) => {
    let [n, r, i] = e;
    let s = 0;
    n /= 255;
    r /= 255;
    i /= 255;
    let o = 0;
    if (r < i) {
      o = r;
      r = i;
      i = o;
      s = -1;
    }
    if (n < r) {
      o = n;
      n = r;
      r = o;
      s = -2 / 6 - s;
    }
    const a = n - Math.min(r, i);
    const c = Math.abs(s + (r - i) / (a * 6 + Number.EPSILON));
    const l = a / (n + Number.EPSILON);
    const u = n;
    t[0] = c;
    t[1] = l;
    t[2] = u;
    return t;
  },
  hsvToRgb: (e, t) => {
    let [n, r, i] = e;
    if (r === 0) {
      t[0] = t[1] = t[2] = i * 255 + 0.5;
      return t;
    }
    n %= 1;
    const s = n * 6 | 0;
    const o = n * 6 - s;
    const a = i * (1 - r);
    const c = i * (1 - r * o);
    const l = i * (1 - r * (1 - o));
    let u = 0;
    let h = 0;
    let d = 0;
    switch (s) {
      case 0:
        u = i;
        h = l;
        d = a;
        break;
      case 1:
        u = c;
        h = i;
        d = a;
        break;
      case 2:
        u = a;
        h = i;
        d = l;
        break;
      case 3:
        u = a;
        h = c;
        d = i;
        break;
      case 4:
        u = l;
        h = a;
        d = i;
        break;
      case 5:
        u = i;
        h = a;
        d = c;
    }
    t[0] = u * 255 + 0.5;
    t[1] = h * 255 + 0.5;
    t[2] = d * 255 + 0.5;
    return t;
  }
};