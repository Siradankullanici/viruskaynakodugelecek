exports.getScripts = function () {
  throw new Error("blocks.js has not initialized BlocksRuntimeCache");
};
exports._RuntimeScriptCache = class {
  constructor(e, t) {
    this.container = e;
    this.blockId = t;
    const n = e.getBlock(t);
    const r = e.getFields(n);
    this.fieldsOfInputs = Object.assign({}, r);
    if (Object.keys(r).length === 0) {
      const t = e.getInputs(n);
      for (const n in t) {
        if (!Object.prototype.hasOwnProperty.call(t, n)) {
          continue;
        }
        const r = t[n].block;
        const i = e.getBlock(r);
        const s = e.getFields(i);
        Object.assign(this.fieldsOfInputs, s);
      }
    }
    for (const e in this.fieldsOfInputs) {
      const t = this.fieldsOfInputs[e] = Object.assign({}, this.fieldsOfInputs[e]);
      if (t.value.toUpperCase) {
        t.value = t.value.toUpperCase();
      }
    }
  }
};
require("./17.js");