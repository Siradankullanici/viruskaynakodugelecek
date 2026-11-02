exports.byteLength = function (e) {
  return e.length * 3 / 4 - c(e);
};
exports.toByteArray = function (e) {
  var t;
  var n;
  var r;
  var o;
  var a;
  var l = e.length;
  o = c(e);
  a = new s(l * 3 / 4 - o);
  n = o > 0 ? l - 4 : l;
  var u = 0;
  for (t = 0; t < n; t += 4) {
    r = i[e.charCodeAt(t)] << 18 | i[e.charCodeAt(t + 1)] << 12 | i[e.charCodeAt(t + 2)] << 6 | i[e.charCodeAt(t + 3)];
    a[u++] = r >> 16 & 255;
    a[u++] = r >> 8 & 255;
    a[u++] = r & 255;
  }
  if (o === 2) {
    r = i[e.charCodeAt(t)] << 2 | i[e.charCodeAt(t + 1)] >> 4;
    a[u++] = r & 255;
  } else if (o === 1) {
    r = i[e.charCodeAt(t)] << 10 | i[e.charCodeAt(t + 1)] << 4 | i[e.charCodeAt(t + 2)] >> 2;
    a[u++] = r >> 8 & 255;
    a[u++] = r & 255;
  }
  return a;
};
exports.fromByteArray = function (e) {
  var t;
  var n = e.length;
  var i = n % 3;
  var s = "";
  var o = [];
  for (var a = 16383, c = 0, u = n - i; c < u; c += a) {
    o.push(l(e, c, c + a > u ? u : c + a));
  }
  if (i === 1) {
    t = e[n - 1];
    s += r[t >> 2];
    s += r[t << 4 & 63];
    s += "==";
  } else if (i === 2) {
    t = (e[n - 2] << 8) + e[n - 1];
    s += r[t >> 10];
    s += r[t >> 4 & 63];
    s += r[t << 2 & 63];
    s += "=";
  }
  o.push(s);
  return o.join("");
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
  if (e[t - 2] === "=") {
    return 2;
  } else if (e[t - 1] === "=") {
    return 1;
  } else {
    return 0;
  }
}
function l(e, t, n) {
  var i;
  var s;
  var o = [];
  for (var a = t; a < n; a += 3) {
    i = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2];
    o.push(r[(s = i) >> 18 & 63] + r[s >> 12 & 63] + r[s >> 6 & 63] + r[s & 63]);
  }
  return o.join("");
}
i["-".charCodeAt(0)] = 62;
i["_".charCodeAt(0)] = 63;