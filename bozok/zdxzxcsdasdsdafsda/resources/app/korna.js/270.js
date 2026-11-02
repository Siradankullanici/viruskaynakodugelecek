let n;
const r = (e, t) => t ^ (e ^ t) & e - t >> 31;
const i = (e, t) => e ^ (e ^ t) & e - t >> 31;
const s = (e, t, n) => {
  let {
    _width: r,
    _height: i,
    _colorData: s
  } = e;
  if (t >= r || n >= i || t < 0 || n < 0) {
    return 0;
  } else {
    return s[(n * r + t) * 4 + 3];
  }
};
const o = [new Uint8ClampedArray(4), new Uint8ClampedArray(4), new Uint8ClampedArray(4), new Uint8ClampedArray(4)];
const a = (e, t, n, s) => {
  let {
    _width: o,
    _height: a,
    _colorData: c
  } = e;
  t = i(0, r(t, o - 1));
  n = i(0, r(n, a - 1));
  if (t >= o || n >= a || t < 0 || n < 0) {
    return s.fill(0);
  }
  const l = (n * o + t) * 4;
  const u = c[l + 3] / 255;
  s[0] = c[l] * u;
  s[1] = c[l + 1] * u;
  s[2] = c[l + 2] * u;
  s[3] = c[l + 3];
  return s;
};
const c = (e, t, n, s) => {
  let {
    _width: o,
    _height: a,
    _colorData: c
  } = e;
  t = i(0, r(t, o - 1));
  const l = ((n = i(0, r(n, a - 1))) * o + t) * 4;
  s[0] = c[l];
  s[1] = c[l + 1];
  s[2] = c[l + 2];
  s[3] = c[l + 3];
  return s;
};
class l {
  constructor() {
    this._width = 0;
    this._height = 0;
    this._lazyData = null;
    this._colorData = null;
    this._getColor = a;
    this.colorAtNearest = this.colorAtLinear = (e, t) => t.fill(0);
  }
  update(e) {
    let t;
    let n = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
    if (e instanceof ImageData) {
      t = e;
      this._width = e.width;
      this._height = e.height;
      this._lazyData = null;
      this._colorData = t.data;
    } else {
      this._width = e.width;
      this._height = e.height;
      if (!this._width || !this._height) {
        return;
      }
      this._lazyData = e;
      this._colorData = null;
    }
    this._getColor = n ? c : a;
    delete this.colorAtNearest;
    delete this.colorAtLinear;
  }
  unlazy() {
    if (!this._lazyData) {
      return;
    }
    const e = this._lazyData.width;
    const t = this._lazyData.height;
    if (e && t) {
      const n = l._updateCanvas();
      n.width = e;
      n.height = t;
      const r = n.getContext("2d");
      r.clearRect(0, 0, e, t);
      r.drawImage(this._lazyData, 0, 0, e, t);
      const i = r.getImageData(0, 0, e, t);
      this._colorData = i.data;
    }
    this._lazyData = null;
  }
  colorAtNearest(e, t) {
    return this._getColor(this, Math.floor(e[0] * (this._width - 1)), Math.floor(e[1] * (this._height - 1)), t);
  }
  colorAtLinear(e, t) {
    const n = e[0] * (this._width - 1);
    const r = e[1] * (this._height - 1);
    const i = n % 1;
    const s = r % 1;
    const a = 1 - i;
    const c = 1 - s;
    const l = Math.floor(n);
    const u = Math.floor(r);
    const h = this._getColor(this, l, u, o[0]);
    const d = this._getColor(this, l + 1, u, o[1]);
    const p = this._getColor(this, l, u + 1, o[2]);
    const f = this._getColor(this, l + 1, u + 1, o[3]);
    t[0] = h[0] * a * c + p[0] * a * s + d[0] * i * c + f[0] * i * s;
    t[1] = h[1] * a * c + p[1] * a * s + d[1] * i * c + f[1] * i * s;
    t[2] = h[2] * a * c + p[2] * a * s + d[2] * i * c + f[2] * i * s;
    t[3] = h[3] * a * c + p[3] * a * s + d[3] * i * c + f[3] * i * s;
    return t;
  }
  isTouchingNearest(e) {
    if (this._colorData) {
      return s(this, Math.floor(e[0] * (this._width - 1)), Math.floor(e[1] * (this._height - 1))) > 0;
    }
  }
  isTouchingLinear(e) {
    if (!this._colorData) {
      return;
    }
    const t = Math.floor(e[0] * (this._width - 1));
    const n = Math.floor(e[1] * (this._height - 1));
    return s(this, t, n) > 0 || s(this, t + 1, n) > 0 || s(this, t, n + 1) > 0 || s(this, t + 1, n + 1) > 0;
  }
  static _updateCanvas() {
    if (n === undefined) {
      n = document.createElement("canvas");
    }
    return n;
  }
}
module.exports = l;