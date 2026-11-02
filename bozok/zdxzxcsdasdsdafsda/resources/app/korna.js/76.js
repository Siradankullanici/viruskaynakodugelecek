module.exports = function (e) {
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
  for (const e of t) {
    if (e.getAttribute("font-family") && e.getAttribute("font-family") !== "Helvetica") {
      if (e.getAttribute("font-family") === "Mystery") {
        e.setAttribute("font-family", "Curly");
      } else if (e.getAttribute("font-family") === "Gloria") {
        e.setAttribute("font-family", "Handwriting");
      } else if (e.getAttribute("font-family") === "Donegal") {
        e.setAttribute("font-family", "Serif");
      }
    } else {
      e.setAttribute("font-family", "Sans Serif");
    }
  }
};