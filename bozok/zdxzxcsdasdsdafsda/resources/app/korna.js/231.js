const r = require("./3.js");
const i = require("./2.js");
const {
  argumentIndexToId: s,
  generateExtensionId: o
} = require("./72.js");
const a = e => {
  if (e === "" || e === " " || e === "w") {
    return {
      type: i.COMMAND,
      async: e === "w"
    };
  }
  if (e === "r" || e === "R") {
    return {
      type: i.REPORTER,
      async: e === "R"
    };
  }
  if (e === "b") {
    return {
      type: i.BOOLEAN,
      async: false
    };
  }
  if (e === "h") {
    return {
      type: i.HAT,
      async: false
    };
  }
  throw new Error(`Unknown ScratchX block type: ${e}`);
};
const c = (e, t) => {
  const n = {};
  const i = typeof (s = t) == "string" || typeof s == "number" || typeof s == "boolean";
  var s;
  if (i && e !== "b") {
    n.defaultValue = t;
  }
  if (e === "s") {
    n.type = r.STRING;
    if (!i) {
      n.defaultValue = "";
    }
  } else if (e === "n") {
    n.type = r.NUMBER;
    if (!i) {
      n.defaultValue = 0;
    }
  } else if (e[0] === "m") {
    n.type = r.STRING;
    const t = e.split(/\.|:/)[1];
    n.menu = t;
  } else {
    if (e !== "b") {
      throw new Error(`Unknown ScratchX argument type: ${e}`);
    }
    n.type = r.BOOLEAN;
  }
  return n;
};
const l = (e, t, n) => r => {
  const i = [];
  for (let e = 0; e < t; e++) {
    i.push(r[s(e)]);
  }
  if (n) {
    return new Promise(t => {
      e(...i, t);
    });
  } else {
    return e(...i);
  }
};
const u = new Map();
module.exports = e => ({
  register: (t, n, r) => {
    const i = ((e, t, n) => {
      const r = {
        id: o(e),
        name: t.displayName || e,
        blocks: [],
        color1: "#4a4a5e",
        color2: "#31323f",
        color3: "#191a21"
      };
      const i = {
        getInfo: () => r,
        _getStatus: n._getStatus
      };
      if (t.url) {
        r.docsURI = t.url;
      }
      for (const e of t.blocks) {
        if (e.length === 1) {
          r.blocks.push("---");
          continue;
        }
        const t = e[0];
        const o = e[1];
        const u = e[2];
        const h = e.slice(3);
        let d = "";
        const p = [];
        const f = o.split(/%([\w.:]+)/g);
        for (let e = 0; e < f.length; e++) {
          const t = f[e];
          if (e % 2 == 1) {
            c(t);
            const n = Math.floor(e / 2).toString();
            const r = h[n];
            const i = s(n);
            p[i] = c(t, r);
            d += `[${i}]`;
          } else {
            d += t;
          }
        }
        const m = a(t);
        const g = {
          opcode: u,
          blockType: m.type,
          text: d,
          arguments: p
        };
        r.blocks.push(g);
        const b = n[u];
        const y = p.length;
        i[u] = l(b, y, m.async);
      }
      const u = t.menus;
      if (u) {
        const e = {};
        for (const t of Object.keys(u) || {}) {
          const n = {
            items: u[t]
          };
          e[t] = n;
        }
        r.menus = e;
      }
      return i;
    })(t, n, r);
    u.set(t, i);
    e.extensions.register(i);
  },
  getStatus: e => {
    const t = u.get(e);
    if (t) {
      return t._getStatus();
    } else {
      return {
        status: 0,
        msg: "does not exist"
      };
    }
  }
});