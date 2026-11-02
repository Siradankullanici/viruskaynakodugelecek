var factory;
window;
factory = function () {
  return function (e) {
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
    return n(n.s = "./src/index.js");
  }({
    "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js": function (e, t, n) {
      var r = n("./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
      e.exports = function (e, t) {
        if (e == null) {
          return {};
        }
        var n;
        var i;
        var s = r(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (i = 0; i < o.length; i++) {
            n = o[i];
            if (!(t.indexOf(n) >= 0)) {
              if (Object.prototype.propertyIsEnumerable.call(e, n)) {
                s[n] = e[n];
              }
            }
          }
        }
        return s;
      };
      e.exports.__esModule = true;
      e.exports.default = e.exports;
    },
    "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js": function (e, t) {
      e.exports = function (e, t) {
        if (e == null) {
          return {};
        }
        var n;
        var r;
        var i = {};
        var s = Object.keys(e);
        for (r = 0; r < s.length; r++) {
          n = s[r];
          if (!(t.indexOf(n) >= 0)) {
            i[n] = e[n];
          }
        }
        return i;
      };
      e.exports.__esModule = true;
      e.exports.default = e.exports;
    },
    "./node_modules/arraybuffer-loader/lib/to-array-buffer.js": function (e, t, n) {
      "use strict";

      (function (t) {
        e.exports = function (e) {
          for (var n = typeof window != "undefined" && typeof window.atob == "function" ? window.atob(e) : t.from(e, "base64").toString("binary"), r = new Uint8Array(n.length), i = 0; i < n.length; ++i) {
            r[i] = n.charCodeAt(i);
          }
          return r.buffer;
        };
      }).call(this, n("./node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer);
    },
    "./node_modules/base64-js/index.js": function (e, t, n) {
      "use strict";

      t.byteLength = function (e) {
        var t = c(e);
        var n = t[0];
        var r = t[1];
        return (n + r) * 3 / 4 - r;
      };
      t.toByteArray = function (e) {
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
      t.fromByteArray = function (e) {
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
    },
    "./node_modules/cross-fetch/dist/browser-ponyfill.js": function (e, t) {
      var n = typeof self != "undefined" ? self : this;
      var r = function () {
        function e() {
          this.fetch = false;
          this.DOMException = n.DOMException;
        }
        e.prototype = n;
        return new e();
      }();
      (function (e) {
        (function (t) {
          var n = "URLSearchParams" in e;
          var r = "Symbol" in e && "iterator" in Symbol;
          var i = "FileReader" in e && "Blob" in e && function () {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }();
          var s = "FormData" in e;
          var o = "ArrayBuffer" in e;
          if (o) {
            var a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"];
            var c = ArrayBuffer.isView || function (e) {
              return e && a.indexOf(Object.prototype.toString.call(e)) > -1;
            };
          }
          function l(e) {
            if (typeof e != "string") {
              e = String(e);
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) {
              throw new TypeError("Invalid character in header field name");
            }
            return e.toLowerCase();
          }
          function u(e) {
            if (typeof e != "string") {
              e = String(e);
            }
            return e;
          }
          function h(e) {
            var t = {
              next: function () {
                var t = e.shift();
                return {
                  done: t === undefined,
                  value: t
                };
              }
            };
            if (r) {
              t[Symbol.iterator] = function () {
                return t;
              };
            }
            return t;
          }
          function d(e) {
            this.map = {};
            if (e instanceof d) {
              e.forEach(function (e, t) {
                this.append(t, e);
              }, this);
            } else if (Array.isArray(e)) {
              e.forEach(function (e) {
                this.append(e[0], e[1]);
              }, this);
            } else if (e) {
              Object.getOwnPropertyNames(e).forEach(function (t) {
                this.append(t, e[t]);
              }, this);
            }
          }
          function p(e) {
            if (e.bodyUsed) {
              return Promise.reject(new TypeError("Already read"));
            }
            e.bodyUsed = true;
          }
          function f(e) {
            return new Promise(function (t, n) {
              e.onload = function () {
                t(e.result);
              };
              e.onerror = function () {
                n(e.error);
              };
            });
          }
          function m(e) {
            var t = new FileReader();
            var n = f(t);
            t.readAsArrayBuffer(e);
            return n;
          }
          function g(e) {
            if (e.slice) {
              return e.slice(0);
            }
            var t = new Uint8Array(e.byteLength);
            t.set(new Uint8Array(e));
            return t.buffer;
          }
          function b() {
            this.bodyUsed = false;
            this._initBody = function (e) {
              var t;
              this._bodyInit = e;
              if (e) {
                if (typeof e == "string") {
                  this._bodyText = e;
                } else if (i && Blob.prototype.isPrototypeOf(e)) {
                  this._bodyBlob = e;
                } else if (s && FormData.prototype.isPrototypeOf(e)) {
                  this._bodyFormData = e;
                } else if (n && URLSearchParams.prototype.isPrototypeOf(e)) {
                  this._bodyText = e.toString();
                } else if (o && i && (t = e) && DataView.prototype.isPrototypeOf(t)) {
                  this._bodyArrayBuffer = g(e.buffer);
                  this._bodyInit = new Blob([this._bodyArrayBuffer]);
                } else if (o && (ArrayBuffer.prototype.isPrototypeOf(e) || c(e))) {
                  this._bodyArrayBuffer = g(e);
                } else {
                  this._bodyText = e = Object.prototype.toString.call(e);
                }
              } else {
                this._bodyText = "";
              }
              if (!this.headers.get("content-type")) {
                if (typeof e == "string") {
                  this.headers.set("content-type", "text/plain;charset=UTF-8");
                } else if (this._bodyBlob && this._bodyBlob.type) {
                  this.headers.set("content-type", this._bodyBlob.type);
                } else if (n && URLSearchParams.prototype.isPrototypeOf(e)) {
                  this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
              }
            };
            if (i) {
              this.blob = function () {
                var e = p(this);
                if (e) {
                  return e;
                }
                if (this._bodyBlob) {
                  return Promise.resolve(this._bodyBlob);
                }
                if (this._bodyArrayBuffer) {
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                }
                if (this._bodyFormData) {
                  throw new Error("could not read FormData body as blob");
                }
                return Promise.resolve(new Blob([this._bodyText]));
              };
              this.arrayBuffer = function () {
                if (this._bodyArrayBuffer) {
                  return p(this) || Promise.resolve(this._bodyArrayBuffer);
                } else {
                  return this.blob().then(m);
                }
              };
            }
            this.text = function () {
              var e;
              var t;
              var n;
              var r = p(this);
              if (r) {
                return r;
              }
              if (this._bodyBlob) {
                e = this._bodyBlob;
                t = new FileReader();
                n = f(t);
                t.readAsText(e);
                return n;
              }
              if (this._bodyArrayBuffer) {
                return Promise.resolve(function (e) {
                  for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) {
                    n[r] = String.fromCharCode(t[r]);
                  }
                  return n.join("");
                }(this._bodyArrayBuffer));
              }
              if (this._bodyFormData) {
                throw new Error("could not read FormData body as text");
              }
              return Promise.resolve(this._bodyText);
            };
            if (s) {
              this.formData = function () {
                return this.text().then(T);
              };
            }
            this.json = function () {
              return this.text().then(JSON.parse);
            };
            return this;
          }
          d.prototype.append = function (e, t) {
            e = l(e);
            t = u(t);
            var n = this.map[e];
            this.map[e] = n ? n + ", " + t : t;
          };
          d.prototype.delete = function (e) {
            delete this.map[l(e)];
          };
          d.prototype.get = function (e) {
            e = l(e);
            if (this.has(e)) {
              return this.map[e];
            } else {
              return null;
            }
          };
          d.prototype.has = function (e) {
            return this.map.hasOwnProperty(l(e));
          };
          d.prototype.set = function (e, t) {
            this.map[l(e)] = u(t);
          };
          d.prototype.forEach = function (e, t) {
            for (var n in this.map) {
              if (this.map.hasOwnProperty(n)) {
                e.call(t, this.map[n], n, this);
              }
            }
          };
          d.prototype.keys = function () {
            var e = [];
            this.forEach(function (t, n) {
              e.push(n);
            });
            return h(e);
          };
          d.prototype.values = function () {
            var e = [];
            this.forEach(function (t) {
              e.push(t);
            });
            return h(e);
          };
          d.prototype.entries = function () {
            var e = [];
            this.forEach(function (t, n) {
              e.push([n, t]);
            });
            return h(e);
          };
          if (r) {
            d.prototype[Symbol.iterator] = d.prototype.entries;
          }
          var y = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          function E(e, t) {
            var n;
            var r;
            var i = (t = t || {}).body;
            if (e instanceof E) {
              if (e.bodyUsed) {
                throw new TypeError("Already read");
              }
              this.url = e.url;
              this.credentials = e.credentials;
              if (!t.headers) {
                this.headers = new d(e.headers);
              }
              this.method = e.method;
              this.mode = e.mode;
              this.signal = e.signal;
              if (!i && e._bodyInit != null) {
                i = e._bodyInit;
                e.bodyUsed = true;
              }
            } else {
              this.url = String(e);
            }
            this.credentials = t.credentials || this.credentials || "same-origin";
            if (!!t.headers || !this.headers) {
              this.headers = new d(t.headers);
            }
            this.method = (n = t.method || this.method || "GET", r = n.toUpperCase(), y.indexOf(r) > -1 ? r : n);
            this.mode = t.mode || this.mode || null;
            this.signal = t.signal || this.signal;
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && i) {
              throw new TypeError("Body not allowed for GET or HEAD requests");
            }
            this._initBody(i);
          }
          function T(e) {
            var t = new FormData();
            e.trim().split("&").forEach(function (e) {
              if (e) {
                var n = e.split("=");
                var r = n.shift().replace(/\+/g, " ");
                var i = n.join("=").replace(/\+/g, " ");
                t.append(decodeURIComponent(r), decodeURIComponent(i));
              }
            });
            return t;
          }
          function v(e, t) {
            t ||= {};
            this.type = "default";
            this.status = t.status === undefined ? 200 : t.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in t ? t.statusText : "OK";
            this.headers = new d(t.headers);
            this.url = t.url || "";
            this._initBody(e);
          }
          E.prototype.clone = function () {
            return new E(this, {
              body: this._bodyInit
            });
          };
          b.call(E.prototype);
          b.call(v.prototype);
          v.prototype.clone = function () {
            return new v(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new d(this.headers),
              url: this.url
            });
          };
          v.error = function () {
            var e = new v(null, {
              status: 0,
              statusText: ""
            });
            e.type = "error";
            return e;
          };
          var A = [301, 302, 303, 307, 308];
          v.redirect = function (e, t) {
            if (A.indexOf(t) === -1) {
              throw new RangeError("Invalid status code");
            }
            return new v(null, {
              status: t,
              headers: {
                location: e
              }
            });
          };
          t.DOMException = e.DOMException;
          try {
            new t.DOMException();
          } catch (e) {
            t.DOMException = function (e, t) {
              this.message = e;
              this.name = t;
              var n = Error(e);
              this.stack = n.stack;
            };
            t.DOMException.prototype = Object.create(Error.prototype);
            t.DOMException.prototype.constructor = t.DOMException;
          }
          function w(e, n) {
            return new Promise(function (r, s) {
              var o = new E(e, n);
              if (o.signal && o.signal.aborted) {
                return s(new t.DOMException("Aborted", "AbortError"));
              }
              var a = new XMLHttpRequest();
              function c() {
                a.abort();
              }
              a.onload = function () {
                var e;
                var t;
                var n = {
                  status: a.status,
                  statusText: a.statusText,
                  headers: (e = a.getAllResponseHeaders() || "", t = new d(), e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
                    var n = e.split(":");
                    var r = n.shift().trim();
                    if (r) {
                      var i = n.join(":").trim();
                      t.append(r, i);
                    }
                  }), t)
                };
                n.url = "responseURL" in a ? a.responseURL : n.headers.get("X-Request-URL");
                var i = "response" in a ? a.response : a.responseText;
                r(new v(i, n));
              };
              a.onerror = function () {
                s(new TypeError("Network request failed"));
              };
              a.ontimeout = function () {
                s(new TypeError("Network request failed"));
              };
              a.onabort = function () {
                s(new t.DOMException("Aborted", "AbortError"));
              };
              a.open(o.method, o.url, true);
              if (o.credentials === "include") {
                a.withCredentials = true;
              } else if (o.credentials === "omit") {
                a.withCredentials = false;
              }
              if ("responseType" in a && i) {
                a.responseType = "blob";
              }
              o.headers.forEach(function (e, t) {
                a.setRequestHeader(t, e);
              });
              if (o.signal) {
                o.signal.addEventListener("abort", c);
                a.onreadystatechange = function () {
                  if (a.readyState === 4) {
                    o.signal.removeEventListener("abort", c);
                  }
                };
              }
              a.send(o._bodyInit === undefined ? null : o._bodyInit);
            });
          }
          w.polyfill = true;
          if (!e.fetch) {
            e.fetch = w;
            e.Headers = d;
            e.Request = E;
            e.Response = v;
          }
          t.Headers = d;
          t.Request = E;
          t.Response = v;
          t.fetch = w;
          Object.defineProperty(t, "__esModule", {
            value: true
          });
        })({});
      })(r);
      r.fetch.ponyfill = true;
      delete r.fetch.polyfill;
      var i = r;
      (t = i.fetch).default = i.fetch;
      t.fetch = i.fetch;
      t.Headers = i.Headers;
      t.Request = i.Request;
      t.Response = i.Response;
      e.exports = t;
    },
    "./node_modules/ieee754/index.js": function (e, t) {
      t.read = function (e, t, n, r, i) {
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
      t.write = function (e, t, n, r, i, s) {
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
    },
    "./node_modules/js-md5/src/md5.js": function (module, exports, __webpack_require__) {
      (function (process, global) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        (function () {
          "use strict";

          var ERROR = "input is invalid type";
          var WINDOW = typeof window == "object";
          var root = WINDOW ? window : {};
          if (root.JS_MD5_NO_WINDOW) {
            WINDOW = false;
          }
          var WEB_WORKER = !WINDOW && typeof self == "object";
          var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
          if (NODE_JS) {
            root = global;
          } else if (WEB_WORKER) {
            root = self;
          }
          var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module == "object" && module.exports;
          var AMD = __webpack_require__("./node_modules/webpack/buildin/amd-options.js");
          var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer != "undefined";
          var HEX_CHARS = "0123456789abcdef".split("");
          var EXTRA = [128, 32768, 8388608, -2147483648];
          var SHIFT = [0, 8, 16, 24];
          var OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"];
          var BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
          var blocks = [];
          var buffer8;
          if (ARRAY_BUFFER) {
            var buffer = new ArrayBuffer(68);
            buffer8 = new Uint8Array(buffer);
            blocks = new Uint32Array(buffer);
          }
          if (!!root.JS_MD5_NO_NODE_JS || !Array.isArray) {
            Array.isArray = function (e) {
              return Object.prototype.toString.call(e) === "[object Array]";
            };
          }
          if (!!ARRAY_BUFFER && (!!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
            ArrayBuffer.isView = function (e) {
              return typeof e == "object" && e.buffer && e.buffer.constructor === ArrayBuffer;
            };
          }
          function createOutputMethod(e) {
            return function (t) {
              return new Md5(true).update(t)[e]();
            };
          }
          function createMethod() {
            var e = createOutputMethod("hex");
            if (NODE_JS) {
              e = nodeWrap(e);
            }
            e.create = function () {
              return new Md5();
            };
            e.update = function (t) {
              return e.create().update(t);
            };
            for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
              var n = OUTPUT_TYPES[t];
              e[n] = createOutputMethod(n);
            }
            return e;
          }
          function nodeWrap(method) {
            var crypto = eval("require('crypto')");
            var Buffer = eval("require('buffer').Buffer");
            function nodeMethod(e) {
              if (typeof e == "string") {
                return crypto.createHash("md5").update(e, "utf8").digest("hex");
              }
              if (e == null) {
                throw ERROR;
              }
              if (e.constructor === ArrayBuffer) {
                e = new Uint8Array(e);
              }
              if (Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer) {
                return crypto.createHash("md5").update(new Buffer(e)).digest("hex");
              } else {
                return method(e);
              }
            }
            return nodeMethod;
          }
          function Md5(e) {
            if (e) {
              blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
              this.blocks = blocks;
              this.buffer8 = buffer8;
            } else if (ARRAY_BUFFER) {
              var t = new ArrayBuffer(68);
              this.buffer8 = new Uint8Array(t);
              this.blocks = new Uint32Array(t);
            } else {
              this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
            this.finalized = this.hashed = false;
            this.first = true;
          }
          Md5.prototype.update = function (e) {
            if (!this.finalized) {
              var t;
              var n = typeof e;
              if (n !== "string") {
                if (n !== "object") {
                  throw ERROR;
                }
                if (e === null) {
                  throw ERROR;
                }
                if (ARRAY_BUFFER && e.constructor === ArrayBuffer) {
                  e = new Uint8Array(e);
                } else if (!Array.isArray(e) && (!ARRAY_BUFFER || !ArrayBuffer.isView(e))) {
                  throw ERROR;
                }
                t = true;
              }
              for (var r, i, s = 0, o = e.length, a = this.blocks, c = this.buffer8; s < o;) {
                if (this.hashed) {
                  this.hashed = false;
                  a[0] = a[16];
                  a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0;
                }
                if (t) {
                  if (ARRAY_BUFFER) {
                    for (i = this.start; s < o && i < 64; ++s) {
                      c[i++] = e[s];
                    }
                  } else {
                    for (i = this.start; s < o && i < 64; ++s) {
                      a[i >> 2] |= e[s] << SHIFT[i++ & 3];
                    }
                  }
                } else if (ARRAY_BUFFER) {
                  for (i = this.start; s < o && i < 64; ++s) {
                    if ((r = e.charCodeAt(s)) < 128) {
                      c[i++] = r;
                    } else if (r < 2048) {
                      c[i++] = r >> 6 | 192;
                      c[i++] = r & 63 | 128;
                    } else if (r < 55296 || r >= 57344) {
                      c[i++] = r >> 12 | 224;
                      c[i++] = r >> 6 & 63 | 128;
                      c[i++] = r & 63 | 128;
                    } else {
                      r = 65536 + ((r & 1023) << 10 | e.charCodeAt(++s) & 1023);
                      c[i++] = r >> 18 | 240;
                      c[i++] = r >> 12 & 63 | 128;
                      c[i++] = r >> 6 & 63 | 128;
                      c[i++] = r & 63 | 128;
                    }
                  }
                } else {
                  for (i = this.start; s < o && i < 64; ++s) {
                    if ((r = e.charCodeAt(s)) < 128) {
                      a[i >> 2] |= r << SHIFT[i++ & 3];
                    } else if (r < 2048) {
                      a[i >> 2] |= (r >> 6 | 192) << SHIFT[i++ & 3];
                      a[i >> 2] |= (r & 63 | 128) << SHIFT[i++ & 3];
                    } else if (r < 55296 || r >= 57344) {
                      a[i >> 2] |= (r >> 12 | 224) << SHIFT[i++ & 3];
                      a[i >> 2] |= (r >> 6 & 63 | 128) << SHIFT[i++ & 3];
                      a[i >> 2] |= (r & 63 | 128) << SHIFT[i++ & 3];
                    } else {
                      r = 65536 + ((r & 1023) << 10 | e.charCodeAt(++s) & 1023);
                      a[i >> 2] |= (r >> 18 | 240) << SHIFT[i++ & 3];
                      a[i >> 2] |= (r >> 12 & 63 | 128) << SHIFT[i++ & 3];
                      a[i >> 2] |= (r >> 6 & 63 | 128) << SHIFT[i++ & 3];
                      a[i >> 2] |= (r & 63 | 128) << SHIFT[i++ & 3];
                    }
                  }
                }
                this.lastByteIndex = i;
                this.bytes += i - this.start;
                if (i >= 64) {
                  this.start = i - 64;
                  this.hash();
                  this.hashed = true;
                } else {
                  this.start = i;
                }
              }
              if (this.bytes > 4294967295) {
                this.hBytes += this.bytes / 4294967296 | 0;
                this.bytes = this.bytes % 4294967296;
              }
              return this;
            }
          };
          Md5.prototype.finalize = function () {
            if (!this.finalized) {
              this.finalized = true;
              var e = this.blocks;
              var t = this.lastByteIndex;
              e[t >> 2] |= EXTRA[t & 3];
              if (t >= 56) {
                if (!this.hashed) {
                  this.hash();
                }
                e[0] = e[16];
                e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0;
              }
              e[14] = this.bytes << 3;
              e[15] = this.hBytes << 3 | this.bytes >>> 29;
              this.hash();
            }
          };
          Md5.prototype.hash = function () {
            var e;
            var t;
            var n;
            var r;
            var i;
            var s;
            var o = this.blocks;
            if (this.first) {
              t = ((t = ((e = ((e = o[0] - 680876937) << 7 | e >>> 25) - 271733879 | 0) ^ (n = ((n = ((r = ((r = (e & 2004318071 ^ -1732584194) + o[1] - 117830708) << 12 | r >>> 20) + e | 0) & (e ^ -271733879) ^ -271733879) + o[2] - 1126478375) << 17 | n >>> 15) + r | 0) & (r ^ e)) + o[3] - 1316259209) << 22 | t >>> 10) + n | 0;
            } else {
              e = this.h0;
              t = this.h1;
              n = this.h2;
              t = ((t += ((e = ((e += ((r = this.h3) ^ t & (n ^ r)) + o[0] - 680876936) << 7 | e >>> 25) + t | 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[1] - 389564586) << 12 | r >>> 20) + e | 0) & (e ^ t)) + o[2] + 606105819) << 17 | n >>> 15) + r | 0) & (r ^ e)) + o[3] - 1044525330) << 22 | t >>> 10) + n | 0;
            }
            t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + o[4] - 176418897) << 7 | e >>> 25) + t | 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[5] + 1200080426) << 12 | r >>> 20) + e | 0) & (e ^ t)) + o[6] - 1473231341) << 17 | n >>> 15) + r | 0) & (r ^ e)) + o[7] - 45705983) << 22 | t >>> 10) + n | 0;
            t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + o[8] + 1770035416) << 7 | e >>> 25) + t | 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[9] - 1958414417) << 12 | r >>> 20) + e | 0) & (e ^ t)) + o[10] - 42063) << 17 | n >>> 15) + r | 0) & (r ^ e)) + o[11] - 1990404162) << 22 | t >>> 10) + n | 0;
            t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + o[12] + 1804603682) << 7 | e >>> 25) + t | 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[13] - 40341101) << 12 | r >>> 20) + e | 0) & (e ^ t)) + o[14] - 1502002290) << 17 | n >>> 15) + r | 0) & (r ^ e)) + o[15] + 1236535329) << 22 | t >>> 10) + n | 0;
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[1] - 165796510) << 5 | e >>> 27) + t | 0) ^ t)) + o[6] - 1069501632) << 9 | r >>> 23) + e | 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[11] + 643717713) << 14 | n >>> 18) + r | 0) ^ r)) + o[0] - 373897302) << 20 | t >>> 12) + n | 0;
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[5] - 701558691) << 5 | e >>> 27) + t | 0) ^ t)) + o[10] + 38016083) << 9 | r >>> 23) + e | 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[15] - 660478335) << 14 | n >>> 18) + r | 0) ^ r)) + o[4] - 405537848) << 20 | t >>> 12) + n | 0;
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[9] + 568446438) << 5 | e >>> 27) + t | 0) ^ t)) + o[14] - 1019803690) << 9 | r >>> 23) + e | 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[3] - 187363961) << 14 | n >>> 18) + r | 0) ^ r)) + o[8] + 1163531501) << 20 | t >>> 12) + n | 0;
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[13] - 1444681467) << 5 | e >>> 27) + t | 0) ^ t)) + o[2] - 51403784) << 9 | r >>> 23) + e | 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[7] + 1735328473) << 14 | n >>> 18) + r | 0) ^ r)) + o[12] - 1926607734) << 20 | t >>> 12) + n | 0;
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[5] - 378558) << 4 | e >>> 28) + t | 0)) + o[8] - 2022574463) << 11 | r >>> 21) + e | 0) ^ e) ^ (n = ((n += (s ^ t) + o[11] + 1839030562) << 16 | n >>> 16) + r | 0)) + o[14] - 35309556) << 23 | t >>> 9) + n | 0;
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[1] - 1530992060) << 4 | e >>> 28) + t | 0)) + o[4] + 1272893353) << 11 | r >>> 21) + e | 0) ^ e) ^ (n = ((n += (s ^ t) + o[7] - 155497632) << 16 | n >>> 16) + r | 0)) + o[10] - 1094730640) << 23 | t >>> 9) + n | 0;
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[13] + 681279174) << 4 | e >>> 28) + t | 0)) + o[0] - 358537222) << 11 | r >>> 21) + e | 0) ^ e) ^ (n = ((n += (s ^ t) + o[3] - 722521979) << 16 | n >>> 16) + r | 0)) + o[6] + 76029189) << 23 | t >>> 9) + n | 0;
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[9] - 640364487) << 4 | e >>> 28) + t | 0)) + o[12] - 421815835) << 11 | r >>> 21) + e | 0) ^ e) ^ (n = ((n += (s ^ t) + o[15] + 530742520) << 16 | n >>> 16) + r | 0)) + o[2] - 995338651) << 23 | t >>> 9) + n | 0;
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[0] - 198630844) << 6 | e >>> 26) + t | 0) | ~n)) + o[7] + 1126891415) << 10 | r >>> 22) + e | 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[14] - 1416354905) << 15 | n >>> 17) + r | 0) | ~e)) + o[5] - 57434055) << 21 | t >>> 11) + n | 0;
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[12] + 1700485571) << 6 | e >>> 26) + t | 0) | ~n)) + o[3] - 1894986606) << 10 | r >>> 22) + e | 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[10] - 1051523) << 15 | n >>> 17) + r | 0) | ~e)) + o[1] - 2054922799) << 21 | t >>> 11) + n | 0;
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[8] + 1873313359) << 6 | e >>> 26) + t | 0) | ~n)) + o[15] - 30611744) << 10 | r >>> 22) + e | 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[6] - 1560198380) << 15 | n >>> 17) + r | 0) | ~e)) + o[13] + 1309151649) << 21 | t >>> 11) + n | 0;
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[4] - 145523070) << 6 | e >>> 26) + t | 0) | ~n)) + o[11] - 1120210379) << 10 | r >>> 22) + e | 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[2] + 718787259) << 15 | n >>> 17) + r | 0) | ~e)) + o[9] - 343485551) << 21 | t >>> 11) + n | 0;
            if (this.first) {
              this.h0 = e + 1732584193 | 0;
              this.h1 = t - 271733879 | 0;
              this.h2 = n - 1732584194 | 0;
              this.h3 = r + 271733878 | 0;
              this.first = false;
            } else {
              this.h0 = this.h0 + e | 0;
              this.h1 = this.h1 + t | 0;
              this.h2 = this.h2 + n | 0;
              this.h3 = this.h3 + r | 0;
            }
          };
          Md5.prototype.hex = function () {
            this.finalize();
            var e = this.h0;
            var t = this.h1;
            var n = this.h2;
            var r = this.h3;
            return HEX_CHARS[e >> 4 & 15] + HEX_CHARS[e & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[t & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[n & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[r & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15];
          };
          Md5.prototype.toString = Md5.prototype.hex;
          Md5.prototype.digest = function () {
            this.finalize();
            var e = this.h0;
            var t = this.h1;
            var n = this.h2;
            var r = this.h3;
            return [e & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, t & 255, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, n & 255, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, r & 255, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255];
          };
          Md5.prototype.array = Md5.prototype.digest;
          Md5.prototype.arrayBuffer = function () {
            this.finalize();
            var e = new ArrayBuffer(16);
            var t = new Uint32Array(e);
            t[0] = this.h0;
            t[1] = this.h1;
            t[2] = this.h2;
            t[3] = this.h3;
            return e;
          };
          Md5.prototype.buffer = Md5.prototype.arrayBuffer;
          Md5.prototype.base64 = function () {
            var e;
            var t;
            var n;
            var r = "";
            var i = this.array();
            for (var s = 0; s < 15;) {
              e = i[s++];
              t = i[s++];
              n = i[s++];
              r += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[(e << 4 | t >>> 4) & 63] + BASE64_ENCODE_CHAR[(t << 2 | n >>> 6) & 63] + BASE64_ENCODE_CHAR[n & 63];
            }
            e = i[s];
            return r += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[e << 4 & 63] + "==";
          };
          var exports = createMethod();
          if (COMMON_JS) {
            module.exports = exports;
          } else {
            root.md5 = exports;
            if (AMD) {
              __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return exports;
              }.call(exports, __webpack_require__, exports, module);
              if (__WEBPACK_AMD_DEFINE_RESULT__ !== undefined) {
                module.exports = __WEBPACK_AMD_DEFINE_RESULT__;
              }
            }
          }
        })();
      }).call(this, __webpack_require__("./node_modules/process/browser.js"), __webpack_require__("./node_modules/webpack/buildin/global.js"));
    },
    "./node_modules/node-libs-browser/node_modules/buffer/index.js": function (e, t, n) {
      "use strict";

      (function (e) {
        var r = n("./node_modules/base64-js/index.js");
        var i = n("./node_modules/ieee754/index.js");
        var s = n("./node_modules/node-libs-browser/node_modules/isarray/index.js");
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
              var i = (e = a(e, r)).write(t, n);
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
                return z(e).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return n * 2;
              case "hex":
                return n >>> 1;
              case "base64":
                return G(e).length;
              default:
                if (r) {
                  return z(e).length;
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
          return V(z(t, e.length - n), e, n, r);
        }
        function v(e, t, n, r) {
          return V(function (e) {
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
          return V(G(t), e, n, r);
        }
        function S(e, t, n, r) {
          return V(function (e, t) {
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
            for (var r = 0; r < t;) {
              n += String.fromCharCode.apply(String, e.slice(r, r += O));
            }
            return n;
          }(r);
        }
        t.Buffer = c;
        t.SlowBuffer = function (e) {
          if (+e != e) {
            e = 0;
          }
          return c.alloc(+e);
        };
        t.INSPECT_MAX_BYTES = 50;
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
        t.kMaxLength = o();
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
          var n = t.INSPECT_MAX_BYTES;
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
          var r;
          var i = e.length;
          if (!t || t < 0) {
            t = 0;
          }
          if (!n || n < 0 || n > i) {
            n = i;
          }
          var s = "";
          for (var o = t; o < n; ++o) {
            s += (r = e[o]) < 16 ? "0" + r.toString(16) : r.toString(16);
          }
          return s;
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
          e = +e;
          t |= 0;
          n |= 0;
          if (!r) {
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
          e = +e;
          t |= 0;
          n |= 0;
          if (!r) {
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
            var o = c.isBuffer(e) ? e : z(new c(e, r).toString());
            var a = o.length;
            for (s = 0; s < n - t; ++s) {
              this[s + t] = o[s % a];
            }
          }
          return this;
        };
        var j = /[^+\/0-9A-Za-z-_]/g;
        function z(e, t) {
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
        function G(e) {
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
        function V(e, t, n, r) {
          for (var i = 0; i < r && !(i + n >= t.length) && !(i >= e.length); ++i) {
            t[i + n] = e[i];
          }
          return i;
        }
      }).call(this, n("./node_modules/webpack/buildin/global.js"));
    },
    "./node_modules/node-libs-browser/node_modules/isarray/index.js": function (e, t) {
      var n = {}.toString;
      e.exports = Array.isArray || function (e) {
        return n.call(e) == "[object Array]";
      };
    },
    "./node_modules/process/browser.js": function (e, t) {
      var n;
      var r;
      var i = e.exports = {};
      function s() {
        throw new Error("setTimeout has not been defined");
      }
      function o() {
        throw new Error("clearTimeout has not been defined");
      }
      function a(e) {
        if (n === setTimeout) {
          return setTimeout(e, 0);
        }
        if ((n === s || !n) && setTimeout) {
          n = setTimeout;
          return setTimeout(e, 0);
        }
        try {
          return n(e, 0);
        } catch (t) {
          try {
            return n.call(null, e, 0);
          } catch (t) {
            return n.call(this, e, 0);
          }
        }
      }
      (function () {
        try {
          n = typeof setTimeout == "function" ? setTimeout : s;
        } catch (e) {
          n = s;
        }
        try {
          r = typeof clearTimeout == "function" ? clearTimeout : o;
        } catch (e) {
          r = o;
        }
      })();
      var c;
      var l = [];
      var u = false;
      var h = -1;
      function d() {
        if (u && c) {
          u = false;
          if (c.length) {
            l = c.concat(l);
          } else {
            h = -1;
          }
          if (l.length) {
            p();
          }
        }
      }
      function p() {
        if (!u) {
          var e = a(d);
          u = true;
          for (var t = l.length; t;) {
            c = l;
            l = [];
            while (++h < t) {
              if (c) {
                c[h].run();
              }
            }
            h = -1;
            t = l.length;
          }
          c = null;
          u = false;
          (function (e) {
            if (r === clearTimeout) {
              return clearTimeout(e);
            }
            if ((r === o || !r) && clearTimeout) {
              r = clearTimeout;
              return clearTimeout(e);
            }
            try {
              return r(e);
            } catch (t) {
              try {
                return r.call(null, e);
              } catch (t) {
                return r.call(this, e);
              }
            }
          })(e);
        }
      }
      function f(e, t) {
        this.fun = e;
        this.array = t;
      }
      function m() {}
      i.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var n = 1; n < arguments.length; n++) {
            t[n - 1] = arguments[n];
          }
        }
        l.push(new f(e, t));
        if (l.length === 1 && !u) {
          a(p);
        }
      };
      f.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      i.title = "browser";
      i.browser = true;
      i.env = {};
      i.argv = [];
      i.version = "";
      i.versions = {};
      i.on = m;
      i.addListener = m;
      i.once = m;
      i.off = m;
      i.removeListener = m;
      i.removeAllListeners = m;
      i.emit = m;
      i.prependListener = m;
      i.prependOnceListener = m;
      i.listeners = function (e) {
        return [];
      };
      i.binding = function (e) {
        throw new Error("process.binding is not supported");
      };
      i.cwd = function () {
        return "/";
      };
      i.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      };
      i.umask = function () {
        return 0;
      };
    },
    "./node_modules/webpack/buildin/amd-options.js": function (e, t) {
      (function (t) {
        e.exports = t;
      }).call(this, {});
    },
    "./node_modules/webpack/buildin/global.js": function (e, t) {
      var n;
      n = function () {
        return this;
      }();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        if (typeof window == "object") {
          n = window;
        }
      }
      e.exports = n;
    },
    "./node_modules/worker-loader/dist/cjs.js?{\"inline\":true,\"fallback\":true}!./src/FetchWorkerTool.worker.js": function (e, t, n) {
      e.exports = function () {
        return n("./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./node_modules/babel-loader/lib/index.js?!./src/FetchWorkerTool.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./node_modules/babel-loader/lib/index.js?!./src/FetchWorkerTool.worker.js\":\n/*!*******************************************************************************!*\\\n  !*** ./node_modules/babel-loader/lib??ref--4!./src/FetchWorkerTool.worker.js ***!\n  \\*******************************************************************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n/* eslint-env worker */\n\nconst isNullResponse = __webpack_require__(/*! ./isNullResponse */ \"./src/isNullResponse.js\");\nconst saferFetch = __webpack_require__(/*! ./safer-fetch */ \"./src/safer-fetch.js\");\nconst complete = [];\nlet timeoutId = null;\nconst checkCompleted = () => {\n  if (timeoutId) return;\n  timeoutId = setTimeout(() => {\n    timeoutId = null;\n    if (complete.length) {\n      // Send our chunk of completed requests and instruct postMessage to\n      // transfer the buffers instead of copying them.\n      postMessage(complete.slice(),\n      // Instruct postMessage that these buffers in the sent message\n      // should use their Transferable trait. After the postMessage\n      // call the \"buffers\" will still be in complete if you looked,\n      // but they will all be length 0 as the data they reference has\n      // been sent to the window. This lets us send a lot of data\n      // without the normal postMessage behaviour of making a copy of\n      // all of the data for the window.\n      complete.map(response => response.buffer).filter(Boolean));\n      complete.length = 0;\n    }\n  });\n};\n\n/**\n * Receive a job from the parent and fetch the requested data.\n * @param {object} options.job A job id, url, and options descriptor to perform.\n */\nconst onMessage = _ref => {\n  let {\n    data: job\n  } = _ref;\n  saferFetch(job.url, job.options).then(result => {\n    if (result.ok) return result.arrayBuffer();\n    if (isNullResponse(result)) return null;\n    return Promise.reject(result.status);\n  }).then(buffer => complete.push({\n    id: job.id,\n    buffer\n  })).catch(error => complete.push({\n    id: job.id,\n    error: error && error.message || \"Failed request: \".concat(job.url)\n  })).then(checkCompleted);\n};\n\n// crossFetch means \"fetch\" is now always supported\npostMessage({\n  support: {\n    fetch: true\n  }\n});\nself.addEventListener('message', onMessage);\n\n/***/ }),\n\n/***/ \"./node_modules/cross-fetch/dist/browser-ponyfill.js\":\n/*!***********************************************************!*\\\n  !*** ./node_modules/cross-fetch/dist/browser-ponyfill.js ***!\n  \\***********************************************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\nvar global = typeof self !== 'undefined' ? self : this;\nvar __self__ = (function () {\nfunction F() {\nthis.fetch = false;\nthis.DOMException = global.DOMException\n}\nF.prototype = global;\nreturn new F();\n})();\n(function(self) {\n\nvar irrelevant = (function (exports) {\n\n  var support = {\n    searchParams: 'URLSearchParams' in self,\n    iterable: 'Symbol' in self && 'iterator' in Symbol,\n    blob:\n      'FileReader' in self &&\n      'Blob' in self &&\n      (function() {\n        try {\n          new Blob();\n          return true\n        } catch (e) {\n          return false\n        }\n      })(),\n    formData: 'FormData' in self,\n    arrayBuffer: 'ArrayBuffer' in self\n  };\n\n  function isDataView(obj) {\n    return obj && DataView.prototype.isPrototypeOf(obj)\n  }\n\n  if (support.arrayBuffer) {\n    var viewClasses = [\n      '[object Int8Array]',\n      '[object Uint8Array]',\n      '[object Uint8ClampedArray]',\n      '[object Int16Array]',\n      '[object Uint16Array]',\n      '[object Int32Array]',\n      '[object Uint32Array]',\n      '[object Float32Array]',\n      '[object Float64Array]'\n    ];\n\n    var isArrayBufferView =\n      ArrayBuffer.isView ||\n      function(obj) {\n        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1\n      };\n  }\n\n  function normalizeName(name) {\n    if (typeof name !== 'string') {\n      name = String(name);\n    }\n    if (/[^a-z0-9\\-#$%&'*+.^_`|~]/i.test(name)) {\n      throw new TypeError('Invalid character in header field name')\n    }\n    return name.toLowerCase()\n  }\n\n  function normalizeValue(value) {\n    if (typeof value !== 'string') {\n      value = String(value);\n    }\n    return value\n  }\n\n  // Build a destructive iterator for the value list\n  function iteratorFor(items) {\n    var iterator = {\n      next: function() {\n        var value = items.shift();\n        return {done: value === undefined, value: value}\n      }\n    };\n\n    if (support.iterable) {\n      iterator[Symbol.iterator] = function() {\n        return iterator\n      };\n    }\n\n    return iterator\n  }\n\n  function Headers(headers) {\n    this.map = {};\n\n    if (headers instanceof Headers) {\n      headers.forEach(function(value, name) {\n        this.append(name, value);\n      }, this);\n    } else if (Array.isArray(headers)) {\n      headers.forEach(function(header) {\n        this.append(header[0], header[1]);\n      }, this);\n    } else if (headers) {\n      Object.getOwnPropertyNames(headers).forEach(function(name) {\n        this.append(name, headers[name]);\n      }, this);\n    }\n  }\n\n  Headers.prototype.append = function(name, value) {\n    name = normalizeName(name);\n    value = normalizeValue(value);\n    var oldValue = this.map[name];\n    this.map[name] = oldValue ? oldValue + ', ' + value : value;\n  };\n\n  Headers.prototype['delete'] = function(name) {\n    delete this.map[normalizeName(name)];\n  };\n\n  Headers.prototype.get = function(name) {\n    name = normalizeName(name);\n    return this.has(name) ? this.map[name] : null\n  };\n\n  Headers.prototype.has = function(name) {\n    return this.map.hasOwnProperty(normalizeName(name))\n  };\n\n  Headers.prototype.set = function(name, value) {\n    this.map[normalizeName(name)] = normalizeValue(value);\n  };\n\n  Headers.prototype.forEach = function(callback, thisArg) {\n    for (var name in this.map) {\n      if (this.map.hasOwnProperty(name)) {\n        callback.call(thisArg, this.map[name], name, this);\n      }\n    }\n  };\n\n  Headers.prototype.keys = function() {\n    var items = [];\n    this.forEach(function(value, name) {\n      items.push(name);\n    });\n    return iteratorFor(items)\n  };\n\n  Headers.prototype.values = function() {\n    var items = [];\n    this.forEach(function(value) {\n      items.push(value);\n    });\n    return iteratorFor(items)\n  };\n\n  Headers.prototype.entries = function() {\n    var items = [];\n    this.forEach(function(value, name) {\n      items.push([name, value]);\n    });\n    return iteratorFor(items)\n  };\n\n  if (support.iterable) {\n    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;\n  }\n\n  function consumed(body) {\n    if (body.bodyUsed) {\n      return Promise.reject(new TypeError('Already read'))\n    }\n    body.bodyUsed = true;\n  }\n\n  function fileReaderReady(reader) {\n    return new Promise(function(resolve, reject) {\n      reader.onload = function() {\n        resolve(reader.result);\n      };\n      reader.onerror = function() {\n        reject(reader.error);\n      };\n    })\n  }\n\n  function readBlobAsArrayBuffer(blob) {\n    var reader = new FileReader();\n    var promise = fileReaderReady(reader);\n    reader.readAsArrayBuffer(blob);\n    return promise\n  }\n\n  function readBlobAsText(blob) {\n    var reader = new FileReader();\n    var promise = fileReaderReady(reader);\n    reader.readAsText(blob);\n    return promise\n  }\n\n  function readArrayBufferAsText(buf) {\n    var view = new Uint8Array(buf);\n    var chars = new Array(view.length);\n\n    for (var i = 0; i < view.length; i++) {\n      chars[i] = String.fromCharCode(view[i]);\n    }\n    return chars.join('')\n  }\n\n  function bufferClone(buf) {\n    if (buf.slice) {\n      return buf.slice(0)\n    } else {\n      var view = new Uint8Array(buf.byteLength);\n      view.set(new Uint8Array(buf));\n      return view.buffer\n    }\n  }\n\n  function Body() {\n    this.bodyUsed = false;\n\n    this._initBody = function(body) {\n      this._bodyInit = body;\n      if (!body) {\n        this._bodyText = '';\n      } else if (typeof body === 'string') {\n        this._bodyText = body;\n      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {\n        this._bodyBlob = body;\n      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {\n        this._bodyFormData = body;\n      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n        this._bodyText = body.toString();\n      } else if (support.arrayBuffer && support.blob && isDataView(body)) {\n        this._bodyArrayBuffer = bufferClone(body.buffer);\n        // IE 10-11 can't handle a DataView body.\n        this._bodyInit = new Blob([this._bodyArrayBuffer]);\n      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {\n        this._bodyArrayBuffer = bufferClone(body);\n      } else {\n        this._bodyText = body = Object.prototype.toString.call(body);\n      }\n\n      if (!this.headers.get('content-type')) {\n        if (typeof body === 'string') {\n          this.headers.set('content-type', 'text/plain;charset=UTF-8');\n        } else if (this._bodyBlob && this._bodyBlob.type) {\n          this.headers.set('content-type', this._bodyBlob.type);\n        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');\n        }\n      }\n    };\n\n    if (support.blob) {\n      this.blob = function() {\n        var rejected = consumed(this);\n        if (rejected) {\n          return rejected\n        }\n\n        if (this._bodyBlob) {\n          return Promise.resolve(this._bodyBlob)\n        } else if (this._bodyArrayBuffer) {\n          return Promise.resolve(new Blob([this._bodyArrayBuffer]))\n        } else if (this._bodyFormData) {\n          throw new Error('could not read FormData body as blob')\n        } else {\n          return Promise.resolve(new Blob([this._bodyText]))\n        }\n      };\n\n      this.arrayBuffer = function() {\n        if (this._bodyArrayBuffer) {\n          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)\n        } else {\n          return this.blob().then(readBlobAsArrayBuffer)\n        }\n      };\n    }\n\n    this.text = function() {\n      var rejected = consumed(this);\n      if (rejected) {\n        return rejected\n      }\n\n      if (this._bodyBlob) {\n        return readBlobAsText(this._bodyBlob)\n      } else if (this._bodyArrayBuffer) {\n        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))\n      } else if (this._bodyFormData) {\n        throw new Error('could not read FormData body as text')\n      } else {\n        return Promise.resolve(this._bodyText)\n      }\n    };\n\n    if (support.formData) {\n      this.formData = function() {\n        return this.text().then(decode)\n      };\n    }\n\n    this.json = function() {\n      return this.text().then(JSON.parse)\n    };\n\n    return this\n  }\n\n  // HTTP methods whose capitalization should be normalized\n  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];\n\n  function normalizeMethod(method) {\n    var upcased = method.toUpperCase();\n    return methods.indexOf(upcased) > -1 ? upcased : method\n  }\n\n  function Request(input, options) {\n    options = options || {};\n    var body = options.body;\n\n    if (input instanceof Request) {\n      if (input.bodyUsed) {\n        throw new TypeError('Already read')\n      }\n      this.url = input.url;\n      this.credentials = input.credentials;\n      if (!options.headers) {\n        this.headers = new Headers(input.headers);\n      }\n      this.method = input.method;\n      this.mode = input.mode;\n      this.signal = input.signal;\n      if (!body && input._bodyInit != null) {\n        body = input._bodyInit;\n        input.bodyUsed = true;\n      }\n    } else {\n      this.url = String(input);\n    }\n\n    this.credentials = options.credentials || this.credentials || 'same-origin';\n    if (options.headers || !this.headers) {\n      this.headers = new Headers(options.headers);\n    }\n    this.method = normalizeMethod(options.method || this.method || 'GET');\n    this.mode = options.mode || this.mode || null;\n    this.signal = options.signal || this.signal;\n    this.referrer = null;\n\n    if ((this.method === 'GET' || this.method === 'HEAD') && body) {\n      throw new TypeError('Body not allowed for GET or HEAD requests')\n    }\n    this._initBody(body);\n  }\n\n  Request.prototype.clone = function() {\n    return new Request(this, {body: this._bodyInit})\n  };\n\n  function decode(body) {\n    var form = new FormData();\n    body\n      .trim()\n      .split('&')\n      .forEach(function(bytes) {\n        if (bytes) {\n          var split = bytes.split('=');\n          var name = split.shift().replace(/\\+/g, ' ');\n          var value = split.join('=').replace(/\\+/g, ' ');\n          form.append(decodeURIComponent(name), decodeURIComponent(value));\n        }\n      });\n    return form\n  }\n\n  function parseHeaders(rawHeaders) {\n    var headers = new Headers();\n    // Replace instances of \\r\\n and \\n followed by at least one space or horizontal tab with a space\n    // https://tools.ietf.org/html/rfc7230#section-3.2\n    var preProcessedHeaders = rawHeaders.replace(/\\r?\\n[\\t ]+/g, ' ');\n    preProcessedHeaders.split(/\\r?\\n/).forEach(function(line) {\n      var parts = line.split(':');\n      var key = parts.shift().trim();\n      if (key) {\n        var value = parts.join(':').trim();\n        headers.append(key, value);\n      }\n    });\n    return headers\n  }\n\n  Body.call(Request.prototype);\n\n  function Response(bodyInit, options) {\n    if (!options) {\n      options = {};\n    }\n\n    this.type = 'default';\n    this.status = options.status === undefined ? 200 : options.status;\n    this.ok = this.status >= 200 && this.status < 300;\n    this.statusText = 'statusText' in options ? options.statusText : 'OK';\n    this.headers = new Headers(options.headers);\n    this.url = options.url || '';\n    this._initBody(bodyInit);\n  }\n\n  Body.call(Response.prototype);\n\n  Response.prototype.clone = function() {\n    return new Response(this._bodyInit, {\n      status: this.status,\n      statusText: this.statusText,\n      headers: new Headers(this.headers),\n      url: this.url\n    })\n  };\n\n  Response.error = function() {\n    var response = new Response(null, {status: 0, statusText: ''});\n    response.type = 'error';\n    return response\n  };\n\n  var redirectStatuses = [301, 302, 303, 307, 308];\n\n  Response.redirect = function(url, status) {\n    if (redirectStatuses.indexOf(status) === -1) {\n      throw new RangeError('Invalid status code')\n    }\n\n    return new Response(null, {status: status, headers: {location: url}})\n  };\n\n  exports.DOMException = self.DOMException;\n  try {\n    new exports.DOMException();\n  } catch (err) {\n    exports.DOMException = function(message, name) {\n      this.message = message;\n      this.name = name;\n      var error = Error(message);\n      this.stack = error.stack;\n    };\n    exports.DOMException.prototype = Object.create(Error.prototype);\n    exports.DOMException.prototype.constructor = exports.DOMException;\n  }\n\n  function fetch(input, init) {\n    return new Promise(function(resolve, reject) {\n      var request = new Request(input, init);\n\n      if (request.signal && request.signal.aborted) {\n        return reject(new exports.DOMException('Aborted', 'AbortError'))\n      }\n\n      var xhr = new XMLHttpRequest();\n\n      function abortXhr() {\n        xhr.abort();\n      }\n\n      xhr.onload = function() {\n        var options = {\n          status: xhr.status,\n          statusText: xhr.statusText,\n          headers: parseHeaders(xhr.getAllResponseHeaders() || '')\n        };\n        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');\n        var body = 'response' in xhr ? xhr.response : xhr.responseText;\n        resolve(new Response(body, options));\n      };\n\n      xhr.onerror = function() {\n        reject(new TypeError('Network request failed'));\n      };\n\n      xhr.ontimeout = function() {\n        reject(new TypeError('Network request failed'));\n      };\n\n      xhr.onabort = function() {\n        reject(new exports.DOMException('Aborted', 'AbortError'));\n      };\n\n      xhr.open(request.method, request.url, true);\n\n      if (request.credentials === 'include') {\n        xhr.withCredentials = true;\n      } else if (request.credentials === 'omit') {\n        xhr.withCredentials = false;\n      }\n\n      if ('responseType' in xhr && support.blob) {\n        xhr.responseType = 'blob';\n      }\n\n      request.headers.forEach(function(value, name) {\n        xhr.setRequestHeader(name, value);\n      });\n\n      if (request.signal) {\n        request.signal.addEventListener('abort', abortXhr);\n\n        xhr.onreadystatechange = function() {\n          // DONE (success or failure)\n          if (xhr.readyState === 4) {\n            request.signal.removeEventListener('abort', abortXhr);\n          }\n        };\n      }\n\n      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);\n    })\n  }\n\n  fetch.polyfill = true;\n\n  if (!self.fetch) {\n    self.fetch = fetch;\n    self.Headers = Headers;\n    self.Request = Request;\n    self.Response = Response;\n  }\n\n  exports.Headers = Headers;\n  exports.Request = Request;\n  exports.Response = Response;\n  exports.fetch = fetch;\n\n  Object.defineProperty(exports, '__esModule', { value: true });\n\n  return exports;\n\n})({});\n})(__self__);\n__self__.fetch.ponyfill = true;\n// Remove \"polyfill\" property added by whatwg-fetch\ndelete __self__.fetch.polyfill;\n// Choose between native implementation (global) or custom implementation (__self__)\n// var ctx = global.fetch ? global : __self__;\nvar ctx = __self__; // this line disable service worker support temporarily\nexports = ctx.fetch // To enable: import fetch from 'cross-fetch'\nexports.default = ctx.fetch // For TypeScript consumers without esModuleInterop.\nexports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'\nexports.Headers = ctx.Headers\nexports.Request = ctx.Request\nexports.Response = ctx.Response\nmodule.exports = exports\n\n\n/***/ }),\n\n/***/ \"./src/isNullResponse.js\":\n/*!*******************************!*\\\n  !*** ./src/isNullResponse.js ***!\n  \\*******************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\n/**\n * @param {Response} response the response from fetch()\n * @returns {boolean} true if the response is a \"null response\" where we successfully talked to the\n * source, but the source has no data for us.\n */\nconst isNullResponse = response =>\n// can't access, eg. due to expired/missing project token\nresponse.status === 403 ||\n// assets does not exist\n// assets.scratch.mit.edu also returns 503 for missing assets\nresponse.status === 404 || response.status === 503;\nmodule.exports = isNullResponse;\n\n/***/ }),\n\n/***/ \"./src/safer-fetch.js\":\n/*!****************************!*\\\n  !*** ./src/safer-fetch.js ***!\n  \\****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n/* eslint-disable no-use-before-define */\n\nconst {\n  scratchFetch\n} = __webpack_require__(/*! ./scratchFetch */ \"./src/scratchFetch.js\");\n\n// This throttles and retries scratchFetch() to mitigate the effect of random network errors and\n// random browser errors (especially in Chrome)\n\nlet currentFetches = 0;\nconst queue = [];\nconst sleep = ms => new Promise(resolve => setTimeout(resolve, ms));\nconst startNextFetch = _ref => {\n  let [resolve, url, options] = _ref;\n  let failedAttempts = 0;\n\n  /**\n   * @param {Response} result From fetch()\n   */\n  const done = result => {\n    // In macOS WKWebView, requests to file:// URLs return status: 0 and ok: false when they succeed, so we'll\n    // mess with the object so everyone that uses this realizes it succeeded.\n    // If the requests failed (because the file didn't exist) then fetch() rejects instead.\n    if (result.status === 0) {\n      Object.defineProperty(result, 'ok', {\n        value: true\n      });\n      Object.defineProperty(result, 'status', {\n        value: 200\n      });\n    }\n    currentFetches--;\n    checkStartNextFetch();\n    resolve(result);\n  };\n  const attemptToFetch = () => scratchFetch(url, options).then(done).catch(error => {\n    // If fetch() errors, it means there was a network error of some sort.\n    // This is worth retrying, especially as some browser will randomly fail requests\n    // if we send too many at once (as we do).\n\n    console.warn(\"Attempt to fetch \".concat(url, \" failed\"), error);\n    if (failedAttempts < 2) {\n      failedAttempts++;\n      sleep((failedAttempts + Math.random() - 1) * 5000).then(attemptToFetch);\n      return;\n    }\n\n    // The fetch() error is usually very generic, so we'll add enough information\n    // to possibly be useful.\n    done(Promise.reject(new Error(\"Storage request \".concat(url, \" failed: \").concat(error))));\n  });\n  attemptToFetch();\n};\nconst checkStartNextFetch = () => {\n  if (currentFetches < 100 && queue.length > 0) {\n    currentFetches++;\n    startNextFetch(queue.shift());\n  }\n};\nconst saferFetch = (url, options) => new Promise(resolve => {\n  queue.push([resolve, url, options]);\n  checkStartNextFetch();\n});\nmodule.exports = saferFetch;\n\n/***/ }),\n\n/***/ \"./src/scratchFetch.js\":\n/*!*****************************!*\\\n  !*** ./src/scratchFetch.js ***!\n  \\*****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\nconst crossFetch = __webpack_require__(/*! cross-fetch */ \"./node_modules/cross-fetch/dist/browser-ponyfill.js\");\n\n/**\n * Metadata header names\n * @enum {string} The enum value is the name of the associated header.\n * @readonly\n */\nconst RequestMetadata = {\n  /** The ID of the project associated with this request */\n  ProjectId: 'X-Project-ID',\n  /** The ID of the project run associated with this request */\n  RunId: 'X-Run-ID'\n};\n\n/**\n * Metadata headers for requests\n * @type {Headers}\n */\nconst metadata = new crossFetch.Headers();\n\n/**\n * Check if there is any metadata to apply.\n * @returns {boolean} true if `metadata` has contents, or false if it is empty.\n */\nconst hasMetadata = () => {\n  /* global self */\n  const searchParams = typeof self !== 'undefined' && self && self.location && self.location.search && self.location.search.split(/[?&]/) || [];\n  if (!searchParams.includes('scratchMetadata=1')) {\n    // for now, disable this feature unless scratchMetadata=1\n    // TODO: remove this check once we're sure the feature works correctly in production\n    return false;\n  }\n  for (const _ of metadata) {\n    return true;\n  }\n  return false;\n};\n\n/**\n * Non-destructively merge any metadata state (if any) with the provided options object (if any).\n * If there is metadata state but no options object is provided, make a new object.\n * If there is no metadata state, return the provided options parameter without modification.\n * If there is metadata and an options object is provided, modify a copy and return it.\n * Headers in the provided options object may override headers generated from metadata state.\n * @param {RequestInit} [options] The initial request options. May be null or undefined.\n * @returns {RequestInit|undefined} the provided options parameter without modification, or a new options object.\n */\nconst applyMetadata = options => {\n  if (hasMetadata()) {\n    const augmentedOptions = Object.assign({}, options);\n    augmentedOptions.headers = new crossFetch.Headers(metadata);\n    if (options && options.headers) {\n      // the Fetch spec says options.headers could be:\n      // \"A Headers object, an object literal, or an array of two-item arrays to set request's headers.\"\n      // turn it into a Headers object to be sure of how to interact with it\n      const overrideHeaders = options.headers instanceof crossFetch.Headers ? options.headers : new crossFetch.Headers(options.headers);\n      for (const [name, value] of overrideHeaders.entries()) {\n        augmentedOptions.headers.set(name, value);\n      }\n    }\n    return augmentedOptions;\n  }\n  return options;\n};\n\n/**\n * Make a network request.\n * This is a wrapper for the global fetch method, adding some Scratch-specific functionality.\n * @param {RequestInfo|URL} resource The resource to fetch.\n * @param {RequestInit} options Optional object containing custom settings for this request.\n * @see {@link https://developer.mozilla.org/docs/Web/API/fetch} for more about the fetch API.\n * @returns {Promise<Response>} A promise for the response to the request.\n */\nconst scratchFetch = (resource, options) => {\n  const augmentedOptions = applyMetadata(options);\n  return crossFetch.fetch(resource, augmentedOptions);\n};\n\n/**\n * Set the value of a named request metadata item.\n * Setting the value to `null` or `undefined` will NOT remove the item.\n * Use `unsetMetadata` for that.\n * @param {RequestMetadata} name The name of the metadata item to set.\n * @param {any} value The value to set (will be converted to a string).\n */\nconst setMetadata = (name, value) => {\n  metadata.set(name, value);\n};\n\n/**\n * Remove a named request metadata item.\n * @param {RequestMetadata} name The name of the metadata item to remove.\n */\nconst unsetMetadata = name => {\n  metadata.delete(name);\n};\nmodule.exports = {\n  default: scratchFetch,\n  Headers: crossFetch.Headers,\n  RequestMetadata,\n  applyMetadata,\n  scratchFetch,\n  setMetadata,\n  unsetMetadata\n};\nif (true) {\n  /**\n   * Retrieve a named request metadata item.\n   * Only for use in tests.\n   * @param {RequestMetadata} name The name of the metadata item to retrieve.\n   * @returns {any} value The value of the metadata item, or `undefined` if it was not found.\n   */\n  const getMetadata = name => metadata.get(name);\n  module.exports.getMetadata = getMetadata;\n}\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=3385fc4f5b394e2b375c.worker.js.map", n.p + "3385fc4f5b394e2b375c.worker.js");
      };
    },
    "./node_modules/worker-loader/dist/workers/InlineWorker.js": function (e, t, n) {
      "use strict";

      var r = window.URL || window.webkitURL;
      e.exports = function (e, t) {
        try {
          try {
            var n;
            try {
              (n = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder)()).append(e);
              n = n.getBlob();
            } catch (t) {
              n = new Blob([e]);
            }
            return new Worker(r.createObjectURL(n));
          } catch (t) {
            return new Worker("data:application/javascript," + encodeURIComponent(e));
          }
        } catch (e) {
          if (!t) {
            throw Error("Inline worker is not supported");
          }
          return new Worker(t);
        }
      };
    },
    "./src/Asset.js": function (e, t, n) {
      const r = n("./node_modules/js-md5/src/md5.js");
      let i = null;
      const s = {};
      const o = {};
      const a = typeof FinalizationRegistry == "function" ? new FinalizationRegistry(e => {
        const t = o[e];
        if (t === 1) {
          delete o[e];
          delete s[e];
        } else {
          o[e] = t - 1;
        }
      }) : null;
      const c = a ? e => {
        const t = e.assetId;
        const n = o[t] || 0;
        o[t] = n + 1;
        a.register(e, t);
      } : () => {};
      e.exports = class {
        constructor(e, t, n, r, i) {
          this.assetType = e;
          this.assetId = t;
          this.setData(r, n || e.runtimeFormat, i);
          this.dependencies = [];
          c(this);
        }
        setData(e, t, n) {
          if (e && !t) {
            throw new Error("Data provided without specifying its format");
          }
          this.dataFormat = t;
          this.data = e;
          if (n) {
            this.assetId = r(e);
          }
          this.clean = !n;
        }
        decodeText() {
          return new TextDecoder().decode(this.data);
        }
        encodeTextData(e, t, n) {
          const r = new TextEncoder();
          this.setData(r.encode(e), t, n);
        }
        encodeDataURI(e) {
          e = e || this.assetType.contentType;
          return `data:${e};base64,${((e, t) => {
            if (!Object.prototype.hasOwnProperty.call(s, e)) {
              if (typeof btoa == "undefined") {
                const r = n("./node_modules/base64-js/index.js");
                s[e] = r.fromByteArray(t);
              } else {
                if (i === null) {
                  i = new Array(256);
                  for (let e = 0; e < 256; e++) {
                    i[e] = String.fromCharCode(e);
                  }
                }
                const {
                  length: n
                } = t;
                let r = "";
                for (let e = 0, s = 0; e < n; e = s) {
                  s = Math.min(s + 32766, n);
                  let o = "";
                  for (let n = e; n < s; n += 1) {
                    o += i[t[n]];
                  }
                  r += btoa(o);
                }
                s[e] = r;
              }
            }
            return s[e];
          })(this.assetId, this.data)}`;
        }
      };
    },
    "./src/AssetType.js": function (e, t, n) {
      const r = n("./src/DataFormat.js");
      const i = {
        ImageBitmap: {
          contentType: "image/png",
          name: "ImageBitmap",
          runtimeFormat: r.PNG,
          immutable: true
        },
        ImageVector: {
          contentType: "image/svg+xml",
          name: "ImageVector",
          runtimeFormat: r.SVG,
          immutable: true
        },
        Project: {
          contentType: "application/json",
          name: "Project",
          runtimeFormat: r.JSON,
          immutable: false
        },
        Sound: {
          contentType: "audio/x-wav",
          name: "Sound",
          runtimeFormat: r.WAV,
          immutable: true
        },
        Sprite: {
          contentType: "application/json",
          name: "Sprite",
          runtimeFormat: r.JSON,
          immutable: true
        },
        Font: {
          contentType: "font/ttf",
          name: "Font",
          runtimeFormat: r.TTF,
          immutable: true
        }
      };
      e.exports = i;
    },
    "./src/BuiltinHelper.js": function (e, t, n) {
      (function (t) {
        const r = n("./node_modules/js-md5/src/md5.js");
        const i = n("./src/Asset.js");
        const s = n("./src/AssetType.js");
        const o = n("./src/DataFormat.js");
        const a = n("./src/Helper.js");
        const c = [{
          type: s.ImageBitmap,
          format: o.PNG,
          id: null,
          data: t.from(n("./src/builtins/defaultBitmap.png"))
        }, {
          type: s.Sound,
          format: o.WAV,
          id: null,
          data: t.from(n("./src/builtins/defaultSound.wav"))
        }, {
          type: s.ImageVector,
          format: o.SVG,
          id: null,
          data: t.from(n("./src/builtins/defaultVector.svg"))
        }];
        const l = c.concat([]);
        e.exports = class extends a {
          constructor(e) {
            super(e);
            this.assets = {};
            l.forEach(e => {
              e.id = this._store(e.type, e.format, e.data, e.id);
            });
          }
          registerDefaultAssets() {
            const e = c.length;
            for (let t = 0; t < e; ++t) {
              const e = c[t];
              this.parent.setDefaultAssetId(e.type, e.id);
            }
          }
          get(e) {
            let t = null;
            if (Object.prototype.hasOwnProperty.call(this.assets, e)) {
              const n = this.assets[e];
              t = new i(n.type, n.id, n.format, n.data);
            }
            return t;
          }
          cache(e, t, n, r) {
            return this.store(e, t, n, r);
          }
          store(e, t, n, r) {
            return this._store(e, t, n, r);
          }
          _store(e, t, n, i) {
            if (!t) {
              throw new Error("Data cached without specifying its format");
            }
            if (i !== "" && i != null) {
              if (Object.prototype.hasOwnProperty.call(this.assets, i) && e.immutable) {
                return i;
              }
            } else {
              if (!e.immutable) {
                throw new Error("Tried to cache data without an id");
              }
              i = r(n);
            }
            this.assets[i] = {
              type: e,
              format: t,
              id: i,
              data: n
            };
            return i;
          }
          load(e, t) {
            if (this.get(t)) {
              return Promise.resolve(this.get(t));
            } else {
              return null;
            }
          }
        };
      }).call(this, n("./node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer);
    },
    "./src/DataFormat.js": function (e, t) {
      e.exports = {
        JPG: "jpg",
        JSON: "json",
        MP3: "mp3",
        PNG: "png",
        SB2: "sb2",
        SB3: "sb3",
        SVG: "svg",
        WAV: "wav",
        TTF: "ttf",
        OTF: "otf",
        WOFF: "woff",
        WOFF2: "woff2"
      };
    },
    "./src/FetchTool.js": function (e, t, n) {
      var r = n("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
      const i = ["url"];
      const s = ["url", "withCredentials"];
      const {
        scratchFetch: o
      } = n("./src/scratchFetch.js");
      const a = n("./src/safer-fetch.js");
      const c = n("./src/isNullResponse.js");
      e.exports = class {
        get isGetSupported() {
          return true;
        }
        get(e) {
          let {
            url: t
          } = e;
          let n = r(e, i);
          return a(t, Object.assign({
            method: "GET"
          }, n)).then(e => e.ok ? e.arrayBuffer().then(e => new Uint8Array(e)) : c(e) ? null : Promise.reject(e.status));
        }
        get isSendSupported() {
          return true;
        }
        send(e) {
          let {
            url: t,
            withCredentials: n = false
          } = e;
          let i = r(e, s);
          return o(t, Object.assign({
            credentials: n ? "include" : "omit"
          }, i)).then(e => e.ok ? e.text() : Promise.reject(e.status));
        }
      };
    },
    "./src/FetchWorkerTool.js": function (e, t, n) {
      var r = n("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
      const i = ["url"];
      const {
        Headers: s,
        applyMetadata: o
      } = n("./src/scratchFetch.js");
      class a {
        constructor() {
          this._workerSupport = {
            fetch: typeof fetch != "undefined"
          };
          this._supportError = null;
          this.worker = null;
          this.jobs = {};
          try {
            if (this.isGetSupported) {
              const e = new (n("./node_modules/worker-loader/dist/cjs.js?{\"inline\":true,\"fallback\":true}!./src/FetchWorkerTool.worker.js"))();
              e.addEventListener("message", e => {
                let {
                  data: t
                } = e;
                if (t.support) {
                  this._workerSupport = t.support;
                } else {
                  for (const e of t) {
                    if (this.jobs[e.id]) {
                      if (e.error) {
                        this.jobs[e.id].reject(e.error);
                      } else {
                        this.jobs[e.id].resolve(e.buffer);
                      }
                      delete this.jobs[e.id];
                    }
                  }
                }
              });
              this.worker = e;
            }
          } catch (e) {
            this._supportError = e;
          }
        }
        get isGetSupported() {
          return typeof Worker != "undefined" && this._workerSupport.fetch && !this._supportError;
        }
        get(e) {
          let {
            url: t
          } = e;
          let n = r(e, i);
          return new Promise((e, r) => {
            const i = Math.random().toString(16).substring(2);
            const a = o(Object.assign({
              method: "GET"
            }, n));
            if (a && a.headers instanceof s) {
              a.headers = Array.from(a.headers.entries());
            }
            this.worker.postMessage({
              id: i,
              url: t,
              options: a
            });
            this.jobs[i] = {
              id: i,
              resolve: e,
              reject: r
            };
          }).then(e => e ? new Uint8Array(e) : null);
        }
        get isSendSupported() {
          return false;
        }
        send() {
          throw new Error("Not implemented.");
        }
        static get instance() {
          this._instance ||= new a();
          return this._instance;
        }
      }
      e.exports = class {
        constructor() {
          this.inner = a.instance;
        }
        get isGetSupported() {
          return this.inner.isGetSupported;
        }
        get(e) {
          return this.inner.get(e);
        }
        get isSendSupported() {
          return false;
        }
        send() {
          throw new Error("Not implemented.");
        }
      };
    },
    "./src/Helper.js": function (e, t) {
      e.exports = class {
        constructor(e) {
          this.parent = e;
        }
        load(e, t, n) {
          return Promise.reject(new Error(`No asset of type ${e} for ID ${t} with format ${n}`));
        }
      };
    },
    "./src/ProxyTool.js": function (e, t, n) {
      const r = n("./src/FetchWorkerTool.js");
      const i = n("./src/FetchTool.js");
      class s {
        constructor() {
          let e;
          e = (arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : s.TOOL_FILTER.ALL) === s.TOOL_FILTER.READY ? [new i()] : [new r(), new i()];
          this.tools = e;
        }
        get isGetSupported() {
          return this.tools.some(e => e.isGetSupported);
        }
        get(e) {
          let t = 0;
          const n = r => {
            const i = this.tools[t++];
            if (!i) {
              throw r;
            }
            if (i.isGetSupported) {
              return i.get(e).catch(n);
            } else {
              return n(r);
            }
          };
          return n();
        }
        get isSendSupported() {
          return this.tools.some(e => e.isSendSupported);
        }
        send(e) {
          let t = 0;
          const n = r => {
            const i = this.tools[t++];
            if (!i) {
              throw r;
            }
            if (i.isSendSupported) {
              return i.send(e).catch(n);
            } else {
              return n(r);
            }
          };
          return n();
        }
      }
      s.TOOL_FILTER = {
        ALL: "all",
        READY: "ready"
      };
      e.exports = s;
    },
    "./src/ScratchStorage.js": function (e, t, n) {
      const r = n("./src/BuiltinHelper.js");
      const i = n("./src/WebHelper.js");
      const s = n("./src/Asset.js");
      const o = n("./src/AssetType.js");
      const a = n("./src/DataFormat.js");
      const c = n("./src/scratchFetch.js");
      e.exports = class {
        constructor() {
          this.defaultAssetId = {};
          this.builtinHelper = new r(this);
          this.webHelper = new i(this);
          this.builtinHelper.registerDefaultAssets(this);
          this._helpers = [{
            helper: this.builtinHelper,
            priority: 100
          }, {
            helper: this.webHelper,
            priority: -100
          }];
        }
        get Asset() {
          return s;
        }
        get AssetType() {
          return o;
        }
        get DataFormat() {
          return a;
        }
        get scratchFetch() {
          return c;
        }
        static get Asset() {
          return s;
        }
        static get AssetType() {
          return o;
        }
        addHelper(e, t = 0) {
          this._helpers.push({
            helper: e,
            priority: t
          });
          this._helpers.sort((e, t) => t.priority - e.priority);
        }
        get(e) {
          return this.builtinHelper.get(e);
        }
        cache(e, t, n, r) {
          return this.builtinHelper._store(e, t, n, r);
        }
        createAsset(e, t, n, r, i) {
          if (!t) {
            throw new Error("Tried to create asset without a dataFormat");
          }
          return new s(e, r, t, n, i);
        }
        addWebStore(e, t, n, r) {
          this.webHelper.addStore(e, t, n, r);
        }
        addWebSource(e, t) {
          this.addWebStore(e, t);
        }
        getDefaultAssetId(e) {
          if (Object.prototype.hasOwnProperty.call(this.defaultAssetId, e.name)) {
            return this.defaultAssetId[e.name];
          }
        }
        setDefaultAssetId(e, t) {
          this.defaultAssetId[e.name] = t;
        }
        load(e, t, n) {
          const r = this._helpers.map(e => e.helper);
          const i = [];
          n = n || e.runtimeFormat;
          let s;
          let o = 0;
          const a = c => {
            if (c) {
              i.push(c);
            }
            s = r[o++];
            if (s) {
              const r = s.load(e, t, n);
              if (r === null) {
                return a();
              } else {
                return r.catch(a);
              }
            }
            if (i.length > 0) {
              return Promise.reject(i);
            } else {
              return Promise.resolve(null);
            }
          };
          return a();
        }
        store(e, t, n, r) {
          t = t || e.runtimeFormat;
          return new Promise((i, s) => this.webHelper.store(e, t, n, r).then(r => {
            this.builtinHelper._store(e, t, n, r.id);
            return i(r);
          }).catch(e => s(e)));
        }
      };
    },
    "./src/WebHelper.js": function (e, t, n) {
      const r = n("./src/Asset.js");
      const i = n("./src/Helper.js");
      const s = n("./src/ProxyTool.js");
      const o = e => typeof e == "string" ? {
        url: e
      } : e;
      e.exports = class extends i {
        constructor(e) {
          super(e);
          this.stores = [];
          this.assetTool = new s();
          this.projectTool = new s(s.TOOL_FILTER.READY);
        }
        addSource(e, t) {
          this.addStore(e, t);
        }
        addStore(e, t, n, r) {
          this.stores.push({
            types: e.map(e => e.name),
            get: t,
            create: n,
            update: r
          });
        }
        load(e, t, n) {
          const i = [];
          const s = this.stores.slice().filter(t => t.types.indexOf(e.name) >= 0);
          const a = new r(e, t, n);
          let c = this.assetTool;
          if (e.name === "Project") {
            c = this.projectTool;
          }
          let l = 0;
          const u = e => {
            if (e) {
              i.push(e);
            }
            const t = s[l++];
            const r = t && t.get;
            if (r) {
              const e = o(r(a));
              if (e === false) {
                return u();
              } else {
                return c.get(e).then(e => e ? (a.setData(e, n), a) : u()).catch(u);
              }
            }
            if (i.length > 0) {
              return Promise.reject(i);
            } else {
              return Promise.resolve(null);
            }
          };
          return u();
        }
        store(e, t, n, i) {
          const s = new r(e, i, t);
          const a = i === "" || i == null;
          const c = this.stores.filter(t => t.types.indexOf(e.name) !== -1 && (a && t.create || t.update))[0];
          const l = a ? "post" : "put";
          if (!c) {
            return Promise.reject(new Error("No appropriate stores"));
          }
          let u = this.assetTool;
          if (e.name === "Project") {
            u = this.projectTool;
          }
          const h = o(a ? c.create(s) : c.update(s));
          const d = Object.assign({
            body: n,
            method: l
          }, h);
          return u.send(d).then(e => {
            if (typeof e == "string") {
              try {
                e = JSON.parse(e);
              } catch (t) {
                return e;
              }
            }
            return Object.assign({
              id: e["content-name"] || i
            }, e);
          });
        }
      };
    },
    "./src/builtins/defaultBitmap.png": function (e, t, n) {
      e.exports = n("./node_modules/arraybuffer-loader/lib/to-array-buffer.js")("iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAAAAADmVT4XAAADZElEQVR42u3a70vbQBgH8O/7vOibvsmbFUEEWUGGUhQ25nDuhSKIUFDxlYi0SAd94atRmFiHCH2x4W8iiNtwowXRgd1QipJYY3N/1F4kTQ6XLKS9yyHcvWyO8MnT5y53Tw5EcIMESIAESIAESIAESIAEPFVAq/6l8G4oAQCp4aniwbUVJ6BVzafwqKXy1VZMgNb+CHzbyK4ZB+Bi0nnk0VyhsDiSoAmvvnMHmGUVAF6UG+0ffsxRhsRHky/AyCsAUpumX0wAAIs6T4CxDADDtcdZsal6gjmdH8AsAEC6+s8Fa48SFExeAKusAEju+V367AmUCi9ANQ0AU3pwcOw2cMEH0FwAAKz5X228pRLR5AI4TgIAtIDL24oLUE94AB6W7LsH/cONN14Ilh44AOqD9s2LQR1KHiB9zgGgOSGeuA3ocPrME1Q4ANaceyePAzrcjHmAZYs9IBeW4/fzHiAwTCwAgTle9ACZK44ALDT9e6x7gL4aT0BQCHb4AqgA5/1TTOMLoJ7vZSMM0H/GHnCeDnu+CrU8vGYPcN5FADBYD0vCaYPDy+i0p337GSMsS1Z4vA3t9QgAZTt0IuIxFRPSKicAQHlvhk3FXF5GhBByMa8qo/sBO6BarwuYbYrYnFKDYEvE7phKgcxvEQBqnvhgiQCUOgoAO4C3JOS3L/hv23UXxVldBECfcueAqpAa0WGy/QeULREAY6aTXRFDgBuA13+ElOncAERMAGaA9hBQD4gQQHsIRE1AZoD2xrgQS5nOZyHgFKmWDSIG4GRAVidiAE4GRB6AzAB2AKIPQFaA5myHA5AV4ESNugZhC7BLR50lIBPAebrzBGQCKAFQNSIMcDvRTQIwAHxNApM3RBygGK0uyhxwOwGsPAgEnPWj5ycRCNiJtBHlAChGKQVwANzPY+CXSMDNWISiLA9AfRA5IhJQ68UnoQAt+AtOPIBKhJosF8B6UM0yLkAxQk2WCyDX9SiUh1gkQAIkoCuAvjGuquMbuijAtwG7MPL8yBICOHSPk3W8Ne8KcEUdmBi6FADYos+QleIH0N/ogOxd7AD6uAS6WRU8WcBdlgZMG/EnYUlwEpLLoQ4PjzGbiA5UsRMRsbQ+5ziDJmYqJuR6NaMomdXuFuZyPSABEiABEiABEiABEiAc8Bd6VyvCEKGqcQAAAABJRU5ErkJggg==");
    },
    "./src/builtins/defaultSound.wav": function (e, t, n) {
      e.exports = n("./node_modules/arraybuffer-loader/lib/to-array-buffer.js")("UklGRiYAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQIAAAAAAA==");
    },
    "./src/builtins/defaultVector.svg": function (e, t, n) {
      e.exports = n("./node_modules/arraybuffer-loader/lib/to-array-buffer.js")("PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cmVjdCBmaWxsPSIjQ0NDIiBoZWlnaHQ9IjEyOCIgd2lkdGg9IjEyOCIvPgogIDx0ZXh0IGZpbGw9ImJsYWNrIiB5PSIxMDciIHg9IjM1LjUiIGZvbnQtc2l6ZT0iMTI4Ij4/PC90ZXh0PgogPC9nPgo8L3N2Zz4K");
    },
    "./src/index.js": function (e, t, n) {
      const r = n("./src/ScratchStorage.js");
      e.exports = r;
    },
    "./src/isNullResponse.js": function (e, t) {
      e.exports = e => e.status === 403 || e.status === 404 || e.status === 503;
    },
    "./src/safer-fetch.js": function (e, t, n) {
      const {
        scratchFetch: r
      } = n("./src/scratchFetch.js");
      let i = 0;
      const s = [];
      const o = e => {
        let [t, n, s] = e;
        let o = 0;
        const c = e => {
          if (e.status === 0) {
            Object.defineProperty(e, "ok", {
              value: true
            });
            Object.defineProperty(e, "status", {
              value: 200
            });
          }
          i--;
          a();
          t(e);
        };
        const l = () => r(n, s).then(c).catch(e => {
          console.warn(`Attempt to fetch ${n} failed`, e);
          if (o < 2) {
            o++;
            (t = (o + Math.random() - 1) * 5000, new Promise(e => setTimeout(e, t))).then(l);
            return;
          }
          var t;
          c(Promise.reject(new Error(`Storage request ${n} failed: ${e}`)));
        });
        l();
      };
      const a = () => {
        if (i < 100 && s.length > 0) {
          i++;
          o(s.shift());
        }
      };
      e.exports = (e, t) => new Promise(n => {
        s.push([n, e, t]);
        a();
      });
    },
    "./src/scratchFetch.js": function (e, t, n) {
      const r = n("./node_modules/cross-fetch/dist/browser-ponyfill.js");
      const i = new r.Headers();
      const s = e => {
        if ((() => {
          if (!(typeof self != "undefined" && self && self.location && self.location.search && self.location.search.split(/[?&]/) || []).includes("scratchMetadata=1")) {
            return false;
          }
          for (const e of i) {
            return true;
          }
          return false;
        })()) {
          const t = Object.assign({}, e);
          t.headers = new r.Headers(i);
          if (e && e.headers) {
            const n = e.headers instanceof r.Headers ? e.headers : new r.Headers(e.headers);
            for (const [e, r] of n.entries()) {
              t.headers.set(e, r);
            }
          }
          return t;
        }
        return e;
      };
      const o = (e, t) => {
        const n = s(t);
        return r.fetch(e, n);
      };
      e.exports = {
        default: o,
        Headers: r.Headers,
        RequestMetadata: {
          ProjectId: "X-Project-ID",
          RunId: "X-Run-ID"
        },
        applyMetadata: s,
        scratchFetch: o,
        setMetadata: (e, t) => {
          i.set(e, t);
        },
        unsetMetadata: e => {
          i.delete(e);
        }
      };
      {
        const t = e => i.get(e);
        e.exports.getMetadata = t;
      }
    }
  });
};
module.exports = factory();