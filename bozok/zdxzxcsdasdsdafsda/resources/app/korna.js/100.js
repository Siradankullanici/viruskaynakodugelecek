exports.read = function (e, t, n, r, i) {
  var s;
  var o;
  var a = i * 8 - r - 1;
  var c = (1 << a) - 1;
  var l = c >> 1;
  var u = -7;
  var h = n ? i - 1 : 0;
  var d = n ? -1 : 1;
  var p = e[t + h];
  h += d;
  s = p & (1 << -u) - 1;
  p >>= -u;
  u += a;
  for (; u > 0; u -= 8) {
    s = s * 256 + e[t + h];
    h += d;
  }
  o = s & (1 << -u) - 1;
  s >>= -u;
  u += r;
  for (; u > 0; u -= 8) {
    o = o * 256 + e[t + h];
    h += d;
  }
  if (s === 0) {
    s = 1 - l;
  } else {
    if (s === c) {
      if (o) {
        return NaN;
      } else {
        return (p ? -1 : 1) * Infinity;
      }
    }
    o += Math.pow(2, r);
    s -= l;
  }
  return (p ? -1 : 1) * o * Math.pow(2, s - r);
};
exports.write = function (e, t, n, r, i, s) {
  var o;
  var a;
  var c;
  var l = s * 8 - i - 1;
  var u = (1 << l) - 1;
  var h = u >> 1;
  var d = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var p = r ? 0 : s - 1;
  var f = r ? 1 : -1;
  var m = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  t = Math.abs(t);
  if (isNaN(t) || t === Infinity) {
    a = isNaN(t) ? 1 : 0;
    o = u;
  } else {
    o = Math.floor(Math.log(t) / Math.LN2);
    if (t * (c = Math.pow(2, -o)) < 1) {
      o--;
      c *= 2;
    }
    if ((t += o + h >= 1 ? d / c : d * Math.pow(2, 1 - h)) * c >= 2) {
      o++;
      c /= 2;
    }
    if (o + h >= u) {
      a = 0;
      o = u;
    } else if (o + h >= 1) {
      a = (t * c - 1) * Math.pow(2, i);
      o += h;
    } else {
      a = t * Math.pow(2, h - 1) * Math.pow(2, i);
      o = 0;
    }
  }
  for (; i >= 8; i -= 8) {
    e[n + p] = a & 255;
    p += f;
    a /= 256;
  }
  o = o << i | a;
  l += i;
  for (; l > 0; l -= 8) {
    e[n + p] = o & 255;
    p += f;
    o /= 256;
  }
  e[n + p - f] |= m * 128;
};