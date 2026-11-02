const r = require("./64.js");
const i = require("./65.js");
const s = require("./7.js");
const o = function (e, t, n, i) {
  e.attribs.id ||= s();
  const a = {
    id: e.attribs.id,
    opcode: e.attribs.type,
    inputs: {},
    fields: {},
    next: null,
    topLevel: n,
    parent: i,
    shadow: e.name === "shadow",
    x: e.attribs.x,
    y: e.attribs.y
  };
  t[a.id] = a;
  for (let n = 0; n < e.children.length; n++) {
    const i = e.children[n];
    let s = null;
    let c = null;
    for (let e = 0; e < i.children.length; e++) {
      const t = i.children[e];
      if (!t.name) {
        continue;
      }
      const n = t.name.toLowerCase();
      if (n === "block") {
        s = t;
      } else if (n === "shadow") {
        c = t;
      }
    }
    if (!s && c) {
      s = c;
    }
    switch (i.name.toLowerCase()) {
      case "field":
        {
          const e = i.attribs.name;
          const t = i.attribs.id;
          let n = "";
          n = i.children.length > 0 && i.children[0].data ? i.children[0].data : "";
          a.fields[e] = {
            name: e,
            id: t,
            value: n
          };
          const r = i.attribs.variabletype;
          if (typeof r == "string") {
            a.fields[e].variableType = r;
          }
          break;
        }
      case "comment":
        a.comment = i.attribs.id;
        break;
      case "value":
      case "statement":
        {
          o(s, t, false, a.id);
          if (c && s !== c) {
            o(c, t, false, a.id);
          }
          const e = i.attribs.name;
          a.inputs[e] = {
            name: e,
            block: s.attribs.id,
            shadow: c ? c.attribs.id : null
          };
          break;
        }
      case "next":
        if (!s || !s.attribs) {
          continue;
        }
        o(s, t, false, a.id);
        a.next = s.attribs.id;
        break;
      case "mutation":
        a.mutation = r(i);
    }
  }
};
module.exports = function (e) {
  if (typeof e == "object" && typeof e.xml == "object") {
    return function (e) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        if (!r.name || !r.attribs) {
          continue;
        }
        const i = r.name.toLowerCase();
        if (i === "block" || i === "shadow") {
          o(r, t, true, null);
        }
      }
      const n = [];
      for (const e in t) {
        if (Object.prototype.hasOwnProperty.call(t, e)) {
          n.push(t[e]);
        }
      }
      return n;
    }(i.parseDOM(e.xml.outerHTML, {
      decodeEntities: true
    }));
  }
};