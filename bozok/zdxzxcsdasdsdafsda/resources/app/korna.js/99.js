exports.byteLength = function (e) {
  var t = c(e);
  var n = t[0];
  var r = t[1];
  return (n + r) * 3 / 4 - r;
};
exports.toByteArray = function (e) {
  var t;
  var n = c(e);
  var r = n[0];
  var o = n[1];
  var a = new s(function (e, t, n) {
    return (t + n) * 3 / 4 - n;
  }(0, r, o));
  var l = 0;
  for (var u = o > 0 ? r - 4 : r, h = 0; h < u; h += 4) {
    t = i[e.charCodeAt(h)] << 18 | i[e.charCodeAt(h + 1)] << 12 | i[e.charCodeAt(h + 2)] << 6 | i[e.charCodeAt(h + 3)];
    a[l++] = t >> 16 & 255;
    a[l++] = t >> 8 & 255;
    a[l++] = t & 255;
  }
  if (o === 2) {
    t = i[e.charCodeAt(h)] << 2 | i[e.charCodeAt(h + 1)] >> 4;
    a[l++] = t & 255;
  }
  if (o === 1) {
    t = i[e.charCodeAt(h)] << 10 | i[e.charCodeAt(h + 1)] << 4 | i[e.charCodeAt(h + 2)] >> 2;
    a[l++] = t >> 8 & 255;
    a[l++] = t & 255;
  }
  return a;
};
exports.fromByteArray = function (e) {
  var t;
  var n = e.length;
  var i = n % 3;
  var s = [];
  for (var o = 16383, a = 0, c = n - i; a < c; a += o) {
    s.push(l(e, a, a + o > c ? c : a + o));
  }
  if (i === 1) {
    t = e[n - 1];
    s.push(r[t >> 2] + r[t << 4 & 63] + "==");
  } else if (i === 2) {
    t = (e[n - 2] << 8) + e[n - 1];
    s.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "=");
  }
  return s.join("");
};
var r = [];
var i = [];
var s = typeof Uint8Array != "undefined" ? Uint8Array : Array;
var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var a = 0; a < 64; ++a) {
  r[a] = o[a];
  i[o.charCodeAt(a)] = a;
}
function c(e) {
  var t = e.length;
  if (t % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var n = e.indexOf("=");
  if (n === -1) {
    n = t;
  }
  return [n, n === t ? 0 : 4 - n % 4];
}
function l(e, t, n) {
  var i;
  var s;
  var o = [];
  for (var a = t; a < n; a += 3) {
    i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (e[a + 2] & 255);
    o.push(r[(s = i) >> 18 & 63] + r[s >> 12 & 63] + r[s >> 6 & 63] + r[s & 63]);
  }
  return o.join("");
}
i["-".charCodeAt(0)] = 62;
i["_".charCodeAt(0)] = 63;