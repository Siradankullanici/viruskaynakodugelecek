const r = e => function () {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) {
    n[r] = arguments[r];
  }
  return new Promise((t, r) => {
    e(...n, (e, n) => {
      if (e) {
        r(typeof e == "string" ? new Error(e) : e);
      } else {
        t(n);
      }
    });
  });
};
var i = r(require("./256.js"));
var s = r(require("./258.js"));
var o = r(require("./259.js"));
module.exports = function (e, t, n) {
  i(e, t).then(function (e) {
    return s(e[0]).then(o.bind(null, t)).then(function (t) {
      return [t, e[1]];
    });
  }).then(n.bind(null, null), n);
};