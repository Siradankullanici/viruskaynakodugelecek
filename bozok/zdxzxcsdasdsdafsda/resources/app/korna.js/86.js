class n {
  constructor() {
    this.left = -Infinity;
    this.right = Infinity;
    this.bottom = -Infinity;
    this.top = Infinity;
  }
  initFromBounds(e, t, n, r) {
    this.left = e;
    this.right = t;
    this.bottom = n;
    this.top = r;
  }
  initFromPointsAABB(e) {
    this.left = Infinity;
    this.right = -Infinity;
    this.top = -Infinity;
    this.bottom = Infinity;
    for (let t = 0; t < e.length; t++) {
      const n = e[t][0];
      const r = e[t][1];
      if (n < this.left) {
        this.left = n;
      }
      if (n > this.right) {
        this.right = n;
      }
      if (r > this.top) {
        this.top = r;
      }
      if (r < this.bottom) {
        this.bottom = r;
      }
    }
  }
  initFromModelMatrix(e) {
    const t = e[12];
    const n = e[13];
    const r = Math.abs(e[0] * 0.5) + Math.abs(e[4] * 0.5);
    const i = Math.abs(e[1] * 0.5) + Math.abs(e[5] * 0.5);
    this.left = -r + t;
    this.right = r + t;
    this.top = i + n;
    this.bottom = -i + n;
  }
  intersects(e) {
    return this.left <= e.right && e.left <= this.right && this.top >= e.bottom && e.top >= this.bottom;
  }
  contains(e) {
    return e.left > this.left && e.right < this.right && e.top < this.top && e.bottom > this.bottom;
  }
  clamp(e, t, n, r) {
    this.left = Math.max(this.left, e);
    this.right = Math.min(this.right, t);
    this.bottom = Math.max(this.bottom, n);
    this.top = Math.min(this.top, r);
    this.left = Math.min(this.left, t);
    this.right = Math.max(this.right, e);
    this.bottom = Math.min(this.bottom, r);
    this.top = Math.max(this.top, n);
  }
  snapToInt() {
    this.left = Math.floor(this.left);
    this.right = Math.ceil(this.right);
    this.bottom = Math.floor(this.bottom);
    this.top = Math.ceil(this.top);
  }
  static intersect(e, t, r = new n()) {
    r.left = Math.max(e.left, t.left);
    r.right = Math.min(e.right, t.right);
    r.top = Math.min(e.top, t.top);
    r.bottom = Math.max(e.bottom, t.bottom);
    return r;
  }
  static union(e, t, r = new n()) {
    r.left = Math.min(e.left, t.left);
    r.right = Math.max(e.right, t.right);
    r.top = Math.max(e.top, t.top);
    r.bottom = Math.min(e.bottom, t.bottom);
    return r;
  }
  get width() {
    return Math.abs(this.left - this.right);
  }
  get height() {
    return Math.abs(this.top - this.bottom);
  }
}
module.exports = n;