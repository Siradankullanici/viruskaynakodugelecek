var r;
var i = new Uint8Array(16);
function s() {
  if (!r && !(r = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto))) {
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  }
  return r(i);
}
var o = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
export var validate = function (e) {
  return typeof e == "string" && o.test(e);
};
var c = [];
for (var l = 0; l < 256; ++l) {
  c.push((l + 256).toString(16).substr(1));
}
var u;
var h;
export function stringify(e, t = 0) {
  var n = (c[e[t + 0]] + c[e[t + 1]] + c[e[t + 2]] + c[e[t + 3]] + "-" + c[e[t + 4]] + c[e[t + 5]] + "-" + c[e[t + 6]] + c[e[t + 7]] + "-" + c[e[t + 8]] + c[e[t + 9]] + "-" + c[e[t + 10]] + c[e[t + 11]] + c[e[t + 12]] + c[e[t + 13]] + c[e[t + 14]] + c[e[t + 15]]).toLowerCase();
  if (!validate(n)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return n;
}
var p = 0;
var f = 0;
export function v1(e, t, n) {
  var r = t && n || 0;
  var i = t || new Array(16);
  var o = (e = e || {}).node || u;
  var a = e.clockseq !== undefined ? e.clockseq : h;
  if (o == null || a == null) {
    var c = e.random || (e.rng || s)();
    if (o == null) {
      o = u = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]];
    }
    if (a == null) {
      a = h = (c[6] << 8 | c[7]) & 16383;
    }
  }
  var l = e.msecs !== undefined ? e.msecs : Date.now();
  var m = e.nsecs !== undefined ? e.nsecs : f + 1;
  var g = l - p + (m - f) / 10000;
  if (g < 0 && e.clockseq === undefined) {
    a = a + 1 & 16383;
  }
  if ((g < 0 || l > p) && e.nsecs === undefined) {
    m = 0;
  }
  if (m >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  p = l;
  f = m;
  h = a;
  var b = (((l += 12219292800000) & 268435455) * 10000 + m) % 4294967296;
  i[r++] = b >>> 24 & 255;
  i[r++] = b >>> 16 & 255;
  i[r++] = b >>> 8 & 255;
  i[r++] = b & 255;
  var y = l / 4294967296 * 10000 & 268435455;
  i[r++] = y >>> 8 & 255;
  i[r++] = y & 255;
  i[r++] = y >>> 24 & 15 | 16;
  i[r++] = y >>> 16 & 255;
  i[r++] = a >>> 8 | 128;
  i[r++] = a & 255;
  for (var E = 0; E < 6; ++E) {
    i[r + E] = o[E];
  }
  return t || stringify(i);
}
export function parse(e) {
  if (!validate(e)) {
    throw TypeError("Invalid UUID");
  }
  var t;
  var n = new Uint8Array(16);
  n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24;
  n[1] = t >>> 16 & 255;
  n[2] = t >>> 8 & 255;
  n[3] = t & 255;
  n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8;
  n[5] = t & 255;
  n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8;
  n[7] = t & 255;
  n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8;
  n[9] = t & 255;
  n[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255;
  n[11] = t / 4294967296 & 255;
  n[12] = t >>> 24 & 255;
  n[13] = t >>> 16 & 255;
  n[14] = t >>> 8 & 255;
  n[15] = t & 255;
  return n;
}
function b(e, t, n) {
  function r(e, r, i, s) {
    if (typeof e == "string") {
      e = function (e) {
        e = unescape(encodeURIComponent(e));
        var t = [];
        for (var n = 0; n < e.length; ++n) {
          t.push(e.charCodeAt(n));
        }
        return t;
      }(e);
    }
    if (typeof r == "string") {
      r = parse(r);
    }
    if (r.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var o = new Uint8Array(16 + e.length);
    o.set(r);
    o.set(e, r.length);
    (o = n(o))[6] = o[6] & 15 | t;
    o[8] = o[8] & 63 | 128;
    if (i) {
      s = s || 0;
      for (var a = 0; a < 16; ++a) {
        i[s + a] = o[a];
      }
      return i;
    }
    return stringify(o);
  }
  try {
    r.name = e;
  } catch (e) {}
  r.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  r.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  return r;
}
function y(e) {
  return 14 + (e + 64 >>> 9 << 4) + 1;
}
function E(e, t) {
  var n = (e & 65535) + (t & 65535);
  return (e >> 16) + (t >> 16) + (n >> 16) << 16 | n & 65535;
}
function T(e, t, n, r, i, s) {
  return E((o = E(E(t, e), E(r, s))) << (a = i) | o >>> 32 - a, n);
  var o;
  var a;
}
function v(e, t, n, r, i, s, o) {
  return T(t & n | ~t & r, e, t, i, s, o);
}
function A(e, t, n, r, i, s, o) {
  return T(t & r | n & ~r, e, t, i, s, o);
}
function w(e, t, n, r, i, s, o) {
  return T(t ^ n ^ r, e, t, i, s, o);
}
function S(e, t, n, r, i, s, o) {
  return T(n ^ (t | ~r), e, t, i, s, o);
}
export var v3 = b("v3", 48, function (e) {
  if (typeof e == "string") {
    var t = unescape(encodeURIComponent(e));
    e = new Uint8Array(t.length);
    for (var n = 0; n < t.length; ++n) {
      e[n] = t.charCodeAt(n);
    }
  }
  return function (e) {
    var t = [];
    for (var n = e.length * 32, r = "0123456789abcdef", i = 0; i < n; i += 8) {
      var s = e[i >> 5] >>> i % 32 & 255;
      var o = parseInt(r.charAt(s >>> 4 & 15) + r.charAt(s & 15), 16);
      t.push(o);
    }
    return t;
  }(function (e, t) {
    e[t >> 5] |= 128 << t % 32;
    e[y(t) - 1] = t;
    var n = 1732584193;
    var r = -271733879;
    var i = -1732584194;
    var s = 271733878;
    for (var o = 0; o < e.length; o += 16) {
      var a = n;
      var c = r;
      var l = i;
      var u = s;
      n = v(n, r, i, s, e[o], 7, -680876936);
      s = v(s, n, r, i, e[o + 1], 12, -389564586);
      i = v(i, s, n, r, e[o + 2], 17, 606105819);
      r = v(r, i, s, n, e[o + 3], 22, -1044525330);
      n = v(n, r, i, s, e[o + 4], 7, -176418897);
      s = v(s, n, r, i, e[o + 5], 12, 1200080426);
      i = v(i, s, n, r, e[o + 6], 17, -1473231341);
      r = v(r, i, s, n, e[o + 7], 22, -45705983);
      n = v(n, r, i, s, e[o + 8], 7, 1770035416);
      s = v(s, n, r, i, e[o + 9], 12, -1958414417);
      i = v(i, s, n, r, e[o + 10], 17, -42063);
      r = v(r, i, s, n, e[o + 11], 22, -1990404162);
      n = v(n, r, i, s, e[o + 12], 7, 1804603682);
      s = v(s, n, r, i, e[o + 13], 12, -40341101);
      i = v(i, s, n, r, e[o + 14], 17, -1502002290);
      n = A(n, r = v(r, i, s, n, e[o + 15], 22, 1236535329), i, s, e[o + 1], 5, -165796510);
      s = A(s, n, r, i, e[o + 6], 9, -1069501632);
      i = A(i, s, n, r, e[o + 11], 14, 643717713);
      r = A(r, i, s, n, e[o], 20, -373897302);
      n = A(n, r, i, s, e[o + 5], 5, -701558691);
      s = A(s, n, r, i, e[o + 10], 9, 38016083);
      i = A(i, s, n, r, e[o + 15], 14, -660478335);
      r = A(r, i, s, n, e[o + 4], 20, -405537848);
      n = A(n, r, i, s, e[o + 9], 5, 568446438);
      s = A(s, n, r, i, e[o + 14], 9, -1019803690);
      i = A(i, s, n, r, e[o + 3], 14, -187363961);
      r = A(r, i, s, n, e[o + 8], 20, 1163531501);
      n = A(n, r, i, s, e[o + 13], 5, -1444681467);
      s = A(s, n, r, i, e[o + 2], 9, -51403784);
      i = A(i, s, n, r, e[o + 7], 14, 1735328473);
      n = w(n, r = A(r, i, s, n, e[o + 12], 20, -1926607734), i, s, e[o + 5], 4, -378558);
      s = w(s, n, r, i, e[o + 8], 11, -2022574463);
      i = w(i, s, n, r, e[o + 11], 16, 1839030562);
      r = w(r, i, s, n, e[o + 14], 23, -35309556);
      n = w(n, r, i, s, e[o + 1], 4, -1530992060);
      s = w(s, n, r, i, e[o + 4], 11, 1272893353);
      i = w(i, s, n, r, e[o + 7], 16, -155497632);
      r = w(r, i, s, n, e[o + 10], 23, -1094730640);
      n = w(n, r, i, s, e[o + 13], 4, 681279174);
      s = w(s, n, r, i, e[o], 11, -358537222);
      i = w(i, s, n, r, e[o + 3], 16, -722521979);
      r = w(r, i, s, n, e[o + 6], 23, 76029189);
      n = w(n, r, i, s, e[o + 9], 4, -640364487);
      s = w(s, n, r, i, e[o + 12], 11, -421815835);
      i = w(i, s, n, r, e[o + 15], 16, 530742520);
      n = S(n, r = w(r, i, s, n, e[o + 2], 23, -995338651), i, s, e[o], 6, -198630844);
      s = S(s, n, r, i, e[o + 7], 10, 1126891415);
      i = S(i, s, n, r, e[o + 14], 15, -1416354905);
      r = S(r, i, s, n, e[o + 5], 21, -57434055);
      n = S(n, r, i, s, e[o + 12], 6, 1700485571);
      s = S(s, n, r, i, e[o + 3], 10, -1894986606);
      i = S(i, s, n, r, e[o + 10], 15, -1051523);
      r = S(r, i, s, n, e[o + 1], 21, -2054922799);
      n = S(n, r, i, s, e[o + 8], 6, 1873313359);
      s = S(s, n, r, i, e[o + 15], 10, -30611744);
      i = S(i, s, n, r, e[o + 6], 15, -1560198380);
      r = S(r, i, s, n, e[o + 13], 21, 1309151649);
      n = S(n, r, i, s, e[o + 4], 6, -145523070);
      s = S(s, n, r, i, e[o + 11], 10, -1120210379);
      i = S(i, s, n, r, e[o + 2], 15, 718787259);
      r = S(r, i, s, n, e[o + 9], 21, -343485551);
      n = E(n, a);
      r = E(r, c);
      i = E(i, l);
      s = E(s, u);
    }
    return [n, r, i, s];
  }(function (e) {
    if (e.length === 0) {
      return [];
    }
    for (var t = e.length * 8, n = new Uint32Array(y(t)), r = 0; r < t; r += 8) {
      n[r >> 5] |= (e[r / 8] & 255) << r % 32;
    }
    return n;
  }(e), e.length * 8));
});
export function v4(e, t, n) {
  var r = (e = e || {}).random || (e.rng || s)();
  r[6] = r[6] & 15 | 64;
  r[8] = r[8] & 63 | 128;
  if (t) {
    n = n || 0;
    for (var i = 0; i < 16; ++i) {
      t[n + i] = r[i];
    }
    return t;
  }
  return stringify(r);
}
function O(e, t, n, r) {
  switch (e) {
    case 0:
      return t & n ^ ~t & r;
    case 1:
    case 3:
      return t ^ n ^ r;
    case 2:
      return t & n ^ t & r ^ n & r;
  }
}
function N(e, t) {
  return e << t | e >>> 32 - t;
}
export var v5 = b("v5", 80, function (e) {
  var t = [1518500249, 1859775393, 2400959708, 3395469782];
  var n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof e == "string") {
    var r = unescape(encodeURIComponent(e));
    e = [];
    for (var i = 0; i < r.length; ++i) {
      e.push(r.charCodeAt(i));
    }
  } else if (!Array.isArray(e)) {
    e = Array.prototype.slice.call(e);
  }
  e.push(128);
  var s = e.length / 4 + 2;
  for (var o = Math.ceil(s / 16), a = new Array(o), c = 0; c < o; ++c) {
    var l = new Uint32Array(16);
    for (var u = 0; u < 16; ++u) {
      l[u] = e[c * 64 + u * 4] << 24 | e[c * 64 + u * 4 + 1] << 16 | e[c * 64 + u * 4 + 2] << 8 | e[c * 64 + u * 4 + 3];
    }
    a[c] = l;
  }
  a[o - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32);
  a[o - 1][14] = Math.floor(a[o - 1][14]);
  a[o - 1][15] = (e.length - 1) * 8 & 4294967295;
  for (var h = 0; h < o; ++h) {
    var d = new Uint32Array(80);
    for (var p = 0; p < 16; ++p) {
      d[p] = a[h][p];
    }
    for (var f = 16; f < 80; ++f) {
      d[f] = N(d[f - 3] ^ d[f - 8] ^ d[f - 14] ^ d[f - 16], 1);
    }
    var m = n[0];
    var g = n[1];
    var b = n[2];
    var y = n[3];
    var E = n[4];
    for (var T = 0; T < 80; ++T) {
      var v = Math.floor(T / 20);
      var A = N(m, 5) + O(v, g, b, y) + E + t[v] + d[T] >>> 0;
      E = y;
      y = b;
      b = N(g, 30) >>> 0;
      g = m;
      m = A;
    }
    n[0] = n[0] + m >>> 0;
    n[1] = n[1] + g >>> 0;
    n[2] = n[2] + b >>> 0;
    n[3] = n[3] + y >>> 0;
    n[4] = n[4] + E >>> 0;
  }
  return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, n[0] & 255, n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, n[1] & 255, n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, n[2] & 255, n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, n[3] & 255, n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, n[4] & 255];
});
export var NIL = "00000000-0000-0000-0000-000000000000";
export function version(e) {
  if (!validate(e)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(e.substr(14, 1), 16);
}