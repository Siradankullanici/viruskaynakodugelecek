var n;
var r;
var i = module.exports = {};
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