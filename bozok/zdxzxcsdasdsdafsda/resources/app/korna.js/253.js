module.exports = e => {
  const t = new TextDecoder().decode(e);
  const n = new DOMParser().parseFromString(t, "image/svg+xml");
  const r = n.documentElement;
  let i = false;
  i = (e => e.getAttribute("width") === "100%" && e.getAttribute("height") === "100%" && (e.removeAttribute("width"), e.removeAttribute("height"), true))(r) || i;
  i = (e => {
    let t = false;
    const n = e => {
      if (e.tagName === "rect") {
        if (e.hasAttribute("rx") && !e.hasAttribute("ry")) {
          t = true;
          e.setAttribute("ry", e.getAttribute("rx"));
        } else if (e.hasAttribute("ry") && !e.hasAttribute("rx")) {
          t = true;
          e.setAttribute("rx", e.getAttribute("ry"));
        }
      }
      const r = e.childNodes;
      if (r) {
        for (let e = 0; e < r.length; e++) {
          n(r[e]);
        }
      }
    };
    n(e);
    return t;
  })(r) || i;
  if (i) {
    const e = new XMLSerializer().serializeToString(n);
    return new TextEncoder().encode(e);
  }
  return e;
};