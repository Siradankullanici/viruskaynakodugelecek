var r = require("./266.js");
var i = require("./267.js");
var s = require("./268.js");
var o = require("./269.js");
function a(e, t) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function c(e, t, n) {
  var r = [t[0] - e[0], t[1] - e[1]];
  var i = [n[0] - e[0], n[1] - e[1]];
  var s = a(e, t);
  var o = a(e, n);
  return (r[0] * i[0] + r[1] * i[1]) / Math.sqrt(s * o);
}
function l(e, t) {
  for (var n = 0; n < t.length - 1; n++) {
    var i = [t[n], t[n + 1]];
    if ((e[0][0] !== i[0][0] || e[0][1] !== i[0][1]) && (e[0][0] !== i[1][0] || e[0][1] !== i[1][1]) && r(e, i)) {
      return true;
    }
  }
  return false;
}
function u(e) {
  return [Math.min(e[0][0], e[1][0]), Math.min(e[0][1], e[1][1]), Math.max(e[0][0], e[1][0]), Math.max(e[0][1], e[1][1])];
}
function h(e, t, n) {
  var r;
  var i;
  var s = null;
  var o = p;
  var a = p;
  for (var u = 0; u < t.length; u++) {
    r = c(e[0], e[1], t[u]);
    i = c(e[1], e[0], t[u]);
    if (r > o && i > a && !l([e[0], t[u]], n) && !l([e[1], t[u]], n)) {
      o = r;
      a = i;
      s = t[u];
    }
  }
  return s;
}
function d(e, t, n, r, i) {
  var s;
  var o;
  var c;
  var l;
  var p;
  var f;
  var m;
  var g = false;
  for (var b = 0; b < e.length - 1; b++) {
    o = (s = [e[b], e[b + 1]])[0].join() + "," + s[1].join();
    if (!(a(s[0], s[1]) < t) && i[o] !== true) {
      c = 0;
      p = u(s);
      do {
        f = (p = r.extendBbox(p, c))[2] - p[0];
        m = p[3] - p[1];
        l = h(s, r.rangePoints(p), e);
        c++;
      } while (l === null && (n[0] > f || n[1] > m));
      if (f >= n[0] && m >= n[1]) {
        i[o] = true;
      }
      if (l !== null) {
        e.splice(b + 1, 0, l);
        r.removePoint(l);
        g = true;
      }
    }
  }
  if (g) {
    return d(e, t, n, r, i);
  } else {
    return e;
  }
}
var p = Math.cos(90 / (180 / Math.PI));
var f = 0.6;
module.exports = function (e, t, n) {
  var r;
  var a;
  var c;
  var l;
  var u;
  var h;
  var p;
  var m = t || 20;
  if (e.length < 4) {
    return e.slice();
  } else {
    p = function (e) {
      return e.filter(function (e, t, n) {
        var r = n[t - 1];
        return t === 0 || r[0] !== e[0] || r[1] !== e[1];
      });
    }(function (e) {
      return e.sort(function (e, t) {
        if (e[0] == t[0]) {
          return e[1] - t[1];
        } else {
          return e[0] - t[0];
        }
      });
    }(s.toXy(e, n)));
    l = function (e) {
      var t = Infinity;
      var n = Infinity;
      var r = -Infinity;
      var i = -Infinity;
      for (var s = e.length - 1; s >= 0; s--) {
        if (e[s][0] < t) {
          t = e[s][0];
        }
        if (e[s][1] < n) {
          n = e[s][1];
        }
        if (e[s][0] > r) {
          r = e[s][0];
        }
        if (e[s][1] > i) {
          i = e[s][1];
        }
      }
      return [r - t, i - n];
    }(p);
    u = [l[0] * f, l[1] * f];
    r = o(p);
    c = p.filter(function (e) {
      return r.indexOf(e) < 0;
    });
    h = Math.ceil(1 / (p.length / (l[0] * l[1])));
    a = d(r, Math.pow(m, 2), u, i(c, h), {});
    return s.fromXy(a, n);
  }
};