const r = require("./5.js");
module.exports = e => {
  const t = r.namespace();
  const n = (e, n) => {
    if (e && typeof e == "object") ;else {
      if (typeof e != "string") {
        throw new Error("unsupported data type in translate()");
      }
      e = {
        default: e
      };
    }
    return t(e, n);
  };
  const i = e => `_${e}`;
  const s = () => e ? e.getLocale() : typeof navigator != "undefined" ? navigator.language : "en";
  let o = {};
  n.setup = e => {
    if (e) {
      o = e;
    }
    t.setup({
      locale: s(),
      missingTranslation: "ignore",
      generateId: i,
      translations: o
    });
  };
  Object.defineProperty(n, "language", {
    configurable: true,
    enumerable: true,
    get: () => s()
  });
  n.setup({});
  if (e) {
    e.on("LOCALE_CHANGED", () => {
      n.setup(null);
    });
  }
  return n;
};