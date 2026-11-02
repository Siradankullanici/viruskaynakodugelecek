var e = require("./8.js");
var r = require("./99.js");
var i = require("./100.js");
var s = require("./101.js");
function o() {
  if (c.TYPED_ARRAY_SUPPORT) {
    return 2147483647;
  } else {
    return 1073741823;
  }
}
function a(e, t) {
  if (o() < t) {
    throw new RangeError("Invalid typed array length");
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    (e = new Uint8Array(t)).__proto__ = c.prototype;
  } else {
    if (e === null) {
      e = new c(t);
    }
    e.length = t;
  }
  return e;
}
function c(e, t, n) {
  if (!c.TYPED_ARRAY_SUPPORT && !(this instanceof c)) {
    return new c(e, t, n);
  }
  if (typeof e == "number") {
    if (typeof t == "string") {
      throw new Error("If encoding is specified then the first argument must be a string");
    }
    return h(this, e);
  }
  return l(this, e, t, n);
}
function l(e, t, n, r) {
  if (typeof t == "number") {
    throw new TypeError("\"value\" argument must not be a number");
  }
  if (typeof ArrayBuffer != "undefined" && t instanceof ArrayBuffer) {
    return function (e, t, n, r) {
      t.byteLength;
      if (n < 0 || t.byteLength < n) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (t.byteLength < n + (r || 0)) {
        throw new RangeError("'length' is out of bounds");
      }
      t = n === undefined && r === undefined ? new Uint8Array(t) : r === undefined ? new Uint8Array(t, n) : new Uint8Array(t, n, r);
      if (c.TYPED_ARRAY_SUPPORT) {
        (e = t).__proto__ = c.prototype;
      } else {
        e = d(e, t);
      }
      return e;
    }(e, t, n, r);
  } else if (typeof t == "string") {
    return function (e, t, n) {
      if (typeof n != "string" || n === "") {
        n = "utf8";
      }
      if (!c.isEncoding(n)) {
        throw new TypeError("\"encoding\" must be a valid string encoding");
      }
      var r = f(t, n) | 0;
      e = a(e, r);
      var i = e.write(t, n);
      if (i !== r) {
        e = e.slice(0, i);
      }
      return e;
    }(e, t, n);
  } else {
    return function (e, t) {
      if (c.isBuffer(t)) {
        var n = p(t.length) | 0;
        if ((e = a(e, n)).length !== 0) {
          t.copy(e, 0, 0, n);
        }
        return e;
      }
      if (t) {
        if (typeof ArrayBuffer != "undefined" && t.buffer instanceof ArrayBuffer || "length" in t) {
          if (typeof t.length != "number" || (r = t.length) != r) {
            return a(e, 0);
          } else {
            return d(e, t);
          }
        }
        if (t.type === "Buffer" && s(t.data)) {
          return d(e, t.data);
        }
      }
      var r;
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }(e, t);
  }
}
function u(e) {
  if (typeof e != "number") {
    throw new TypeError("\"size\" argument must be a number");
  }
  if (e < 0) {
    throw new RangeError("\"size\" argument must not be negative");
  }
}
function h(e, t) {
  u(t);
  e = a(e, t < 0 ? 0 : p(t) | 0);
  if (!c.TYPED_ARRAY_SUPPORT) {
    for (var n = 0; n < t; ++n) {
      e[n] = 0;
    }
  }
  return e;
}
function d(e, t) {
  var n = t.length < 0 ? 0 : p(t.length) | 0;
  e = a(e, n);
  for (var r = 0; r < n; r += 1) {
    e[r] = t[r] & 255;
  }
  return e;
}
function p(e) {
  if (e >= o()) {
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
  }
  return e | 0;
}
function f(e, t) {
  if (c.isBuffer(e)) {
    return e.length;
  }
  if (typeof ArrayBuffer != "undefined" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) {
    return e.byteLength;
  }
  if (typeof e != "string") {
    e = "" + e;
  }
  var n = e.length;
  if (n === 0) {
    return 0;
  }
  var r = false;
  while (true) {
    switch (t) {
      case "ascii":
      case "latin1":
      case "binary":
        return n;
      case "utf8":
      case "utf-8":
      case undefined:
        return G(e).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return n * 2;
      case "hex":
        return n >>> 1;
      case "base64":
        return V(e).length;
      default:
        if (r) {
          return G(e).length;
        }
        t = ("" + t).toLowerCase();
        r = true;
    }
  }
}
function m(e, t, n) {
  var r = false;
  if (t === undefined || t < 0) {
    t = 0;
  }
  if (t > this.length) {
    return "";
  }
  if (n === undefined || n > this.length) {
    n = this.length;
  }
  if (n <= 0) {
    return "";
  }
  if ((n >>>= 0) <= (t >>>= 0)) {
    return "";
  }
  for (e ||= "utf8";;) {
    switch (e) {
      case "hex":
        return x(this, t, n);
      case "utf8":
      case "utf-8":
        return I(this, t, n);
      case "ascii":
        return N(this, t, n);
      case "latin1":
      case "binary":
        return R(this, t, n);
      case "base64":
        return k(this, t, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return M(this, t, n);
      default:
        if (r) {
          throw new TypeError("Unknown encoding: " + e);
        }
        e = (e + "").toLowerCase();
        r = true;
    }
  }
}
function g(e, t, n) {
  var r = e[t];
  e[t] = e[n];
  e[n] = r;
}
function b(e, t, n, r, i) {
  if (e.length === 0) {
    return -1;
  }
  if (typeof n == "string") {
    r = n;
    n = 0;
  } else if (n > 2147483647) {
    n = 2147483647;
  } else if (n < -2147483648) {
    n = -2147483648;
  }
  n = +n;
  if (isNaN(n)) {
    n = i ? 0 : e.length - 1;
  }
  if (n < 0) {
    n = e.length + n;
  }
  if (n >= e.length) {
    if (i) {
      return -1;
    }
    n = e.length - 1;
  } else if (n < 0) {
    if (!i) {
      return -1;
    }
    n = 0;
  }
  if (typeof t == "string") {
    t = c.from(t, r);
  }
  if (c.isBuffer(t)) {
    if (t.length === 0) {
      return -1;
    } else {
      return y(e, t, n, r, i);
    }
  }
  if (typeof t == "number") {
    t &= 255;
    if (c.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function") {
      if (i) {
        return Uint8Array.prototype.indexOf.call(e, t, n);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(e, t, n);
      }
    } else {
      return y(e, [t], n, r, i);
    }
  }
  throw new TypeError("val must be string, number or Buffer");
}
function y(e, t, n, r, i) {
  var s;
  var o = 1;
  var a = e.length;
  var c = t.length;
  if (r !== undefined && ((r = String(r).toLowerCase()) === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le")) {
    if (e.length < 2 || t.length < 2) {
      return -1;
    }
    o = 2;
    a /= 2;
    c /= 2;
    n /= 2;
  }
  function l(e, t) {
    if (o === 1) {
      return e[t];
    } else {
      return e.readUInt16BE(t * o);
    }
  }
  if (i) {
    var u = -1;
    for (s = n; s < a; s++) {
      if (l(e, s) === l(t, u === -1 ? 0 : s - u)) {
        if (u === -1) {
          u = s;
        }
        if (s - u + 1 === c) {
          return u * o;
        }
      } else {
        if (u !== -1) {
          s -= s - u;
        }
        u = -1;
      }
    }
  } else {
    if (n + c > a) {
      n = a - c;
    }
    s = n;
    for (; s >= 0; s--) {
      var h = true;
      for (var d = 0; d < c; d++) {
        if (l(e, s + d) !== l(t, d)) {
          h = false;
          break;
        }
      }
      if (h) {
        return s;
      }
    }
  }
  return -1;
}
function E(e, t, n, r) {
  n = Number(n) || 0;
  var i = e.length - n;
  if (r) {
    if ((r = Number(r)) > i) {
      r = i;
    }
  } else {
    r = i;
  }
  var s = t.length;
  if (s % 2 != 0) {
    throw new TypeError("Invalid hex string");
  }
  if (r > s / 2) {
    r = s / 2;
  }
  for (var o = 0; o < r; ++o) {
    var a = parseInt(t.substr(o * 2, 2), 16);
    if (isNaN(a)) {
      return o;
    }
    e[n + o] = a;
  }
  return o;
}
function T(e, t, n, r) {
  return _(G(t, e.length - n), e, n, r);
}
function v(e, t, n, r) {
  return _(function (e) {
    var t = [];
    for (var n = 0; n < e.length; ++n) {
      t.push(e.charCodeAt(n) & 255);
    }
    return t;
  }(t), e, n, r);
}
function A(e, t, n, r) {
  return v(e, t, n, r);
}
function w(e, t, n, r) {
  return _(V(t), e, n, r);
}
function S(e, t, n, r) {
  return _(function (e, t) {
    var n;
    var r;
    var i;
    var s = [];
    for (var o = 0; o < e.length && !((t -= 2) < 0); ++o) {
      r = (n = e.charCodeAt(o)) >> 8;
      i = n % 256;
      s.push(i);
      s.push(r);
    }
    return s;
  }(t, e.length - n), e, n, r);
}
function k(e, t, n) {
  if (t === 0 && n === e.length) {
    return r.fromByteArray(e);
  } else {
    return r.fromByteArray(e.slice(t, n));
  }
}
function I(e, t, n) {
  n = Math.min(e.length, n);
  var r = [];
  for (var i = t; i < n;) {
    var s;
    var o;
    var a;
    var c;
    var l = e[i];
    var u = null;
    var h = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
    if (i + h <= n) {
      switch (h) {
        case 1:
          if (l < 128) {
            u = l;
          }
          break;
        case 2:
          if (((s = e[i + 1]) & 192) == 128 && (c = (l & 31) << 6 | s & 63) > 127) {
            u = c;
          }
          break;
        case 3:
          s = e[i + 1];
          o = e[i + 2];
          if ((s & 192) == 128 && (o & 192) == 128 && (c = (l & 15) << 12 | (s & 63) << 6 | o & 63) > 2047 && (c < 55296 || c > 57343)) {
            u = c;
          }
          break;
        case 4:
          s = e[i + 1];
          o = e[i + 2];
          a = e[i + 3];
          if ((s & 192) == 128 && (o & 192) == 128 && (a & 192) == 128 && (c = (l & 15) << 18 | (s & 63) << 12 | (o & 63) << 6 | a & 63) > 65535 && c < 1114112) {
            u = c;
          }
      }
    }
    if (u === null) {
      u = 65533;
      h = 1;
    } else if (u > 65535) {
      u -= 65536;
      r.push(u >>> 10 & 1023 | 55296);
      u = u & 1023 | 56320;
    }
    r.push(u);
    i += h;
  }
  return function (e) {
    var t = e.length;
    if (t <= O) {
      return String.fromCharCode.apply(String, e);
    }
    var n = "";
    var r = 0;
    while (r < t) {
      n += String.fromCharCode.apply(String, e.slice(r, r += O));
    }
    return n;
  }(r);
}
exports.Buffer = c;
exports.SlowBuffer = function (e) {
  if (+e != e) {
    e = 0;
  }
  return c.alloc(+e);
};
exports.INSPECT_MAX_BYTES = 50;
c.TYPED_ARRAY_SUPPORT = e.TYPED_ARRAY_SUPPORT !== undefined ? e.TYPED_ARRAY_SUPPORT : function () {
  try {
    var e = new Uint8Array(1);
    e.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function () {
        return 42;
      }
    };
    return e.foo() === 42 && typeof e.subarray == "function" && e.subarray(1, 1).byteLength === 0;
  } catch (e) {
    return false;
  }
}();
exports.kMaxLength = o();
c.poolSize = 8192;
c._augment = function (e) {
  e.__proto__ = c.prototype;
  return e;
};
c.from = function (e, t, n) {
  return l(null, e, t, n);
};
if (c.TYPED_ARRAY_SUPPORT) {
  c.prototype.__proto__ = Uint8Array.prototype;
  c.__proto__ = Uint8Array;
  if (typeof Symbol != "undefined" && Symbol.species && c[Symbol.species] === c) {
    Object.defineProperty(c, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}
c.alloc = function (e, t, n) {
  return function (e, t, n, r) {
    u(t);
    if (t <= 0) {
      return a(e, t);
    } else if (n !== undefined) {
      if (typeof r == "string") {
        return a(e, t).fill(n, r);
      } else {
        return a(e, t).fill(n);
      }
    } else {
      return a(e, t);
    }
  }(null, e, t, n);
};
c.allocUnsafe = function (e) {
  return h(null, e);
};
c.allocUnsafeSlow = function (e) {
  return h(null, e);
};
c.isBuffer = function (e) {
  return e != null && !!e._isBuffer;
};
c.compare = function (e, t) {
  if (!c.isBuffer(e) || !c.isBuffer(t)) {
    throw new TypeError("Arguments must be Buffers");
  }
  if (e === t) {
    return 0;
  }
  var n = e.length;
  var r = t.length;
  for (var i = 0, s = Math.min(n, r); i < s; ++i) {
    if (e[i] !== t[i]) {
      n = e[i];
      r = t[i];
      break;
    }
  }
  if (n < r) {
    return -1;
  } else if (r < n) {
    return 1;
  } else {
    return 0;
  }
};
c.isEncoding = function (e) {
  switch (String(e).toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "latin1":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return true;
    default:
      return false;
  }
};
c.concat = function (e, t) {
  if (!s(e)) {
    throw new TypeError("\"list\" argument must be an Array of Buffers");
  }
  if (e.length === 0) {
    return c.alloc(0);
  }
  var n;
  if (t === undefined) {
    t = 0;
    n = 0;
    for (; n < e.length; ++n) {
      t += e[n].length;
    }
  }
  var r = c.allocUnsafe(t);
  var i = 0;
  for (n = 0; n < e.length; ++n) {
    var o = e[n];
    if (!c.isBuffer(o)) {
      throw new TypeError("\"list\" argument must be an Array of Buffers");
    }
    o.copy(r, i);
    i += o.length;
  }
  return r;
};
c.byteLength = f;
c.prototype._isBuffer = true;
c.prototype.swap16 = function () {
  var e = this.length;
  if (e % 2 != 0) {
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  }
  for (var t = 0; t < e; t += 2) {
    g(this, t, t + 1);
  }
  return this;
};
c.prototype.swap32 = function () {
  var e = this.length;
  if (e % 4 != 0) {
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  }
  for (var t = 0; t < e; t += 4) {
    g(this, t, t + 3);
    g(this, t + 1, t + 2);
  }
  return this;
};
c.prototype.swap64 = function () {
  var e = this.length;
  if (e % 8 != 0) {
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  }
  for (var t = 0; t < e; t += 8) {
    g(this, t, t + 7);
    g(this, t + 1, t + 6);
    g(this, t + 2, t + 5);
    g(this, t + 3, t + 4);
  }
  return this;
};
c.prototype.toString = function () {
  var e = this.length | 0;
  if (e === 0) {
    return "";
  } else if (arguments.length === 0) {
    return I(this, 0, e);
  } else {
    return m.apply(this, arguments);
  }
};
c.prototype.equals = function (e) {
  if (!c.isBuffer(e)) {
    throw new TypeError("Argument must be a Buffer");
  }
  return this === e || c.compare(this, e) === 0;
};
c.prototype.inspect = function () {
  var e = "";
  var n = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    e = this.toString("hex", 0, n).match(/.{2}/g).join(" ");
    if (this.length > n) {
      e += " ... ";
    }
  }
  return "<Buffer " + e + ">";
};
c.prototype.compare = function (e, t, n, r, i) {
  if (!c.isBuffer(e)) {
    throw new TypeError("Argument must be a Buffer");
  }
  if (t === undefined) {
    t = 0;
  }
  if (n === undefined) {
    n = e ? e.length : 0;
  }
  if (r === undefined) {
    r = 0;
  }
  if (i === undefined) {
    i = this.length;
  }
  if (t < 0 || n > e.length || r < 0 || i > this.length) {
    throw new RangeError("out of range index");
  }
  if (r >= i && t >= n) {
    return 0;
  }
  if (r >= i) {
    return -1;
  }
  if (t >= n) {
    return 1;
  }
  if (this === e) {
    return 0;
  }
  var s = (i >>>= 0) - (r >>>= 0);
  var o = (n >>>= 0) - (t >>>= 0);
  for (var a = Math.min(s, o), l = this.slice(r, i), u = e.slice(t, n), h = 0; h < a; ++h) {
    if (l[h] !== u[h]) {
      s = l[h];
      o = u[h];
      break;
    }
  }
  if (s < o) {
    return -1;
  } else if (o < s) {
    return 1;
  } else {
    return 0;
  }
};
c.prototype.includes = function (e, t, n) {
  return this.indexOf(e, t, n) !== -1;
};
c.prototype.indexOf = function (e, t, n) {
  return b(this, e, t, n, true);
};
c.prototype.lastIndexOf = function (e, t, n) {
  return b(this, e, t, n, false);
};
c.prototype.write = function (e, t, n, r) {
  if (t === undefined) {
    r = "utf8";
    n = this.length;
    t = 0;
  } else if (n === undefined && typeof t == "string") {
    r = t;
    n = this.length;
    t = 0;
  } else {
    if (!isFinite(t)) {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    t |= 0;
    if (isFinite(n)) {
      n |= 0;
      if (r === undefined) {
        r = "utf8";
      }
    } else {
      r = n;
      n = undefined;
    }
  }
  var i = this.length - t;
  if (n === undefined || n > i) {
    n = i;
  }
  if (e.length > 0 && (n < 0 || t < 0) || t > this.length) {
    throw new RangeError("Attempt to write outside buffer bounds");
  }
  r ||= "utf8";
  var s = false;
  while (true) {
    switch (r) {
      case "hex":
        return E(this, e, t, n);
      case "utf8":
      case "utf-8":
        return T(this, e, t, n);
      case "ascii":
        return v(this, e, t, n);
      case "latin1":
      case "binary":
        return A(this, e, t, n);
      case "base64":
        return w(this, e, t, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return S(this, e, t, n);
      default:
        if (s) {
          throw new TypeError("Unknown encoding: " + r);
        }
        r = ("" + r).toLowerCase();
        s = true;
    }
  }
};
c.prototype.toJSON = function () {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
var O = 4096;
function N(e, t, n) {
  var r = "";
  n = Math.min(e.length, n);
  for (var i = t; i < n; ++i) {
    r += String.fromCharCode(e[i] & 127);
  }
  return r;
}
function R(e, t, n) {
  var r = "";
  n = Math.min(e.length, n);
  for (var i = t; i < n; ++i) {
    r += String.fromCharCode(e[i]);
  }
  return r;
}
function x(e, t, n) {
  var r = e.length;
  if (!t || t < 0) {
    t = 0;
  }
  if (!n || n < 0 || n > r) {
    n = r;
  }
  var i = "";
  for (var s = t; s < n; ++s) {
    i += z(e[s]);
  }
  return i;
}
function M(e, t, n) {
  for (var r = e.slice(t, n), i = "", s = 0; s < r.length; s += 2) {
    i += String.fromCharCode(r[s] + r[s + 1] * 256);
  }
  return i;
}
function C(e, t, n) {
  if (e % 1 != 0 || e < 0) {
    throw new RangeError("offset is not uint");
  }
  if (e + t > n) {
    throw new RangeError("Trying to access beyond buffer length");
  }
}
function P(e, t, n, r, i, s) {
  if (!c.isBuffer(e)) {
    throw new TypeError("\"buffer\" argument must be a Buffer instance");
  }
  if (t > i || t < s) {
    throw new RangeError("\"value\" argument is out of bounds");
  }
  if (n + r > e.length) {
    throw new RangeError("Index out of range");
  }
}
function L(e, t, n, r) {
  if (t < 0) {
    t = 65535 + t + 1;
  }
  for (var i = 0, s = Math.min(e.length - n, 2); i < s; ++i) {
    e[n + i] = (t & 255 << (r ? i : 1 - i) * 8) >>> (r ? i : 1 - i) * 8;
  }
}
function D(e, t, n, r) {
  if (t < 0) {
    t = 4294967295 + t + 1;
  }
  for (var i = 0, s = Math.min(e.length - n, 4); i < s; ++i) {
    e[n + i] = t >>> (r ? i : 3 - i) * 8 & 255;
  }
}
function B(e, t, n, r, i, s) {
  if (n + r > e.length) {
    throw new RangeError("Index out of range");
  }
  if (n < 0) {
    throw new RangeError("Index out of range");
  }
}
function U(e, t, n, r, s) {
  if (!s) {
    B(e, 0, n, 4);
  }
  i.write(e, t, n, r, 23, 4);
  return n + 4;
}
function F(e, t, n, r, s) {
  if (!s) {
    B(e, 0, n, 8);
  }
  i.write(e, t, n, r, 52, 8);
  return n + 8;
}
c.prototype.slice = function (e, t) {
  var n;
  var r = this.length;
  if ((e = ~~e) < 0) {
    if ((e += r) < 0) {
      e = 0;
    }
  } else if (e > r) {
    e = r;
  }
  if ((t = t === undefined ? r : ~~t) < 0) {
    if ((t += r) < 0) {
      t = 0;
    }
  } else if (t > r) {
    t = r;
  }
  if (t < e) {
    t = e;
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    (n = this.subarray(e, t)).__proto__ = c.prototype;
  } else {
    var i = t - e;
    n = new c(i, undefined);
    for (var s = 0; s < i; ++s) {
      n[s] = this[s + e];
    }
  }
  return n;
};
c.prototype.readUIntLE = function (e, t, n) {
  e |= 0;
  t |= 0;
  if (!n) {
    C(e, t, this.length);
  }
  var r = this[e];
  for (var i = 1, s = 0; ++s < t && (i *= 256);) {
    r += this[e + s] * i;
  }
  return r;
};
c.prototype.readUIntBE = function (e, t, n) {
  e |= 0;
  t |= 0;
  if (!n) {
    C(e, t, this.length);
  }
  var r = this[e + --t];
  for (var i = 1; t > 0 && (i *= 256);) {
    r += this[e + --t] * i;
  }
  return r;
};
c.prototype.readUInt8 = function (e, t) {
  if (!t) {
    C(e, 1, this.length);
  }
  return this[e];
};
c.prototype.readUInt16LE = function (e, t) {
  if (!t) {
    C(e, 2, this.length);
  }
  return this[e] | this[e + 1] << 8;
};
c.prototype.readUInt16BE = function (e, t) {
  if (!t) {
    C(e, 2, this.length);
  }
  return this[e] << 8 | this[e + 1];
};
c.prototype.readUInt32LE = function (e, t) {
  if (!t) {
    C(e, 4, this.length);
  }
  return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
};
c.prototype.readUInt32BE = function (e, t) {
  if (!t) {
    C(e, 4, this.length);
  }
  return this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
c.prototype.readIntLE = function (e, t, n) {
  e |= 0;
  t |= 0;
  if (!n) {
    C(e, t, this.length);
  }
  var r = this[e];
  for (var i = 1, s = 0; ++s < t && (i *= 256);) {
    r += this[e + s] * i;
  }
  if (r >= (i *= 128)) {
    r -= Math.pow(2, t * 8);
  }
  return r;
};
c.prototype.readIntBE = function (e, t, n) {
  e |= 0;
  t |= 0;
  if (!n) {
    C(e, t, this.length);
  }
  for (var r = t, i = 1, s = this[e + --r]; r > 0 && (i *= 256);) {
    s += this[e + --r] * i;
  }
  if (s >= (i *= 128)) {
    s -= Math.pow(2, t * 8);
  }
  return s;
};
c.prototype.readInt8 = function (e, t) {
  if (!t) {
    C(e, 1, this.length);
  }
  if (this[e] & 128) {
    return (255 - this[e] + 1) * -1;
  } else {
    return this[e];
  }
};
c.prototype.readInt16LE = function (e, t) {
  if (!t) {
    C(e, 2, this.length);
  }
  var n = this[e] | this[e + 1] << 8;
  if (n & 32768) {
    return n | 4294901760;
  } else {
    return n;
  }
};
c.prototype.readInt16BE = function (e, t) {
  if (!t) {
    C(e, 2, this.length);
  }
  var n = this[e + 1] | this[e] << 8;
  if (n & 32768) {
    return n | 4294901760;
  } else {
    return n;
  }
};
c.prototype.readInt32LE = function (e, t) {
  if (!t) {
    C(e, 4, this.length);
  }
  return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
c.prototype.readInt32BE = function (e, t) {
  if (!t) {
    C(e, 4, this.length);
  }
  return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
c.prototype.readFloatLE = function (e, t) {
  if (!t) {
    C(e, 4, this.length);
  }
  return i.read(this, e, true, 23, 4);
};
c.prototype.readFloatBE = function (e, t) {
  if (!t) {
    C(e, 4, this.length);
  }
  return i.read(this, e, false, 23, 4);
};
c.prototype.readDoubleLE = function (e, t) {
  if (!t) {
    C(e, 8, this.length);
  }
  return i.read(this, e, true, 52, 8);
};
c.prototype.readDoubleBE = function (e, t) {
  if (!t) {
    C(e, 8, this.length);
  }
  return i.read(this, e, false, 52, 8);
};
c.prototype.writeUIntLE = function (e, t, n, r) {
  if (!(e = +e, t |= 0, n |= 0, r)) {
    P(this, e, t, n, Math.pow(2, n * 8) - 1, 0);
  }
  var i = 1;
  var s = 0;
  for (this[t] = e & 255; ++s < n && (i *= 256);) {
    this[t + s] = e / i & 255;
  }
  return t + n;
};
c.prototype.writeUIntBE = function (e, t, n, r) {
  if (!(e = +e, t |= 0, n |= 0, r)) {
    P(this, e, t, n, Math.pow(2, n * 8) - 1, 0);
  }
  var i = n - 1;
  var s = 1;
  for (this[t + i] = e & 255; --i >= 0 && (s *= 256);) {
    this[t + i] = e / s & 255;
  }
  return t + n;
};
c.prototype.writeUInt8 = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 1, 255, 0);
  }
  if (!c.TYPED_ARRAY_SUPPORT) {
    e = Math.floor(e);
  }
  this[t] = e & 255;
  return t + 1;
};
c.prototype.writeUInt16LE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 2, 65535, 0);
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t] = e & 255;
    this[t + 1] = e >>> 8;
  } else {
    L(this, e, t, true);
  }
  return t + 2;
};
c.prototype.writeUInt16BE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 2, 65535, 0);
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t] = e >>> 8;
    this[t + 1] = e & 255;
  } else {
    L(this, e, t, false);
  }
  return t + 2;
};
c.prototype.writeUInt32LE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 4, 4294967295, 0);
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t + 3] = e >>> 24;
    this[t + 2] = e >>> 16;
    this[t + 1] = e >>> 8;
    this[t] = e & 255;
  } else {
    D(this, e, t, true);
  }
  return t + 4;
};
c.prototype.writeUInt32BE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 4, 4294967295, 0);
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t] = e >>> 24;
    this[t + 1] = e >>> 16;
    this[t + 2] = e >>> 8;
    this[t + 3] = e & 255;
  } else {
    D(this, e, t, false);
  }
  return t + 4;
};
c.prototype.writeIntLE = function (e, t, n, r) {
  e = +e;
  t |= 0;
  if (!r) {
    var i = Math.pow(2, n * 8 - 1);
    P(this, e, t, n, i - 1, -i);
  }
  var s = 0;
  var o = 1;
  var a = 0;
  for (this[t] = e & 255; ++s < n && (o *= 256);) {
    if (e < 0 && a === 0 && this[t + s - 1] !== 0) {
      a = 1;
    }
    this[t + s] = (e / o | 0) - a & 255;
  }
  return t + n;
};
c.prototype.writeIntBE = function (e, t, n, r) {
  e = +e;
  t |= 0;
  if (!r) {
    var i = Math.pow(2, n * 8 - 1);
    P(this, e, t, n, i - 1, -i);
  }
  var s = n - 1;
  var o = 1;
  var a = 0;
  for (this[t + s] = e & 255; --s >= 0 && (o *= 256);) {
    if (e < 0 && a === 0 && this[t + s + 1] !== 0) {
      a = 1;
    }
    this[t + s] = (e / o | 0) - a & 255;
  }
  return t + n;
};
c.prototype.writeInt8 = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 1, 127, -128);
  }
  if (!c.TYPED_ARRAY_SUPPORT) {
    e = Math.floor(e);
  }
  if (e < 0) {
    e = 255 + e + 1;
  }
  this[t] = e & 255;
  return t + 1;
};
c.prototype.writeInt16LE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 2, 32767, -32768);
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t] = e & 255;
    this[t + 1] = e >>> 8;
  } else {
    L(this, e, t, true);
  }
  return t + 2;
};
c.prototype.writeInt16BE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 2, 32767, -32768);
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t] = e >>> 8;
    this[t + 1] = e & 255;
  } else {
    L(this, e, t, false);
  }
  return t + 2;
};
c.prototype.writeInt32LE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 4, 2147483647, -2147483648);
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t] = e & 255;
    this[t + 1] = e >>> 8;
    this[t + 2] = e >>> 16;
    this[t + 3] = e >>> 24;
  } else {
    D(this, e, t, true);
  }
  return t + 4;
};
c.prototype.writeInt32BE = function (e, t, n) {
  e = +e;
  t |= 0;
  if (!n) {
    P(this, e, t, 4, 2147483647, -2147483648);
  }
  if (e < 0) {
    e = 4294967295 + e + 1;
  }
  if (c.TYPED_ARRAY_SUPPORT) {
    this[t] = e >>> 24;
    this[t + 1] = e >>> 16;
    this[t + 2] = e >>> 8;
    this[t + 3] = e & 255;
  } else {
    D(this, e, t, false);
  }
  return t + 4;
};
c.prototype.writeFloatLE = function (e, t, n) {
  return U(this, e, t, true, n);
};
c.prototype.writeFloatBE = function (e, t, n) {
  return U(this, e, t, false, n);
};
c.prototype.writeDoubleLE = function (e, t, n) {
  return F(this, e, t, true, n);
};
c.prototype.writeDoubleBE = function (e, t, n) {
  return F(this, e, t, false, n);
};
c.prototype.copy = function (e, t, n, r) {
  n ||= 0;
  if (!r && r !== 0) {
    r = this.length;
  }
  if (t >= e.length) {
    t = e.length;
  }
  t ||= 0;
  if (r > 0 && r < n) {
    r = n;
  }
  if (r === n) {
    return 0;
  }
  if (e.length === 0 || this.length === 0) {
    return 0;
  }
  if (t < 0) {
    throw new RangeError("targetStart out of bounds");
  }
  if (n < 0 || n >= this.length) {
    throw new RangeError("sourceStart out of bounds");
  }
  if (r < 0) {
    throw new RangeError("sourceEnd out of bounds");
  }
  if (r > this.length) {
    r = this.length;
  }
  if (e.length - t < r - n) {
    r = e.length - t + n;
  }
  var i;
  var s = r - n;
  if (this === e && n < t && t < r) {
    for (i = s - 1; i >= 0; --i) {
      e[i + t] = this[i + n];
    }
  } else if (s < 1000 || !c.TYPED_ARRAY_SUPPORT) {
    for (i = 0; i < s; ++i) {
      e[i + t] = this[i + n];
    }
  } else {
    Uint8Array.prototype.set.call(e, this.subarray(n, n + s), t);
  }
  return s;
};
c.prototype.fill = function (e, t, n, r) {
  if (typeof e == "string") {
    if (typeof t == "string") {
      r = t;
      t = 0;
      n = this.length;
    } else if (typeof n == "string") {
      r = n;
      n = this.length;
    }
    if (e.length === 1) {
      var i = e.charCodeAt(0);
      if (i < 256) {
        e = i;
      }
    }
    if (r !== undefined && typeof r != "string") {
      throw new TypeError("encoding must be a string");
    }
    if (typeof r == "string" && !c.isEncoding(r)) {
      throw new TypeError("Unknown encoding: " + r);
    }
  } else if (typeof e == "number") {
    e &= 255;
  }
  if (t < 0 || this.length < t || this.length < n) {
    throw new RangeError("Out of range index");
  }
  if (n <= t) {
    return this;
  }
  var s;
  t >>>= 0;
  n = n === undefined ? this.length : n >>> 0;
  e ||= 0;
  if (typeof e == "number") {
    for (s = t; s < n; ++s) {
      this[s] = e;
    }
  } else {
    var o = c.isBuffer(e) ? e : G(new c(e, r).toString());
    var a = o.length;
    for (s = 0; s < n - t; ++s) {
      this[s + t] = o[s % a];
    }
  }
  return this;
};
var j = /[^+\/0-9A-Za-z-_]/g;
function z(e) {
  if (e < 16) {
    return "0" + e.toString(16);
  } else {
    return e.toString(16);
  }
}
function G(e, t) {
  var n;
  t = t || Infinity;
  for (var r = e.length, i = null, s = [], o = 0; o < r; ++o) {
    if ((n = e.charCodeAt(o)) > 55295 && n < 57344) {
      if (!i) {
        if (n > 56319) {
          if ((t -= 3) > -1) {
            s.push(239, 191, 189);
          }
          continue;
        }
        if (o + 1 === r) {
          if ((t -= 3) > -1) {
            s.push(239, 191, 189);
          }
          continue;
        }
        i = n;
        continue;
      }
      if (n < 56320) {
        if ((t -= 3) > -1) {
          s.push(239, 191, 189);
        }
        i = n;
        continue;
      }
      n = 65536 + (i - 55296 << 10 | n - 56320);
    } else if (i && (t -= 3) > -1) {
      s.push(239, 191, 189);
    }
    i = null;
    if (n < 128) {
      if ((t -= 1) < 0) {
        break;
      }
      s.push(n);
    } else if (n < 2048) {
      if ((t -= 2) < 0) {
        break;
      }
      s.push(n >> 6 | 192, n & 63 | 128);
    } else if (n < 65536) {
      if ((t -= 3) < 0) {
        break;
      }
      s.push(n >> 12 | 224, n >> 6 & 63 | 128, n & 63 | 128);
    } else {
      if (!(n < 1114112)) {
        throw new Error("Invalid code point");
      }
      if ((t -= 4) < 0) {
        break;
      }
      s.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, n & 63 | 128);
    }
  }
  return s;
}
function V(e) {
  return r.toByteArray(function (e) {
    if ((e = function (e) {
      if (e.trim) {
        return e.trim();
      } else {
        return e.replace(/^\s+|\s+$/g, "");
      }
    }(e).replace(j, "")).length < 2) {
      return "";
    }
    while (e.length % 4 != 0) {
      e += "=";
    }
    return e;
  }(e));
}
function _(e, t, n, r) {
  for (var i = 0; i < r && !(i + n >= t.length) && !(i >= e.length); ++i) {
    t[i + n] = e[i];
  }
  return i;
}