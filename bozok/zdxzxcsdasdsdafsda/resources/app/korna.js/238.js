const r = require("./239.js");
const i = require("./52.js");
const s = require("./240.js");
const o = function (e) {
  return Math.round(e * 10000) / 10000;
};
const a = function (e) {
  let t = r.identity();
  const n = e.attributes && e.attributes.transform && e.attributes.transform.value;
  if (!n) {
    return t;
  }
  const i = n.split(/\)\s*/g);
  for (const e of i) {
    if (!e) {
      break;
    }
    const n = e.split(/\(\s*/);
    const i = n[0].trim();
    const o = n[1].split(/[\s,]+/g);
    for (let e = 0; e < o.length; e++) {
      o[e] = parseFloat(o[e]);
    }
    switch (i) {
      case "matrix":
        t = r.compose(t, {
          a: o[0],
          b: o[1],
          c: o[2],
          d: o[3],
          e: o[4],
          f: o[5]
        });
        break;
      case "rotate":
        t = r.compose(t, r.rotateDEG(o[0], o[1] || 0, o[2] || 0));
        break;
      case "translate":
        t = r.compose(t, r.translate(o[0], o[1] || 0));
        break;
      case "scale":
        t = r.compose(t, r.scale(o[0], o[1] || o[0]));
        break;
      case "skewX":
        t = r.compose(t, r.skewDEG(o[0], 0));
        break;
      case "skewY":
        t = r.compose(t, r.skewDEG(0, o[0]));
        break;
      default:
        s.error(`Couldn't parse: ${i}`);
    }
  }
  return t;
};
const c = function (e) {
  const t = e.a;
  const n = e.b;
  const r = e.c;
  const i = e.d;
  const s = t * i - n * r;
  if (t !== 0 || n !== 0) {
    const e = Math.sqrt(t * t + n * n);
    return {
      x: e,
      y: s / e
    };
  }
  if (r !== 0 || i !== 0) {
    const e = Math.sqrt(r * r + i * i);
    return {
      x: s / e,
      y: e
    };
  }
  return {
    x: 0,
    y: 0
  };
};
const l = function (e, t, n, r) {
  n = -n * Math.PI / 180;
  const i = r.a;
  const s = -r.c;
  const o = -r.b;
  const a = r.d;
  const c = i * a - s * o;
  if (c === 0) {
    return null;
  }
  const l = Math.sin(n);
  const u = Math.cos(n);
  const h = Math.sin(n * 2);
  const d = u * u / e / e + l * l / t / t;
  const p = h / e / e - h / t / t;
  const f = l * l / e / e + u * u / t / t;
  const m = d * a * a - p * a * o + f * o * o;
  const g = d * -2 * s * a + p * i * a + p * s * o - f * 2 * i * o;
  const b = d * s * s - p * i * s + f * i * i;
  const y = Math.sqrt(2) * Math.sqrt((m + b - Math.sqrt(m * m + g * g - m * 2 * b + b * b)) / (-g * g + m * 4 * b));
  const E = 1 / Math.sqrt(m + b - 1 / y / y);
  let T = (m - 1 / y / y) / (1 / E / E - 1 / y / y);
  if (T < 0 && Math.abs(T) < 1e-8) {
    T = 0;
  }
  T = Math.sqrt(T);
  if (Math.abs(1 - T) < 1e-8) {
    T = 1;
  }
  let v = Math.asin(T);
  T = g / (1 / y / y - 1 / E / E);
  const A = -v;
  if (Math.abs(Math.sin(A * 2) - T) < Math.abs(Math.sin(v * 2) - T)) {
    v = A;
  }
  return {
    radiusX: y * c,
    radiusY: E * c,
    rotation: -v * 180 / Math.PI
  };
};
const u = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use"];
const h = ["a", "defs", "g", "marker", "glyph", "missing-glyph", "pattern", "svg", "switch", "symbol"];
const d = function (e, t) {
  return Math.sqrt((e * e + t * t) / 2);
};
const p = function (e, t, n, s) {
  const a = function (e, t, r, s, o, a) {
    let c;
    let l = i.get(e, t);
    if (l === null) {
      if (a) {
        c = a;
        if (/%\s*$/.test(c)) {
          l = a;
          c = parseFloat(l);
        }
      } else {
        c = s ? null : r ? "" : 0;
      }
    } else {
      c = r ? l : parseFloat(l);
    }
    if (/%\s*$/.test(l)) {
      return c / 100 * (o ? 1 : n[/x|^width/.test(t) ? "width" : "height"]);
    }
    return c;
  };
  const l = function (e, t, n, r, i, s, o) {
    t = a(e, t || "x", false, r, i, s);
    n = a(e, n || "y", false, r, i, o);
    if (!r || t !== null && n !== null) {
      return {
        x: t,
        y: n
      };
    } else {
      return null;
    }
  };
  let u = t.getElementsByTagName("defs");
  if (u.length === 0) {
    u = i.create("defs");
    t.appendChild(u);
  } else {
    u = u[0];
  }
  const h = t.getElementById(e);
  if (!h) {
    return;
  }
  const p = h.tagName.toLowerCase() === "radialgradient";
  const f = t.getElementById(e).cloneNode(true);
  let m = r.toString(s);
  m = m.substring(8, m.length - 1);
  const g = `${e}-${m}`;
  f.setAttribute("id", g);
  if (t.getElementById(g)) {
    return `url(#${g})`;
  }
  const b = a(f, "gradientUnits", true) !== "userSpaceOnUse";
  let y;
  let E;
  let T;
  let v;
  if (p) {
    y = l(f, "cx", "cy", false, b, "50%", "50%");
    T = a(f, "r", false, false, b, "50%");
    v = l(f, "fx", "fy", true, b);
  } else {
    y = l(f, "x1", "y1", false, b);
    E = l(f, "x2", "y2", false, b, "1");
    if (y.x === E.x && y.y === E.y) {
      const e = f.getElementsByTagName("stop");
      if (e.length && e[e.length - 1].attributes && e[e.length - 1].attributes["stop-color"]) {
        return e[e.length - 1].attributes["stop-color"].value;
      } else {
        return null;
      }
    }
  }
  if (b) {
    const e = r.compose(r.translate(n.x, n.y), r.scale(n.width, n.height));
    y = r.applyToPoint(e, y);
    E &&= r.applyToPoint(e, E);
    T &&= d(n.width, n.height) * T;
    v &&= r.applyToPoint(e, v);
  }
  if (p) {
    y = r.applyToPoint(s, y);
    const e = c(s);
    T = d(e.x, e.y) * T;
    v &&= r.applyToPoint(s, v);
  } else {
    const e = (e, t) => e.x * t.x + e.y * t.y;
    const t = (e, t) => ({
      x: e * t.x,
      y: e * t.y
    });
    const n = (e, t) => ({
      x: e.x + t.x,
      y: e.y + t.y
    });
    const i = (e, t) => ({
      x: e.x - t.x,
      y: e.y - t.y
    });
    let o = Math.abs(y.x - E.x) < 1e-8 ? n(y, {
      x: 1,
      y: (y.x - E.x) / (E.y - y.y)
    }) : n(y, {
      x: (E.y - y.y) / (y.x - E.x),
      y: 1
    });
    o = r.applyToPoint(s, o);
    y = r.applyToPoint(s, y);
    E = r.applyToPoint(s, E);
    const a = i(o, y);
    const c = i(E, y);
    const l = Math.abs(a.x) < 1e-8 ? {
      x: 1,
      y: -a.x / a.y
    } : {
      x: -a.y / a.x,
      y: 1
    };
    const u = t(e(c, l) / e(l, l), l);
    E = {
      x: y.x + u.x,
      y: y.y + u.y
    };
  }
  if (p) {
    f.setAttribute("cx", o(y.x));
    f.setAttribute("cy", o(y.y));
    f.setAttribute("r", o(T));
    if (v) {
      f.setAttribute("fx", o(v.x));
      f.setAttribute("fy", o(v.y));
    }
  } else {
    f.setAttribute("x1", o(y.x));
    f.setAttribute("y1", o(y.y));
    f.setAttribute("x2", o(E.x));
    f.setAttribute("y2", o(E.y));
  }
  f.setAttribute("gradientUnits", "userSpaceOnUse");
  u.appendChild(f);
  return `url(#${g})`;
};
const f = (e, t) => {
  const n = e && e.match(/\((?:["'#]*)([^"')]+)/);
  const r = n && n[1];
  if (r && t) {
    return r.replace(`${t.location.href.split("#")[0]}#`, "");
  } else {
    return r;
  }
};
const m = Object.create(null);
let g = null;
let b = null;
let y = null;
module.exports = function (e, t, n) {
  const s = r.identity();
  const E = (s, T, v, A, w) => {
    if (function (e) {
      return e.tagName && h.includes(e.tagName.toLowerCase());
    }(s)) {
      if (s.attributes["stroke-width"]) {
        v = s.attributes["stroke-width"].value;
      }
      if (s.attributes) {
        if (s.attributes.fill) {
          A = s.attributes.fill.value;
        }
        if (s.attributes.stroke) {
          w = s.attributes.stroke.value;
        }
      }
      for (let e = 0; e < s.childNodes.length; e++) {
        E(s.childNodes[e], r.compose(T, a(s)), v, A, w);
      }
      s.removeAttribute("transform");
      s.removeAttribute("stroke-width");
      s.removeAttribute("fill");
      s.removeAttribute("stroke");
    } else if (function (e, t) {
      return !!e.attributes && (t = e.attributes["stroke-width"] ? Number(e.attributes["stroke-width"].value) : Number(t)) && e.tagName && e.tagName.toLowerCase() === "path" && e.attributes.d && e.attributes.d.value;
    }(s, v)) {
      if (s.attributes["stroke-width"]) {
        v = s.attributes["stroke-width"].value;
      }
      if (s.attributes.fill) {
        A = s.attributes.fill.value;
      }
      if (s.attributes.stroke) {
        w = s.attributes.stroke.value;
      }
      T = r.compose(T, a(s));
      if (r.toString(T) === r.toString(r.identity())) {
        s.removeAttribute("transform");
        s.setAttribute("stroke-width", v);
        if (A) {
          s.setAttribute("fill", A);
        }
        if (w) {
          s.setAttribute("stroke", w);
        }
        return;
      }
      const u = f(A, t);
      const h = f(w, t);
      if (u || h) {
        const r = n || ((e, t) => {
          const n = e.attributes.d.value;
          if (Object.prototype.hasOwnProperty.call(m, n)) {
            return m[n];
          }
          if (!g) {
            const e = t.document;
            g = e.createElement("span");
            b = e.createElementNS(i.svg, "svg");
            y = e.createElementNS(i.svg, "path");
            g.className = "scratch-svg-renderer-bbox";
            g.style.visibility = "hidden";
            g.style.position = "absolute";
            g.style.top = "-10000px";
            g.style.left = "-10000px";
            g.ariaHidden = true;
            b.appendChild(y);
            g.appendChild(b);
            document.body.appendChild(g);
          }
          y.setAttribute("d", n);
          const r = b.getBBox();
          m[n] = r;
          return r;
        })(s, t);
        if (u) {
          const t = p(u, e, r, T);
          if (t) {
            A = t;
          }
        }
        if (h) {
          const t = p(h, e, r, T);
          if (t) {
            w = t;
          }
        }
      }
      s.setAttribute("d", function (e, t) {
        if (!t || r.toString(t) === r.toString(r.identity())) {
          return e;
        }
        const n = e && e.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi);
        let i;
        let s;
        let a;
        let u = false;
        let h = {
          x: 0,
          y: 0
        };
        let d = {
          x: 0,
          y: 0
        };
        let p = "";
        const f = function (e, t) {
          let n = +i[e];
          if (u) {
            n += h[t];
          }
          return n;
        };
        const m = function (e) {
          return {
            x: f(e, "x"),
            y: f(e + 1, "y")
          };
        };
        const g = function (e) {
          const n = r.applyToPoint(t, e);
          return `${o(n.x)} ${o(n.y)} `;
        };
        for (let e = 0, r = n && n.length; e < r; e++) {
          const r = n[e];
          const b = r[0];
          const y = b.toLowerCase();
          i = r.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
          const E = i && i.length;
          u = b === y;
          if (s === "z" && !/[mz]/.test(y)) {
            p += `M ${h.x} ${h.y} `;
          }
          switch (y) {
            case "m":
            case "l":
              {
                let e = y === "m";
                for (let t = 0; t < E; t += 2) {
                  p += e ? "M " : "L ";
                  h = m(t);
                  p += g(h);
                  if (e) {
                    d = h;
                    e = false;
                  }
                }
                a = h;
                break;
              }
            case "h":
            case "v":
              {
                const e = y === "h" ? "x" : "y";
                h = {
                  x: h.x,
                  y: h.y
                };
                for (let t = 0; t < E; t++) {
                  h[e] = f(t, e);
                  p += `L ${g(h)}`;
                }
                a = h;
                break;
              }
            case "c":
              for (let e = 0; e < E; e += 6) {
                const t = m(e);
                a = m(e + 2);
                h = m(e + 4);
                p += `C ${g(t)}${g(a)}${g(h)}`;
              }
              break;
            case "s":
              for (let e = 0; e < E; e += 4) {
                const t = /[cs]/.test(s) ? {
                  x: h.x * 2 - a.x,
                  y: h.y * 2 - a.y
                } : h;
                a = m(e);
                h = m(e + 2);
                p += `C ${g(t)}${g(a)}${g(h)}`;
                s = y;
              }
              break;
            case "q":
              for (let e = 0; e < E; e += 4) {
                a = m(e);
                h = m(e + 2);
                p += `Q ${g(a)}${g(h)}`;
              }
              break;
            case "t":
              for (let e = 0; e < E; e += 2) {
                a = /[qt]/.test(s) ? {
                  x: h.x * 2 - a.x,
                  y: h.y * 2 - a.y
                } : h;
                h = m(e);
                p += `Q ${g(a)}${g(h)}`;
                s = y;
              }
              break;
            case "a":
              for (let e = 0; e < E; e += 7) {
                h = m(e + 5);
                const n = +i[e];
                const r = +i[e + 1];
                const s = +i[e + 2];
                const a = +i[e + 3];
                let u = +i[e + 4];
                const d = l(n, r, s, t);
                const f = c(t);
                if (d) {
                  if (f.x > 0 && f.y < 0 || f.x < 0 && f.y > 0) {
                    u ^= 1;
                  }
                  p += `A ${o(Math.abs(d.radiusX))} ${o(Math.abs(d.radiusY))} ${o(d.rotation)} ${a} ${u} ${g(h)}`;
                } else {
                  p += `L ${g(h)}`;
                }
              }
              break;
            case "z":
              p += "Z ";
              h = d;
          }
          s = y;
        }
        return p;
      }(s.attributes.d.value, T));
      s.removeAttribute("transform");
      const E = c(T);
      s.setAttribute("stroke-width", d(E.x, E.y) * v);
      if (A) {
        s.setAttribute("fill", A);
      }
      if (w) {
        s.setAttribute("stroke", w);
      }
    } else if (function (e) {
      return e.tagName && u.includes(e.tagName.toLowerCase());
    }(s)) {
      if (v && !s.attributes["stroke-width"]) {
        s.setAttribute("stroke-width", v);
      }
      if (A && !s.attributes.fill) {
        s.setAttribute("fill", A);
      }
      if (w && !s.attributes.stroke) {
        s.setAttribute("stroke", w);
      }
      T = r.compose(T, a(s));
      if (r.toString(T) === r.toString(r.identity())) {
        s.removeAttribute("transform");
      } else {
        s.setAttribute("transform", r.toString(T));
      }
    }
  };
  E(e, s, 1);
};