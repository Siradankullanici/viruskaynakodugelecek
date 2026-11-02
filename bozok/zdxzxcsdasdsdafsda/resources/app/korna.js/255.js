(function (e) {
  "use strict";

  var t;
  var n = e.Uint8Array;
  var r = e.HTMLCanvasElement;
  var i = r && r.prototype;
  var s = /\s*;\s*base64\s*(?:;|$)/i;
  var o = "toDataURL";
  function a(e) {
    var r;
    for (var i, s = e.length, o = new n(s / 4 * 3 | 0), a = 0, c = 0, l = [0, 0], u = 0, h = 0; s--;) {
      i = e.charCodeAt(a++);
      if ((r = t[i - 43]) !== 255 && r !== undefined) {
        l[1] = l[0];
        l[0] = i;
        h = h << 6 | r;
        if (++u === 4) {
          o[c++] = h >>> 16;
          if (l[1] !== 61) {
            o[c++] = h >>> 8;
          }
          if (l[0] !== 61) {
            o[c++] = h;
          }
          u = 0;
        }
      }
    }
    return o;
  }
  if (n) {
    t = new n([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
  }
  if (!!r && (!i.toBlob || !i.toBlobHD)) {
    i.toBlob ||= function (e, t) {
      t ||= "image/png";
      if (this.mozGetAsFile) {
        e(this.mozGetAsFile("canvas", t));
      } else if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(t)) {
        e(this.msToBlob());
      } else {
        var r;
        var i = Array.prototype.slice.call(arguments, 1);
        var c = this[o].apply(this, i);
        var l = c.indexOf(",");
        var u = c.substring(l + 1);
        var h = s.test(c.substring(0, l));
        if (Blob.fake) {
          (r = new Blob()).encoding = h ? "base64" : "URI";
          r.data = u;
          r.size = u.length;
        } else if (n) {
          r = h ? new Blob([a(u)], {
            type: t
          }) : new Blob([decodeURIComponent(u)], {
            type: t
          });
        }
        e(r);
      }
    };
    if (!i.toBlobHD && i.toDataURLHD) {
      i.toBlobHD = function () {
        o = "toDataURLHD";
        var e = this.toBlob();
        o = "toDataURL";
        return e;
      };
    } else {
      i.toBlobHD = i.toBlob;
    }
  }
})(typeof self != "undefined" && self || typeof window != "undefined" && window || this.content || this);