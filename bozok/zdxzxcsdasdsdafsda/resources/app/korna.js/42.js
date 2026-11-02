var t = require("./8.js");
let n = t.fetch;
module.exports = {
  fetchWithTimeout: (e, t, r) => {
    let i = null;
    const s = window.AbortController ? new window.AbortController() : null;
    const o = s ? s.signal : null;
    return Promise.race([n(e, Object.assign({
      signal: o
    }, t)).then(e => {
      clearTimeout(i);
      return e;
    }, e => {
      clearTimeout(i);
      throw e;
    }), new Promise((e, t) => {
      i = setTimeout(() => {
        if (s) {
          s.abort();
        }
        t(new Error(`Fetch timed out after ${r} ms`));
      }, r);
    })]);
  },
  setFetch: e => {
    n = e;
  }
};