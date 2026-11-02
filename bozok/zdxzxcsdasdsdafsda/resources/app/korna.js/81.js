const r = require("./7.js");
module.exports = e => {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = r();
    const s = e[n].id;
    e[n].id = t[s] = i;
  }
  for (let n = 0; n < e.length; n++) {
    for (const r in e[n].inputs) {
      const i = e[n].inputs[r];
      i.block = t[i.block];
      i.shadow = t[i.shadow];
    }
    e[n].parent &&= t[e[n].parent];
    e[n].next &&= t[e[n].next];
  }
};