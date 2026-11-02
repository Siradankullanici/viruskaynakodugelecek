const r = require("./51.js");
const i = require("./52.js");
const s = require("./76.js");
const o = require("./77.js");
const a = require("./238.js");
const c = require("./241.js");
const l = (e, t) => {
  const n = [];
  const r = e => {
    if ((e.localName === t || t === undefined) && !!e.getAttribute) {
      n.push(e);
    }
    for (let t = 0; t < e.childNodes.length; t++) {
      r(e.childNodes[t]);
    }
  };
  r(e);
  return n;
};
const u = e => {
  const t = c();
  const n = document.createElement("span");
  const i = e.outerHTML;
  const s = r.sanitize(i, {
    USE_PROFILES: {
      svg: true
    },
    FORBID_TAGS: ["a", "audio", "canvas", "video"],
    ADD_DATA_URI_TAGS: ["image"]
  });
  let o;
  let a;
  try {
    n.innerHTML = s;
    t.appendChild(n);
    o = n.children[0].getBBox();
  } finally {
    t.removeChild(n);
  }
  a = o.width === 0 || o.height === 0 ? 0 : (e => {
    let t = 0;
    const n = e => {
      if (e.getAttribute) {
        if (e.getAttribute("stroke")) {
          t = Math.max(t, 1);
        }
        if (e.getAttribute("stroke-width")) {
          t = Math.max(t, Number(e.getAttribute("stroke-width")) || 0);
        }
      }
      for (let t = 0; t < e.childNodes.length; t++) {
        n(e.childNodes[t]);
      }
    };
    n(e);
    return t;
  })(e) / 2;
  const l = o.width + a * 2;
  const u = o.height + a * 2;
  const h = o.x - a;
  const d = o.y - a;
  e.setAttribute("width", l);
  e.setAttribute("height", u);
  e.setAttribute("viewBox", `${h} ${d} ${l} ${u}`);
};
const h = (e, t) => {
  if (t) {
    (e => {
      const t = l(e, "linearGradient");
      for (const e of t) {
        if (!e.getAttribute("x2")) {
          e.setAttribute("x2", "0");
        }
      }
    })(e);
  }
  a(e, window);
  (e => {
    const t = l(e, "image");
    const n = "image-rendering: optimizespeed; image-rendering: pixelated;";
    for (const e of t) {
      if (e.getAttribute("style")) {
        e.setAttribute("style", `${n} ${e.getAttribute("style")}`);
      } else {
        e.setAttribute("style", n);
      }
    }
  })(e);
  if (t) {
    (e => {
      const t = [];
      const n = e => {
        if (e.localName === "text") {
          t.push(e);
        }
        for (let t = 0; t < e.childNodes.length; t++) {
          n(e.childNodes[t]);
        }
      };
      n(e);
      s(e);
      for (const n of t) {
        n.removeAttribute("x");
        n.removeAttribute("y");
        n.setAttribute("alignment-baseline", "text-before-edge");
        n.setAttribute("xml:space", "preserve");
        if (!n.getAttribute("font-size")) {
          n.setAttribute("font-size", "18");
        }
        let t = n.textContent;
        const r = parseFloat(n.getAttribute("font-size"));
        const s = 2;
        let o = 0;
        let a = 1.2;
        if (n.getAttribute("font-family") === "Handwriting") {
          a = 2;
          o = r * -11 / 22;
        } else if (n.getAttribute("font-family") === "Scratch") {
          a = 0.89;
          o = r * -3 / 22;
        } else if (n.getAttribute("font-family") === "Curly") {
          a = 1.38;
          o = r * -6 / 22;
        } else if (n.getAttribute("font-family") === "Marker") {
          a = 1.45;
          o = r * -6 / 22;
        } else if (n.getAttribute("font-family") === "Sans Serif") {
          a = 1.13;
          o = r * -3 / 22;
        } else if (n.getAttribute("font-family") === "Serif") {
          a = 1.25;
          o = r * -4 / 22;
        }
        if (n.transform.baseVal.numberOfItems === 0) {
          const t = e.createSVGTransform();
          n.transform.baseVal.appendItem(t);
        }
        const c = n.transform.baseVal.getItem(0).matrix;
        c.e += c.a * s + c.c * o;
        c.f += c.b * s + c.d * o;
        if (t && n.childElementCount === 0) {
          n.textContent = "";
          const e = t.split("\n");
          t = "";
          for (const t of e) {
            const e = i.create("tspan");
            e.setAttribute("x", "0");
            e.setAttribute("style", "white-space: pre");
            e.setAttribute("dy", `${a}em`);
            e.textContent = t || " ";
            n.appendChild(e);
          }
        }
      }
    })(e);
    u(e);
    (e => {
      const t = l(e);
      for (const e of t) {
        if (!e.style) {
          continue;
        }
        const t = e.style.stroke || e.getAttribute("stroke");
        if (t && t.match(/^url\(#.*\)$/)) {
          e.style["stroke-linejoin"] = "round";
          e.style["stroke-linecap"] = "round";
        }
      }
    })(e);
  } else if (e.getAttribute("viewBox")) {
    if (!e.getAttribute("width") || !e.getAttribute("height")) {
      e.setAttribute("width", e.viewBox.baseVal.width);
      e.setAttribute("height", e.viewBox.baseVal.height);
    }
  } else {
    u(e);
  }
};
module.exports = (e, t) => {
  const n = new DOMParser();
  e = o(e);
  const r = n.parseFromString(e, "text/xml");
  if (r.childNodes.length < 1 || r.documentElement.localName !== "svg") {
    throw new Error("Document does not appear to be SVG.");
  }
  const i = r.documentElement;
  h(i, t);
  return i;
};