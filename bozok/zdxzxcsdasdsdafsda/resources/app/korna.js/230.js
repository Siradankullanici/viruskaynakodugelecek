const n = e => {
  if (!e.startsWith("http:") && !e.startsWith("https:") && !e.startsWith("data:") && !e.startsWith("blob:")) {
    throw new Error(`Unsupported URL: ${e}`);
  }
};
const r = {
  importModule: e => {
    n(e);
    return import(e);
  },
  fetch: async e => {
    n(e);
    const t = await fetch(e);
    if (!t.ok) {
      throw new Error(`HTTP ${t.status} fetching ${e}`);
    }
    return t;
  },
  dataURL: async e => {
    const t = await r.fetch(e);
    const n = await t.blob();
    return new Promise((e, t) => {
      const r = new FileReader();
      r.onload = () => e(r.result);
      r.onerror = () => t(r.error);
      r.readAsDataURL(n);
    });
  },
  blob: async e => (await r.fetch(e)).blob(),
  evalAndReturn: async (e, t) => {
    const n = await r.fetch(e);
    const i = await n.text();
    const s = `${i}
return ${t};`;
    return new Function(s)();
  }
};
module.exports = r;