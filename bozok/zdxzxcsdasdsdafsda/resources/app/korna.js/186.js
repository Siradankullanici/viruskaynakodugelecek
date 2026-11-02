let n = 0;
const r = {};
const i = typeof window == "object" && window.performance;
class s {
  constructor(e) {
    this.id = -1;
    this.totalTime = 0;
    this.selfTime = 0;
    this.arg = null;
    this.depth = e;
    this.count = 0;
  }
}
class o {
  constructor(e = function () {}) {
    this.records = [];
    this.increments = [];
    this.counters = [];
    this.nullFrame = new s(-1);
    this._stack = [new s(0)];
    this.onFrame = e;
    this.START = 0;
    this.STOP = 1;
  }
  start(e, t) {
    this.records.push(0, e, t, i.now());
  }
  stop() {
    this.records.push(1, i.now());
  }
  increment(e) {
    if (!this.increments[e]) {
      this.increments[e] = new s(-1);
      this.increments[e].id = e;
    }
    this.increments[e].count += 1;
  }
  frame(e, t) {
    for (let n = 0; n < this.counters.length; n++) {
      if (this.counters[n].id === e && this.counters[n].arg === t) {
        return this.counters[n];
      }
    }
    const n = new s(-1);
    n.id = e;
    n.arg = t;
    this.counters.push(n);
    return n;
  }
  reportFrames() {
    const e = this._stack;
    let t = 1;
    for (let n = 0; n < this.records.length;) {
      if (this.records[n] === 0) {
        if (t >= e.length) {
          e.push(new s(t));
        }
        const r = e[t++];
        r.id = this.records[n + 1];
        r.arg = this.records[n + 2];
        r.totalTime = this.records[n + 3];
        r.selfTime = 0;
        n += 4;
      } else {
        if (this.records[n] !== 1) {
          this.records.length = 0;
          throw new Error("Unable to decode Profiler records.");
        }
        {
          const r = this.records[n + 1];
          const i = e[--t];
          i.totalTime = r - i.totalTime;
          i.selfTime += i.totalTime;
          e[t - 1].selfTime -= i.totalTime;
          i.count = 1;
          this.onFrame(i);
          n += 2;
        }
      }
    }
    for (let e = 0; e < this.increments.length; e++) {
      if (this.increments[e] && this.increments[e].count > 0) {
        this.onFrame(this.increments[e]);
        this.increments[e].count = 0;
      }
    }
    for (let e = 0; e < this.counters.length; e++) {
      if (this.counters[e].count > 0) {
        this.onFrame(this.counters[e]);
        this.counters[e].count = 0;
      }
    }
    this.records.length = 0;
  }
  idByName(e) {
    return o.idByName(e);
  }
  nameById(e) {
    return o.nameById(e);
  }
  static idByName(e) {
    if (typeof r[e] != "number") {
      r[e] = n++;
    }
    return r[e];
  }
  static nameById(e) {
    for (const t in r) {
      if (r[t] === e) {
        return t;
      }
    }
    return null;
  }
  static available() {
    return typeof window == "object" && window.performance !== undefined;
  }
}
o.START = 0;
o.STOP = 1;
module.exports = o;