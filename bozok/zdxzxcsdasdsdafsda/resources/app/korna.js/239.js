window;
module.exports = function (e) {
  var t = {};
  function n(r) {
    if (t[r]) {
      return t[r].exports;
    }
    var i = t[r] = {
      i: r,
      l: false,
      exports: {}
    };
    e[r].call(i.exports, i, i.exports, n);
    i.l = true;
    return i.exports;
  }
  n.m = e;
  n.c = t;
  n.d = function (e, t, r) {
    if (!n.o(e, t)) {
      Object.defineProperty(e, t, {
        enumerable: true,
        get: r
      });
    }
  };
  n.r = function (e) {
    if (typeof Symbol != "undefined" && Symbol.toStringTag) {
      Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      });
    }
    Object.defineProperty(e, "__esModule", {
      value: true
    });
  };
  n.t = function (e, t) {
    if (t & 1) {
      e = n(e);
    }
    if (t & 8) {
      return e;
    }
    if (t & 4 && typeof e == "object" && e && e.__esModule) {
      return e;
    }
    var r = Object.create(null);
    n.r(r);
    Object.defineProperty(r, "default", {
      enumerable: true,
      value: e
    });
    if (t & 2 && typeof e != "string") {
      for (var i in e) {
        n.d(r, i, function (t) {
          return e[t];
        }.bind(null, i));
      }
    }
    return r;
  };
  n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    n.d(t, "a", t);
    return t;
  };
  n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  };
  n.p = "";
  return n(n.s = 0);
}([function (e, t, n) {
  "use strict";

  function r(e, t) {
    if (Array.isArray(t)) {
      return [e.a * t[0] + e.c * t[1] + e.e, e.b * t[0] + e.d * t[1] + e.f];
    } else {
      return {
        x: e.a * t.x + e.c * t.y + e.e,
        y: e.b * t.x + e.d * t.y + e.f
      };
    }
  }
  function i(e, t) {
    return t.map(function (t) {
      return r(e, t);
    });
  }
  function s(e) {
    return {
      a: parseFloat(e.a),
      b: parseFloat(e.b),
      c: parseFloat(e.c),
      d: parseFloat(e.d),
      e: parseFloat(e.e),
      f: parseFloat(e.f)
    };
  }
  n.r(t);
  var o = /^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i;
  function a(e) {
    var t = e.match(o);
    if (t === null || t.length < 7) {
      throw new Error("'" + e + "' is not a matrix");
    }
    return {
      a: parseFloat(t[1]),
      b: parseFloat(t[2]),
      c: parseFloat(t[3]),
      d: parseFloat(t[4]),
      e: parseFloat(t[5]),
      f: parseFloat(t[6])
    };
  }
  function c() {
    return {
      a: 1,
      c: 0,
      e: 0,
      b: 0,
      d: 1,
      f: 0
    };
  }
  function l(e) {
    var t = e.a;
    var n = e.b;
    var r = e.c;
    var i = e.d;
    var s = e.e;
    var o = e.f;
    var a = t * i - n * r;
    return {
      a: i / a,
      b: n / -a,
      c: r / -a,
      d: t / a,
      e: (i * s - r * o) / -a,
      f: (n * s - t * o) / a
    };
  }
  var u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  };
  function h(e) {
    return typeof e == "number" && !isNaN(e) && isFinite(e);
  }
  function d(e) {
    return e != null && (e === undefined ? "undefined" : u(e)) === "object";
  }
  function p(e) {
    return d(e) && e.hasOwnProperty("a") && h(e.a) && e.hasOwnProperty("b") && h(e.b) && e.hasOwnProperty("c") && h(e.c) && e.hasOwnProperty("d") && h(e.d) && e.hasOwnProperty("e") && h(e.e) && e.hasOwnProperty("f") && h(e.f);
  }
  function f(e) {
    return e === undefined;
  }
  function m(e) {
    return {
      a: 1,
      c: 0,
      e: e,
      b: 0,
      d: 1,
      f: arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    };
  }
  function g() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    function r(e, t) {
      return {
        a: e.a * t.a + e.c * t.b,
        c: e.a * t.c + e.c * t.d,
        e: e.a * t.e + e.c * t.f + e.e,
        b: e.b * t.a + e.d * t.b,
        d: e.b * t.c + e.d * t.d,
        f: e.b * t.e + e.d * t.f + e.f
      };
    }
    switch ((t = Array.isArray(t[0]) ? t[0] : t).length) {
      case 0:
        throw new Error("no matrices provided");
      case 1:
        return t[0];
      case 2:
        return r(t[0], t[1]);
      default:
        var i = function (e) {
          if (Array.isArray(e)) {
            return e;
          } else {
            return Array.from(e);
          }
        }(t);
        var s = i[0];
        var o = i[1];
        var a = i.slice(2);
        var c = r(s, o);
        return g.apply(undefined, [c].concat(function (e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) {
              n[t] = e[t];
            }
            return n;
          }
          return Array.from(e);
        }(a)));
    }
  }
  function b() {
    return g.apply(undefined, arguments);
  }
  var y = Math.cos;
  var E = Math.sin;
  var T = Math.PI;
  function v(e, t, n) {
    var r = y(e);
    var i = E(e);
    var s = {
      a: r,
      c: -i,
      e: 0,
      b: i,
      d: r,
      f: 0
    };
    if (f(t) || f(n)) {
      return s;
    } else {
      return g([m(t, n), s, m(-t, -n)]);
    }
  }
  function A(e) {
    return v(e * T / 180, arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined, arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined);
  }
  function w(e, t = undefined) {
    if (f(t)) {
      t = e;
    }
    return {
      a: e,
      c: 0,
      e: 0,
      b: 0,
      d: t,
      f: 0
    };
  }
  function S(e, t) {
    return {
      a: 1,
      c: e,
      e: 0,
      b: t,
      d: 1,
      f: 0
    };
  }
  var k = Math.tan;
  function I(e, t) {
    return {
      a: 1,
      c: k(e),
      e: 0,
      b: k(t),
      d: 1,
      f: 0
    };
  }
  function O(e, t) {
    return I(e * Math.PI / 180, t * Math.PI / 180);
  }
  function N(e) {
    return x(e);
  }
  function R(e) {
    return x(e);
  }
  function x(e) {
    return "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")";
  }
  n.d(t, "applyToPoint", function () {
    return r;
  });
  n.d(t, "applyToPoints", function () {
    return i;
  });
  n.d(t, "fromObject", function () {
    return s;
  });
  n.d(t, "fromString", function () {
    return a;
  });
  n.d(t, "identity", function () {
    return c;
  });
  n.d(t, "inverse", function () {
    return l;
  });
  n.d(t, "isAffineMatrix", function () {
    return p;
  });
  n.d(t, "rotate", function () {
    return v;
  });
  n.d(t, "rotateDEG", function () {
    return A;
  });
  n.d(t, "scale", function () {
    return w;
  });
  n.d(t, "shear", function () {
    return S;
  });
  n.d(t, "skew", function () {
    return I;
  });
  n.d(t, "skewDEG", function () {
    return O;
  });
  n.d(t, "toCSS", function () {
    return N;
  });
  n.d(t, "toSVG", function () {
    return R;
  });
  n.d(t, "toString", function () {
    return x;
  });
  n.d(t, "transform", function () {
    return g;
  });
  n.d(t, "compose", function () {
    return b;
  });
  n.d(t, "translate", function () {
    return m;
  });
}]);