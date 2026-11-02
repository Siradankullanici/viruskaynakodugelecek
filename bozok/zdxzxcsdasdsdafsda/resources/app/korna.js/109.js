var r = require("./58.js");
var i = require("./59.js");
var s = require("./60.js");
function o(e, t, n, r, i) {
  var s = e.map(function (e) {
    return function (e, t, n, r, i) {
      if (typeof e == "string") {
        var s = e;
        return function () {
          return s;
        };
      }
      var c;
      var l = e[0];
      var u = e[1];
      if (t && e[0] === "#") {
        l = t[0];
        var h = t[2];
        var p = (r.number || d.number)([l, "number"], n);
        return function (e) {
          return p(a(l, e) - h, e);
        };
      }
      if (u === "plural" || u === "selectordinal") {
        c = {};
        Object.keys(e[3]).forEach(function (t) {
          c[t] = o(e[3][t], e, n, r, i);
        });
        e = [e[0], e[1], e[2], c];
      } else if (e[2] && typeof e[2] == "object") {
        c = {};
        Object.keys(e[2]).forEach(function (t) {
          c[t] = o(e[2][t], e, n, r, i);
        });
        e = [e[0], e[1], c];
      }
      var f = u && (r[u] || d[u]);
      if (f) {
        var m = f(e, n);
        return function (e) {
          return m(a(l, e), e);
        };
      }
      if (i) {
        return function (e) {
          return String(a(l, e));
        };
      } else {
        return function (e) {
          return a(l, e);
        };
      }
    }(e, t, n, r, i);
  });
  if (i) {
    if (s.length === 1) {
      return s[0];
    } else {
      return function (e) {
        var t = "";
        for (var n = 0; n < s.length; ++n) {
          t += s[n](e);
        }
        return t;
      };
    }
  } else {
    return function (e) {
      return s.reduce(function (t, n) {
        return t.concat(n(e));
      }, []);
    };
  }
}
function a(e, t) {
  if (t && e in t) {
    return t[e];
  }
  var n = e.split(".");
  for (var r = t, i = 0, s = n.length; r && i < s; ++i) {
    r = r[n[i]];
  }
  return r;
}
function c(e, t) {
  var n = e[2];
  var i = r.number[n] || r.parseNumberPattern(n) || r.number.default;
  return new Intl.NumberFormat(t, i).format;
}
function l(e, t) {
  var n = e[1];
  var i = e[2];
  var s = r[n][i] || r.parseDatePattern(i) || r[n].default;
  return new Intl.DateTimeFormat(t, s).format;
}
function u(e, t) {
  var n;
  var r = e[1] === "selectordinal" ? "ordinal" : "cardinal";
  var o = e[2];
  var a = e[3];
  if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(t).length > 0) {
    n = new Intl.PluralRules(t, {
      type: r
    });
  } else {
    var c = i(t, s);
    var l = c && s[c][r] || h;
    n = {
      select: l
    };
  }
  return function (e, t) {
    return (a["=" + +e] || a[n.select(e - o)] || a.other)(t);
  };
}
function h() {
  return "other";
}
(exports = module.exports = function (e, t, n) {
  return o(e, null, t || "en", n || {}, true);
}).toParts = function (e, t, n) {
  return o(e, null, t || "en", n || {}, false);
};
var d = {
  number: c,
  ordinal: c,
  spellout: c,
  duration: function (e, t) {
    var n = e[2];
    var i = r.duration[n] || r.duration.default;
    var s = new Intl.NumberFormat(t, i.seconds).format;
    var o = new Intl.NumberFormat(t, i.minutes).format;
    var a = new Intl.NumberFormat(t, i.hours).format;
    var c = /^fi$|^fi-|^da/.test(String(t)) ? "." : ":";
    return function (e, t) {
      e = +e;
      if (!isFinite(e)) {
        return s(e);
      }
      var n = ~~(e / 60 / 60);
      var r = ~~(e / 60 % 60);
      var i = (n ? a(Math.abs(n)) + c : "") + o(Math.abs(r)) + c + s(Math.abs(e % 60));
      if (e < 0) {
        return a(-1).replace(a(1), i);
      } else {
        return i;
      }
    };
  },
  date: l,
  time: l,
  plural: u,
  selectordinal: u,
  select: function (e, t) {
    var n = e[2];
    return function (e, t) {
      return (n[e] || n.other)(t);
    };
  }
};
exports.types = d;