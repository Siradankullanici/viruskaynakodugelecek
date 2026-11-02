var r;
var i = typeof Reflect == "object" ? Reflect : null;
var s = i && typeof i.apply == "function" ? i.apply : function (e, t, n) {
  return Function.prototype.apply.call(e, t, n);
};
r = i && typeof i.ownKeys == "function" ? i.ownKeys : Object.getOwnPropertySymbols ? function (e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : function (e) {
  return Object.getOwnPropertyNames(e);
};
var o = Number.isNaN || function (e) {
  return e != e;
};
function a() {
  a.init.call(this);
}
module.exports = a;
module.exports.once = function (e, t) {
  return new Promise(function (n, r) {
    function i(n) {
      e.removeListener(t, s);
      r(n);
    }
    function s() {
      if (typeof e.removeListener == "function") {
        e.removeListener("error", i);
      }
      n([].slice.call(arguments));
    }
    b(e, t, s, {
      once: true
    });
    if (t !== "error") {
      (function (e, t, n) {
        if (typeof e.on == "function") {
          b(e, "error", t, n);
        }
      })(e, i, {
        once: true
      });
    }
  });
};
a.EventEmitter = a;
a.prototype._events = undefined;
a.prototype._eventsCount = 0;
a.prototype._maxListeners = undefined;
var c = 10;
function l(e) {
  if (typeof e != "function") {
    throw new TypeError("The \"listener\" argument must be of type Function. Received type " + typeof e);
  }
}
function u(e) {
  if (e._maxListeners === undefined) {
    return a.defaultMaxListeners;
  } else {
    return e._maxListeners;
  }
}
function h(e, t, n, r) {
  var i;
  var s;
  var o;
  var a;
  l(n);
  if ((s = e._events) === undefined) {
    s = e._events = Object.create(null);
    e._eventsCount = 0;
  } else {
    if (s.newListener !== undefined) {
      e.emit("newListener", t, n.listener ? n.listener : n);
      s = e._events;
    }
    o = s[t];
  }
  if (o === undefined) {
    o = s[t] = n;
    ++e._eventsCount;
  } else {
    if (typeof o == "function") {
      o = s[t] = r ? [n, o] : [o, n];
    } else if (r) {
      o.unshift(n);
    } else {
      o.push(n);
    }
    if ((i = u(e)) > 0 && o.length > i && !o.warned) {
      o.warned = true;
      var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      c.name = "MaxListenersExceededWarning";
      c.emitter = e;
      c.type = t;
      c.count = o.length;
      a = c;
      if (console && console.warn) {
        console.warn(a);
      }
    }
  }
  return e;
}
function d() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) {
      return this.listener.call(this.target);
    } else {
      return this.listener.apply(this.target, arguments);
    }
  }
}
function p(e, t, n) {
  var r = {
    fired: false,
    wrapFn: undefined,
    target: e,
    type: t,
    listener: n
  };
  var i = d.bind(r);
  i.listener = n;
  r.wrapFn = i;
  return i;
}
function f(e, t, n) {
  var r = e._events;
  if (r === undefined) {
    return [];
  }
  var i = r[t];
  if (i === undefined) {
    return [];
  } else if (typeof i == "function") {
    if (n) {
      return [i.listener || i];
    } else {
      return [i];
    }
  } else if (n) {
    return function (e) {
      for (var t = new Array(e.length), n = 0; n < t.length; ++n) {
        t[n] = e[n].listener || e[n];
      }
      return t;
    }(i);
  } else {
    return g(i, i.length);
  }
}
function m(e) {
  var t = this._events;
  if (t !== undefined) {
    var n = t[e];
    if (typeof n == "function") {
      return 1;
    }
    if (n !== undefined) {
      return n.length;
    }
  }
  return 0;
}
function g(e, t) {
  var n = new Array(t);
  for (var r = 0; r < t; ++r) {
    n[r] = e[r];
  }
  return n;
}
function b(e, t, n, r) {
  if (typeof e.on == "function") {
    if (r.once) {
      e.once(t, n);
    } else {
      e.on(t, n);
    }
  } else {
    if (typeof e.addEventListener != "function") {
      throw new TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof e);
    }
    e.addEventListener(t, function i(s) {
      if (r.once) {
        e.removeEventListener(t, i);
      }
      n(s);
    });
  }
}
Object.defineProperty(a, "defaultMaxListeners", {
  enumerable: true,
  get: function () {
    return c;
  },
  set: function (e) {
    if (typeof e != "number" || e < 0 || o(e)) {
      throw new RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + e + ".");
    }
    c = e;
  }
});
a.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};
a.prototype.setMaxListeners = function (e) {
  if (typeof e != "number" || e < 0 || o(e)) {
    throw new RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + e + ".");
  }
  this._maxListeners = e;
  return this;
};
a.prototype.getMaxListeners = function () {
  return u(this);
};
a.prototype.emit = function (e) {
  var t = [];
  for (var n = 1; n < arguments.length; n++) {
    t.push(arguments[n]);
  }
  var r = e === "error";
  var i = this._events;
  if (i !== undefined) {
    r = r && i.error === undefined;
  } else if (!r) {
    return false;
  }
  if (r) {
    var o;
    if (t.length > 0) {
      o = t[0];
    }
    if (o instanceof Error) {
      throw o;
    }
    var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    a.context = o;
    throw a;
  }
  var c = i[e];
  if (c === undefined) {
    return false;
  }
  if (typeof c == "function") {
    s(c, this, t);
  } else {
    var l = c.length;
    var u = g(c, l);
    for (n = 0; n < l; ++n) {
      s(u[n], this, t);
    }
  }
  return true;
};
a.prototype.addListener = function (e, t) {
  return h(this, e, t, false);
};
a.prototype.on = a.prototype.addListener;
a.prototype.prependListener = function (e, t) {
  return h(this, e, t, true);
};
a.prototype.once = function (e, t) {
  l(t);
  this.on(e, p(this, e, t));
  return this;
};
a.prototype.prependOnceListener = function (e, t) {
  l(t);
  this.prependListener(e, p(this, e, t));
  return this;
};
a.prototype.removeListener = function (e, t) {
  var n;
  var r;
  var i;
  var s;
  var o;
  l(t);
  if ((r = this._events) === undefined) {
    return this;
  }
  if ((n = r[e]) === undefined) {
    return this;
  }
  if (n === t || n.listener === t) {
    if (--this._eventsCount == 0) {
      this._events = Object.create(null);
    } else {
      delete r[e];
      if (r.removeListener) {
        this.emit("removeListener", e, n.listener || t);
      }
    }
  } else if (typeof n != "function") {
    i = -1;
    s = n.length - 1;
    for (; s >= 0; s--) {
      if (n[s] === t || n[s].listener === t) {
        o = n[s].listener;
        i = s;
        break;
      }
    }
    if (i < 0) {
      return this;
    }
    if (i === 0) {
      n.shift();
    } else {
      (function (e, t) {
        for (; t + 1 < e.length; t++) {
          e[t] = e[t + 1];
        }
        e.pop();
      })(n, i);
    }
    if (n.length === 1) {
      r[e] = n[0];
    }
    if (r.removeListener !== undefined) {
      this.emit("removeListener", e, o || t);
    }
  }
  return this;
};
a.prototype.off = a.prototype.removeListener;
a.prototype.removeAllListeners = function (e) {
  var t;
  var n;
  var r;
  if ((n = this._events) === undefined) {
    return this;
  }
  if (n.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (n[e] !== undefined) {
      if (--this._eventsCount == 0) {
        this._events = Object.create(null);
      } else {
        delete n[e];
      }
    }
    return this;
  }
  if (arguments.length === 0) {
    var i;
    var s = Object.keys(n);
    for (r = 0; r < s.length; ++r) {
      if ((i = s[r]) !== "removeListener") {
        this.removeAllListeners(i);
      }
    }
    this.removeAllListeners("removeListener");
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  if (typeof (t = n[e]) == "function") {
    this.removeListener(e, t);
  } else if (t !== undefined) {
    for (r = t.length - 1; r >= 0; r--) {
      this.removeListener(e, t[r]);
    }
  }
  return this;
};
a.prototype.listeners = function (e) {
  return f(this, e, true);
};
a.prototype.rawListeners = function (e) {
  return f(this, e, false);
};
a.listenerCount = function (e, t) {
  if (typeof e.listenerCount == "function") {
    return e.listenerCount(t);
  } else {
    return m.call(e, t);
  }
};
a.prototype.listenerCount = m;
a.prototype.eventNames = function () {
  if (this._eventsCount > 0) {
    return r(this._events);
  } else {
    return [];
  }
};