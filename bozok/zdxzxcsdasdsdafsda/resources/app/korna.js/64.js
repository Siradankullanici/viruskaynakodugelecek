const r = require("./65.js");
const i = require("./185.js");
const s = function (e) {
  const t = Object.create(null);
  t.tagName = e.name;
  t.children = [];
  for (const n in e.attribs) {
    if (n !== "xmlns") {
      t[n] = i(e.attribs[n]);
      if (n === "blockinfo") {
        t.blockInfo = JSON.parse(t.blockinfo);
        delete t.blockinfo;
      }
    }
  }
  for (let n = 0; n < e.children.length; n++) {
    t.children.push(s(e.children[n]));
  }
  return t;
};
module.exports = function (e) {
  let t;
  t = typeof e == "object" ? e : r.parseDOM(e)[0];
  return s(t);
};