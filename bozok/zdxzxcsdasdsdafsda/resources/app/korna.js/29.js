const n = typeof document == "undefined";
const r = n ? "[0m" : "";
const i = n ? "[90m" : "";
const s = `${n ? "[34m" : ""}debug${r}`;
const o = `${n ? "[36m" : ""}info${r}`;
const a = `${n ? "[33m" : ""}warn${r}`;
const c = `${n ? "[31m" : ""}error${r}`;
const l = (e = "") => {
  const t = t => l(e ? `${e} ${t}` : t);
  const n = e ? [`${i}${e}${r}`] : [];
  t.debug = t.log = console.debug.bind(console, ...n, s);
  t.info = console.log.bind(console, ...n, o);
  t.warn = t.warning = console.warn.bind(console, ...n, a);
  t.error = console.error.bind(console, ...n, c);
  return t;
};
l.enable = l.disable = () => {};
module.exports = l;