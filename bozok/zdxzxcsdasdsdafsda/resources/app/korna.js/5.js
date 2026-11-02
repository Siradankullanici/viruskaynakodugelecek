var r = require("./108.js");
var i = require("./109.js");
var s = require("./60.js");
var o = require("./59.js");
var a = require("./58.js");
function c(e, t) {
  Object.keys(t).forEach(function (n) {
    e[n] = t[n];
  });
  return e;
}
module.exports = function e() {
  var t = c({}, a);
  var n = "en";
  var l = {};
  function u(e) {
    return e;
  }
  var h = null;
  var d = "warning";
  var p = {};
  function f(e, t, s) {
    var o = typeof e == "string" ? e : e.default;
    var a = b(o, typeof e == "object" && e.id || u(o), s || n);
    return (a.format ||= i(r(a.message), s || n, p))(t);
  }
  f.rich = function (e, t, s) {
    var o = typeof e == "string" ? e : e.default;
    var a = b(o, typeof e == "object" && e.id || u(o), s || n);
    return (a.toParts ||= i.toParts(r(a.message, {
      tagsType: m
    }), s || n, p))(t);
  };
  var m = "<>";
  function g(e, t) {
    var n = e[2];
    return function (e, t) {
      var r = typeof n == "object" ? function (e, t) {
        return Object.keys(e).reduce(function (n, r) {
          n[r] = e[r](t);
          return n;
        }, {});
      }(n, t) : n;
      if (typeof e == "function") {
        return e(r);
      } else {
        return e;
      }
    };
  }
  function b(e, t, n) {
    var r = o(n, l) || "en";
    var i = l[r] ||= {};
    var s = i[t];
    if (typeof s == "string") {
      s = i[t] = {
        message: s
      };
    }
    if (!s) {
      var a = "Translation for \"" + t + "\" in \"" + r + "\" is missing";
      if (d === "warning") {
        if (typeof console != "undefined") {
          console.warn(a);
        }
      } else if (d !== "ignore") {
        throw new Error(a);
      }
      var c = typeof h == "function" ? h(e, t, r) || e : h || e;
      s = i[t] = {
        message: c
      };
    }
    return s;
  }
  function y(e, t, r, i, a) {
    if (typeof r == "object" && typeof i != "object") {
      a = i;
      i = r;
      r = 0;
    }
    var c = o(a || n, s);
    var l = c && s[c][e] || E;
    return i["=" + +t] || i[l(t - r)] || i.other;
  }
  function E() {
    return "other";
  }
  p[m] = g;
  f.setup = function (e) {
    if ((e = e || {}).locale) {
      n = e.locale;
    }
    if ("translations" in e) {
      l = e.translations || {};
    }
    if (e.generateId) {
      u = e.generateId;
    }
    if ("missingReplacement" in e) {
      h = e.missingReplacement;
    }
    if (e.missingTranslation) {
      d = e.missingTranslation;
    }
    if (e.formats) {
      if (e.formats.number) {
        c(t.number, e.formats.number);
      }
      if (e.formats.date) {
        c(t.date, e.formats.date);
      }
      if (e.formats.time) {
        c(t.time, e.formats.time);
      }
    }
    if (e.types) {
      (p = e.types)[m] = g;
    }
    return {
      locale: n,
      translations: l,
      generateId: u,
      missingReplacement: h,
      missingTranslation: d,
      formats: t,
      types: p
    };
  };
  f.number = function (e, r, i) {
    var s = r && t.number[r] || t.parseNumberPattern(r) || t.number.default;
    return new Intl.NumberFormat(i || n, s).format(e);
  };
  f.date = function (e, r, i) {
    var s = r && t.date[r] || t.parseDatePattern(r) || t.date.default;
    return new Intl.DateTimeFormat(i || n, s).format(e);
  };
  f.time = function (e, r, i) {
    var s = r && t.time[r] || t.parseDatePattern(r) || t.time.default;
    return new Intl.DateTimeFormat(i || n, s).format(e);
  };
  f.select = function (e, t) {
    return t[e] || t.other;
  };
  f.custom = function (e, t, n, r) {
    if (e[1] in p) {
      return p[e[1]](e, t)(n, r);
    } else {
      return n;
    }
  };
  f.plural = y.bind(null, "cardinal");
  f.selectordinal = y.bind(null, "ordinal");
  f.namespace = e;
  return f;
}();