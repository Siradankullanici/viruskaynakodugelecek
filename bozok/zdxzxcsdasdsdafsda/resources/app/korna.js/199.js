const r = require("./24.js");
class i {
  constructor() {
    this.map = new Map();
    this.dirty = false;
  }
  get(e) {
    return this.map.get(e);
  }
  has(e) {
    return this.map.has(e);
  }
  set(e, t) {
    if (this.map.has(e)) {
      if (this.map.get(e).merge(t)) {
        this.dirty = true;
      }
    } else {
      this.map.set(e, t instanceof r ? t : new r(t));
      this.dirty = true;
    }
  }
  delete(e) {
    if (this.map.has(e)) {
      this.map.delete(e);
      this.dirty = true;
    }
  }
  filter(e) {
    for (const t of Array.from(this.map.keys())) {
      if (!e(this.map.get(t))) {
        this.map.delete(t);
        this.dirty = true;
      }
    }
  }
  empty() {
    return this.map.size === 0;
  }
  get size() {
    return this.map.size;
  }
  values() {
    return Array.from(this.map.values());
  }
  valueSeq() {
    return this.values();
  }
  shallowClone() {
    const e = new i();
    e.map = this.map;
    return e;
  }
}
module.exports = i;