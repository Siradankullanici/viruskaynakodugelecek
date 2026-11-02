module.exports = function () {
  "use strict";

  function t(e, t, n, r, i, s, o) {
    try {
      var a = e[s](o);
      var c = a.value;
    } catch (e) {
      n(e);
      return;
    }
    if (a.done) {
      t(c);
    } else {
      Promise.resolve(c).then(r, i);
    }
  }
  function r(e) {
    return function () {
      var n = this;
      var r = arguments;
      return new Promise(function (i, s) {
        var o = e.apply(n, r);
        function a(e) {
          t(o, i, s, a, c, "next", e);
        }
        function c(e) {
          t(o, i, s, a, c, "throw", e);
        }
        a(undefined);
      });
    };
  }
  function i(e, t) {
    if (!(e instanceof t)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function s(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || false;
      r.configurable = true;
      if ("value" in r) {
        r.writable = true;
      }
      Object.defineProperty(e, r.key, r);
    }
  }
  function o(e, t, n) {
    if (t) {
      s(e.prototype, t);
    }
    if (n) {
      s(e, n);
    }
    return e;
  }
  function a(e, t) {
    if (typeof t != "function" && t !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: true,
        configurable: true
      }
    });
    if (t) {
      l(e, t);
    }
  }
  function c(e) {
    return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }
  function l(e, t) {
    return (l = Object.setPrototypeOf || function (e, t) {
      e.__proto__ = t;
      return e;
    })(e, t);
  }
  function u(e, t) {
    if (!t || typeof t != "object" && typeof t != "function") {
      return function (e) {
        if (e === undefined) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return e;
      }(e);
    } else {
      return t;
    }
  }
  (function (t) {
    var n;
    var r = Object.prototype;
    var i = r.hasOwnProperty;
    var s = typeof Symbol == "function" ? Symbol : {};
    var o = s.iterator || "@@iterator";
    var a = s.asyncIterator || "@@asyncIterator";
    var c = s.toStringTag || "@@toStringTag";
    var l = typeof module == "object";
    var u = t.regeneratorRuntime;
    if (u) {
      if (l) {
        module.exports = u;
      }
    } else {
      (u = t.regeneratorRuntime = l ? module.exports : {}).wrap = T;
      var h = "suspendedStart";
      var d = "suspendedYield";
      var p = "executing";
      var f = "completed";
      var m = {};
      var g = {
        [o]: function () {
          return this;
        }
      };
      var b = Object.getPrototypeOf;
      var y = b && b(b(M([])));
      if (y && y !== r && i.call(y, o)) {
        g = y;
      }
      var E = S.prototype = A.prototype = Object.create(g);
      w.prototype = E.constructor = S;
      S.constructor = w;
      S[c] = w.displayName = "GeneratorFunction";
      u.isGeneratorFunction = function (e) {
        var t = typeof e == "function" && e.constructor;
        return !!t && (t === w || (t.displayName || t.name) === "GeneratorFunction");
      };
      u.mark = function (e) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(e, S);
        } else {
          e.__proto__ = S;
          if (!(c in e)) {
            e[c] = "GeneratorFunction";
          }
        }
        e.prototype = Object.create(E);
        return e;
      };
      u.awrap = function (e) {
        return {
          __await: e
        };
      };
      k(I.prototype);
      I.prototype[a] = function () {
        return this;
      };
      u.AsyncIterator = I;
      u.async = function (e, t, n, r) {
        var i = new I(T(e, t, n, r));
        if (u.isGeneratorFunction(t)) {
          return i;
        } else {
          return i.next().then(function (e) {
            if (e.done) {
              return e.value;
            } else {
              return i.next();
            }
          });
        }
      };
      k(E);
      E[c] = "Generator";
      E[o] = function () {
        return this;
      };
      E.toString = function () {
        return "[object Generator]";
      };
      u.keys = function (e) {
        var t = [];
        for (var n in e) {
          t.push(n);
        }
        t.reverse();
        return function n() {
          while (t.length) {
            var r = t.pop();
            if (r in e) {
              n.value = r;
              n.done = false;
              return n;
            }
          }
          n.done = true;
          return n;
        };
      };
      u.values = M;
      x.prototype = {
        constructor: x,
        reset: function (e) {
          this.prev = 0;
          this.next = 0;
          this.sent = this._sent = n;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = n;
          this.tryEntries.forEach(R);
          if (!e) {
            for (var t in this) {
              if (t.charAt(0) === "t" && i.call(this, t) && !isNaN(+t.slice(1))) {
                this[t] = n;
              }
            }
          }
        },
        stop: function () {
          this.done = true;
          var e = this.tryEntries[0].completion;
          if (e.type === "throw") {
            throw e.arg;
          }
          return this.rval;
        },
        dispatchException: function (e) {
          if (this.done) {
            throw e;
          }
          var t = this;
          function r(r, i) {
            a.type = "throw";
            a.arg = e;
            t.next = r;
            if (i) {
              t.method = "next";
              t.arg = n;
            }
            return !!i;
          }
          for (var s = this.tryEntries.length - 1; s >= 0; --s) {
            var o = this.tryEntries[s];
            var a = o.completion;
            if (o.tryLoc === "root") {
              return r("end");
            }
            if (o.tryLoc <= this.prev) {
              var c = i.call(o, "catchLoc");
              var l = i.call(o, "finallyLoc");
              if (c && l) {
                if (this.prev < o.catchLoc) {
                  return r(o.catchLoc, true);
                }
                if (this.prev < o.finallyLoc) {
                  return r(o.finallyLoc);
                }
              } else if (c) {
                if (this.prev < o.catchLoc) {
                  return r(o.catchLoc, true);
                }
              } else {
                if (!l) {
                  throw new Error("try statement without catch or finally");
                }
                if (this.prev < o.finallyLoc) {
                  return r(o.finallyLoc);
                }
              }
            }
          }
        },
        abrupt: function (e, t) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var r = this.tryEntries[n];
            if (r.tryLoc <= this.prev && i.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
              var s = r;
              break;
            }
          }
          if (s && (e === "break" || e === "continue") && s.tryLoc <= t && t <= s.finallyLoc) {
            s = null;
          }
          var o = s ? s.completion : {};
          o.type = e;
          o.arg = t;
          if (s) {
            this.method = "next";
            this.next = s.finallyLoc;
            return m;
          } else {
            return this.complete(o);
          }
        },
        complete: function (e, t) {
          if (e.type === "throw") {
            throw e.arg;
          }
          if (e.type === "break" || e.type === "continue") {
            this.next = e.arg;
          } else if (e.type === "return") {
            this.rval = this.arg = e.arg;
            this.method = "return";
            this.next = "end";
          } else if (e.type === "normal" && t) {
            this.next = t;
          }
          return m;
        },
        finish: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.finallyLoc === e) {
              this.complete(n.completion, n.afterLoc);
              R(n);
              return m;
            }
          }
        },
        catch: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.tryLoc === e) {
              var r = n.completion;
              if (r.type === "throw") {
                var i = r.arg;
                R(n);
              }
              return i;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function (e, t, r) {
          this.delegate = {
            iterator: M(e),
            resultName: t,
            nextLoc: r
          };
          if (this.method === "next") {
            this.arg = n;
          }
          return m;
        }
      };
    }
    function T(e, t, n, r) {
      var i = t && t.prototype instanceof A ? t : A;
      var s = Object.create(i.prototype);
      var o = new x(r || []);
      s._invoke = function (e, t, n) {
        var r = h;
        return function (i, s) {
          if (r === p) {
            throw new Error("Generator is already running");
          }
          if (r === f) {
            if (i === "throw") {
              throw s;
            }
            return C();
          }
          n.method = i;
          n.arg = s;
          while (true) {
            var o = n.delegate;
            if (o) {
              var a = O(o, n);
              if (a) {
                if (a === m) {
                  continue;
                }
                return a;
              }
            }
            if (n.method === "next") {
              n.sent = n._sent = n.arg;
            } else if (n.method === "throw") {
              if (r === h) {
                r = f;
                throw n.arg;
              }
              n.dispatchException(n.arg);
            } else if (n.method === "return") {
              n.abrupt("return", n.arg);
            }
            r = p;
            var c = v(e, t, n);
            if (c.type === "normal") {
              r = n.done ? f : d;
              if (c.arg === m) {
                continue;
              }
              return {
                value: c.arg,
                done: n.done
              };
            }
            if (c.type === "throw") {
              r = f;
              n.method = "throw";
              n.arg = c.arg;
            }
          }
        };
      }(e, n, o);
      return s;
    }
    function v(e, t, n) {
      try {
        return {
          type: "normal",
          arg: e.call(t, n)
        };
      } catch (e) {
        return {
          type: "throw",
          arg: e
        };
      }
    }
    function A() {}
    function w() {}
    function S() {}
    function k(e) {
      ["next", "throw", "return"].forEach(function (t) {
        e[t] = function (e) {
          return this._invoke(t, e);
        };
      });
    }
    function I(e) {
      var t;
      this._invoke = function (n, r) {
        function s() {
          return new Promise(function (t, s) {
            (function t(n, r, s, o) {
              var a = v(e[n], e, r);
              if (a.type !== "throw") {
                var c = a.arg;
                var l = c.value;
                if (l && typeof l == "object" && i.call(l, "__await")) {
                  return Promise.resolve(l.__await).then(function (e) {
                    t("next", e, s, o);
                  }, function (e) {
                    t("throw", e, s, o);
                  });
                } else {
                  return Promise.resolve(l).then(function (e) {
                    c.value = e;
                    s(c);
                  }, function (e) {
                    return t("throw", e, s, o);
                  });
                }
              }
              o(a.arg);
            })(n, r, t, s);
          });
        }
        return t = t ? t.then(s, s) : s();
      };
    }
    function O(e, t) {
      var r = e.iterator[t.method];
      if (r === n) {
        t.delegate = null;
        if (t.method === "throw") {
          if (e.iterator.return && (t.method = "return", t.arg = n, O(e, t), t.method === "throw")) {
            return m;
          }
          t.method = "throw";
          t.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return m;
      }
      var i = v(r, e.iterator, t.arg);
      if (i.type === "throw") {
        t.method = "throw";
        t.arg = i.arg;
        t.delegate = null;
        return m;
      }
      var s = i.arg;
      if (s) {
        if (s.done) {
          t[e.resultName] = s.value;
          t.next = e.nextLoc;
          if (t.method !== "return") {
            t.method = "next";
            t.arg = n;
          }
          t.delegate = null;
          return m;
        } else {
          return s;
        }
      } else {
        t.method = "throw";
        t.arg = new TypeError("iterator result is not an object");
        t.delegate = null;
        return m;
      }
    }
    function N(e) {
      var t = {
        tryLoc: e[0]
      };
      if (1 in e) {
        t.catchLoc = e[1];
      }
      if (2 in e) {
        t.finallyLoc = e[2];
        t.afterLoc = e[3];
      }
      this.tryEntries.push(t);
    }
    function R(e) {
      var t = e.completion || {};
      t.type = "normal";
      delete t.arg;
      e.completion = t;
    }
    function x(e) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      e.forEach(N, this);
      this.reset(true);
    }
    function M(e) {
      if (e) {
        var t = e[o];
        if (t) {
          return t.call(e);
        }
        if (typeof e.next == "function") {
          return e;
        }
        if (!isNaN(e.length)) {
          var r = -1;
          var s = function t() {
            while (++r < e.length) {
              if (i.call(e, r)) {
                t.value = e[r];
                t.done = false;
                return t;
              }
            }
            t.value = n;
            t.done = true;
            return t;
          };
          return s.next = s;
        }
      }
      return {
        next: C
      };
    }
    function C() {
      return {
        value: n,
        done: true
      };
    }
  })(function () {
    return this || typeof self == "object" && self;
  }() || Function("return this")());
  var h = new Uint8Array([88, 0, 0, 0]);
  var d = new Uint8Array([26, 165, 74, 6, 73, 7, 72, 8, 71, 9, 70, 10, 69, 11, 68, 12, 67, 13, 66, 14, 65]);
  var p = new Uint8Array([24, 255, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  var f = new Uint8Array([25, 255, 0, 255, 255, 255, 255]);
  var m = new Uint8Array([27, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  var g = {
    HEADER: h,
    INIT: d,
    DISCONNECT: new Uint8Array([84]),
    START_MEASUREMENTS: p,
    STOP_MEASUREMENTS: f,
    SET_MEASUREMENT_PERIOD: m,
    GET_INFO: new Uint8Array([85]),
    GET_STATUS: new Uint8Array([16]),
    GET_SENSOR_IDS: new Uint8Array([81]),
    GET_SENSOR_INFO: new Uint8Array([80, 0]),
    GET_DEFAULT_SENSORS_MASK: new Uint8Array([86])
  };
  var b = 6;
  var y = 7;
  var E = 10;
  var T = 8;
  var v = 9;
  var A = 11;
  var w = 12;
  var S = 13;
  var k = 14;
  var I = 32;
  function O(e) {
    return e !== 0;
  }
  var N = function () {
    function e() {
      i(this, e);
      this._listenerMap = new Map();
    }
    o(e, [{
      key: "on",
      value: function (e, t) {
        if (!this._listenerMap.has(e)) {
          this._listenerMap.set(e, []);
        }
        this._listenerMap.get(e).push(t);
      }
    }, {
      key: "off",
      value: function (e, t) {
        var n = this._listenerMap.get(e);
        if (n && n.length) {
          var r = n.reduce(function (e, n, r) {
            if (typeof n == "function" && n === t) {
              return e = r;
            } else {
              return e;
            }
          }, -1);
          if (r > -1) {
            n.splice(r, 1);
            this._listenerMap.set(e, n);
            return true;
          }
        }
        return false;
      }
    }, {
      key: "unbind",
      value: function () {
        this._listenerMap.clear();
      }
    }, {
      key: "emit",
      value: function (e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
          n[r - 1] = arguments[r];
        }
        var i = this._listenerMap.get(e);
        return !!i && !!i.length && !(i.forEach(function (e) {
          e.apply(undefined, n);
        }), 0);
      }
    }]);
    return e;
  }();
  function R() {}
  function x() {}
  function M(e) {
    return Array.from(new Uint8Array(e)).map(function (e) {
      return e.toString(16).padStart(2, "0");
    }).join(" ");
  }
  var C;
  var P = function e(t = {}) {
    i(this, e);
    this.type = t.type;
    this.mode = t.mode;
    this.minValue = t.minValue;
    this.maxValue = t.maxValue;
    this.uncertainty = t.uncertainty;
    this.minPeriod = t.minPeriod;
    this.maxPeriod = t.maxPeriod;
    this.typicalPeriod = t.typicalPeriod;
    this.granularity = t.granularity;
  };
  var L = function e(t = {}) {
    i(this, e);
    this.number = t.number;
    this.name = t.name;
    this.unit = t.unit;
    this.id = t.id;
    this.mutalExclusionMask = t.mutalExclusionMask;
    this.measurementInfo = t.measurementInfo;
  };
  var D = function () {
    function e(t) {
      var n;
      i(this, e);
      (n = u(this, c(e).call(this))).number = t.number;
      n.name = t.name;
      n.unit = t.unit;
      n.specs = t;
      n.enabled = false;
      n.values = [];
      n.value = null;
      return n;
    }
    a(e, N);
    o(e, [{
      key: "clear",
      value: function () {
        this.value = null;
        this.values = [];
      }
    }, {
      key: "setValue",
      value: function (e, t) {
        this.value = e;
        if (t) {
          this.values.push(this.value);
        }
        this.emit("value-changed", this);
      }
    }, {
      key: "setEnabled",
      value: function (e) {
        if (this.enabled !== e) {
          this.enabled = e;
          this.emit("state-changed", this);
        }
      }
    }]);
    return e;
  }();
  var B = function () {
    function e(t) {
      var r;
      i(this, e);
      r = u(this, c(e).call(this));
      if (typeof TextDecoder == "undefined") {
        var s = require("./21.js");
        C = s.TextDecoder;
      } else {
        C = TextDecoder;
      }
      r.device = t;
      r.sensors = [];
      r.opened = false;
      r.rollingCounter = 0;
      r.collecting = false;
      r.measurementPeriod = 10;
      r.response = null;
      r.remainingResponseLength = 0;
      r.defaultSensorsMask = 0;
      r.keepValues = true;
      r.minMeasurementPeriod = 10;
      r.serialNumber = "";
      r.orderCode = "";
      r.name = "";
      return r;
    }
    a(e, N);
    o(e, [{
      key: "getBatteryLevel",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          var t;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  e.next = 2;
                  return this._getStatus();
                case 2:
                  t = e.sent;
                  return e.abrupt("return", t.battery);
                case 4:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "getChargingState",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          var t;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  e.next = 2;
                  return this._getStatus();
                case 2:
                  t = e.sent;
                  return e.abrupt("return", t.chargingStatus);
                case 4:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "open",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          var t;
          var n = arguments;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  t = n.length > 0 && n[0] !== undefined && n[0];
                  e.prev = 1;
                  e.next = 4;
                  return this._connect();
                case 4:
                  e.next = 6;
                  return this._init();
                case 6:
                  e.next = 8;
                  return this._getStatus();
                case 8:
                  e.next = 10;
                  return this._getDeviceInfo();
                case 10:
                  e.next = 12;
                  return this._getDefaultSensorsMask();
                case 12:
                  e.next = 14;
                  return this._getAvailableSensors();
                case 14:
                  this._onOpened();
                  if (t) {
                    this.start();
                  }
                  e.next = 21;
                  break;
                case 18:
                  e.prev = 18;
                  e.t0 = e.catch(1);
                  console.error(e.t0);
                case 21:
                case "end":
                  return e.stop();
              }
            }
          }, e, this, [[1, 18]]);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "close",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  e.next = 2;
                  return this._stopMeasurements();
                case 2:
                  e.next = 4;
                  return this._sendCommand(g.DISCONNECT);
                case 4:
                  return e.abrupt("return", this._disconnect());
                case 5:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "enableDefaultSensors",
      value: function () {
        var e = 1;
        for (var t = 0; t < 32; ++t) {
          if ((this.defaultSensorsMask & e) === e) {
            var n = this.getSensor(t);
            if (n) {
              n.setEnabled(true);
            }
          }
          e <<= 1;
        }
      }
    }, {
      key: "start",
      value: function (e = null) {
        var t = this.sensors.filter(function (e) {
          return e.enabled;
        });
        if (t.length === 0) {
          this.enableDefaultSensors();
          t = this.sensors.filter(function (e) {
            return e.enabled;
          });
        }
        t.forEach(function (e) {
          return e.clear();
        });
        if (e) {
          this.measurementPeriod = e;
        }
        this._startMeasurements();
      }
    }, {
      key: "stop",
      value: function () {
        this._stopMeasurements();
      }
    }, {
      key: "getSensor",
      value: function (e) {
        return this.sensors.find(function (t) {
          return t.number === e;
        });
      }
    }, {
      key: "_connect",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          var t = this;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.device.setup({
                    onClosed: function () {
                      return t._onClosed();
                    },
                    onResponse: function (e) {
                      return t._handleResponse(e);
                    }
                  }));
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "_disconnect",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.device.close());
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "_init",
      value: function () {
        this.collecting = false;
        this.rollingCounter = 255;
        this.writeQueue = [];
        return this._sendCommand(g.INIT);
      }
    }, {
      key: "_handleResponse",
      value: function (e) {
        R(`command notified: ${M(e.buffer)}`);
        if (this.remainingResponseLegnth > 0) {
          this.remainingResponseLegnth -= e.buffer.byteLength;
          this.response = new DataView((t = this.response.buffer, n = e.buffer.slice(0), (r = new Uint8Array(t.byteLength + n.byteLength)).set(new Uint8Array(t), 0), r.set(new Uint8Array(n), t.byteLength), r.buffer));
          if (this.remainingResponseLegnth > 0) {
            return;
          }
        } else {
          this.response = e;
        }
        var t;
        var n;
        var r;
        var i = this.response.getUint8(1);
        if (i > this.response.buffer.byteLength) {
          this.remainingResponseLegnth = i - this.response.buffer.byteLength;
        } else {
          R(`handle command: ${M(this.response.buffer)}`);
          if (this.response.getUint8(0) === I) {
            this._processMeasurements(this.response);
          } else {
            var s = this.response.getUint8(4);
            var o = this.response.getUint8(5);
            var a = new DataView(this.response.buffer, 6);
            this._resolveWriteCommand(s, o, a);
            this.remainingResponseLegnth = 0;
            this.response = null;
          }
        }
      }
    }, {
      key: "_getSensorsWithMask",
      value: function (e) {
        var t = [];
        var n = 1;
        for (var r = 0; r < 32; ++r) {
          if ((e & n) === n) {
            var i = this.getSensor(r);
            if (i) {
              t.push(i);
              R(`available: [${e}] ${t[t.length - 1].number}`);
            }
          }
          n <<= 1;
        }
        return t;
      }
    }, {
      key: "_processMeasurements",
      value: function (e) {
        var t = [];
        var n = true;
        var r = 0;
        var i = 0;
        var s = e.getUint8(4);
        switch (s) {
          case b:
            t = this._getSensorsWithMask(e.getUint16(5, true));
            r = e.getUint8(7, true);
            i = 9;
            break;
          case y:
            t = this._getSensorsWithMask(e.getUint32(5, true));
            r = e.getUint8(9, true);
            i = 11;
            break;
          case E:
          case T:
            t[0] = this.getSensor(e.getUint8(6));
            r = e.getUint8(7, true);
            i = 8;
            break;
          case A:
          case v:
            t[0] = this.getSensor(e.getUint8(6));
            r = e.getUint8(7, true);
            i = 8;
            n = false;
            break;
          case w:
          case S:
          case k:
            R(`Purposely Ignoring packet type: ${s}`);
            break;
          default:
            R(`Unknown packet type: ${s}`);
        }
        for (var o = 0; o < r; ++o) {
          for (var a = 0; a < t.length; ++a) {
            if (n) {
              t[a].setValue(e.getFloat32(i, true), this.keepValues);
            } else {
              t[a].setValue(e.getInt32(i, true), this.keepValues);
            }
            i += 4;
          }
        }
      }
    }, {
      key: "_resolveWriteCommand",
      value: function (e, t, n) {
        var r = this.writeQueue.find(function (n) {
          return n.command === e && n.rollingCounter === t;
        });
        if (r) {
          r.resolve(n);
          this.writeQueue = this.writeQueue.filter(function (e) {
            return e !== r;
          });
        }
      }
    }, {
      key: "_onOpened",
      value: function () {
        R("opened");
        this.opened = true;
        this.emit("device-opened");
      }
    }, {
      key: "_onClosed",
      value: function () {
        R("closed");
        this.opened = false;
        this.emit("device-closed");
      }
    }, {
      key: "_decRollingCounter",
      value: function () {
        this.rollingCounter -= 1;
        return this.rollingCounter;
      }
    }, {
      key: "_calculateChecksum",
      value: function (e) {
        for (var t = e[1], n = e[3] * -1, r = 0; r < t; ++r) {
          n += e[r];
          n &= 255;
        }
        if (n < 0 || n > 255) {
          R("Checksum failed!");
          return 0;
        } else {
          return n;
        }
      }
    }, {
      key: "_sendCommand",
      value: function (e) {
        var t = new Uint8Array(g.HEADER.byteLength + e.byteLength);
        t.set(new Uint8Array(g.HEADER), 0);
        t.set(new Uint8Array(e), g.HEADER.byteLength);
        t[1] = t.length;
        t[2] = this._decRollingCounter();
        t[3] = this._calculateChecksum(t);
        return this._queueWriteCommand(t, 0, t.length);
      }
    }, {
      key: "_writeCommand",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e(t, n, r) {
          var i;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  if (!(r > 0)) {
                    e.next = 12;
                    break;
                  }
                  e.prev = 1;
                  if (r > 20) {
                    i = t.subarray(n, n + 20);
                    r -= 20;
                    n += 20;
                  } else {
                    i = t.subarray(n, n + r);
                    r = 0;
                  }
                  e.next = 5;
                  return this.device.writeCommand(i);
                case 5:
                  e.next = 10;
                  break;
                case 7:
                  e.prev = 7;
                  e.t0 = e.catch(1);
                  R(`Write Failure: ${e.t0}`);
                case 10:
                  e.next = 0;
                  break;
                case 12:
                case "end":
                  return e.stop();
              }
            }
          }, e, this, [[1, 7]]);
        }));
        return function (t, n, r) {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "_queueWriteCommand",
      value: function (e, t, n) {
        var r = this;
        R(`command queued: ${M(e)}`);
        var i = new Promise(function (t, n) {
          r.writeQueue.push({
            command: e[4],
            rollingCounter: e[2],
            resolve: t,
            reject: n
          });
          setTimeout(function () {
            r.writeQueue = r.writeQueue.filter(function (t) {
              return t.command === e[4] && t.rollingCounter !== e[2];
            });
            n(new Error(`write command timed out after 5s. Command: ${e[4].toString(16)} Rolling Counter: ${e[2].toString(16)}`));
          }, 10000);
        });
        this._writeCommand(e, t, n);
        return i;
      }
    }, {
      key: "_getStatus",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          var t;
          var n;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  e.next = 2;
                  return this._sendCommand(g.GET_STATUS);
                case 2:
                  t = e.sent;
                  n = {
                    masterFirmwareVersion: `${t.getUint8(2)}.${t.getUint8(3)}`,
                    bleFirmwareVersion: `${t.getUint8(6)}.${t.getUint8(9)}`,
                    battery: t.getUint8(10),
                    chargingStatus: `${t.getUint8(11)}`
                  };
                  return e.abrupt("return", n);
                case 5:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "_getAvailableSensors",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          var t;
          var n;
          var r = this;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  e.next = 2;
                  return this._sendCommand(g.GET_SENSOR_IDS).then(function (e) {
                    r.availableSensors = e.getUint32(0, true);
                    R(`Get Available Sensors Returned ${r.availableSensors}`);
                  });
                case 2:
                  t = 1;
                  n = 0;
                case 4:
                  if (!(n < 31)) {
                    e.next = 12;
                    break;
                  }
                  if ((this.availableSensors & t) !== t) {
                    e.next = 8;
                    break;
                  }
                  e.next = 8;
                  return this._getSensorInfo(n);
                case 8:
                  t <<= 1;
                case 9:
                  ++n;
                  e.next = 4;
                  break;
                case 12:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "_getDefaultSensorsMask",
      value: function () {
        var e = this;
        return this._sendCommand(g.GET_DEFAULT_SENSORS_MASK).then(function (t) {
          e.defaultSensorsMask = t.getUint32(0, true);
          R("Default Sensors:");
          x(e);
        });
      }
    }, {
      key: "_getDeviceInfo",
      value: function () {
        var e = this;
        return this._sendCommand(g.GET_INFO).then(function (t) {
          var n = new C("utf-8");
          e.orderCode = n.decode(new Uint8Array(t.buffer, 6, 16).filter(O));
          e.serialNumber = n.decode(new Uint8Array(t.buffer, 22, 16).filter(O));
          e.name = n.decode(new Uint8Array(t.buffer, 38, 32).filter(O));
          R("Device Info:");
          x(e);
        });
      }
    }, {
      key: "_getSensorInfo",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e(t) {
          var n;
          var r = this;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  (n = new Uint8Array(g.GET_SENSOR_INFO))[1] = t;
                  return e.abrupt("return", this._sendCommand(n).then(function (e) {
                    var t = e.getUint32(2, true);
                    if (t > 0) {
                      var n = new C("utf-8");
                      var i = new P({
                        type: e.getUint8(6),
                        mode: e.getUint8(7),
                        minValue: e.getFloat64(108, true),
                        maxValue: e.getFloat64(116, true),
                        uncertainty: e.getFloat64(100, true),
                        minPeriod: e.getUint32(124, true) / 1000,
                        maxPeriod: ((e.getUint32(132, true) << 32) + e.getUint32(128, true)) / 1000,
                        typicalPeriod: e.getUint32(136, true) / 1000,
                        granularity: e.getUint32(140, true) / 1000
                      });
                      var s = new L({
                        number: e.getUint8(0),
                        name: n.decode(new Uint8Array(e.buffer, 14, 60).filter(O)),
                        unit: n.decode(new Uint8Array(e.buffer, 74, 32).filter(O)),
                        mutalExclusiveMask: e.getUint32(144, true),
                        measurementInfo: i,
                        sensorId: t
                      });
                      var o = new D(s);
                      R("Get Sensor Info Returned");
                      x(o);
                      r.sensors.push(o);
                      o.on("state-changed", function () {
                        R(`Sensor Restart: ${o.number}`);
                        if (o.enabled) {
                          r.measurementPeriod = o.specs.measurementInfo.typicalPeriod;
                          r.sensors.forEach(function (e) {
                            if (o.number !== e.number && e.enabled) {
                              var t = 1 << e.number;
                              if ((t & o.specs.mutalExclusiveMask) === t) {
                                e.enabled = false;
                              } else if (e.specs.measurementInfo.typicalPeriod > r.measurementPeriod) {
                                r.measurementPeriod = e.specs.measurementInfo.typicalPeriod;
                              }
                            }
                          });
                        }
                        r._restartMeasurements();
                      });
                    }
                  }));
                case 3:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function (t) {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "_restartMeasurements",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          var t;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  t = this.collecting;
                  if (!this.collecting) {
                    e.next = 10;
                    break;
                  }
                  e.prev = 2;
                  e.next = 5;
                  return this._stopMeasurements();
                case 5:
                  e.next = 10;
                  break;
                case 7:
                  e.prev = 7;
                  e.t0 = e.catch(2);
                  console.error(e.t0);
                case 10:
                  if (this.collecting || !t) {
                    e.next = 19;
                    break;
                  }
                  e.prev = 11;
                  e.next = 14;
                  return this._startMeasurements();
                case 14:
                  e.next = 19;
                  break;
                case 16:
                  e.prev = 16;
                  e.t1 = e.catch(11);
                  console.error(e.t1);
                case 19:
                case "end":
                  return e.stop();
              }
            }
          }, e, this, [[2, 7], [11, 16]]);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "_setMeasurementPeriod",
      value: function (e) {
        var t = new Uint8Array(g.SET_MEASUREMENT_PERIOD);
        var n = this.minMeasurementPeriod * 1000;
        if (e < n) {
          e = n;
        }
        R(`MeasurementPeriod: ${e}`);
        t[3] = e & 255;
        t[4] = e >> 8 & 255;
        t[5] = e >> 16 & 255;
        t[6] = e >> 24 & 255;
        return this._sendCommand(t);
      }
    }, {
      key: "_getEnabledChannelMask",
      value: function () {
        var e = 0;
        this.sensors.filter(function (e) {
          return e.enabled;
        }).forEach(function (t) {
          e += 1 << t.number;
        });
        return e;
      }
    }, {
      key: "_startMeasurements",
      value: function () {
        var e = this;
        return this._setMeasurementPeriod(this.measurementPeriod * 1000).then(function () {
          var t = e._getEnabledChannelMask();
          R(`ChannelMask: ${t}`);
          var n = new Uint8Array(g.START_MEASUREMENTS);
          n[3] = t & 255;
          n[4] = t >> 8 & 255;
          n[5] = t >> 16 & 255;
          n[6] = t >> 24 & 255;
          return e._sendCommand(n).then(function (t) {
            if (t.getUint8(0) === 0) {
              e.collecting = true;
              e.emit("measurements-started");
            }
          });
        });
      }
    }, {
      key: "_stopMeasurements",
      value: function () {
        var e = this;
        return this._sendCommand(g.STOP_MEASUREMENTS).then(function (t) {
          if (t.getUint8(0) === 0) {
            e.collecting = false;
            e.emit("measurements-stopped");
          }
        });
      }
    }]);
    return e;
  }();
  var U = function () {
    function e(t) {
      i(this, e);
      this.webBluetoothNativeDevice = t;
      this.deviceCommand = null;
      this.deviceResponse = null;
    }
    o(e, [{
      key: "writeCommand",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e(t) {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.deviceCommand.writeValue(t));
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function (t) {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "setup",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e(t) {
          var n;
          var r;
          var i;
          var s;
          var o = this;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  n = t.onClosed;
                  r = t.onResponse;
                  this.webBluetoothNativeDevice.addEventListener("gattserverdisconnected", n);
                  e.prev = 2;
                  e.next = 5;
                  return this.webBluetoothNativeDevice.gatt.connect();
                case 5:
                  i = e.sent;
                  e.next = 8;
                  return i.getPrimaryService("d91714ef-28b9-4f91-ba16-f0d9a604f112");
                case 8:
                  s = e.sent;
                  e.next = 11;
                  return s.getCharacteristics();
                case 11:
                  e.sent.forEach(function (e) {
                    switch (e.uuid) {
                      case "f4bf14a6-c7d5-4b6d-8aa8-df1a7c83adcb":
                        o.deviceCommand = e;
                        break;
                      case "b41e6675-a329-40e0-aa01-44d2f444babe":
                        o.deviceResponse = e;
                        o.deviceResponse.addEventListener("characteristicvaluechanged", function (e) {
                          var t = e.target.value;
                          r(t);
                        });
                        o.deviceResponse.startNotifications();
                        break;
                      default:
                        R(`No case found for ${e.uuid}`);
                    }
                  });
                  e.next = 18;
                  break;
                case 15:
                  e.prev = 15;
                  e.t0 = e.catch(2);
                  console.error(e.t0);
                case 18:
                  if (this.deviceCommand && this.deviceResponse) {
                    e.next = 20;
                    break;
                  }
                  throw new Error("Expected command and response characteristics not found.");
                case 20:
                case "end":
                  return e.stop();
              }
            }
          }, e, this, [[2, 15]]);
        }));
        return function (t) {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "close",
      value: function () {
        var e = r(regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.webBluetoothNativeDevice.gatt.disconnect());
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    }, {
      key: "godirectAdapter",
      get: function () {
        return true;
      }
    }]);
    return e;
  }();
  var F = {
    createDevice: function () {
      var e = r(regeneratorRuntime.mark(function e(t) {
        var n;
        var r;
        var i;
        var s;
        var o;
        var a;
        var c;
        var l = arguments;
        return regeneratorRuntime.wrap(function (e) {
          while (true) {
            switch (e.prev = e.next) {
              case 0:
                n = l.length > 1 && l[1] !== undefined ? l[1] : {};
                r = n.open;
                i = r === undefined || r;
                s = n.startMeasurements;
                o = s === undefined || s;
                if (!(a = t).godirectAdapter) {
                  a = new U(t);
                }
                c = new B(a);
                if (!i) {
                  e.next = 14;
                  break;
                }
                e.prev = 5;
                e.next = 8;
                return c.open(o);
              case 8:
                e.next = 14;
                break;
              case 10:
                e.prev = 10;
                e.t0 = e.catch(5);
                console.error(e.t0);
                throw e.t0;
              case 14:
                return e.abrupt("return", c);
              case 15:
              case "end":
                return e.stop();
            }
          }
        }, e, this, [[5, 10]]);
      }));
      return function (t) {
        return e.apply(this, arguments);
      };
    }(),
    selectDevice: function () {
      var e = r(regeneratorRuntime.mark(function e() {
        var t;
        return regeneratorRuntime.wrap(function (e) {
          while (true) {
            switch (e.prev = e.next) {
              case 0:
                if (navigator.bluetooth) {
                  e.next = 2;
                  break;
                }
                return e.abrupt("return", Promise.reject(new Error("No Web Bluetooth support.")));
              case 2:
                e.next = 4;
                return navigator.bluetooth.requestDevice({
                  filters: [{
                    namePrefix: "GDX"
                  }],
                  optionalServices: ["d91714ef-28b9-4f91-ba16-f0d9a604f112"]
                });
              case 4:
                t = e.sent;
                return e.abrupt("return", F.createDevice(t));
              case 6:
              case "end":
                return e.stop();
            }
          }
        }, e, this);
      }));
      return function () {
        return e.apply(this, arguments);
      };
    }()
  };
  return F;
}();