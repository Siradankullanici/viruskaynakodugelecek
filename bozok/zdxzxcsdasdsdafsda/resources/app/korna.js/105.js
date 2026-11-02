var e = require("./8.js");
(function (e) {
  function t() {}
  function n() {}
  var r = String.fromCharCode;
  var i = {}.toString;
  var s = i.call(e.SharedArrayBuffer);
  var o = i();
  var a = e.Uint8Array;
  var c = a || Array;
  var l = a ? ArrayBuffer : c;
  var u = l.isView || function (e) {
    return e && "length" in e;
  };
  var h = i.call(l.prototype);
  l = n.prototype;
  var d = e.TextEncoder;
  var p = new (a ? Uint16Array : c)(32);
  t.prototype.decode = function (e) {
    if (!u(e)) {
      var t = i.call(e);
      if (t !== h && t !== s && t !== o) {
        throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
      }
      e = a ? new c(e) : e || [];
    }
    var n;
    for (var l, d, f = t = "", m = 0, g = e.length | 0, b = g - 32 | 0, y = 0, E = 0, T = 0, v = -1; m < g;) {
      for (n = m <= b ? 32 : g - m | 0; T < n; m = m + 1 | 0, T = T + 1 | 0) {
        switch ((l = e[m] & 255) >> 4) {
          case 15:
            if ((d = e[m = m + 1 | 0] & 255) >> 6 != 2 || l > 247) {
              m = m - 1 | 0;
              break;
            }
            y = (l & 7) << 6 | d & 63;
            E = 5;
            l = 256;
          case 14:
            y <<= 6;
            y |= (l & 15) << 6 | (d = e[m = m + 1 | 0] & 255) & 63;
            E = d >> 6 == 2 ? E + 4 | 0 : 24;
            l = l + 256 & 768;
          case 13:
          case 12:
            y <<= 6;
            y |= (l & 31) << 6 | (d = e[m = m + 1 | 0] & 255) & 63;
            E = E + 7 | 0;
            if (m < g && d >> 6 == 2 && y >> E && y < 1114112) {
              l = y;
              if ((y = y - 65536 | 0) >= 0) {
                v = 55296 + (y >> 10) | 0;
                l = 56320 + (y & 1023) | 0;
                if (T < 31) {
                  p[T] = v;
                  T = T + 1 | 0;
                  v = -1;
                } else {
                  d = v;
                  v = l;
                  l = d;
                }
              }
            } else {
              m = m - (l >>= 8) - 1 | 0;
              l = 65533;
            }
            y = E = 0;
            n = m <= b ? 32 : g - m | 0;
          default:
            p[T] = l;
            continue;
          case 11:
          case 10:
          case 9:
          case 8:
        }
        p[T] = 65533;
      }
      f += r(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10], p[11], p[12], p[13], p[14], p[15], p[16], p[17], p[18], p[19], p[20], p[21], p[22], p[23], p[24], p[25], p[26], p[27], p[28], p[29], p[30], p[31]);
      if (T < 32) {
        f = f.slice(0, T - 32 | 0);
      }
      if (m < g) {
        p[0] = v;
        T = ~v >>> 31;
        v = -1;
        if (f.length < t.length) {
          continue;
        }
      } else if (v !== -1) {
        f += r(v);
      }
      t += f;
      f = "";
    }
    return t;
  };
  l.encode = function (e) {
    var t;
    var n = (e = e === undefined ? "" : "" + e).length | 0;
    var r = new c(8 + (n << 1) | 0);
    var i = 0;
    var s = !a;
    for (t = 0; t < n; t = t + 1 | 0, i = i + 1 | 0) {
      var o = e.charCodeAt(t) | 0;
      if (o <= 127) {
        r[i] = o;
      } else {
        if (o <= 2047) {
          r[i] = o >> 6 | 192;
        } else {
          e: {
            if (o >= 55296) {
              if (o <= 56319) {
                var l = e.charCodeAt(t = t + 1 | 0) | 0;
                if (l >= 56320 && l <= 57343) {
                  if ((o = (o << 10) + l - 56613888 | 0) > 65535) {
                    r[i] = o >> 18 | 240;
                    r[i = i + 1 | 0] = o >> 12 & 63 | 128;
                    r[i = i + 1 | 0] = o >> 6 & 63 | 128;
                    r[i = i + 1 | 0] = o & 63 | 128;
                    continue;
                  }
                  break e;
                }
                o = 65533;
              } else if (o <= 57343) {
                o = 65533;
              }
            }
            if (!s && t << 1 < i && t << 1 < (i - 7 | 0)) {
              s = true;
              (l = new c(n * 3)).set(r);
              r = l;
            }
          }
          r[i] = o >> 12 | 224;
          r[i = i + 1 | 0] = o >> 6 & 63 | 128;
        }
        r[i = i + 1 | 0] = o & 63 | 128;
      }
    }
    if (a) {
      return r.subarray(0, i);
    } else {
      return r.slice(0, i);
    }
  };
  if (!d) {
    e.TextDecoder = t;
    e.TextEncoder = n;
  }
})("" + undefined == typeof e ? "" + undefined == typeof self ? this : self : e);