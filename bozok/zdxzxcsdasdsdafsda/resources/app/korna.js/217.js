const {
  motionVector: r,
  scratchAtan2: i
} = require("./218.js");
const s = 480;
const o = 10 / 3;
module.exports = class {
  constructor() {
    this.frameNumber = 0;
    this.lastAnalyzedFrame = 0;
    this.motionAmount = 0;
    this.motionDirection = 0;
    this.curr = null;
    this.prev = null;
    this._arrays = new ArrayBuffer(345600);
    this._curr = new Uint8ClampedArray(this._arrays, 0, 172800);
    this._prev = new Uint8ClampedArray(this._arrays, 172800, 172800);
  }
  reset() {
    this.frameNumber = 0;
    this.lastAnalyzedFrame = 0;
    this.motionAmount = this.motionDirection = 0;
    this.prev = this.curr = null;
  }
  addFrame(e) {
    this.frameNumber++;
    this.prev = this.curr;
    this.curr = new Uint32Array(e.buffer.slice(0));
    const t = this._prev;
    this._prev = this._curr;
    this._curr = t;
    for (let e = 0; e < this.curr.length; e++) {
      this._curr[e] = this.curr[e] & 255;
    }
  }
  analyzeFrame() {
    if (!this.curr || !this.prev) {
      this.motionAmount = this.motionDirection = -1;
      return;
    }
    if (this.lastAnalyzedFrame === this.frameNumber) {
      return;
    }
    this.lastAnalyzedFrame = this.frameNumber;
    const {
      _curr: e,
      _prev: t
    } = this;
    const n = 17;
    let o = 0;
    let a = 0;
    let c = 0;
    for (let i = 9; i < 351; i += n) {
      for (let l = 9; l < 471; l += n) {
        let u = 0;
        let h = 0;
        let d = 0;
        let p = 0;
        let f = 0;
        let m = (i - 8) * s + l - 8;
        let g = m + n;
        const b = (i + 8) * s + l + 8;
        for (; m <= b; m += 463, g += s) {
          for (; m <= g; m += 1) {
            const n = t[m] - e[m];
            const r = e[m - 1] - e[m + 1];
            const i = e[m - s] - e[m + s];
            u += r * r;
            h += r * i;
            d += i * i;
            f += r * n;
            p += i * n;
          }
        }
        const {
          u: y,
          v: E
        } = r(u, h, d, f, p);
        if (y > -17 && y < n && E > -17 && E < n) {
          o += y;
          a += E;
          c++;
        }
      }
    }
    o /= c;
    a /= c;
    this.motionAmount = Math.round(Math.hypot(o, a) * 100);
    if (this.motionAmount > 10) {
      this.motionDirection = i(a, o);
    }
  }
  getLocalMotion(e, t) {
    if (this.curr && this.prev) {
      if (t.motionFrameNumber !== this.frameNumber) {
        const {
          _prev: n,
          _curr: a
        } = this;
        e.updateCPURenderAttributes();
        const c = e.getFastBounds();
        const l = Math.max(Math.floor(c.left + 240), 1);
        const u = Math.min(Math.floor(c.right + 240), 479);
        const h = Math.max(Math.floor(180 - c.top), 1);
        const d = Math.min(Math.floor(180 - c.bottom), 359);
        let p = 0;
        let f = 0;
        let m = 0;
        let g = 0;
        let b = 0;
        let y = 0;
        const E = [0, 0, 0];
        for (let t = h; t < d; t++) {
          for (let r = l; r < u; r++) {
            E[0] = r - 240;
            E[1] = 180 - t;
            if (e.isTouching(E)) {
              const e = t * s + r;
              const i = n[e] - a[e];
              const o = a[e - 1] - a[e + 1];
              const c = a[e - s] - a[e + s];
              p += o * o;
              f += o * c;
              m += c * c;
              b += o * i;
              g += c * i;
              y++;
            }
          }
        }
        let {
          u: T,
          v: v
        } = r(p, f, m, b, g);
        let A = 0;
        if (y) {
          A = y;
          y /= 256;
          T /= y;
          v /= y;
        }
        t.motionAmount = Math.round(A * 0.02 * Math.hypot(T, v));
        if (t.motionAmount > 100) {
          t.motionAmount = 100;
        }
        if (t.motionAmount > o) {
          t.motionDirection = i(v, T);
        }
        t.motionFrameNumber = this.frameNumber;
      }
    } else {
      t.motionAmount = t.motionDirection = -1;
    }
  }
};