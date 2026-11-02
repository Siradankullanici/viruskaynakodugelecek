module.exports = function (e, t) {
  let n = "";
  for (const e in t) {
    let r = t[e].value;
    if (e === "CURRENTMENU") {
      r = r.toLowerCase();
    }
    n += `_${r}`;
  }
  return `${e}${n}`;
};