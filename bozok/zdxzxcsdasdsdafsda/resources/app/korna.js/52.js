class n {
  static get svg() {
    return "http://www.w3.org/2000/svg";
  }
  static get xmlns() {
    return "http://www.w3.org/2000/xmlns";
  }
  static get xlink() {
    return "http://www.w3.org/1999/xlink";
  }
  static attributeNamespace() {
    return {
      href: n.xlink,
      xlink: n.xmlns,
      xmlns: `${n.xmlns}/`,
      "xmlns:xlink": `${n.xmlns}/`
    };
  }
  static create(e, t, r) {
    return n.set(document.createElementNS(n.svg, e), t, r);
  }
  static get(e, t) {
    const r = n.attributeNamespace[t];
    const i = r ? e.getAttributeNS(r, t) : e.getAttribute(t);
    if (i === "null") {
      return null;
    } else {
      return i;
    }
  }
  static set(e, t, r) {
    for (const i in t) {
      let s = t[i];
      const o = n.attributeNamespace[i];
      if (typeof s == "number" && r) {
        s = r.number(s);
      }
      if (o) {
        e.setAttributeNS(o, i, s);
      } else {
        e.setAttribute(i, s);
      }
    }
    return e;
  }
}
module.exports = n;