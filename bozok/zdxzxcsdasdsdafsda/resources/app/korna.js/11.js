var r;
if (typeof self != "undefined") {
  self;
}
r = function () {
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
          configurable: false,
          enumerable: true,
          get: r
        });
      }
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
    return n(n.s = 9);
  }([function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.copyExistingProperties = function (e, t) {
      Object.keys(t).forEach(function (n) {
        if (t.hasOwnProperty(n) && e.hasOwnProperty(n)) {
          t[n] = e[n];
        }
      });
    };
    t.copyNamedProperties = function (e, t, n) {
      e.forEach(function (e) {
        var r = t[e];
        if (r !== undefined) {
          n[e] = r;
        }
      });
    };
    t.isBuffer = function (e, t) {
      o ||= e.createBuffer();
      return t instanceof o.constructor;
    };
    t.isRenderbuffer = function (e, t) {
      a ||= e.createRenderbuffer();
      return t instanceof a.constructor;
    };
    t.isShader = function (e, t) {
      c ||= e.createShader(e.VERTEX_SHADER);
      return t instanceof c.constructor;
    };
    t.isTexture = function (e, t) {
      l ||= e.createTexture();
      return t instanceof l.constructor;
    };
    t.isSampler = function (e, t) {
      if (!u) {
        if (!e.createSampler) {
          return false;
        }
        u = e.createSampler();
      }
      return t instanceof u.constructor;
    };
    t.warn = t.error = undefined;
    var r;
    var i = (r = n(2)) && r.__esModule ? r : {
      default: r
    };
    var s = i.default.console && i.default.console.error && typeof i.default.console.error == "function" ? i.default.console.error.bind(i.default.console) : function () {};
    t.error = s;
    var o;
    var a;
    var c;
    var l;
    var u;
    var h = i.default.console && i.default.console.warn && typeof i.default.console.warn == "function" ? i.default.console.warn.bind(i.default.console) : function () {};
    t.warn = h;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.getGLTypeForTypedArray = function (e) {
      if (e instanceof Int8Array) {
        return s;
      }
      if (e instanceof Uint8Array) {
        return o;
      }
      if (e instanceof Uint8ClampedArray) {
        return o;
      }
      if (e instanceof Int16Array) {
        return a;
      }
      if (e instanceof Uint16Array) {
        return c;
      }
      if (e instanceof Int32Array) {
        return l;
      }
      if (e instanceof Uint32Array) {
        return u;
      }
      if (e instanceof Float32Array) {
        return h;
      }
      throw "unsupported typed array type";
    };
    t.getGLTypeForTypedArrayType = function (e) {
      if (e === Int8Array) {
        return s;
      }
      if (e === Uint8Array) {
        return o;
      }
      if (e === Uint8ClampedArray) {
        return o;
      }
      if (e === Int16Array) {
        return a;
      }
      if (e === Uint16Array) {
        return c;
      }
      if (e === Int32Array) {
        return l;
      }
      if (e === Uint32Array) {
        return u;
      }
      if (e === Float32Array) {
        return h;
      }
      throw "unsupported typed array type";
    };
    t.getTypedArrayTypeForGLType = function (e) {
      var t = d[e];
      if (!t) {
        throw "unknown gl type";
      }
      return t;
    };
    t.isArrayBuffer = undefined;
    var r;
    var i = (r = n(2)) && r.__esModule ? r : {
      default: r
    };
    var s = 5120;
    var o = 5121;
    var a = 5122;
    var c = 5123;
    var l = 5124;
    var u = 5125;
    var h = 5126;
    var d = {};
    var p = d;
    p[s] = Int8Array;
    p[o] = Uint8Array;
    p[a] = Int16Array;
    p[c] = Uint16Array;
    p[l] = Int32Array;
    p[u] = Uint32Array;
    p[h] = Float32Array;
    p[32819] = Uint16Array;
    p[32820] = Uint16Array;
    p[33635] = Uint16Array;
    p[5131] = Uint16Array;
    p[33640] = Uint32Array;
    p[35899] = Uint32Array;
    p[35902] = Uint32Array;
    p[36269] = Uint32Array;
    p[34042] = Uint32Array;
    var f = i.default.SharedArrayBuffer ? function (e) {
      return e && e.buffer && (e.buffer instanceof ArrayBuffer || e.buffer instanceof i.default.SharedArrayBuffer);
    } : function (e) {
      return e && e.buffer && e.buffer instanceof ArrayBuffer;
    };
    t.isArrayBuffer = f;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.default = undefined;
    var r = r !== undefined ? r : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {};
    t.default = r;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.add = function (e, t, n) {
      (n = n || new r(3))[0] = e[0] + t[0];
      n[1] = e[1] + t[1];
      n[2] = e[2] + t[2];
      return n;
    };
    t.copy = function (e, t) {
      (t = t || new r(3))[0] = e[0];
      t[1] = e[1];
      t[2] = e[2];
      return t;
    };
    t.create = function (e, t, n) {
      var i = new r(3);
      if (e) {
        i[0] = e;
      }
      if (t) {
        i[1] = t;
      }
      if (n) {
        i[2] = n;
      }
      return i;
    };
    t.cross = function (e, t, n) {
      n = n || new r(3);
      var i = e[2] * t[0] - e[0] * t[2];
      var s = e[0] * t[1] - e[1] * t[0];
      n[0] = e[1] * t[2] - e[2] * t[1];
      n[1] = i;
      n[2] = s;
      return n;
    };
    t.distance = function (e, t) {
      var n = e[0] - t[0];
      var r = e[1] - t[1];
      var i = e[2] - t[2];
      return Math.sqrt(n * n + r * r + i * i);
    };
    t.distanceSq = function (e, t) {
      var n = e[0] - t[0];
      var r = e[1] - t[1];
      var i = e[2] - t[2];
      return n * n + r * r + i * i;
    };
    t.divide = function (e, t, n) {
      (n = n || new r(3))[0] = e[0] / t[0];
      n[1] = e[1] / t[1];
      n[2] = e[2] / t[2];
      return n;
    };
    t.divScalar = function (e, t, n) {
      (n = n || new r(3))[0] = e[0] / t;
      n[1] = e[1] / t;
      n[2] = e[2] / t;
      return n;
    };
    t.dot = function (e, t) {
      return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
    };
    t.lerp = function (e, t, n, i) {
      (i = i || new r(3))[0] = (1 - n) * e[0] + n * t[0];
      i[1] = (1 - n) * e[1] + n * t[1];
      i[2] = (1 - n) * e[2] + n * t[2];
      return i;
    };
    t.length = function (e) {
      return Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
    };
    t.lengthSq = function (e) {
      return e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
    };
    t.mulScalar = function (e, t, n) {
      (n = n || new r(3))[0] = e[0] * t;
      n[1] = e[1] * t;
      n[2] = e[2] * t;
      return n;
    };
    t.multiply = function (e, t, n) {
      (n = n || new r(3))[0] = e[0] * t[0];
      n[1] = e[1] * t[1];
      n[2] = e[2] * t[2];
      return n;
    };
    t.negate = function (e, t) {
      (t = t || new r(3))[0] = -e[0];
      t[1] = -e[1];
      t[2] = -e[2];
      return t;
    };
    t.normalize = function (e, t) {
      t = t || new r(3);
      var n = e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
      var i = Math.sqrt(n);
      if (i > 0.00001) {
        t[0] = e[0] / i;
        t[1] = e[1] / i;
        t[2] = e[2] / i;
      } else {
        t[0] = 0;
        t[1] = 0;
        t[2] = 0;
      }
      return t;
    };
    t.setDefaultType = function (e) {
      var t = r;
      r = e;
      return t;
    };
    t.subtract = function (e, t, n) {
      (n = n || new r(3))[0] = e[0] - t[0];
      n[1] = e[1] - t[1];
      n[2] = e[2] - t[2];
      return n;
    };
    var r = Float32Array;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.isWebGL1 = function (e) {
      return !e.texStorage2D;
    };
    t.isWebGL2 = function (e) {
      return !!e.texStorage2D;
    };
    t.glEnumToString = undefined;
    var r;
    var i;
    r = {};
    i = {};
    function s(e, t) {
      (function (e) {
        var t = e.constructor.name;
        if (!r[t]) {
          for (var n in e) {
            if (typeof e[n] == "number") {
              var s = i[e[n]];
              i[e[n]] = s ? `${s} | ${n}` : n;
            }
          }
          r[t] = true;
        }
      })(e);
      return i[t] || "0x" + t.toString(16);
    }
    t.glEnumToString = s;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.createAttributeSetters = W;
    t.createProgram = D;
    t.createProgramFromScripts = function (e, t, n, r, i) {
      var s = M(n, r, i);
      var o = [];
      for (var a = 0; a < t.length; ++a) {
        var c = B(e, t[a], e[C[a]], s.errorCallback);
        if (!c) {
          return null;
        }
        o.push(c);
      }
      return D(e, o, s);
    };
    t.createProgramFromSources = U;
    t.createProgramInfo = function (e, t, n, r, i) {
      var s = M(n, r, i);
      var o = true;
      t = t.map(function (e) {
        if (e.indexOf("\n") < 0) {
          var t = u(e);
          if (t) {
            e = t.text;
          } else {
            s.errorCallback("no element with id: " + e);
            o = false;
          }
        }
        return e;
      });
      if (!o) {
        return null;
      }
      var a = U(e, t, s);
      if (a) {
        return X(e, a);
      } else {
        return null;
      }
    };
    t.createProgramInfoFromProgram = X;
    t.createUniformSetters = j;
    t.createUniformBlockSpecFromProgram = V;
    t.createUniformBlockInfoFromProgram = Y;
    t.createUniformBlockInfo = function (e, t, n) {
      return Y(e, t.program, t.uniformBlockSpec, n);
    };
    t.createTransformFeedback = function (e, t, n) {
      var r = e.createTransformFeedback();
      e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, r);
      e.useProgram(t.program);
      G(e, t, n);
      e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, null);
      (function (e, t, n) {
        if (t.transformFeedbackInfo) {
          t = t.transformFeedbackInfo;
        }
        if (n.attribs) {
          n = n.attribs;
        }
        for (var r in n) {
          var i = t[r];
          if (i) {
            e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER, i.index, null);
          }
        }
      })(e, t, n);
      return r;
    };
    t.createTransformFeedbackInfo = z;
    t.bindTransformFeedbackInfo = G;
    t.setAttributes = K;
    t.setBuffersAndAttributes = function (e, t, n) {
      if (n.vertexArrayObject) {
        e.bindVertexArray(n.vertexArrayObject);
      } else {
        K(t.attribSetters || t, n.attribs);
        if (n.indices) {
          e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, n.indices);
        }
      }
    };
    t.setUniforms = function e(t, n) {
      var r = t.uniformSetters || t;
      for (var i = arguments.length, s = 1; s < i; ++s) {
        var o = arguments[s];
        if (Array.isArray(o)) {
          for (var a = o.length, c = 0; c < a; ++c) {
            e(r, o[c]);
          }
        } else {
          for (var l in o) {
            var u = r[l];
            if (u) {
              u(o[l]);
            }
          }
        }
      }
    };
    t.setUniformBlock = function (e, t, n) {
      if (H(e, t, n)) {
        e.bufferData(e.UNIFORM_BUFFER, n.array, e.DYNAMIC_DRAW);
      }
    };
    t.setBlockUniforms = function (e, t) {
      var n = e.uniforms;
      for (var r in t) {
        var i = n[r];
        if (i) {
          var s = t[r];
          if (s.length) {
            i.set(s);
          } else {
            i[0] = s;
          }
        }
      }
    };
    t.bindUniformBlock = H;
    var r;
    var i = a(n(4));
    var s = a(n(0));
    var o = (r = n(2)) && r.__esModule ? r : {
      default: r
    };
    function a(e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }
    var c = s.error;
    var l = s.warn;
    var u = o.default && o.default.document && o.default.document.getElementById ? o.default.document.getElementById.bind(o.default.document) : function () {
      return null;
    };
    var h = 3553;
    var d = 34067;
    var p = 32879;
    var f = 35866;
    var m = {};
    function g(e, t) {
      return m[t].bindPoint;
    }
    function b(e, t) {
      return function (n) {
        e.uniform1i(t, n);
      };
    }
    function y(e, t) {
      return function (n) {
        e.uniform1iv(t, n);
      };
    }
    function E(e, t) {
      return function (n) {
        e.uniform2iv(t, n);
      };
    }
    function T(e, t) {
      return function (n) {
        e.uniform3iv(t, n);
      };
    }
    function v(e, t) {
      return function (n) {
        e.uniform4iv(t, n);
      };
    }
    function A(e, t, n, r) {
      var o = g(0, t);
      if (i.isWebGL2(e)) {
        return function (t) {
          var i;
          var a;
          if (s.isTexture(e, t)) {
            i = t;
            a = null;
          } else {
            i = t.texture;
            a = t.sampler;
          }
          e.uniform1i(r, n);
          e.activeTexture(e.TEXTURE0 + n);
          e.bindTexture(o, i);
          e.bindSampler(n, a);
        };
      } else {
        return function (t) {
          e.uniform1i(r, n);
          e.activeTexture(e.TEXTURE0 + n);
          e.bindTexture(o, t);
        };
      }
    }
    function w(e, t, n, r, o) {
      var a = g(0, t);
      var c = new Int32Array(o);
      for (var l = 0; l < o; ++l) {
        c[l] = n + l;
      }
      if (i.isWebGL2(e)) {
        return function (t) {
          e.uniform1iv(r, c);
          t.forEach(function (t, r) {
            var i;
            var o;
            e.activeTexture(e.TEXTURE0 + c[r]);
            if (s.isTexture(e, t)) {
              i = t;
              o = null;
            } else {
              i = t.texture;
              o = t.sampler;
            }
            e.bindSampler(n, o);
            e.bindTexture(a, i);
          });
        };
      } else {
        return function (t) {
          e.uniform1iv(r, c);
          t.forEach(function (t, n) {
            e.activeTexture(e.TEXTURE0 + c[n]);
            e.bindTexture(a, t);
          });
        };
      }
    }
    function S(e, t) {
      return function (n) {
        e.bindBuffer(e.ARRAY_BUFFER, n.buffer);
        e.enableVertexAttribArray(t);
        e.vertexAttribPointer(t, n.numComponents || n.size, n.type || e.FLOAT, n.normalize || false, n.stride || 0, n.offset || 0);
        if (n.divisor !== undefined) {
          e.vertexAttribDivisor(t, n.divisor);
        }
      };
    }
    function k(e, t) {
      return function (n) {
        e.bindBuffer(e.ARRAY_BUFFER, n.buffer);
        e.enableVertexAttribArray(t);
        e.vertexAttribIPointer(t, n.numComponents || n.size, n.type || e.INT, n.stride || 0, n.offset || 0);
        if (n.divisor !== undefined) {
          e.vertexAttribDivisor(t, n.divisor);
        }
      };
    }
    function I(e, t, n) {
      var r = n.size;
      var i = n.count;
      return function (n) {
        e.bindBuffer(e.ARRAY_BUFFER, n.buffer);
        var s = n.size || n.numComponents || r;
        var o = s / i;
        var a = n.type || e.FLOAT;
        var c = m[a].size * s;
        var l = n.normalize || false;
        var u = n.offset || 0;
        var h = c / i;
        for (var d = 0; d < i; ++d) {
          e.enableVertexAttribArray(t + d);
          e.vertexAttribPointer(t + d, o, a, l, c, u + h * d);
          if (n.divisor !== undefined) {
            e.vertexAttribDivisor(t + d, n.divisor);
          }
        }
      };
    }
    m[5126] = {
      Type: Float32Array,
      size: 4,
      setter: function (e, t) {
        return function (n) {
          e.uniform1f(t, n);
        };
      },
      arraySetter: function (e, t) {
        return function (n) {
          e.uniform1fv(t, n);
        };
      }
    };
    m[35664] = {
      Type: Float32Array,
      size: 8,
      setter: function (e, t) {
        return function (n) {
          e.uniform2fv(t, n);
        };
      }
    };
    m[35665] = {
      Type: Float32Array,
      size: 12,
      setter: function (e, t) {
        return function (n) {
          e.uniform3fv(t, n);
        };
      }
    };
    m[35666] = {
      Type: Float32Array,
      size: 16,
      setter: function (e, t) {
        return function (n) {
          e.uniform4fv(t, n);
        };
      }
    };
    m[5124] = {
      Type: Int32Array,
      size: 4,
      setter: b,
      arraySetter: y
    };
    m[35667] = {
      Type: Int32Array,
      size: 8,
      setter: E
    };
    m[35668] = {
      Type: Int32Array,
      size: 12,
      setter: T
    };
    m[35669] = {
      Type: Int32Array,
      size: 16,
      setter: v
    };
    m[5125] = {
      Type: Uint32Array,
      size: 4,
      setter: function (e, t) {
        return function (n) {
          e.uniform1ui(t, n);
        };
      },
      arraySetter: function (e, t) {
        return function (n) {
          e.uniform1uiv(t, n);
        };
      }
    };
    m[36294] = {
      Type: Uint32Array,
      size: 8,
      setter: function (e, t) {
        return function (n) {
          e.uniform2uiv(t, n);
        };
      }
    };
    m[36295] = {
      Type: Uint32Array,
      size: 12,
      setter: function (e, t) {
        return function (n) {
          e.uniform3uiv(t, n);
        };
      }
    };
    m[36296] = {
      Type: Uint32Array,
      size: 16,
      setter: function (e, t) {
        return function (n) {
          e.uniform4uiv(t, n);
        };
      }
    };
    m[35670] = {
      Type: Uint32Array,
      size: 4,
      setter: b,
      arraySetter: y
    };
    m[35671] = {
      Type: Uint32Array,
      size: 8,
      setter: E
    };
    m[35672] = {
      Type: Uint32Array,
      size: 12,
      setter: T
    };
    m[35673] = {
      Type: Uint32Array,
      size: 16,
      setter: v
    };
    m[35674] = {
      Type: Float32Array,
      size: 16,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix2fv(t, false, n);
        };
      }
    };
    m[35675] = {
      Type: Float32Array,
      size: 36,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix3fv(t, false, n);
        };
      }
    };
    m[35676] = {
      Type: Float32Array,
      size: 64,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix4fv(t, false, n);
        };
      }
    };
    m[35685] = {
      Type: Float32Array,
      size: 24,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix2x3fv(t, false, n);
        };
      }
    };
    m[35686] = {
      Type: Float32Array,
      size: 32,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix2x4fv(t, false, n);
        };
      }
    };
    m[35687] = {
      Type: Float32Array,
      size: 24,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix3x2fv(t, false, n);
        };
      }
    };
    m[35688] = {
      Type: Float32Array,
      size: 48,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix3x4fv(t, false, n);
        };
      }
    };
    m[35689] = {
      Type: Float32Array,
      size: 32,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix4x2fv(t, false, n);
        };
      }
    };
    m[35690] = {
      Type: Float32Array,
      size: 48,
      setter: function (e, t) {
        return function (n) {
          e.uniformMatrix4x3fv(t, false, n);
        };
      }
    };
    m[35678] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: h
    };
    m[35680] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: d
    };
    m[35679] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: p
    };
    m[35682] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: h
    };
    m[36289] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: f
    };
    m[36292] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: f
    };
    m[36293] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: d
    };
    m[36298] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: h
    };
    m[36299] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: p
    };
    m[36300] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: d
    };
    m[36303] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: f
    };
    m[36306] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: h
    };
    m[36307] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: p
    };
    m[36308] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: d
    };
    m[36311] = {
      Type: null,
      size: 0,
      setter: A,
      arraySetter: w,
      bindPoint: f
    };
    var O = {
      5126: {
        size: 4,
        setter: S
      },
      35664: {
        size: 8,
        setter: S
      },
      35665: {
        size: 12,
        setter: S
      },
      35666: {
        size: 16,
        setter: S
      },
      5124: {
        size: 4,
        setter: k
      },
      35667: {
        size: 8,
        setter: k
      },
      35668: {
        size: 12,
        setter: k
      },
      35669: {
        size: 16,
        setter: k
      },
      5125: {
        size: 4,
        setter: k
      },
      36294: {
        size: 8,
        setter: k
      },
      36295: {
        size: 12,
        setter: k
      },
      36296: {
        size: 16,
        setter: k
      },
      35670: {
        size: 4,
        setter: k
      },
      35671: {
        size: 8,
        setter: k
      },
      35672: {
        size: 12,
        setter: k
      },
      35673: {
        size: 16,
        setter: k
      },
      35674: {
        size: 4,
        setter: I,
        count: 2
      },
      35675: {
        size: 9,
        setter: I,
        count: 3
      },
      35676: {
        size: 16,
        setter: I,
        count: 4
      }
    };
    var N = undefined;
    var R = /^[ \t]*\n/;
    function x(e, t, n, r) {
      var i = r || c;
      var s = e.createShader(n);
      var o = 0;
      if (R.test(t)) {
        o = 1;
        t = t.replace(R, "");
      }
      e.shaderSource(s, t);
      e.compileShader(s);
      if (!e.getShaderParameter(s, e.COMPILE_STATUS)) {
        var a = e.getShaderInfoLog(s);
        i(function (e, t) {
          t = t || 0;
          ++t;
          return e.split("\n").map(function (e, n) {
            return n + t + ": " + e;
          }).join("\n");
        }(t, o) + "\n*** Error compiling shader: " + a);
        e.deleteShader(s);
        return null;
      }
      return s;
    }
    function M(e, t, n) {
      var r;
      if (typeof t == "function") {
        n = t;
        t = undefined;
      }
      if (typeof e == "function") {
        n = e;
        e = undefined;
      } else if (e && !Array.isArray(e)) {
        if (e.errorCallback) {
          return e;
        }
        var i = e;
        n = i.errorCallback;
        e = i.attribLocations;
        r = i.transformFeedbackVaryings;
      }
      var s = {
        errorCallback: n || c,
        transformFeedbackVaryings: r
      };
      if (e) {
        var o = {};
        if (Array.isArray(e)) {
          e.forEach(function (e, n) {
            o[e] = t ? t[n] : n;
          });
        } else {
          o = e;
        }
        s.attribLocations = o;
      }
      return s;
    }
    var C = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
    function P(e) {
      if (e.indexOf("frag") >= 0) {
        return N.FRAGMENT_SHADER;
      } else if (e.indexOf("vert") >= 0) {
        return N.VERTEX_SHADER;
      } else {
        return undefined;
      }
    }
    function L(e, t) {
      t.forEach(function (t) {
        e.deleteShader(t);
      });
    }
    function D(e, t, n, r, i) {
      var o = M(n, r, i);
      var a = [];
      var c = [];
      for (var l = 0; l < t.length; ++l) {
        var h = t[l];
        if (typeof h == "string") {
          var d = u(h);
          var p = d ? d.text : h;
          var f = e[C[l]];
          if (d && d.type) {
            f = P(d.type) || f;
          }
          h = x(e, p, f, o.errorCallback);
          c.push(h);
        }
        if (s.isShader(e, h)) {
          a.push(h);
        }
      }
      if (a.length !== t.length) {
        o.errorCallback("not enough shaders for program");
        L(e, c);
        return null;
      }
      var m = e.createProgram();
      a.forEach(function (t) {
        e.attachShader(m, t);
      });
      if (o.attribLocations) {
        Object.keys(o.attribLocations).forEach(function (t) {
          e.bindAttribLocation(m, o.attribLocations[t], t);
        });
      }
      var g = o.transformFeedbackVaryings;
      if (g) {
        if (g.attribs) {
          g = g.attribs;
        }
        if (!Array.isArray(g)) {
          g = Object.keys(g);
        }
        e.transformFeedbackVaryings(m, g, o.transformFeedbackMode || e.SEPARATE_ATTRIBS);
      }
      e.linkProgram(m);
      if (!e.getProgramParameter(m, e.LINK_STATUS)) {
        var b = e.getProgramInfoLog(m);
        o.errorCallback("Error in program linking:" + b);
        e.deleteProgram(m);
        L(e, c);
        return null;
      }
      return m;
    }
    function B(e, t, n, r) {
      var i;
      var s = u(t);
      if (!s) {
        throw "*** Error: unknown script element" + t;
      }
      i = s.text;
      var o = n || P(s.type);
      if (!o) {
        throw "*** Error: unknown shader type";
      }
      return x(e, i, o, r);
    }
    function U(e, t, n, r, i) {
      var s = M(n, r, i);
      var o = [];
      for (var a = 0; a < t.length; ++a) {
        var c = x(e, t[a], e[C[a]], s.errorCallback);
        if (!c) {
          return null;
        }
        o.push(c);
      }
      return D(e, o, s);
    }
    function F(e) {
      var t = e.name;
      return t.startsWith("gl_") || t.startsWith("webgl_");
    }
    function j(e, t) {
      var n = 0;
      function r(t, r) {
        var i;
        var s = e.getUniformLocation(t, r.name);
        var o = r.size > 1 && r.name.substr(-3) === "[0]";
        var a = r.type;
        var c = m[a];
        if (!c) {
          throw "unknown type: 0x" + a.toString(16);
        }
        if (c.bindPoint) {
          var l = n;
          n += r.size;
          i = o ? c.arraySetter(e, a, l, s, r.size) : c.setter(e, a, l, s, r.size);
        } else {
          i = c.arraySetter && o ? c.arraySetter(e, s) : c.setter(e, s);
        }
        i.location = s;
        return i;
      }
      var i = {};
      for (var s = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), o = 0; o < s; ++o) {
        var a = e.getActiveUniform(t, o);
        if (!F(a)) {
          var c = a.name;
          if (c.substr(-3) === "[0]") {
            c = c.substr(0, c.length - 3);
          }
          var l = r(t, a);
          i[c] = l;
        }
      }
      return i;
    }
    function z(e, t) {
      var n = {};
      for (var r = e.getProgramParameter(t, e.TRANSFORM_FEEDBACK_VARYINGS), i = 0; i < r; ++i) {
        var s = e.getTransformFeedbackVarying(t, i);
        n[s.name] = {
          index: i,
          type: s.type,
          size: s.size
        };
      }
      return n;
    }
    function G(e, t, n) {
      if (t.transformFeedbackInfo) {
        t = t.transformFeedbackInfo;
      }
      if (n.attribs) {
        n = n.attribs;
      }
      for (var r in n) {
        var i = t[r];
        if (i) {
          var s = n[r];
          if (s.offset) {
            e.bindBufferRange(e.TRANSFORM_FEEDBACK_BUFFER, i.index, s.buffer, s.offset, s.size);
          } else {
            e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER, i.index, s.buffer);
          }
        }
      }
    }
    function V(e, t) {
      for (var n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), r = [], i = [], s = 0; s < n; ++s) {
        i.push(s);
        r.push({});
        var o = e.getActiveUniform(t, s);
        if (F(o)) {
          break;
        }
        r[s].name = o.name;
      }
      [["UNIFORM_TYPE", "type"], ["UNIFORM_SIZE", "size"], ["UNIFORM_BLOCK_INDEX", "blockNdx"], ["UNIFORM_OFFSET", "offset"]].forEach(function (n) {
        var s = n[0];
        var o = n[1];
        e.getActiveUniforms(t, i, e[s]).forEach(function (e, t) {
          r[t][o] = e;
        });
      });
      var a = {};
      for (var c = e.getProgramParameter(t, e.ACTIVE_UNIFORM_BLOCKS), l = 0; l < c; ++l) {
        var u = e.getActiveUniformBlockName(t, l);
        var h = {
          index: l,
          usedByVertexShader: e.getActiveUniformBlockParameter(t, l, e.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
          usedByFragmentShader: e.getActiveUniformBlockParameter(t, l, e.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
          size: e.getActiveUniformBlockParameter(t, l, e.UNIFORM_BLOCK_DATA_SIZE),
          uniformIndices: e.getActiveUniformBlockParameter(t, l, e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
        };
        h.used = h.usedByVertexSahder || h.usedByFragmentShader;
        a[u] = h;
      }
      return {
        blockSpecs: a,
        uniformData: r
      };
    }
    var _ = /\[\d+\]\.$/;
    function Y(e, t, n, r) {
      var i = n.blockSpecs;
      var s = n.uniformData;
      var o = i[r];
      if (!o) {
        l("no uniform block object named:", r);
        return {
          name: r,
          uniforms: {}
        };
      }
      var a = new ArrayBuffer(o.size);
      var c = e.createBuffer();
      var u = o.index;
      e.bindBuffer(e.UNIFORM_BUFFER, c);
      e.uniformBlockBinding(t, o.index, u);
      var h = r + ".";
      if (_.test(h)) {
        h = h.replace(_, ".");
      }
      var d = {};
      o.uniformIndices.forEach(function (e) {
        var t = s[e];
        var n = m[t.type];
        var r = n.Type;
        var i = t.size * n.size;
        var o = t.name;
        if (o.substr(0, h.length) === h) {
          o = o.substr(h.length);
        }
        d[o] = new r(a, t.offset, i / r.BYTES_PER_ELEMENT);
      });
      return {
        name: r,
        array: a,
        asFloat: new Float32Array(a),
        buffer: c,
        uniforms: d
      };
    }
    function H(e, t, n) {
      var r = (t.uniformBlockSpec || t).blockSpecs[n.name];
      if (r) {
        var i = r.index;
        e.bindBufferRange(e.UNIFORM_BUFFER, i, n.buffer, n.offset || 0, n.array.byteLength);
        return true;
      }
      return false;
    }
    function W(e, t) {
      var n = {};
      for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; ++i) {
        var s = e.getActiveAttrib(t, i);
        if (!F(s)) {
          var o = e.getAttribLocation(t, s.name);
          var a = O[s.type];
          var c = a.setter(e, o, a);
          c.location = o;
          n[s.name] = c;
        }
      }
      return n;
    }
    function K(e, t) {
      for (var n in t) {
        var r = e[n];
        if (r) {
          r(t[n]);
        }
      }
    }
    function X(e, t) {
      var n = {
        program: t,
        uniformSetters: j(e, t),
        attribSetters: W(e, t)
      };
      if (i.isWebGL2(e)) {
        n.uniformBlockSpec = V(e, t);
        n.transformFeedbackInfo = z(e, t);
      }
      return n;
    }
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.axisRotate = function (e, t, n, r) {
      r = r || new i(16);
      var s = t[0];
      var o = t[1];
      var a = t[2];
      var c = Math.sqrt(s * s + o * o + a * a);
      var l = (s /= c) * s;
      var u = (o /= c) * o;
      var h = (a /= c) * a;
      var d = Math.cos(n);
      var p = Math.sin(n);
      var f = 1 - d;
      var m = l + (1 - l) * d;
      var g = s * o * f + a * p;
      var b = s * a * f - o * p;
      var y = s * o * f - a * p;
      var E = u + (1 - u) * d;
      var T = o * a * f + s * p;
      var v = s * a * f + o * p;
      var A = o * a * f - s * p;
      var w = h + (1 - h) * d;
      var S = e[0];
      var k = e[1];
      var I = e[2];
      var O = e[3];
      var N = e[4];
      var R = e[5];
      var x = e[6];
      var M = e[7];
      var C = e[8];
      var P = e[9];
      var L = e[10];
      var D = e[11];
      r[0] = m * S + g * N + b * C;
      r[1] = m * k + g * R + b * P;
      r[2] = m * I + g * x + b * L;
      r[3] = m * O + g * M + b * D;
      r[4] = y * S + E * N + T * C;
      r[5] = y * k + E * R + T * P;
      r[6] = y * I + E * x + T * L;
      r[7] = y * O + E * M + T * D;
      r[8] = v * S + A * N + w * C;
      r[9] = v * k + A * R + w * P;
      r[10] = v * I + A * x + w * L;
      r[11] = v * O + A * M + w * D;
      if (e !== r) {
        r[12] = e[12];
        r[13] = e[13];
        r[14] = e[14];
        r[15] = e[15];
      }
      return r;
    };
    t.axisRotation = function (e, t, n) {
      n = n || new i(16);
      var r = e[0];
      var s = e[1];
      var o = e[2];
      var a = Math.sqrt(r * r + s * s + o * o);
      var c = (r /= a) * r;
      var l = (s /= a) * s;
      var u = (o /= a) * o;
      var h = Math.cos(t);
      var d = Math.sin(t);
      var p = 1 - h;
      n[0] = c + (1 - c) * h;
      n[1] = r * s * p + o * d;
      n[2] = r * o * p - s * d;
      n[3] = 0;
      n[4] = r * s * p - o * d;
      n[5] = l + (1 - l) * h;
      n[6] = s * o * p + r * d;
      n[7] = 0;
      n[8] = r * o * p + s * d;
      n[9] = s * o * p - r * d;
      n[10] = u + (1 - u) * h;
      n[11] = 0;
      n[12] = 0;
      n[13] = 0;
      n[14] = 0;
      n[15] = 1;
      return n;
    };
    t.copy = c;
    t.frustum = function (e, t, n, r, s, o, a) {
      a = a || new i(16);
      var c = t - e;
      var l = r - n;
      var u = s - o;
      a[0] = s * 2 / c;
      a[1] = 0;
      a[2] = 0;
      a[3] = 0;
      a[4] = 0;
      a[5] = s * 2 / l;
      a[6] = 0;
      a[7] = 0;
      a[8] = (e + t) / c;
      a[9] = (r + n) / l;
      a[10] = o / u;
      a[11] = -1;
      a[12] = 0;
      a[13] = 0;
      a[14] = s * o / u;
      a[15] = 0;
      return a;
    };
    t.getAxis = function (e, t, n) {
      n = n || r.create();
      var i = t * 4;
      n[0] = e[i + 0];
      n[1] = e[i + 1];
      n[2] = e[i + 2];
      return n;
    };
    t.getTranslation = function (e, t) {
      (t = t || r.create())[0] = e[12];
      t[1] = e[13];
      t[2] = e[14];
      return t;
    };
    t.identity = l;
    t.inverse = u;
    t.lookAt = function (e, t, n, c) {
      c = c || new i(16);
      var l = s;
      var u = o;
      var h = a;
      r.normalize(r.subtract(e, t, h), h);
      r.normalize(r.cross(n, h, l), l);
      r.normalize(r.cross(h, l, u), u);
      c[0] = l[0];
      c[1] = l[1];
      c[2] = l[2];
      c[3] = 0;
      c[4] = u[0];
      c[5] = u[1];
      c[6] = u[2];
      c[7] = 0;
      c[8] = h[0];
      c[9] = h[1];
      c[10] = h[2];
      c[11] = 0;
      c[12] = e[0];
      c[13] = e[1];
      c[14] = e[2];
      c[15] = 1;
      return c;
    };
    t.multiply = function (e, t, n) {
      n = n || new i(16);
      var r = e[0];
      var s = e[1];
      var o = e[2];
      var a = e[3];
      var c = e[4];
      var l = e[5];
      var u = e[6];
      var h = e[7];
      var d = e[8];
      var p = e[9];
      var f = e[10];
      var m = e[11];
      var g = e[12];
      var b = e[13];
      var y = e[14];
      var E = e[15];
      var T = t[0];
      var v = t[1];
      var A = t[2];
      var w = t[3];
      var S = t[4];
      var k = t[5];
      var I = t[6];
      var O = t[7];
      var N = t[8];
      var R = t[9];
      var x = t[10];
      var M = t[11];
      var C = t[12];
      var P = t[13];
      var L = t[14];
      var D = t[15];
      n[0] = r * T + c * v + d * A + g * w;
      n[1] = s * T + l * v + p * A + b * w;
      n[2] = o * T + u * v + f * A + y * w;
      n[3] = a * T + h * v + m * A + E * w;
      n[4] = r * S + c * k + d * I + g * O;
      n[5] = s * S + l * k + p * I + b * O;
      n[6] = o * S + u * k + f * I + y * O;
      n[7] = a * S + h * k + m * I + E * O;
      n[8] = r * N + c * R + d * x + g * M;
      n[9] = s * N + l * R + p * x + b * M;
      n[10] = o * N + u * R + f * x + y * M;
      n[11] = a * N + h * R + m * x + E * M;
      n[12] = r * C + c * P + d * L + g * D;
      n[13] = s * C + l * P + p * L + b * D;
      n[14] = o * C + u * P + f * L + y * D;
      n[15] = a * C + h * P + m * L + E * D;
      return n;
    };
    t.negate = function (e, t) {
      (t = t || new i(16))[0] = -e[0];
      t[1] = -e[1];
      t[2] = -e[2];
      t[3] = -e[3];
      t[4] = -e[4];
      t[5] = -e[5];
      t[6] = -e[6];
      t[7] = -e[7];
      t[8] = -e[8];
      t[9] = -e[9];
      t[10] = -e[10];
      t[11] = -e[11];
      t[12] = -e[12];
      t[13] = -e[13];
      t[14] = -e[14];
      t[15] = -e[15];
      return t;
    };
    t.ortho = function (e, t, n, r, s, o, a) {
      (a = a || new i(16))[0] = 2 / (t - e);
      a[1] = 0;
      a[2] = 0;
      a[3] = 0;
      a[4] = 0;
      a[5] = 2 / (r - n);
      a[6] = 0;
      a[7] = 0;
      a[8] = 0;
      a[9] = 0;
      a[10] = 2 / (s - o);
      a[11] = 0;
      a[12] = (t + e) / (e - t);
      a[13] = (r + n) / (n - r);
      a[14] = (o + s) / (s - o);
      a[15] = 1;
      return a;
    };
    t.perspective = function (e, t, n, r, s) {
      s = s || new i(16);
      var o = Math.tan(Math.PI * 0.5 - e * 0.5);
      var a = 1 / (n - r);
      s[0] = o / t;
      s[1] = 0;
      s[2] = 0;
      s[3] = 0;
      s[4] = 0;
      s[5] = o;
      s[6] = 0;
      s[7] = 0;
      s[8] = 0;
      s[9] = 0;
      s[10] = (n + r) * a;
      s[11] = -1;
      s[12] = 0;
      s[13] = 0;
      s[14] = n * r * a * 2;
      s[15] = 0;
      return s;
    };
    t.rotateX = function (e, t, n) {
      n = n || new i(16);
      var r = e[4];
      var s = e[5];
      var o = e[6];
      var a = e[7];
      var c = e[8];
      var l = e[9];
      var u = e[10];
      var h = e[11];
      var d = Math.cos(t);
      var p = Math.sin(t);
      n[4] = d * r + p * c;
      n[5] = d * s + p * l;
      n[6] = d * o + p * u;
      n[7] = d * a + p * h;
      n[8] = d * c - p * r;
      n[9] = d * l - p * s;
      n[10] = d * u - p * o;
      n[11] = d * h - p * a;
      if (e !== n) {
        n[0] = e[0];
        n[1] = e[1];
        n[2] = e[2];
        n[3] = e[3];
        n[12] = e[12];
        n[13] = e[13];
        n[14] = e[14];
        n[15] = e[15];
      }
      return n;
    };
    t.rotateY = function (e, t, n) {
      n = n || new i(16);
      var r = e[0];
      var s = e[1];
      var o = e[2];
      var a = e[3];
      var c = e[8];
      var l = e[9];
      var u = e[10];
      var h = e[11];
      var d = Math.cos(t);
      var p = Math.sin(t);
      n[0] = d * r - p * c;
      n[1] = d * s - p * l;
      n[2] = d * o - p * u;
      n[3] = d * a - p * h;
      n[8] = d * c + p * r;
      n[9] = d * l + p * s;
      n[10] = d * u + p * o;
      n[11] = d * h + p * a;
      if (e !== n) {
        n[4] = e[4];
        n[5] = e[5];
        n[6] = e[6];
        n[7] = e[7];
        n[12] = e[12];
        n[13] = e[13];
        n[14] = e[14];
        n[15] = e[15];
      }
      return n;
    };
    t.rotateZ = function (e, t, n) {
      n = n || new i(16);
      var r = e[0];
      var s = e[1];
      var o = e[2];
      var a = e[3];
      var c = e[4];
      var l = e[5];
      var u = e[6];
      var h = e[7];
      var d = Math.cos(t);
      var p = Math.sin(t);
      n[0] = d * r + p * c;
      n[1] = d * s + p * l;
      n[2] = d * o + p * u;
      n[3] = d * a + p * h;
      n[4] = d * c - p * r;
      n[5] = d * l - p * s;
      n[6] = d * u - p * o;
      n[7] = d * h - p * a;
      if (e !== n) {
        n[8] = e[8];
        n[9] = e[9];
        n[10] = e[10];
        n[11] = e[11];
        n[12] = e[12];
        n[13] = e[13];
        n[14] = e[14];
        n[15] = e[15];
      }
      return n;
    };
    t.rotationX = function (e, t) {
      t = t || new i(16);
      var n = Math.cos(e);
      var r = Math.sin(e);
      t[0] = 1;
      t[1] = 0;
      t[2] = 0;
      t[3] = 0;
      t[4] = 0;
      t[5] = n;
      t[6] = r;
      t[7] = 0;
      t[8] = 0;
      t[9] = -r;
      t[10] = n;
      t[11] = 0;
      t[12] = 0;
      t[13] = 0;
      t[14] = 0;
      t[15] = 1;
      return t;
    };
    t.rotationY = function (e, t) {
      t = t || new i(16);
      var n = Math.cos(e);
      var r = Math.sin(e);
      t[0] = n;
      t[1] = 0;
      t[2] = -r;
      t[3] = 0;
      t[4] = 0;
      t[5] = 1;
      t[6] = 0;
      t[7] = 0;
      t[8] = r;
      t[9] = 0;
      t[10] = n;
      t[11] = 0;
      t[12] = 0;
      t[13] = 0;
      t[14] = 0;
      t[15] = 1;
      return t;
    };
    t.rotationZ = function (e, t) {
      t = t || new i(16);
      var n = Math.cos(e);
      var r = Math.sin(e);
      t[0] = n;
      t[1] = r;
      t[2] = 0;
      t[3] = 0;
      t[4] = -r;
      t[5] = n;
      t[6] = 0;
      t[7] = 0;
      t[8] = 0;
      t[9] = 0;
      t[10] = 1;
      t[11] = 0;
      t[12] = 0;
      t[13] = 0;
      t[14] = 0;
      t[15] = 1;
      return t;
    };
    t.scale = function (e, t, n) {
      n = n || new i(16);
      var r = t[0];
      var s = t[1];
      var o = t[2];
      n[0] = r * e[0];
      n[1] = r * e[1];
      n[2] = r * e[2];
      n[3] = r * e[3];
      n[4] = s * e[4];
      n[5] = s * e[5];
      n[6] = s * e[6];
      n[7] = s * e[7];
      n[8] = o * e[8];
      n[9] = o * e[9];
      n[10] = o * e[10];
      n[11] = o * e[11];
      if (e !== n) {
        n[12] = e[12];
        n[13] = e[13];
        n[14] = e[14];
        n[15] = e[15];
      }
      return n;
    };
    t.scaling = function (e, t) {
      (t = t || new i(16))[0] = e[0];
      t[1] = 0;
      t[2] = 0;
      t[3] = 0;
      t[4] = 0;
      t[5] = e[1];
      t[6] = 0;
      t[7] = 0;
      t[8] = 0;
      t[9] = 0;
      t[10] = e[2];
      t[11] = 0;
      t[12] = 0;
      t[13] = 0;
      t[14] = 0;
      t[15] = 1;
      return t;
    };
    t.setAxis = function (e, t, n, r) {
      if (r !== e) {
        r = c(e, r);
      }
      var i = n * 4;
      r[i + 0] = t[0];
      r[i + 1] = t[1];
      r[i + 2] = t[2];
      return r;
    };
    t.setDefaultType = function (e) {
      var t = i;
      i = e;
      return t;
    };
    t.setTranslation = function (e, t, n) {
      n = n || l();
      if (e !== n) {
        n[0] = e[0];
        n[1] = e[1];
        n[2] = e[2];
        n[3] = e[3];
        n[4] = e[4];
        n[5] = e[5];
        n[6] = e[6];
        n[7] = e[7];
        n[8] = e[8];
        n[9] = e[9];
        n[10] = e[10];
        n[11] = e[11];
      }
      n[12] = t[0];
      n[13] = t[1];
      n[14] = t[2];
      n[15] = 1;
      return n;
    };
    t.transformDirection = function (e, t, n) {
      n = n || r.create();
      var i = t[0];
      var s = t[1];
      var o = t[2];
      n[0] = i * e[0] + s * e[4] + o * e[8];
      n[1] = i * e[1] + s * e[5] + o * e[9];
      n[2] = i * e[2] + s * e[6] + o * e[10];
      return n;
    };
    t.transformNormal = function (e, t, n) {
      n = n || r.create();
      var i = u(e);
      var s = t[0];
      var o = t[1];
      var a = t[2];
      n[0] = s * i[0] + o * i[1] + a * i[2];
      n[1] = s * i[4] + o * i[5] + a * i[6];
      n[2] = s * i[8] + o * i[9] + a * i[10];
      return n;
    };
    t.transformPoint = function (e, t, n) {
      n = n || r.create();
      var i = t[0];
      var s = t[1];
      var o = t[2];
      var a = i * e[3] + s * e[7] + o * e[11] + e[15];
      n[0] = (i * e[0] + s * e[4] + o * e[8] + e[12]) / a;
      n[1] = (i * e[1] + s * e[5] + o * e[9] + e[13]) / a;
      n[2] = (i * e[2] + s * e[6] + o * e[10] + e[14]) / a;
      return n;
    };
    t.translate = function (e, t, n) {
      n = n || new i(16);
      var r = t[0];
      var s = t[1];
      var o = t[2];
      var a = e[0];
      var c = e[1];
      var l = e[2];
      var u = e[3];
      var h = e[4];
      var d = e[5];
      var p = e[6];
      var f = e[7];
      var m = e[8];
      var g = e[9];
      var b = e[10];
      var y = e[11];
      var E = e[12];
      var T = e[13];
      var v = e[14];
      var A = e[15];
      if (e !== n) {
        n[0] = a;
        n[1] = c;
        n[2] = l;
        n[3] = u;
        n[4] = h;
        n[5] = d;
        n[6] = p;
        n[7] = f;
        n[8] = m;
        n[9] = g;
        n[10] = b;
        n[11] = y;
      }
      n[12] = a * r + h * s + m * o + E;
      n[13] = c * r + d * s + g * o + T;
      n[14] = l * r + p * s + b * o + v;
      n[15] = u * r + f * s + y * o + A;
      return n;
    };
    t.translation = function (e, t) {
      (t = t || new i(16))[0] = 1;
      t[1] = 0;
      t[2] = 0;
      t[3] = 0;
      t[4] = 0;
      t[5] = 1;
      t[6] = 0;
      t[7] = 0;
      t[8] = 0;
      t[9] = 0;
      t[10] = 1;
      t[11] = 0;
      t[12] = e[0];
      t[13] = e[1];
      t[14] = e[2];
      t[15] = 1;
      return t;
    };
    t.transpose = function (e, t) {
      var n;
      if ((t = t || new i(16)) === e) {
        n = e[1];
        e[1] = e[4];
        e[4] = n;
        n = e[2];
        e[2] = e[8];
        e[8] = n;
        n = e[3];
        e[3] = e[12];
        e[12] = n;
        n = e[6];
        e[6] = e[9];
        e[9] = n;
        n = e[7];
        e[7] = e[13];
        e[13] = n;
        n = e[11];
        e[11] = e[14];
        e[14] = n;
        return t;
      }
      var r = e[0];
      var s = e[1];
      var o = e[2];
      var a = e[3];
      var c = e[4];
      var l = e[5];
      var u = e[6];
      var h = e[7];
      var d = e[8];
      var p = e[9];
      var f = e[10];
      var m = e[11];
      var g = e[12];
      var b = e[13];
      var y = e[14];
      var E = e[15];
      t[0] = r;
      t[1] = c;
      t[2] = d;
      t[3] = g;
      t[4] = s;
      t[5] = l;
      t[6] = p;
      t[7] = b;
      t[8] = o;
      t[9] = u;
      t[10] = f;
      t[11] = y;
      t[12] = a;
      t[13] = h;
      t[14] = m;
      t[15] = E;
      return t;
    };
    var r = function (e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }(n(3));
    var i = Float32Array;
    var s = r.create();
    var o = r.create();
    var a = r.create();
    function c(e, t) {
      (t = t || new i(16))[0] = e[0];
      t[1] = e[1];
      t[2] = e[2];
      t[3] = e[3];
      t[4] = e[4];
      t[5] = e[5];
      t[6] = e[6];
      t[7] = e[7];
      t[8] = e[8];
      t[9] = e[9];
      t[10] = e[10];
      t[11] = e[11];
      t[12] = e[12];
      t[13] = e[13];
      t[14] = e[14];
      t[15] = e[15];
      return t;
    }
    function l(e) {
      (e = e || new i(16))[0] = 1;
      e[1] = 0;
      e[2] = 0;
      e[3] = 0;
      e[4] = 0;
      e[5] = 1;
      e[6] = 0;
      e[7] = 0;
      e[8] = 0;
      e[9] = 0;
      e[10] = 1;
      e[11] = 0;
      e[12] = 0;
      e[13] = 0;
      e[14] = 0;
      e[15] = 1;
      return e;
    }
    function u(e, t) {
      t = t || new i(16);
      var n = e[0];
      var r = e[1];
      var s = e[2];
      var o = e[3];
      var a = e[4];
      var c = e[5];
      var l = e[6];
      var u = e[7];
      var h = e[8];
      var d = e[9];
      var p = e[10];
      var f = e[11];
      var m = e[12];
      var g = e[13];
      var b = e[14];
      var y = e[15];
      var E = p * y;
      var T = b * f;
      var v = l * y;
      var A = b * u;
      var w = l * f;
      var S = p * u;
      var k = s * y;
      var I = b * o;
      var O = s * f;
      var N = p * o;
      var R = s * u;
      var x = l * o;
      var M = h * g;
      var C = m * d;
      var P = a * g;
      var L = m * c;
      var D = a * d;
      var B = h * c;
      var U = n * g;
      var F = m * r;
      var j = n * d;
      var z = h * r;
      var G = n * c;
      var V = a * r;
      var _ = E * c + A * d + w * g - (T * c + v * d + S * g);
      var Y = T * r + k * d + N * g - (E * r + I * d + O * g);
      var H = v * r + I * c + R * g - (A * r + k * c + x * g);
      var W = S * r + O * c + x * d - (w * r + N * c + R * d);
      var K = 1 / (n * _ + a * Y + h * H + m * W);
      t[0] = K * _;
      t[1] = K * Y;
      t[2] = K * H;
      t[3] = K * W;
      t[4] = K * (T * a + v * h + S * m - (E * a + A * h + w * m));
      t[5] = K * (E * n + I * h + O * m - (T * n + k * h + N * m));
      t[6] = K * (A * n + k * a + x * m - (v * n + I * a + R * m));
      t[7] = K * (w * n + N * a + R * h - (S * n + O * a + x * h));
      t[8] = K * (M * u + L * f + D * y - (C * u + P * f + B * y));
      t[9] = K * (C * o + U * f + z * y - (M * o + F * f + j * y));
      t[10] = K * (P * o + F * u + G * y - (L * o + U * u + V * y));
      t[11] = K * (B * o + j * u + V * f - (D * o + z * u + G * f));
      t[12] = K * (P * p + B * b + C * l - (D * b + M * l + L * p));
      t[13] = K * (j * b + M * s + F * p - (U * p + z * b + C * s));
      t[14] = K * (U * l + V * b + L * s - (G * b + P * s + F * l));
      t[15] = K * (G * p + D * s + z * l - (j * l + V * p + B * s));
      return t;
    }
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.createAttribsFromArrays = g;
    t.createBuffersFromArrays = function (e, t) {
      var n = {};
      Object.keys(t).forEach(function (r) {
        n[r] = y(e, t[r], r);
      });
      if (t.indices) {
        n.numElements = t.indices.length;
        n.elementType = r.getGLTypeForTypedArray(m(t.indices), "indices");
      } else {
        n.numElements = function (e) {
          for (var t, n = 0; n < b.length && !((t = b[n]) in e); ++n);
          if (ii === b.length) {
            t = Object.keys(e)[0];
          }
          var r = e[t];
          var i = u(r).length;
          var s = f(r, t);
          var o = i / s;
          if (i % s > 0) {
            throw "numComponents " + s + " not correct for length " + i;
          }
          return o;
        }(t);
      }
      return n;
    };
    t.createBufferFromArray = y;
    t.createBufferFromTypedArray = c;
    t.createBufferInfoFromArrays = function (e, t) {
      var n = {
        attribs: g(e, t)
      };
      var i = t.indices;
      if (i) {
        var s = m(i, "indices");
        n.indices = c(e, s, e.ELEMENT_ARRAY_BUFFER);
        n.numElements = s.length;
        n.elementType = r.getGLTypeForTypedArray(s);
      } else {
        n.numElements = function (e, t) {
          var n;
          var r;
          for (r = 0; r < b.length && !((n = b[r]) in t) && !((n = o.attribPrefix + n) in t); ++r);
          if (r === b.length) {
            n = Object.keys(t)[0];
          }
          var i = t[n];
          e.bindBuffer(e.ARRAY_BUFFER, i.buffer);
          var s = e.getBufferParameter(e.ARRAY_BUFFER, e.BUFFER_SIZE);
          e.bindBuffer(e.ARRAY_BUFFER, null);
          var a = function (e, t) {
            if (t === e.BYTE || t === e.UNSIGNED_BYTE) {
              return 1;
            } else if (t === e.SHORT || t === e.UNSIGNED_SHORT) {
              return 2;
            } else if (t === e.INT || t === e.UNSIGNED_INT || t === e.FLOAT) {
              return 4;
            } else {
              return 0;
            }
          }(e, i.type);
          var c = s / a;
          var l = i.numComponents || i.size;
          var u = c / l;
          if (u % 1 != 0) {
            throw "numComponents " + l + " not correct for length " + length;
          }
          return u;
        }(e, n.attribs);
      }
      return n;
    };
    t.setAttribInfoBufferFromArray = function (e, t, n, r) {
      n = m(n);
      if (r !== undefined) {
        e.bindBuffer(e.ARRAY_BUFFER, t.buffer);
        e.bufferSubData(e.ARRAY_BUFFER, r, n);
      } else {
        a(e, e.ARRAY_BUFFER, t.buffer, n, t.drawType);
      }
    };
    t.setAttributePrefix = function (e) {
      o.attribPrefix = e;
    };
    t.setAttributeDefaults_ = function (e) {
      i.copyExistingProperties(e, o);
    };
    t.getNumComponents_ = f;
    t.getArray_ = u;
    var r = s(n(1));
    var i = s(n(0));
    function s(e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }
    var o = {
      attribPrefix: ""
    };
    function a(e, t, n, r, i) {
      e.bindBuffer(t, n);
      e.bufferData(t, r, i || e.STATIC_DRAW);
    }
    function c(e, t, n, r) {
      if (i.isBuffer(e, t)) {
        return t;
      }
      n = n || e.ARRAY_BUFFER;
      var s = e.createBuffer();
      a(e, n, s, t, r);
      return s;
    }
    function l(e) {
      return e === "indices";
    }
    function u(e) {
      if (e.length) {
        return e;
      } else {
        return e.data;
      }
    }
    var h = /coord|texture/i;
    var d = /color|colour/i;
    function p(e, t) {
      var n;
      if (t % (n = h.test(e) ? 2 : d.test(e) ? 4 : 3) > 0) {
        throw "Can not guess numComponents for attribute '" + e + "'. Tried " + n + " but " + t + " values is not evenly divisible by " + n + ". You should specify it.";
      }
      return n;
    }
    function f(e, t) {
      return e.numComponents || e.size || p(t, u(e).length);
    }
    function m(e, t) {
      if (r.isArrayBuffer(e)) {
        return e;
      }
      if (r.isArrayBuffer(e.data)) {
        return e.data;
      }
      if (Array.isArray(e)) {
        e = {
          data: e
        };
      }
      var n = e.type;
      n ||= l(t) ? Uint16Array : Float32Array;
      return new n(e.data);
    }
    function g(e, t) {
      var n = {};
      Object.keys(t).forEach(function (i) {
        if (!l(i)) {
          var s;
          var a;
          var u;
          var h;
          var d;
          var g = t[i];
          var b = g.attrib || g.name || g.attribName || o.attribPrefix + i;
          if (typeof g == "number" || typeof g.data == "number") {
            d = g.data || g;
            var y = g.type || Float32Array;
            var E = d * y.BYTES_PER_ELEMENT;
            a = r.getGLTypeForTypedArrayType(y);
            u = g.normalize !== undefined ? g.normalize : (v = y) === Int8Array || v === Uint8Array;
            h = g.numComponents || g.size || p(i, d);
            s = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, s);
            e.bufferData(e.ARRAY_BUFFER, E, g.drawType || e.STATIC_DRAW);
          } else {
            var T = m(g, i);
            s = c(e, T, undefined, g.drawType);
            a = r.getGLTypeForTypedArray(T);
            u = g.normalize !== undefined ? g.normalize : function (e) {
              return e instanceof Int8Array || e instanceof Uint8Array;
            }(T);
            h = f(g, i);
            d = T.length;
          }
          n[b] = {
            buffer: s,
            numComponents: h,
            type: a,
            normalize: u,
            stride: g.stride || 0,
            offset: g.offset || 0,
            divisor: g.divisor === undefined ? undefined : g.divisor,
            drawType: g.drawType
          };
        }
        var v;
      });
      e.bindBuffer(e.ARRAY_BUFFER, null);
      return n;
    }
    var b = ["position", "positions", "a_position"];
    function y(e, t, n) {
      var r = n === "indices" ? e.ELEMENT_ARRAY_BUFFER : e.ARRAY_BUFFER;
      return c(e, m(t, n), r);
    }
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.setTextureDefaults_ = function (e) {
      o.copyExistingProperties(e, l);
      if (e.textureColor) {
        Y(e.textureColor);
      }
    };
    t.createSampler = $;
    t.createSamplers = function (e, t) {
      var n = {};
      Object.keys(t).forEach(function (r) {
        n[r] = $(e, t[r]);
      });
      return n;
    };
    t.setSamplerParameters = J;
    t.createTexture = fe;
    t.setEmptyTexture = pe;
    t.setTextureFromArray = de;
    t.loadTextureFromUrl = le;
    t.setTextureFromElement = ie;
    t.setTextureFilteringForSize = ee;
    t.setTextureParameters = Q;
    t.setDefaultTextureColor = Y;
    t.createTextures = function (e, t, n) {
      n = n || se;
      var r = 0;
      var i = [];
      var s = {};
      var o = {};
      function a() {
        if (r === 0) {
          setTimeout(function () {
            n(i.length ? i : undefined, s, o);
          }, 0);
        }
      }
      Object.keys(t).forEach(function (n) {
        var c;
        var l;
        var u = t[n];
        if (typeof (l = u.src) == "string" || Array.isArray(l) && typeof l[0] == "string") {
          c = function (e, t, s) {
            o[n] = s;
            --r;
            if (e) {
              i.push(e);
            }
            a();
          };
          ++r;
        }
        s[n] = fe(e, u, c);
      });
      a();
      return s;
    };
    t.resizeTexture = function (e, t, n, r, i) {
      r = r || n.width;
      i = i || n.height;
      var s = n.target || e.TEXTURE_2D;
      e.bindTexture(s, t);
      var o;
      var a = n.level || 0;
      var c = n.internalFormat || n.format || e.RGBA;
      var l = z(c);
      var h = n.format || l.format;
      var d = n.src;
      o = d && (u(d) || Array.isArray(d) && typeof d[0] == "number") ? n.type || V(e, d, l.type) : n.type || l.type;
      if (s === e.TEXTURE_CUBE_MAP) {
        for (var p = 0; p < 6; ++p) {
          e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + p, a, c, r, i, 0, h, o, null);
        }
      } else {
        e.texImage2D(s, a, c, r, i, 0, h, o, null);
      }
    };
    t.getNumComponentsForFormat = function (e) {
      var t = D[e];
      if (!t) {
        throw "unknown format: " + e;
      }
      return t.numColorComponents;
    };
    t.getBytesPerElementForInternalFormat = j;
    var r;
    var i = c(n(4));
    var s = c(n(1));
    var o = c(n(0));
    var a = (r = n(2)) && r.__esModule ? r : {
      default: r
    };
    function c(e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }
    var l = {
      textureColor: new Uint8Array([128, 192, 255, 255]),
      textureOptions: {},
      crossOrigin: undefined
    };
    var u = s.isArrayBuffer;
    var h = a.default.document && a.default.document.createElement ? a.default.document.createElement("canvas").getContext("2d") : null;
    var d = 6406;
    var p = 6407;
    var f = 6408;
    var m = 6409;
    var g = 6410;
    var b = 6402;
    var y = 34041;
    var E = 5120;
    var T = 5121;
    var v = 5122;
    var A = 5123;
    var w = 5124;
    var S = 5125;
    var k = 5126;
    var I = 5131;
    var O = 36193;
    var N = 33640;
    var R = 33319;
    var x = 33320;
    var M = 6403;
    var C = 36244;
    var P = 36248;
    var L = 36249;
    var D = {};
    var B = D;
    B[6406] = {
      numColorComponents: 1
    };
    B[6409] = {
      numColorComponents: 1
    };
    B[6410] = {
      numColorComponents: 2
    };
    B[p] = {
      numColorComponents: 3
    };
    B[f] = {
      numColorComponents: 4
    };
    B[M] = {
      numColorComponents: 1
    };
    B[36244] = {
      numColorComponents: 1
    };
    B[R] = {
      numColorComponents: 2
    };
    B[33320] = {
      numColorComponents: 2
    };
    B[p] = {
      numColorComponents: 3
    };
    B[36248] = {
      numColorComponents: 3
    };
    B[f] = {
      numColorComponents: 4
    };
    B[36249] = {
      numColorComponents: 4
    };
    B[6402] = {
      numColorComponents: 1
    };
    B[34041] = {
      numColorComponents: 2
    };
    var U = {};
    var F = U;
    function j(e, t) {
      var n = U[e];
      if (!n) {
        throw "unknown internal format";
      }
      var r = n.bytesPerElementMap[t];
      if (r === undefined) {
        throw "unknown internal format";
      }
      return r;
    }
    function z(e) {
      var t = U[e];
      if (!t) {
        throw "unknown internal format";
      }
      return {
        format: t.textureFormat,
        type: Array.isArray(t.type) ? t.type[0] : t.type
      };
    }
    function G(e) {
      return !(e & e - 1);
    }
    function V(e, t, n) {
      if (u(t)) {
        return s.getGLTypeForTypedArray(t);
      } else {
        return n || e.UNSIGNED_BYTE;
      }
    }
    function _(e, t, n, r, i) {
      if (i % 1 != 0) {
        throw "can't guess dimensions";
      }
      if (n || r) {
        if (r) {
          if (!n && (n = i / r) % 1) {
            throw "can't guess dimensions";
          }
        } else if ((r = i / n) % 1) {
          throw "can't guess dimensions";
        }
      } else {
        var s = Math.sqrt(i / (t === e.TEXTURE_CUBE_MAP ? 6 : 1));
        if (s % 1 == 0) {
          n = s;
          r = s;
        } else {
          n = i;
          r = 1;
        }
      }
      return {
        width: n,
        height: r
      };
    }
    function Y(e) {
      l.textureColor = new Uint8Array([e[0] * 255, e[1] * 255, e[2] * 255, e[3] * 255]);
    }
    F[6406] = {
      textureFormat: d,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [1, 2, 2, 4],
      type: [T, I, O, k]
    };
    F[6409] = {
      textureFormat: m,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [1, 2, 2, 4],
      type: [T, I, O, k]
    };
    F[6410] = {
      textureFormat: g,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [2, 4, 4, 8],
      type: [T, I, O, k]
    };
    F[p] = {
      textureFormat: p,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [3, 6, 6, 12, 2],
      type: [T, I, O, k, 33635]
    };
    F[f] = {
      textureFormat: f,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [4, 8, 8, 16, 2, 2],
      type: [T, I, O, k, 32819, 32820]
    };
    F[33321] = {
      textureFormat: M,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: 1,
      type: T
    };
    F[36756] = {
      textureFormat: M,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: 1,
      type: E
    };
    F[33325] = {
      textureFormat: M,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: [4, 2],
      type: [k, I]
    };
    F[33326] = {
      textureFormat: M,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 4,
      type: k
    };
    F[33330] = {
      textureFormat: C,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 1,
      type: T
    };
    F[33329] = {
      textureFormat: C,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 1,
      type: E
    };
    F[33332] = {
      textureFormat: C,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 2,
      type: A
    };
    F[33331] = {
      textureFormat: C,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 2,
      type: v
    };
    F[33334] = {
      textureFormat: C,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: S
    };
    F[33333] = {
      textureFormat: C,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: w
    };
    F[33323] = {
      textureFormat: R,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: 2,
      type: T
    };
    F[36757] = {
      textureFormat: R,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: 2,
      type: E
    };
    F[33327] = {
      textureFormat: R,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: [8, 4],
      type: [k, I]
    };
    F[33328] = {
      textureFormat: R,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 8,
      type: k
    };
    F[33336] = {
      textureFormat: x,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 2,
      type: T
    };
    F[33335] = {
      textureFormat: x,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 2,
      type: E
    };
    F[33338] = {
      textureFormat: x,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: A
    };
    F[33337] = {
      textureFormat: x,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: v
    };
    F[33340] = {
      textureFormat: x,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 8,
      type: S
    };
    F[33339] = {
      textureFormat: x,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 8,
      type: w
    };
    F[32849] = {
      textureFormat: p,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: 3,
      type: T
    };
    F[35905] = {
      textureFormat: p,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: 3,
      type: T
    };
    F[36194] = {
      textureFormat: p,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [3, 2],
      type: [T, 33635]
    };
    F[36758] = {
      textureFormat: p,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: 3,
      type: E
    };
    F[35898] = {
      textureFormat: p,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: [12, 6, 4],
      type: [k, I, 35899]
    };
    F[35901] = {
      textureFormat: p,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: [12, 6, 4],
      type: [k, I, 35902]
    };
    F[34843] = {
      textureFormat: p,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: [12, 6],
      type: [k, I]
    };
    F[34837] = {
      textureFormat: p,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 12,
      type: k
    };
    F[36221] = {
      textureFormat: P,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 3,
      type: T
    };
    F[36239] = {
      textureFormat: P,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 3,
      type: E
    };
    F[36215] = {
      textureFormat: P,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 6,
      type: A
    };
    F[36233] = {
      textureFormat: P,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 6,
      type: v
    };
    F[36209] = {
      textureFormat: P,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 12,
      type: S
    };
    F[36227] = {
      textureFormat: P,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 12,
      type: w
    };
    F[32856] = {
      textureFormat: f,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: 4,
      type: T
    };
    F[35907] = {
      textureFormat: f,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: 4,
      type: T
    };
    F[36759] = {
      textureFormat: f,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: 4,
      type: E
    };
    F[32855] = {
      textureFormat: f,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [4, 2, 4],
      type: [T, 32820, N]
    };
    F[32854] = {
      textureFormat: f,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: [4, 2],
      type: [T, 32819]
    };
    F[32857] = {
      textureFormat: f,
      colorRenderable: true,
      textureFilterable: true,
      bytesPerElement: 4,
      type: N
    };
    F[34842] = {
      textureFormat: f,
      colorRenderable: false,
      textureFilterable: true,
      bytesPerElement: [16, 8],
      type: [k, I]
    };
    F[34836] = {
      textureFormat: f,
      colorRenderable: false,
      textureFilterable: false,
      bytesPerElement: 16,
      type: k
    };
    F[36220] = {
      textureFormat: L,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: T
    };
    F[36238] = {
      textureFormat: L,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: E
    };
    F[36975] = {
      textureFormat: L,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: N
    };
    F[36214] = {
      textureFormat: L,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 8,
      type: A
    };
    F[36232] = {
      textureFormat: L,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 8,
      type: v
    };
    F[36226] = {
      textureFormat: L,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 16,
      type: w
    };
    F[36208] = {
      textureFormat: L,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 16,
      type: S
    };
    F[33189] = {
      textureFormat: b,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: [2, 4],
      type: [A, S]
    };
    F[33190] = {
      textureFormat: b,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: S
    };
    F[36012] = {
      textureFormat: b,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: k
    };
    F[35056] = {
      textureFormat: y,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: 34042
    };
    F[36013] = {
      textureFormat: y,
      colorRenderable: true,
      textureFilterable: false,
      bytesPerElement: 4,
      type: 36269
    };
    Object.keys(F).forEach(function (e) {
      var t = F[e];
      t.bytesPerElementMap = {};
      if (Array.isArray(t.bytesPerElement)) {
        t.bytesPerElement.forEach(function (e, n) {
          var r = t.type[n];
          t.bytesPerElementMap[r] = e;
        });
      } else {
        var n = t.type;
        t.bytesPerElementMap[n] = t.bytesPerElement;
      }
    });
    var H = {};
    function W(e, t) {
      if (t.colorspaceConversion !== undefined) {
        H.colorspaceConversion = e.getParameter(e.UNPACK_COLORSPACE_CONVERSION_WEBGL);
        e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.colorspaceConversion);
      }
      if (t.premultiplyAlpha !== undefined) {
        H.premultiplyAlpha = e.getParameter(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha);
      }
      if (t.flipY !== undefined) {
        H.flipY = e.getParameter(e.UNPACK_FLIP_Y_WEBGL);
        e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, t.flipY);
      }
    }
    function K(e, t) {
      if (t.colorspaceConversion !== undefined) {
        e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, H.colorspaceConversion);
      }
      if (t.premultiplyAlpha !== undefined) {
        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, H.premultiplyAlpha);
      }
      if (t.flipY !== undefined) {
        e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, H.flipY);
      }
    }
    function X(e) {
      H.unpackAlignment = e.getParameter(e.UNPACK_ALIGNMENT);
      if (i.isWebGL2(e)) {
        H.unpackRowLength = e.getParameter(e.UNPACK_ROW_LENGTH);
        H.unpackImageHeight = e.getParameter(e.UNPACK_IMAGE_HEIGHT);
        H.unpackSkipPixels = e.getParameter(e.UNPACK_SKIP_PIXELS);
        H.unpackSkipRows = e.getParameter(e.UNPACK_SKIP_ROWS);
        H.unpackSkipImages = e.getParameter(e.UNPACK_SKIP_IMAGES);
      }
    }
    function Z(e) {
      e.pixelStorei(e.UNPACK_ALIGNMENT, H.unpackAlignment);
      if (i.isWebGL2(e)) {
        e.pixelStorei(e.UNPACK_ROW_LENGTH, H.unpackRowLength);
        e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, H.unpackImageHeight);
        e.pixelStorei(e.UNPACK_SKIP_PIXELS, H.unpackSkipPixels);
        e.pixelStorei(e.UNPACK_SKIP_ROWS, H.unpackSkipRows);
        e.pixelStorei(e.UNPACK_SKIP_IMAGES, H.unpackSkipImages);
      }
    }
    function q(e, t, n, r) {
      if (r.minMag) {
        n.call(e, t, e.TEXTURE_MIN_FILTER, r.minMag);
        n.call(e, t, e.TEXTURE_MAG_FILTER, r.minMag);
      }
      if (r.min) {
        n.call(e, t, e.TEXTURE_MIN_FILTER, r.min);
      }
      if (r.mag) {
        n.call(e, t, e.TEXTURE_MAG_FILTER, r.mag);
      }
      if (r.wrap) {
        n.call(e, t, e.TEXTURE_WRAP_S, r.wrap);
        n.call(e, t, e.TEXTURE_WRAP_T, r.wrap);
        if (t === e.TEXTURE_3D || o.isSampler(e, t)) {
          n.call(e, t, e.TEXTURE_WRAP_R, r.wrap);
        }
      }
      if (r.wrapR) {
        n.call(e, t, e.TEXTURE_WRAP_R, r.wrapR);
      }
      if (r.wrapS) {
        n.call(e, t, e.TEXTURE_WRAP_S, r.wrapS);
      }
      if (r.wrapT) {
        n.call(e, t, e.TEXTURE_WRAP_T, r.wrapT);
      }
      if (r.minLod) {
        n.call(e, t, e.TEXTURE_MIN_LOD, r.minLod);
      }
      if (r.maxLod) {
        n.call(e, t, e.TEXTURE_MAX_LOD, r.maxLod);
      }
      if (r.baseLevel) {
        n.call(e, t, e.TEXTURE_BASE_LEVEL, r.baseLevel);
      }
      if (r.maxLevel) {
        n.call(e, t, e.TEXTURE_MAX_LEVEL, r.maxLevel);
      }
    }
    function Q(e, t, n) {
      var r = n.target || e.TEXTURE_2D;
      e.bindTexture(r, t);
      q(e, r, e.texParameteri, n);
    }
    function J(e, t, n) {
      q(e, t, e.samplerParameteri, n);
    }
    function $(e, t) {
      var n = e.createSampler();
      J(e, n, t);
      return n;
    }
    function ee(e, t, n, r, s, o, a) {
      n = n || l.textureOptions;
      o = o || e.RGBA;
      a = a || e.UNSIGNED_BYTE;
      var c = n.target || e.TEXTURE_2D;
      r = r || n.width;
      s = s || n.height;
      e.bindTexture(c, t);
      if (function (e, t, n, r) {
        if (!i.isWebGL2(e)) {
          return G(t) && G(n);
        }
        var s = U[r];
        if (!s) {
          throw "unknown internal format";
        }
        return s.colorRenderable && s.textureFilterable;
      }(e, r, s, o)) {
        e.generateMipmap(c);
      } else {
        var u = function (e) {
          var t = U[e];
          if (!t) {
            throw "unknown internal format";
          }
          return t.textureFilterable;
        }(o) ? e.LINEAR : e.NEAREST;
        e.texParameteri(c, e.TEXTURE_MIN_FILTER, u);
        e.texParameteri(c, e.TEXTURE_MAG_FILTER, u);
        e.texParameteri(c, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
        e.texParameteri(c, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
      }
    }
    function te(e) {
      return e.auto === true || e.auto === undefined && e.level === undefined;
    }
    function ne(e, t) {
      return (t = t || {}).cubeFaceOrder || [e.TEXTURE_CUBE_MAP_POSITIVE_X, e.TEXTURE_CUBE_MAP_NEGATIVE_X, e.TEXTURE_CUBE_MAP_POSITIVE_Y, e.TEXTURE_CUBE_MAP_NEGATIVE_Y, e.TEXTURE_CUBE_MAP_POSITIVE_Z, e.TEXTURE_CUBE_MAP_NEGATIVE_Z];
    }
    function re(e, t) {
      var n = ne(e, t).map(function (e, t) {
        return {
          face: e,
          ndx: t
        };
      });
      n.sort(function (e, t) {
        return e.face - t.face;
      });
      return n;
    }
    function ie(e, t, n, r) {
      var i = (r = r || l.textureOptions).target || e.TEXTURE_2D;
      var s = r.level || 0;
      var o = n.width;
      var c = n.height;
      var u = r.internalFormat || r.format || e.RGBA;
      var d = z(u);
      var p = r.format || d.format;
      var f = r.type || d.type;
      W(e, r);
      e.bindTexture(i, t);
      if (i === e.TEXTURE_CUBE_MAP) {
        var m;
        var g;
        var b = n.width;
        var y = n.height;
        if (b / 6 === y) {
          m = y;
          g = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
        } else if (y / 6 === b) {
          m = b;
          g = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
        } else if (b / 3 == y / 2) {
          m = b / 3;
          g = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
        } else {
          if (b / 2 != y / 3) {
            throw "can't figure out cube map from element: " + (n.src ? n.src : n.nodeName);
          }
          m = b / 2;
          g = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
        }
        if (h) {
          h.canvas.width = m;
          h.canvas.height = m;
          o = m;
          c = m;
          re(e, r).forEach(function (t) {
            var r = g[t.ndx * 2 + 0] * m;
            var i = g[t.ndx * 2 + 1] * m;
            h.drawImage(n, r, i, m, m, 0, 0, m, m);
            e.texImage2D(t.face, s, u, p, f, h.canvas);
          });
          h.canvas.width = 1;
          h.canvas.height = 1;
        } else if (a.default.createImageBitmap) {
          o = m;
          c = m;
          re(e, r).forEach(function (l) {
            var h = g[l.ndx * 2 + 0] * m;
            var d = g[l.ndx * 2 + 1] * m;
            e.texImage2D(l.face, s, u, m, m, 0, p, f, null);
            a.default.createImageBitmap(n, h, d, m, m, {
              premultiplyAlpha: "none",
              colorSpaceConversion: "none"
            }).then(function (n) {
              W(e, r);
              e.bindTexture(i, t);
              e.texImage2D(l.face, s, u, p, f, n);
              K(e, r);
              if (te(r)) {
                ee(e, t, r, o, c, u, f);
              }
            });
          });
        }
      } else if (i === e.TEXTURE_3D || i === e.TEXTURE_2D_ARRAY) {
        var E = Math.min(n.width, n.height);
        var T = Math.max(n.width, n.height);
        var v = T / E;
        if (v % 1 != 0) {
          throw "can not compute 3D dimensions of element";
        }
        var A = n.width === T ? 1 : 0;
        var w = n.height === T ? 1 : 0;
        X(e);
        e.pixelStorei(e.UNPACK_ALIGNMENT, 1);
        e.pixelStorei(e.UNPACK_ROW_LENGTH, n.width);
        e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0);
        e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0);
        e.texImage3D(i, s, u, E, E, E, 0, p, f, null);
        for (var S = 0; S < v; ++S) {
          var k = S * E * A;
          var I = S * E * w;
          e.pixelStorei(e.UNPACK_SKIP_PIXELS, k);
          e.pixelStorei(e.UNPACK_SKIP_ROWS, I);
          e.texSubImage3D(i, s, 0, 0, S, E, E, 1, p, f, n);
        }
        Z(e);
      } else {
        e.texImage2D(i, s, u, p, f, n);
      }
      K(e, r);
      if (te(r)) {
        ee(e, t, r, o, c, u, f);
      }
      Q(e, t, r);
    }
    function se() {}
    function oe(e) {
      return a.default.ImageBitmap && e instanceof a.default.ImageBitmap || a.default.ImageData && e instanceof a.default.ImageData || a.default.HTMLElement && e instanceof a.default.HTMLElement;
    }
    function ae(e, t, n) {
      if (oe(e)) {
        setTimeout(function () {
          n(null, e);
        });
        return e;
      } else {
        return function (e, t, n) {
          var r;
          n = n || se;
          if (a.default.Image) {
            r = new a.default.Image();
            if ((t = t !== undefined ? t : l.crossOrigin) !== undefined) {
              r.crossOrigin = t;
            }
            function i() {
              r.removeEventListener("error", s);
              r.removeEventListener("load", c);
              r = null;
            }
            function s() {
              var t = "couldn't load image: " + e;
              o.error(t);
              n(t, r);
              i();
            }
            function c() {
              n(null, r);
              i();
            }
            r.addEventListener("error", s);
            r.addEventListener("load", c);
            r.src = e;
            return r;
          }
          if (a.default.ImageBitmap) {
            var u;
            var h;
            function d() {
              n(u, h);
            }
            var p = {};
            if (t) {
              p.mode = "cors";
            }
            fetch(e, p).then(function (e) {
              if (!e.ok) {
                throw e;
              }
              return e.blob();
            }).then(function (e) {
              return a.default.createImageBitmap(e, {
                premultiplyAlpha: "none",
                colorSpaceConversion: "none"
              });
            }).then(function (e) {
              h = e;
              setTimeout(d);
            }).catch(function (e) {
              u = e;
              setTimeout(d);
            });
            r = null;
          }
          return r;
        }(e, t, n);
      }
    }
    function ce(e, t, n) {
      var r = (n = n || l.textureOptions).target || e.TEXTURE_2D;
      e.bindTexture(r, t);
      if (n.color !== false) {
        var i = function (e) {
          e = e || l.textureColor;
          if (u(e)) {
            return e;
          } else {
            return new Uint8Array([e[0] * 255, e[1] * 255, e[2] * 255, e[3] * 255]);
          }
        }(n.color);
        if (r === e.TEXTURE_CUBE_MAP) {
          for (var s = 0; s < 6; ++s) {
            e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + s, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, i);
          }
        } else if (r === e.TEXTURE_3D || r === e.TEXTURE_2D_ARRAY) {
          e.texImage3D(r, 0, e.RGBA, 1, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, i);
        } else {
          e.texImage2D(r, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, i);
        }
      }
    }
    function le(e, t, n, r) {
      r = r || se;
      n = n || l.textureOptions;
      ce(e, t, n);
      return ae((n = Object.assign({}, n)).src, n.crossOrigin, function (i, s) {
        if (i) {
          r(i, t, s);
        } else {
          ie(e, t, s, n);
          r(null, t, s);
        }
      });
    }
    function ue(e, t, n, r) {
      r = r || se;
      var i = n.src;
      if (i.length !== 6) {
        throw "there must be 6 urls for a cubemap";
      }
      var s = n.level || 0;
      var o = n.internalFormat || n.format || e.RGBA;
      var a = z(o);
      var c = n.format || a.format;
      var l = n.type || e.UNSIGNED_BYTE;
      var u = n.target || e.TEXTURE_2D;
      if (u !== e.TEXTURE_CUBE_MAP) {
        throw "target must be TEXTURE_CUBE_MAP";
      }
      ce(e, t, n);
      n = Object.assign({}, n);
      var h;
      var d = 6;
      var p = [];
      var f = ne(e, n);
      h = i.map(function (i, a) {
        return ae(i, n.crossOrigin, (m = f[a], function (i, a) {
          --d;
          if (i) {
            p.push(i);
          } else if (a.width !== a.height) {
            p.push("cubemap face img is not a square: " + a.src);
          } else {
            W(e, n);
            e.bindTexture(u, t);
            if (d === 5) {
              ne(e).forEach(function (t) {
                e.texImage2D(t, s, o, c, l, a);
              });
            } else {
              e.texImage2D(m, s, o, c, l, a);
            }
            K(e, n);
            if (te(n)) {
              e.generateMipmap(u);
            }
          }
          if (d === 0) {
            r(p.length ? p : undefined, t, h);
          }
        }));
        var m;
      });
    }
    function he(e, t, n, r) {
      r = r || se;
      var i = n.src;
      var s = n.internalFormat || n.format || e.RGBA;
      var o = z(s);
      var a = n.format || o.format;
      var c = n.type || e.UNSIGNED_BYTE;
      var l = n.target || e.TEXTURE_2D_ARRAY;
      if (l !== e.TEXTURE_3D && l !== e.TEXTURE_2D_ARRAY) {
        throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
      }
      ce(e, t, n);
      n = Object.assign({}, n);
      var u;
      var d = i.length;
      var p = [];
      var f = n.level || 0;
      var m = n.width;
      var g = n.height;
      var b = i.length;
      var y = true;
      u = i.map(function (i, o) {
        return ae(i, n.crossOrigin, (E = o, function (i, o) {
          --d;
          if (i) {
            p.push(i);
          } else {
            W(e, n);
            e.bindTexture(l, t);
            if (y) {
              y = false;
              m = n.width || o.width;
              g = n.height || o.height;
              e.texImage3D(l, f, s, m, g, b, 0, a, c, null);
              for (var T = 0; T < b; ++T) {
                e.texSubImage3D(l, f, 0, 0, T, m, g, 1, a, c, o);
              }
            } else {
              var v = o;
              if (o.width !== m || o.height !== g) {
                v = h.canvas;
                h.canvas.width = m;
                h.canvas.height = g;
                h.drawImage(o, 0, 0, m, g);
              }
              e.texSubImage3D(l, f, 0, 0, E, m, g, 1, a, c, v);
              if (v === h.canvas) {
                h.canvas.width = 0;
                h.canvas.height = 0;
              }
            }
            K(e, n);
            if (te(n)) {
              e.generateMipmap(l);
            }
          }
          if (d === 0) {
            r(p.length ? p : undefined, t, u);
          }
        }));
        var E;
      });
    }
    function de(e, t, n, r) {
      var o = (r = r || l.textureOptions).target || e.TEXTURE_2D;
      e.bindTexture(o, t);
      var a = r.width;
      var c = r.height;
      var h = r.depth;
      var d = r.level || 0;
      var p = r.internalFormat || r.format || e.RGBA;
      var f = z(p);
      var m = r.format || f.format;
      var g = r.type || V(e, n, f.type);
      if (u(n)) {
        if (n instanceof Uint8ClampedArray) {
          n = new Uint8Array(n.buffer);
        }
      } else {
        var b = s.getTypedArrayTypeForGLType(g);
        n = new b(n);
      }
      var y;
      var E = j(p, g);
      var T = n.byteLength / E;
      if (T % 1) {
        throw "length wrong size for format: " + i.glEnumToString(e, m);
      }
      if (o === e.TEXTURE_3D) {
        if (a || c || h) {
          if (!a || c && h) {
            if (!c || a && h) {
              y = _(e, o, a, c, T / h);
              a = y.width;
              c = y.height;
            } else {
              y = _(e, o, a, h, T / c);
              a = y.width;
              h = y.height;
            }
          } else {
            y = _(e, o, c, h, T / a);
            c = y.width;
            h = y.height;
          }
        } else {
          var v = Math.cbrt(T);
          if (v % 1 != 0) {
            throw "can't guess cube size of array of numElements: " + T;
          }
          a = v;
          c = v;
          h = v;
        }
      } else {
        y = _(e, o, a, c, T);
        a = y.width;
        c = y.height;
      }
      X(e);
      e.pixelStorei(e.UNPACK_ALIGNMENT, r.unpackAlignment || 1);
      W(e, r);
      if (o === e.TEXTURE_CUBE_MAP) {
        var A = T / 6 * (E / n.BYTES_PER_ELEMENT);
        re(e, r).forEach(function (t) {
          var r = A * t.ndx;
          var i = n.subarray(r, r + A);
          e.texImage2D(t.face, d, p, a, c, 0, m, g, i);
        });
      } else if (o === e.TEXTURE_3D) {
        e.texImage3D(o, d, p, a, c, h, 0, m, g, n);
      } else {
        e.texImage2D(o, d, p, a, c, 0, m, g, n);
      }
      K(e, r);
      Z(e);
      return {
        width: a,
        height: c,
        depth: h,
        type: g
      };
    }
    function pe(e, t, n) {
      var r = n.target || e.TEXTURE_2D;
      e.bindTexture(r, t);
      var i = n.level || 0;
      var s = n.internalFormat || n.format || e.RGBA;
      var o = z(s);
      var a = n.format || o.format;
      var c = n.type || o.type;
      W(e, n);
      if (r === e.TEXTURE_CUBE_MAP) {
        for (var l = 0; l < 6; ++l) {
          e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + l, i, s, n.width, n.height, 0, a, c, null);
        }
      } else if (r === e.TEXTURE_3D) {
        e.texImage3D(r, i, s, n.width, n.height, n.depth, 0, a, c, null);
      } else {
        e.texImage2D(r, i, s, n.width, n.height, 0, a, c, null);
      }
      K(e, n);
    }
    function fe(e, t, n) {
      n = n || se;
      t = t || l.textureOptions;
      var r = e.createTexture();
      var i = t.target || e.TEXTURE_2D;
      var s = t.width || 1;
      var o = t.height || 1;
      var a = t.internalFormat || e.RGBA;
      var c = z(a);
      var h = t.type || c.type;
      e.bindTexture(i, r);
      if (i === e.TEXTURE_CUBE_MAP) {
        e.texParameteri(i, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
        e.texParameteri(i, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
      }
      var d = t.src;
      if (d) {
        if (typeof d == "function") {
          d = d(e, t);
        }
        if (typeof d == "string") {
          le(e, r, t, n);
        } else if (u(d) || Array.isArray(d) && (typeof d[0] == "number" || Array.isArray(d[0]) || u(d[0]))) {
          var p = de(e, r, d, t);
          s = p.width;
          o = p.height;
          h = p.type;
        } else if (Array.isArray(d) && (typeof d[0] == "string" || oe(d[0]))) {
          if (i === e.TEXTURE_CUBE_MAP) {
            ue(e, r, t, n);
          } else {
            he(e, r, t, n);
          }
        } else {
          if (!oe(d)) {
            throw "unsupported src type";
          }
          ie(e, r, d, t);
          s = d.width;
          o = d.height;
        }
      } else {
        pe(e, r, t);
      }
      if (te(t)) {
        ee(e, r, t, s, o, a, h);
      }
      Q(e, r, t);
      return r;
    }
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    var r = {
      m4: true,
      v3: true,
      primitives: true
    };
    t.primitives = t.v3 = t.m4 = undefined;
    var i = c(n(6));
    t.m4 = i;
    var s = c(n(3));
    t.v3 = s;
    var o = c(n(10));
    t.primitives = o;
    var a = n(11);
    function c(e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }
    Object.keys(a).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = a[e];
        }
      }
    });
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.create3DFVertices = O;
    t.createAugmentedTypedArray = d;
    t.createCubeVertices = S;
    t.createPlaneVertices = v;
    t.createSphereVertices = A;
    t.createTruncatedConeVertices = k;
    t.createXYQuadVertices = T;
    t.createCresentVertices = N;
    t.createCylinderVertices = R;
    t.createTorusVertices = x;
    t.createDiscVertices = M;
    t.deindexVertices = function (e) {
      var t = e.indices;
      var n = {};
      var r = t.length;
      Object.keys(e).filter(p).forEach(function (i) {
        var s = e[i];
        var o = s.numComponents;
        var a = d(o, r, s.constructor);
        for (var c = 0; c < r; ++c) {
          var l = t[c] * o;
          for (var u = 0; u < o; ++u) {
            a.push(s[l + u]);
          }
        }
        n[i] = a;
      });
      return n;
    };
    t.flattenNormals = function (e) {
      if (e.indices) {
        throw "can't flatten normals of indexed vertices. deindex them first";
      }
      var t = e.normal;
      for (var n = t.length, r = 0; r < n; r += 9) {
        var i = t[r + 0];
        var s = t[r + 1];
        var o = t[r + 2];
        var a = t[r + 3];
        var c = t[r + 4];
        var l = t[r + 5];
        var u = i + a + t[r + 6];
        var h = s + c + t[r + 7];
        var d = o + l + t[r + 8];
        var p = Math.sqrt(u * u + h * h + d * d);
        u /= p;
        h /= p;
        d /= p;
        t[r + 0] = u;
        t[r + 1] = h;
        t[r + 2] = d;
        t[r + 3] = u;
        t[r + 4] = h;
        t[r + 5] = d;
        t[r + 6] = u;
        t[r + 7] = h;
        t[r + 8] = d;
      }
      return e;
    };
    t.makeRandomVertexColors = function (e, t) {
      t = t || {};
      var n = e.position.numElements;
      var r = d(4, n, Uint8Array);
      var i = t.rand || function (e, t) {
        if (t < 3) {
          n = 256;
          return Math.random() * n | 0;
        } else {
          return 255;
        }
        var n;
      };
      e.color = r;
      if (e.indices) {
        for (var s = 0; s < n; ++s) {
          r.push(i(s, 0), i(s, 1), i(s, 2), i(s, 3));
        }
      } else {
        var o = t.vertsPerColor || 3;
        for (var a = n / o, c = 0; c < a; ++c) {
          var l = [i(c, 0), i(c, 1), i(c, 2), i(c, 3)];
          for (var u = 0; u < o; ++u) {
            r.push(l);
          }
        }
      }
      return e;
    };
    t.reorientDirections = g;
    t.reorientNormals = b;
    t.reorientPositions = y;
    t.reorientVertices = E;
    t.concatVertices = function (e) {
      var t;
      var n = {};
      var r = function (r) {
        var i = e[r];
        Object.keys(i).forEach(function (e) {
          n[e] ||= [];
          if (!t && e !== "indices") {
            t = e;
          }
          var r = i[e];
          var s = u(r, e);
          var o = l(r).length / s;
          n[e].push(o);
        });
      };
      for (var i = 0; i < e.length; ++i) {
        r(i);
      }
      var s = n[t];
      var o = {};
      Object.keys(n).forEach(function (t) {
        var n = function (t) {
          var n;
          var r = 0;
          for (var i = 0; i < e.length; ++i) {
            var s = e[i][t];
            r += l(s).length;
            if (!n || !!s.data) {
              n = s;
            }
          }
          return {
            length: r,
            spec: n
          };
        }(t);
        var r = B(n.spec, n.length);
        (function (t, n, r) {
          var i = 0;
          var s = 0;
          for (var o = 0; o < e.length; ++o) {
            var a = e[o][t];
            var c = l(a);
            if (t === "indices") {
              D(c, r, s, i);
              i += n[o];
            } else {
              D(c, r, s);
            }
            s += c.length;
          }
        })(t, s, l(r));
        o[t] = r;
      });
      return o;
    };
    t.duplicateVertices = function (e) {
      var t = {};
      Object.keys(e).forEach(function (n) {
        var r = e[n];
        var i = l(r);
        var s = B(r, i.length);
        D(i, l(s), 0);
        t[n] = s;
      });
      return t;
    };
    t.createDiscBuffers = t.createDiscBufferInfo = t.createTorusBuffers = t.createTorusBufferInfo = t.createCylinderBuffers = t.createCylinderBufferInfo = t.createCresentBuffers = t.createCresentBufferInfo = t.createXYQuadBuffers = t.createXYQuadBufferInfo = t.createTruncatedConeBuffers = t.createTruncatedConeBufferInfo = t.createSphereBuffers = t.createSphereBufferInfo = t.createPlaneBuffers = t.createPlaneBufferInfo = t.createCubeBuffers = t.createCubeBufferInfo = t.create3DFBuffers = t.create3DFBufferInfo = undefined;
    var r = c(n(7));
    var i = c(n(0));
    var s = c(n(1));
    var o = c(n(6));
    var a = c(n(3));
    function c(e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }
    var l = r.getArray_;
    var u = r.getNumComponents_;
    function h(e, t) {
      var n = 0;
      e.push = function () {
        for (var t = 0; t < arguments.length; ++t) {
          var r = arguments[t];
          if (r instanceof Array || s.isArrayBuffer(r)) {
            for (var i = 0; i < r.length; ++i) {
              e[n++] = r[i];
            }
          } else {
            e[n++] = r;
          }
        }
      };
      e.reset = function (e) {
        n = e || 0;
      };
      e.numComponents = t;
      Object.defineProperty(e, "numElements", {
        get: function () {
          return this.length / this.numComponents | 0;
        }
      });
      return e;
    }
    function d(e, t, n) {
      return h(new (n || Float32Array)(e * t), e);
    }
    function p(e) {
      return e !== "indices";
    }
    function f(e, t, n) {
      for (var r = e.length, i = new Float32Array(3), s = 0; s < r; s += 3) {
        n(t, [e[s], e[s + 1], e[s + 2]], i);
        e[s] = i[0];
        e[s + 1] = i[1];
        e[s + 2] = i[2];
      }
    }
    function m(e, t, n) {
      n = n || a.create();
      var r = t[0];
      var i = t[1];
      var s = t[2];
      n[0] = r * e[0] + i * e[1] + s * e[2];
      n[1] = r * e[4] + i * e[5] + s * e[6];
      n[2] = r * e[8] + i * e[9] + s * e[10];
      return n;
    }
    function g(e, t) {
      f(e, t, o.transformDirection);
      return e;
    }
    function b(e, t) {
      f(e, o.inverse(t), m);
      return e;
    }
    function y(e, t) {
      f(e, t, o.transformPoint);
      return e;
    }
    function E(e, t) {
      Object.keys(e).forEach(function (n) {
        var r = e[n];
        if (n.indexOf("pos") >= 0) {
          y(r, t);
        } else if (n.indexOf("tan") >= 0 || n.indexOf("binorm") >= 0) {
          g(r, t);
        } else if (n.indexOf("norm") >= 0) {
          b(r, t);
        }
      });
      return e;
    }
    function T(e, t, n) {
      e = e || 2;
      return {
        position: {
          numComponents: 2,
          data: [(t = t || 0) + (e *= 0.5) * -1, (n = n || 0) + e * -1, t + e * 1, n + e * -1, t + e * -1, n + e * 1, t + e * 1, n + e * 1]
        },
        normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
        indices: [0, 1, 2, 2, 1, 3]
      };
    }
    function v(e, t, n, r, i) {
      e = e || 1;
      t = t || 1;
      n = n || 1;
      r = r || 1;
      i = i || o.identity();
      var s = (n + 1) * (r + 1);
      var a = d(3, s);
      var c = d(3, s);
      var l = d(2, s);
      for (var u = 0; u <= r; u++) {
        for (var h = 0; h <= n; h++) {
          var p = h / n;
          var f = u / r;
          a.push(e * p - e * 0.5, 0, t * f - t * 0.5);
          c.push(0, 1, 0);
          l.push(p, f);
        }
      }
      var m = n + 1;
      var g = d(3, n * r * 2, Uint16Array);
      for (var b = 0; b < r; b++) {
        for (var y = 0; y < n; y++) {
          g.push((b + 0) * m + y, (b + 1) * m + y, (b + 0) * m + y + 1);
          g.push((b + 1) * m + y, (b + 1) * m + y + 1, (b + 0) * m + y + 1);
        }
      }
      return E({
        position: a,
        normal: c,
        texcoord: l,
        indices: g
      }, i);
    }
    function A(e, t, n, r, i, s, o) {
      if (t <= 0 || n <= 0) {
        throw Error("subdivisionAxis and subdivisionHeight must be > 0");
      }
      r = r || 0;
      s = s || 0;
      var a = (i = i || Math.PI) - r;
      var c = (o = o || Math.PI * 2) - s;
      var l = (t + 1) * (n + 1);
      var u = d(3, l);
      var h = d(3, l);
      var p = d(2, l);
      for (var f = 0; f <= n; f++) {
        for (var m = 0; m <= t; m++) {
          var g = m / t;
          var b = f / n;
          var y = c * g;
          var E = a * b;
          var T = Math.sin(y);
          var v = Math.cos(y);
          var A = Math.sin(E);
          var w = v * A;
          var S = Math.cos(E);
          var k = T * A;
          u.push(e * w, e * S, e * k);
          h.push(w, S, k);
          p.push(1 - g, b);
        }
      }
      var I = t + 1;
      var O = d(3, t * n * 2, Uint16Array);
      for (var N = 0; N < t; N++) {
        for (var R = 0; R < n; R++) {
          O.push((R + 0) * I + N, (R + 0) * I + N + 1, (R + 1) * I + N);
          O.push((R + 1) * I + N, (R + 0) * I + N + 1, (R + 1) * I + N + 1);
        }
      }
      return {
        position: u,
        normal: h,
        texcoord: p,
        indices: O
      };
    }
    var w = [[3, 7, 5, 1], [6, 2, 0, 4], [6, 7, 3, 2], [0, 1, 5, 4], [7, 6, 4, 5], [2, 3, 1, 0]];
    function S(e) {
      var t = (e = e || 1) / 2;
      var n = [[-t, -t, -t], [+t, -t, -t], [-t, +t, -t], [+t, +t, -t], [-t, -t, +t], [+t, -t, +t], [-t, +t, +t], [+t, +t, +t]];
      var r = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
      var i = [[1, 0], [0, 0], [0, 1], [1, 1]];
      var s = d(3, 24);
      var o = d(3, 24);
      var a = d(2, 24);
      var c = d(3, 12, Uint16Array);
      for (var l = 0; l < 6; ++l) {
        var u = w[l];
        for (var h = 0; h < 4; ++h) {
          var p = n[u[h]];
          var f = r[l];
          var m = i[h];
          s.push(p);
          o.push(f);
          a.push(m);
        }
        var g = l * 4;
        c.push(g + 0, g + 1, g + 2);
        c.push(g + 0, g + 2, g + 3);
      }
      return {
        position: s,
        normal: o,
        texcoord: a,
        indices: c
      };
    }
    function k(e, t, n, r, i, s, o) {
      if (r < 3) {
        throw Error("radialSubdivisions must be 3 or greater");
      }
      if (i < 1) {
        throw Error("verticalSubdivisions must be 1 or greater");
      }
      var a = s === undefined || s;
      var c = o === undefined || o;
      var l = (a ? 2 : 0) + (c ? 2 : 0);
      var u = (r + 1) * (i + 1 + l);
      var h = d(3, u);
      var p = d(3, u);
      var f = d(2, u);
      var m = d(3, r * (i + l) * 2, Uint16Array);
      var g = r + 1;
      var b = Math.atan2(e - t, n);
      var y = Math.cos(b);
      var E = Math.sin(b);
      for (var T = i + (c ? 2 : 0), v = a ? -2 : 0; v <= T; ++v) {
        var A = v / i;
        var w = n * A;
        var S = undefined;
        if (v < 0) {
          w = 0;
          A = 1;
          S = e;
        } else if (v > i) {
          w = n;
          A = 1;
          S = t;
        } else {
          S = e + v / i * (t - e);
        }
        if (v === -2 || v === i + 2) {
          S = 0;
          A = 0;
        }
        w -= n / 2;
        for (var k = 0; k < g; ++k) {
          var I = Math.sin(k * Math.PI * 2 / r);
          var O = Math.cos(k * Math.PI * 2 / r);
          h.push(I * S, w, O * S);
          p.push(v < 0 || v > i ? 0 : I * y, v < 0 ? -1 : v > i ? 1 : E, v < 0 || v > i ? 0 : O * y);
          f.push(k / r, 1 - A);
        }
      }
      for (var N = 0; N < i + l; ++N) {
        for (var R = 0; R < r; ++R) {
          m.push(g * (N + 0) + 0 + R, g * (N + 0) + 1 + R, g * (N + 1) + 1 + R);
          m.push(g * (N + 0) + 0 + R, g * (N + 1) + 1 + R, g * (N + 1) + 0 + R);
        }
      }
      return {
        position: h,
        normal: p,
        texcoord: f,
        indices: m
      };
    }
    function I(e, t) {
      t = t || [];
      var n = [];
      for (var r = 0; r < e.length; r += 4) {
        var i = e[r];
        var s = e.slice(r + 1, r + 4);
        s.push.apply(s, t);
        for (var o = 0; o < i; ++o) {
          n.push.apply(n, s);
        }
      }
      return n;
    }
    function O() {
      var e = [0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0, 30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0, 30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0, 0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30, 30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30, 30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30, 0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30, 100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30, 30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0, 30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30, 30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30, 67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30, 30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0, 30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30, 0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0, 0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0];
      var t = I([18, 0, 0, 1, 18, 0, 0, -1, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, -1, 0, 0]);
      var n = I([18, 200, 70, 120, 18, 80, 70, 200, 6, 70, 200, 210, 6, 200, 200, 70, 6, 210, 100, 70, 6, 210, 160, 70, 6, 70, 180, 210, 6, 100, 70, 210, 6, 76, 210, 100, 6, 140, 210, 80, 6, 90, 130, 110, 6, 160, 160, 220], [255]);
      var r = e.length / 3;
      var i = {
        position: d(3, r),
        texcoord: d(2, r),
        normal: d(3, r),
        color: d(4, r, Uint8Array),
        indices: d(3, r / 3, Uint16Array)
      };
      i.position.push(e);
      i.texcoord.push([0.22, 0.19, 0.22, 0.79, 0.34, 0.19, 0.22, 0.79, 0.34, 0.79, 0.34, 0.19, 0.34, 0.19, 0.34, 0.31, 0.62, 0.19, 0.34, 0.31, 0.62, 0.31, 0.62, 0.19, 0.34, 0.43, 0.34, 0.55, 0.49, 0.43, 0.34, 0.55, 0.49, 0.55, 0.49, 0.43, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0]);
      i.normal.push(t);
      i.color.push(n);
      for (var s = 0; s < r; ++s) {
        i.indices.push(s);
      }
      return i;
    }
    function N(e, t, n, r, i, s, o) {
      if (i <= 0) {
        throw Error("subdivisionDown must be > 0");
      }
      var c = (o = o || 1) - (s = s || 0);
      var l = (i + 1) * 2 * 4;
      var u = d(3, l);
      var h = d(3, l);
      var p = d(2, l);
      function f(e, t, n) {
        return e + (t - e) * n;
      }
      function m(t, n, o, l, d, m) {
        for (var g = 0; g <= i; g++) {
          var b = n / 1;
          var y = g / i;
          var E = (b - 0.5) * 2;
          var T = (s + y * c) * Math.PI;
          var v = Math.sin(T);
          var A = Math.cos(T);
          var w = f(e, t, v);
          var S = E * r;
          var k = A * e;
          var I = v * w;
          u.push(S, k, I);
          var O = a.add(a.multiply([0, v, A], o), l);
          h.push(O);
          p.push(b * d + m, y);
        }
      }
      for (var g = 0; g < 2; g++) {
        var b = (g / 1 - 0.5) * 2;
        m(t, g, [1, 1, 1], [0, 0, 0], 1, 0);
        m(t, g, [0, 0, 0], [b, 0, 0], 0, 0);
        m(n, g, [1, 1, 1], [0, 0, 0], 1, 0);
        m(n, g, [0, 0, 0], [b, 0, 0], 0, 1);
      }
      var y = d(3, i * 2 * 4, Uint16Array);
      function E(e, t) {
        for (var n = 0; n < i; ++n) {
          y.push(e + n + 0, e + n + 1, t + n + 0);
          y.push(e + n + 1, t + n + 1, t + n + 0);
        }
      }
      var T = i + 1;
      E(T * 0, T * 4);
      E(T * 5, T * 7);
      E(T * 6, T * 2);
      E(T * 3, T * 1);
      return {
        position: u,
        normal: h,
        texcoord: p,
        indices: y
      };
    }
    function R(e, t, n, r, i, s) {
      return k(e, e, t, n, r, i, s);
    }
    function x(e, t, n, r, i, s) {
      if (n < 3) {
        throw Error("radialSubdivisions must be 3 or greater");
      }
      if (r < 3) {
        throw Error("verticalSubdivisions must be 3 or greater");
      }
      i = i || 0;
      var o = (s = s || Math.PI * 2) - i;
      var a = n + 1;
      for (var c = r + 1, l = a * c, u = d(3, l), h = d(3, l), p = d(2, l), f = d(3, n * r * 2, Uint16Array), m = 0; m < c; ++m) {
        var g = m / r;
        var b = g * Math.PI * 2;
        var y = Math.sin(b);
        var E = e + y * t;
        var T = Math.cos(b);
        var v = T * t;
        for (var A = 0; A < a; ++A) {
          var w = A / n;
          var S = i + w * o;
          var k = Math.sin(S);
          var I = Math.cos(S);
          var O = k * E;
          var N = I * E;
          var R = k * y;
          var x = I * y;
          u.push(O, v, N);
          h.push(R, T, x);
          p.push(w, 1 - g);
        }
      }
      for (var M = 0; M < r; ++M) {
        for (var C = 0; C < n; ++C) {
          var P = 1 + C;
          var L = 1 + M;
          f.push(a * M + C, a * L + C, a * M + P);
          f.push(a * L + C, a * L + P, a * M + P);
        }
      }
      return {
        position: u,
        normal: h,
        texcoord: p,
        indices: f
      };
    }
    function M(e, t, n, r, i) {
      if (t < 3) {
        throw Error("divisions must be at least 3");
      }
      i = i || 1;
      r = r || 0;
      var s = (t + 1) * ((n = n || 1) + 1);
      var o = d(3, s);
      var a = d(3, s);
      var c = d(2, s);
      var l = d(3, n * t * 2, Uint16Array);
      var u = 0;
      var h = e - r;
      var p = t + 1;
      for (var f = 0; f <= n; ++f) {
        var m = r + h * Math.pow(f / n, i);
        for (var g = 0; g <= t; ++g) {
          var b = Math.PI * 2 * g / t;
          var y = m * Math.cos(b);
          var E = m * Math.sin(b);
          o.push(y, 0, E);
          a.push(0, 1, 0);
          c.push(1 - g / t, f / n);
          if (f > 0 && g !== t) {
            var T = u + (g + 1);
            var v = u + g;
            var A = u + g - p;
            var w = u + (g + 1) - p;
            l.push(T, v, A);
            l.push(T, A, w);
          }
        }
        u += t + 1;
      }
      return {
        position: o,
        normal: a,
        texcoord: c,
        indices: l
      };
    }
    function C(e) {
      return function (t) {
        var n = e.apply(this, Array.prototype.slice.call(arguments, 1));
        return r.createBuffersFromArrays(t, n);
      };
    }
    function P(e) {
      return function (t) {
        var n = e.apply(null, Array.prototype.slice.call(arguments, 1));
        return r.createBufferInfoFromArrays(t, n);
      };
    }
    var L = ["numComponents", "size", "type", "normalize", "stride", "offset", "attrib", "name", "attribName"];
    function D(e, t, n, r) {
      r = r || 0;
      for (var i = e.length, s = 0; s < i; ++s) {
        t[n + s] = e[s] + r;
      }
    }
    function B(e, t) {
      var n = l(e);
      var r = new n.constructor(t);
      var s = r;
      if (n.numComponents && n.numElements) {
        h(r, n.numComponents);
      }
      if (e.data) {
        s = {
          data: r
        };
        i.copyNamedProperties(L, e, s);
      }
      return s;
    }
    var U = P(O);
    t.create3DFBufferInfo = U;
    var F = C(O);
    t.create3DFBuffers = F;
    var j = P(S);
    t.createCubeBufferInfo = j;
    var z = C(S);
    t.createCubeBuffers = z;
    var G = P(v);
    t.createPlaneBufferInfo = G;
    var V = C(v);
    t.createPlaneBuffers = V;
    var _ = P(A);
    t.createSphereBufferInfo = _;
    var Y = C(A);
    t.createSphereBuffers = Y;
    var H = P(k);
    t.createTruncatedConeBufferInfo = H;
    var W = C(k);
    t.createTruncatedConeBuffers = W;
    var K = P(T);
    t.createXYQuadBufferInfo = K;
    var X = C(T);
    t.createXYQuadBuffers = X;
    var Z = P(N);
    t.createCresentBufferInfo = Z;
    var q = C(N);
    t.createCresentBuffers = q;
    var Q = P(R);
    t.createCylinderBufferInfo = Q;
    var J = C(R);
    t.createCylinderBuffers = J;
    var $ = P(x);
    t.createTorusBufferInfo = $;
    var ee = C(x);
    t.createTorusBuffers = ee;
    var te = P(M);
    t.createDiscBufferInfo = te;
    var ne = C(M);
    t.createDiscBuffers = ne;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    var r = {
      addExtensionsToContext: true,
      getContext: true,
      getWebGLContext: true,
      resizeCanvasToDisplaySize: true,
      setDefaults: true
    };
    t.addExtensionsToContext = y;
    t.getContext = function (e, t) {
      var n = function (e, t) {
        for (var n = ["webgl2", "webgl", "experimental-webgl"], r = null, i = 0; i < n.length; ++i) {
          if (r = e.getContext(n[i], t)) {
            if (f.addExtensionsToContext) {
              y(r);
            }
            break;
          }
        }
        return r;
      }(e, t);
      return n;
    };
    t.getWebGLContext = function (e, t) {
      var n = function (e, t) {
        for (var n = ["webgl", "experimental-webgl"], r = null, i = 0; i < n.length; ++i) {
          if (r = e.getContext(n[i], t)) {
            if (f.addExtensionsToContext) {
              y(r);
            }
            break;
          }
        }
        return r;
      }(e, t);
      return n;
    };
    t.resizeCanvasToDisplaySize = function (e, t) {
      t = t || 1;
      t = Math.max(0, t);
      var n = e.clientWidth * t | 0;
      var r = e.clientHeight * t | 0;
      return (e.width !== n || e.height !== r) && (e.width = n, e.height = r, true);
    };
    t.setDefaults = function (e) {
      o.copyExistingProperties(e, f);
      i.setAttributeDefaults_(e);
      s.setTextureDefaults_(e);
    };
    var i = p(n(7));
    Object.keys(i).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = i[e];
        }
      }
    });
    var s = p(n(8));
    Object.keys(s).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = s[e];
        }
      }
    });
    var o = p(n(0));
    var a = p(n(4));
    Object.keys(a).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = a[e];
        }
      }
    });
    var c = n(12);
    Object.keys(c).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = c[e];
        }
      }
    });
    var l = n(13);
    Object.keys(l).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = l[e];
        }
      }
    });
    var u = n(5);
    Object.keys(u).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = u[e];
        }
      }
    });
    var h = n(1);
    Object.keys(h).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = h[e];
        }
      }
    });
    var d = n(14);
    function p(e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }
    Object.keys(d).forEach(function (e) {
      if (e !== "default" && e !== "__esModule") {
        if (!Object.prototype.hasOwnProperty.call(r, e)) {
          t[e] = d[e];
        }
      }
    });
    var f = {
      addExtensionsToContext: true
    };
    var m = /^(.*?)_/;
    function g(e, t) {
      a.glEnumToString(e, 0);
      var n = e.getExtension(t);
      if (n) {
        var r = {};
        var i = m.exec(t)[1];
        var s = "_" + i;
        for (var c in n) {
          var l = n[c];
          var u = typeof l == "function";
          var h = u ? i : s;
          var d = c;
          if (c.endsWith(h)) {
            d = c.substring(0, c.length - h.length);
          }
          if (e[d] !== undefined) {
            if (!u && e[d] !== l) {
              o.warn(d, e[d], l, c);
            }
          } else if (u) {
            e[d] = function (e) {
              return function () {
                return e.apply(n, arguments);
              };
            }(l);
          } else {
            e[d] = l;
            r[d] = l;
          }
        }
        r.constructor = {
          name: n.constructor.name
        };
        a.glEnumToString(r, 0);
      }
      return n;
    }
    var b = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_color_buffer_float", "EXT_color_buffer_half_float", "EXT_disjoint_timer_query", "EXT_disjoint_timer_query_webgl2", "EXT_frag_depth", "EXT_sRGB", "EXT_shader_texture_lod", "EXT_texture_filter_anisotropic", "OES_element_index_uint", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_compressed_texture_atc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_pvrtc", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_depth_texture", "WEBGL_draw_buffers"];
    function y(e) {
      for (var t = 0; t < b.length; ++t) {
        g(e, b[t]);
      }
    }
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.drawBufferInfo = i;
    t.drawObjectList = function (e, t) {
      var n = null;
      var s = null;
      t.forEach(function (t) {
        if (t.active !== false) {
          var o = t.programInfo;
          var a = t.vertexArrayInfo || t.bufferInfo;
          var c = false;
          var l = t.type === undefined ? e.TRIANGLES : t.type;
          if (o !== n) {
            n = o;
            e.useProgram(o.program);
            c = true;
          }
          if (c || a !== s) {
            if (s && s.vertexArrayObject && !a.vertexArrayObject) {
              e.bindVertexArray(null);
            }
            s = a;
            r.setBuffersAndAttributes(e, o, a);
          }
          r.setUniforms(o, t.uniforms);
          i(e, a, l, t.count, t.offset, t.instanceCount);
        }
      });
      if (s.vertexArrayObject) {
        e.bindVertexArray(null);
      }
    };
    var r = function (e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }(n(5));
    function i(e, t, n, r, i, s) {
      n = n === undefined ? e.TRIANGLES : n;
      var o = t.indices;
      var a = t.elementType;
      var c = r === undefined ? t.numElements : r;
      i = i === undefined ? 0 : i;
      if (a || o) {
        if (s !== undefined) {
          e.drawElementsInstanced(n, c, a === undefined ? e.UNSIGNED_SHORT : t.elementType, i, s);
        } else {
          e.drawElements(n, c, a === undefined ? e.UNSIGNED_SHORT : t.elementType, i);
        }
      } else if (s !== undefined) {
        e.drawArraysInstanced(n, i, c, s);
      } else {
        e.drawArrays(n, i, c);
      }
    }
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.bindFramebufferInfo = function (e, t, n) {
      n = n || e.FRAMEBUFFER;
      if (t) {
        e.bindFramebuffer(n, t.framebuffer);
        e.viewport(0, 0, t.width, t.height);
      } else {
        e.bindFramebuffer(n, null);
        e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight);
      }
    };
    t.createFramebufferInfo = function (e, t, n, s) {
      var o = e.FRAMEBUFFER;
      var h = e.createFramebuffer();
      e.bindFramebuffer(o, h);
      n = n || e.drawingBufferWidth;
      s = s || e.drawingBufferHeight;
      var d = 0;
      var p = {
        framebuffer: h,
        attachments: [],
        width: n,
        height: s
      };
      (t = t || c).forEach(function (t) {
        var c = t.attachment;
        var h = t.format;
        var f = function (e) {
          return l[e];
        }(h);
        f ||= a + d++;
        if (!c) {
          if (function (e) {
            return u[e];
          }(h)) {
            c = e.createRenderbuffer();
            e.bindRenderbuffer(e.RENDERBUFFER, c);
            e.renderbufferStorage(e.RENDERBUFFER, h, n, s);
          } else {
            var m = Object.assign({}, t);
            m.width = n;
            m.height = s;
            if (m.auto === undefined) {
              m.auto = false;
              m.min = m.min || m.minMag || e.LINEAR;
              m.mag = m.mag || m.minMag || e.LINEAR;
              m.wrapS = m.wrapS || m.wrap || e.CLAMP_TO_EDGE;
              m.wrapT = m.wrapT || m.wrap || e.CLAMP_TO_EDGE;
            }
            c = r.createTexture(e, m);
          }
        }
        if (i.isRenderbuffer(e, c)) {
          e.framebufferRenderbuffer(o, f, e.RENDERBUFFER, c);
        } else {
          if (!i.isTexture(e, c)) {
            throw "unknown attachment type";
          }
          e.framebufferTexture2D(o, f, t.texTarget || e.TEXTURE_2D, c, t.level || 0);
        }
        p.attachments.push(c);
      });
      return p;
    };
    t.resizeFramebufferInfo = function (e, t, n, s, o) {
      s = s || e.drawingBufferWidth;
      o = o || e.drawingBufferHeight;
      t.width = s;
      t.height = o;
      (n = n || c).forEach(function (n, a) {
        var c = t.attachments[a];
        var l = n.format;
        if (i.isRenderbuffer(e, c)) {
          e.bindRenderbuffer(e.RENDERBUFFER, c);
          e.renderbufferStorage(e.RENDERBUFFER, l, s, o);
        } else {
          if (!i.isTexture(e, c)) {
            throw "unknown attachment type";
          }
          r.resizeTexture(e, c, n, s, o);
        }
      });
    };
    var r = s(n(8));
    var i = s(n(0));
    function s(e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }
    var o = 34041;
    var a = 36064;
    var c = [{
      format: 6408,
      type: 5121,
      min: 9729,
      wrap: 33071
    }, {
      format: o
    }];
    var l = {
      34041: 33306,
      6401: 36128,
      36168: 36128,
      6402: 36096,
      33189: 36096
    };
    var u = {
      32854: true,
      32855: true,
      36194: true,
      34041: true,
      33189: true,
      6401: true,
      36168: true
    };
  }, function (e, t, n) {
    "use strict";

    t.__esModule = true;
    t.createVertexArrayInfo = function (e, t, n) {
      var i = e.createVertexArray();
      e.bindVertexArray(i);
      if (!t.length) {
        t = [t];
      }
      t.forEach(function (t) {
        r.setBuffersAndAttributes(e, t, n);
      });
      e.bindVertexArray(null);
      return {
        numElements: n.numElements,
        elementType: n.elementType,
        vertexArrayObject: i
      };
    };
    t.createVAOAndSetAttributes = i;
    t.createVAOFromBufferInfo = function (e, t, n) {
      return i(e, t.attribSetters || t, n.attribs, n.indices);
    };
    var r = function (e) {
      if (e && e.__esModule) {
        return e;
      }
      var t = {};
      if (e != null) {
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
            if (r.get || r.set) {
              Object.defineProperty(t, n, r);
            } else {
              t[n] = e[n];
            }
          }
        }
      }
      t.default = e;
      return t;
    }(n(5));
    function i(e, t, n, i) {
      var s = e.createVertexArray();
      e.bindVertexArray(s);
      r.setAttributes(t, n);
      if (i) {
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, i);
      }
      e.bindVertexArray(null);
      return s;
    }
  }]);
};
module.exports = r();