let r;
module.exports = function () {
  if (r) {
    return r;
  }
  r = {
    "Sans Serif": require("./243.js"),
    Serif: require("./244.js"),
    Handwriting: require("./245.js"),
    Marker: require("./246.js"),
    Curly: require("./247.js"),
    Pixel: require("./248.js"),
    Scratch: require("./249.js")
  };
  for (const e in r) {
    const t = r[e];
    r[e] = `@font-face {font-family: "${e}";src: url("data:font/woff2;base64,${t}");}`;
  }
  if (!document.getElementById("scratch-font-styles")) {
    let e = "";
    for (const t in r) {
      e += r[t];
    }
    const t = document.createElement("style");
    t.id = "scratch-font-styles";
    t.textContent = e;
    document.body.insertBefore(t, document.body.firstChild);
  }
  return r;
};