(function (e) {
  "use strict";

  var t = typeof Uint8Array != "undefined" ? Uint8Array : Array;
  var n = "+".charCodeAt(0);
  var r = "/".charCodeAt(0);
  var i = "0".charCodeAt(0);
  var s = "a".charCodeAt(0);
  var o = "A".charCodeAt(0);
  var a = "-".charCodeAt(0);
  var c = "_".charCodeAt(0);
  function l(e) {
    var t = e.charCodeAt(0);
    if (t === n || t === a) {
      return 62;
    } else if (t === r || t === c) {
      return 63;
    } else if (t < i) {
      return -1;
    } else if (t < i + 10) {
      return t - i + 26 + 26;
    } else if (t < o + 26) {
      return t - o;
    } else if (t < s + 26) {
      return t - s + 26;
    } else {
      return undefined;
    }
  }
  e.toByteArray = function (e) {
    var n;
    var r;
    var i;
    var s;
    var o;
    var a;
    if (e.length % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var c = e.length;
    o = e.charAt(c - 2) === "=" ? 2 : e.charAt(c - 1) === "=" ? 1 : 0;
    a = new t(e.length * 3 / 4 - o);
    i = o > 0 ? e.length - 4 : e.length;
    var u = 0;
    function h(e) {
      a[u++] = e;
    }
    n = 0;
    r = 0;
    for (; n < i; n += 4, r += 3) {
      h(((s = l(e.charAt(n)) << 18 | l(e.charAt(n + 1)) << 12 | l(e.charAt(n + 2)) << 6 | l(e.charAt(n + 3))) & 16711680) >> 16);
      h((s & 65280) >> 8);
      h(s & 255);
    }
    if (o === 2) {
      h((s = l(e.charAt(n)) << 2 | l(e.charAt(n + 1)) >> 4) & 255);
    } else if (o === 1) {
      h((s = l(e.charAt(n)) << 10 | l(e.charAt(n + 1)) << 4 | l(e.charAt(n + 2)) >> 2) >> 8 & 255);
      h(s & 255);
    }
    return a;
  };
  e.fromByteArray = function (e) {
    var t;
    var n;
    var r;
    var i;
    var s = e.length % 3;
    var o = "";
    function a(e) {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e);
    }
    t = 0;
    r = e.length - s;
    for (; t < r; t += 3) {
      n = (e[t] << 16) + (e[t + 1] << 8) + e[t + 2];
      o += a((i = n) >> 18 & 63) + a(i >> 12 & 63) + a(i >> 6 & 63) + a(i & 63);
    }
    switch (s) {
      case 1:
        o += a((n = e[e.length - 1]) >> 2);
        o += a(n << 4 & 63);
        o += "==";
        break;
      case 2:
        o += a((n = (e[e.length - 2] << 8) + e[e.length - 1]) >> 10);
        o += a(n >> 4 & 63);
        o += a(n << 2 & 63);
        o += "=";
    }
    return o;
  };
})(exports);