module.exports = function (e) {
  var t = [];
  t.toString = function () {
    return this.map(function (t) {
      var n = e(t);
      if (t[2]) {
        return `@media ${t[2]} {${n}}`;
      } else {
        return n;
      }
    }).join("");
  };
  t.i = function (e, n, r) {
    if (typeof e == "string") {
      e = [[null, e, ""]];
    }
    var i = {};
    if (r) {
      for (var s = 0; s < this.length; s++) {
        var o = this[s][0];
        if (o != null) {
          i[o] = true;
        }
      }
    }
    for (var a = 0; a < e.length; a++) {
      var c = [].concat(e[a]);
      if (!r || !i[c[0]]) {
        if (n) {
          if (c[2]) {
            c[2] = `${n} and ${c[2]}`;
          } else {
            c[2] = n;
          }
        }
        t.push(c);
      }
    }
  };
  return t;
};