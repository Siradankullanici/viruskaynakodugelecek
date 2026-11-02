const {
  IRGenerator: r
} = require("./45.js");
const {
  IROptimizer: i
} = require("./190.js");
const s = require("./68.js");
module.exports = e => {
  const t = new r(e).generate();
  new i(t).optimize();
  const n = {};
  const o = e.target;
  const a = e => {
    if (e.cachedCompileResult) {
      return e.cachedCompileResult;
    }
    const n = new s(e, t, o).compile();
    e.cachedCompileResult = n;
    return n;
  };
  const c = a(t.entry);
  for (const e of Object.keys(t.procedures)) {
    const r = a(t.procedures[e]);
    n[e] = r;
  }
  return {
    startingFunction: c,
    yields: t.entry.yields,
    procedures: n,
    executableHat: t.entry.executableHat
  };
};