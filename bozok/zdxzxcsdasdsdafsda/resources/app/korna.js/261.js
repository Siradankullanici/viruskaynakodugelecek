const n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#%()*+,-./:;=?@[]^_`{|}~";
const r = e => {
  let t = "";
  while (e >= 0) {
    t = n[e % 77] + t;
    e = Math.floor(e / 77) - 1;
  }
  return t;
};
class i {
  constructor() {
    this.generatedIds = new Map();
    this.references = new Map();
    this.skippedIds = new Set();
    this.skippedIds.add("of");
  }
  skip(e) {
    this.skippedIds.add(e);
  }
  addReference(e) {
    const t = this.references.get(e) || 0;
    this.references.set(e, t + 1);
  }
  generateNewIds() {
    const e = Array.from(this.references.entries());
    e.sort((e, t) => t[1] - e[1]);
    let t = 0;
    for (const n of e) {
      const e = n[0];
      let i = r(t);
      while (this.skippedIds.has(i)) {
        t++;
        i = r(t);
      }
      this.generatedIds.set(e, i);
      t++;
    }
  }
  getNewId(e) {
    if (this.generatedIds.has(e)) {
      return this.generatedIds.get(e);
    } else {
      return e;
    }
  }
}
module.exports = e => {
  const t = new i();
  for (const n of e.targets) {
    for (const e of Object.keys(n.variables)) {
      t.skip(e);
    }
    for (const e of Object.keys(n.lists)) {
      t.skip(e);
    }
    for (const e of Object.keys(n.broadcasts)) {
      t.skip(e);
    }
    for (const e of Object.keys(n.blocks)) {
      const r = n.blocks[e];
      t.addReference(e);
      if (!Array.isArray(r)) {
        if (r.parent) {
          t.addReference(r.parent);
        }
        if (r.next) {
          t.addReference(r.next);
        }
        if (r.comment) {
          t.addReference(r.comment);
        }
        for (const e of Object.values(r.inputs)) {
          for (let n = 1; n < e.length; n++) {
            const r = e[n];
            if (typeof r == "string") {
              t.addReference(r);
            }
          }
        }
      }
    }
    for (const e of Object.keys(n.comments)) {
      const r = n.comments[e];
      t.addReference(e);
      if (r.blockId) {
        t.addReference(r.blockId);
      }
    }
  }
  t.generateNewIds();
  for (const n of e.targets) {
    const e = {};
    const r = {};
    for (const r of Object.keys(n.blocks)) {
      const i = n.blocks[r];
      e[t.getNewId(r)] = i;
      if (!Array.isArray(i)) {
        i.parent &&= t.getNewId(i.parent);
        i.next &&= t.getNewId(i.next);
        i.comment &&= t.getNewId(i.comment);
        for (const e of Object.values(i.inputs)) {
          for (let n = 1; n < e.length; n++) {
            const r = e[n];
            if (typeof r == "string") {
              e[n] = t.getNewId(r);
            }
          }
        }
      }
    }
    for (const e of Object.keys(n.comments)) {
      const i = n.comments[e];
      r[t.getNewId(e)] = i;
      i.blockId &&= t.getNewId(i.blockId);
    }
    n.blocks = e;
    n.comments = r;
  }
};