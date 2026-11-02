var t = require("./8.js");
const r = require("./228.js");
const i = require("./231.js");
const s = require("./73.js");
const o = require("./232.js");
const a = require("./233.js");
const c = e => {
  try {
    return new URL(e, location.href);
  } catch (e) {
    return null;
  }
};
const l = e => new Promise(n => {
  const s = [];
  const l = Object.assign({}, t.Scratch || {}, r);
  l.extensions = {
    unsandboxed: true,
    register: e => {
      s.push(e);
      n(s);
    }
  };
  l.vm = e;
  l.renderer = e.runtime.renderer;
  l.canFetch = async t => {
    const n = c(t);
    return !!n && (n.protocol === "blob:" || n.protocol === "data:" || e.securityManager.canFetch(n.href));
  };
  l.canOpenWindow = async t => {
    const n = c(t);
    return !!n && n.protocol !== "javascript:" && e.securityManager.canOpenWindow(n.href);
  };
  l.canRedirect = async t => {
    const n = c(t);
    return !!n && n.protocol !== "javascript:" && e.securityManager.canRedirect(n.href);
  };
  l.canRecordAudio = async () => e.securityManager.canRecordAudio();
  l.canRecordVideo = async () => e.securityManager.canRecordVideo();
  l.canReadClipboard = async () => e.securityManager.canReadClipboard();
  l.canNotify = async () => e.securityManager.canNotify();
  l.canGeolocate = async () => e.securityManager.canGeolocate();
  l.canEmbed = async t => {
    const n = c(t);
    return !!n && n.protocol !== "javascript:" && e.securityManager.canEmbed(n.href);
  };
  l.canDownload = async (t, n) => {
    const r = c(t);
    return !!r && r.protocol !== "javascript:" && e.securityManager.canDownload(t, n);
  };
  l.fetch = async (e, t) => {
    const n = e instanceof Request ? e.url : e;
    const r = a(e);
    if (r) {
      return r;
    }
    if (!(await l.canFetch(n))) {
      throw new Error(`Permission to fetch ${n} rejected.`);
    }
    return fetch(e, t);
  };
  l.openWindow = async (e, t) => {
    if (!(await l.canOpenWindow(e))) {
      throw new Error(`Permission to open tab ${e} rejected.`);
    }
    const n = "noreferrer";
    t = t ? `${n},${t}` : n;
    return window.open(e, "_blank", t);
  };
  l.redirect = async e => {
    if (!(await l.canRedirect(e))) {
      throw new Error(`Permission to redirect to ${e} rejected.`);
    }
    location.href = e;
  };
  l.download = async (e, t) => {
    if (!(await l.canDownload(e, t))) {
      throw new Error(`Permission to download ${t} rejected.`);
    }
    const n = document.createElement("a");
    n.href = e;
    n.download = t;
    document.body.appendChild(n);
    n.click();
    n.remove();
  };
  l.translate = o(e);
  t.Scratch = l;
  t.ScratchExtensions = i(l);
  e.emit("CREATE_UNSANDBOXED_EXTENSION_API", l);
});
const u = new s((e, n) => new Promise((t, r) => {
  l(n).then(t);
  const i = document.createElement("script");
  i.onerror = () => {
    r(new Error(`Error in unsandboxed script ${e}. Check the console for more information.`));
  };
  i.src = e;
  document.body.appendChild(i);
}).then(e => {
  t.Scratch.extensions.register = () => {
    throw new Error("Too late to register new extensions.");
  };
  return e;
}), 1);
module.exports = {
  setupUnsandboxedExtensionAPI: l,
  load: (e, t) => u.do(e, t)
};