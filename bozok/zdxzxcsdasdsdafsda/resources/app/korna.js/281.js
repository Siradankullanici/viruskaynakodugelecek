function n() {
  this.table = new Uint16Array(16);
  this.trans = new Uint16Array(288);
}
function r(e, t) {
  this.source = e;
  this.sourceIndex = 0;
  this.tag = 0;
  this.bitcount = 0;
  this.dest = t;
  this.destLen = 0;
  this.ltree = new n();
  this.dtree = new n();
}
var i = new n();
var s = new n();
var o = new Uint8Array(30);
var a = new Uint16Array(30);
var c = new Uint8Array(30);
var l = new Uint16Array(30);
var u = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var h = new n();
var d = new Uint8Array(320);
function p(e, t, n, r) {
  var i;
  var s;
  for (i = 0; i < n; ++i) {
    e[i] = 0;
  }
  for (i = 0; i < 30 - n; ++i) {
    e[i + n] = i / n | 0;
  }
  s = r;
  i = 0;
  for (; i < 30; ++i) {
    t[i] = s;
    s += 1 << e[i];
  }
}
var f = new Uint16Array(16);
function m(e, t, n, r) {
  var i;
  var s;
  for (i = 0; i < 16; ++i) {
    e.table[i] = 0;
  }
  for (i = 0; i < r; ++i) {
    e.table[t[n + i]]++;
  }
  e.table[0] = 0;
  s = 0;
  i = 0;
  for (; i < 16; ++i) {
    f[i] = s;
    s += e.table[i];
  }
  for (i = 0; i < r; ++i) {
    if (t[n + i]) {
      e.trans[f[t[n + i]]++] = i;
    }
  }
}
function g(e) {
  if (!e.bitcount--) {
    e.tag = e.source[e.sourceIndex++];
    e.bitcount = 7;
  }
  var t = e.tag & 1;
  e.tag >>>= 1;
  return t;
}
function b(e, t, n) {
  if (!t) {
    return n;
  }
  while (e.bitcount < 24) {
    e.tag |= e.source[e.sourceIndex++] << e.bitcount;
    e.bitcount += 8;
  }
  var r = e.tag & 65535 >>> 16 - t;
  e.tag >>>= t;
  e.bitcount -= t;
  return r + n;
}
function y(e, t) {
  while (e.bitcount < 24) {
    e.tag |= e.source[e.sourceIndex++] << e.bitcount;
    e.bitcount += 8;
  }
  var n = 0;
  var r = 0;
  var i = 0;
  var s = e.tag;
  do {
    r = r * 2 + (s & 1);
    s >>>= 1;
    ++i;
    n += t.table[i];
    r -= t.table[i];
  } while (r >= 0);
  e.tag = s;
  e.bitcount -= i;
  return t.trans[n + r];
}
function E(e, t, n) {
  var r;
  var i;
  var s;
  var o;
  var a;
  var c;
  r = b(e, 5, 257);
  i = b(e, 5, 1);
  s = b(e, 4, 4);
  o = 0;
  for (; o < 19; ++o) {
    d[o] = 0;
  }
  for (o = 0; o < s; ++o) {
    var l = b(e, 3, 0);
    d[u[o]] = l;
  }
  m(h, d, 0, 19);
  a = 0;
  while (a < r + i) {
    var p = y(e, h);
    switch (p) {
      case 16:
        var f = d[a - 1];
        for (c = b(e, 2, 3); c; --c) {
          d[a++] = f;
        }
        break;
      case 17:
        for (c = b(e, 3, 3); c; --c) {
          d[a++] = 0;
        }
        break;
      case 18:
        for (c = b(e, 7, 11); c; --c) {
          d[a++] = 0;
        }
        break;
      default:
        d[a++] = p;
    }
  }
  m(t, d, 0, r);
  m(n, d, r, i);
}
function T(e, t, n) {
  while (true) {
    var r;
    var i;
    var s;
    var u;
    var h = y(e, t);
    if (h === 256) {
      return 0;
    }
    if (h < 256) {
      e.dest[e.destLen++] = h;
    } else {
      r = b(e, o[h -= 257], a[h]);
      i = y(e, n);
      u = s = e.destLen - b(e, c[i], l[i]);
      for (; u < s + r; ++u) {
        e.dest[e.destLen++] = e.dest[u];
      }
    }
  }
}
function v(e) {
  var t;
  var n;
  while (e.bitcount > 8) {
    e.sourceIndex--;
    e.bitcount -= 8;
  }
  if ((t = (t = e.source[e.sourceIndex + 1]) * 256 + e.source[e.sourceIndex]) !== (~(e.source[e.sourceIndex + 3] * 256 + e.source[e.sourceIndex + 2]) & 65535)) {
    return -3;
  }
  e.sourceIndex += 4;
  n = t;
  for (; n; --n) {
    e.dest[e.destLen++] = e.source[e.sourceIndex++];
  }
  e.bitcount = 0;
  return 0;
}
(function (e, t) {
  var n;
  for (n = 0; n < 7; ++n) {
    e.table[n] = 0;
  }
  e.table[7] = 24;
  e.table[8] = 152;
  e.table[9] = 112;
  n = 0;
  for (; n < 24; ++n) {
    e.trans[n] = 256 + n;
  }
  for (n = 0; n < 144; ++n) {
    e.trans[24 + n] = n;
  }
  for (n = 0; n < 8; ++n) {
    e.trans[168 + n] = 280 + n;
  }
  for (n = 0; n < 112; ++n) {
    e.trans[176 + n] = 144 + n;
  }
  for (n = 0; n < 5; ++n) {
    t.table[n] = 0;
  }
  t.table[5] = 32;
  n = 0;
  for (; n < 32; ++n) {
    t.trans[n] = n;
  }
})(i, s);
p(o, a, 4, 3);
p(c, l, 2, 1);
o[28] = 0;
a[28] = 258;
module.exports = function (e, t) {
  var n;
  var o;
  var a = new r(e, t);
  do {
    n = g(a);
    switch (b(a, 2, 0)) {
      case 0:
        o = v(a);
        break;
      case 1:
        o = T(a, i, s);
        break;
      case 2:
        E(a, a.ltree, a.dtree);
        o = T(a, a.ltree, a.dtree);
        break;
      default:
        o = -3;
    }
    if (o !== 0) {
      throw new Error("Data error");
    }
  } while (!n);
  if (a.destLen < a.dest.length) {
    if (typeof a.dest.slice == "function") {
      return a.dest.slice(0, a.destLen);
    } else {
      return a.dest.subarray(0, a.destLen);
    }
  } else {
    return a.dest;
  }
};